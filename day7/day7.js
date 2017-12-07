const base = require("../base.js");

class GraphNode {
    constructor(name, root) {
        this._name = name;
        this._isRoot = root;

        this._children = [];
        this._parents = [];

        this._depth = 0;
        this._weight = 0;
    }

    addChild(a) {
        a.parents.push(this);
        this.children.push(a);
    }

    calculateDepth() {
        this._depth = 0;

        if (this._isRoot) {
            return this._depth;
        }
        
        for (const parent of this._parents) {
            this._depth = Math.max(parent.calculateDepth() + 1, this._depth);
        }

        return this._depth;
    }

    getIncorrect() {
        let total = this._parents;
        let weights = total.map(x => x.weightTotal);
        let normal = weights.most_common_value();
        let incorrect = total.filter(x => x.weightTotal !== normal);

        if (incorrect.length === 0) {
            const weights = this.children.first().parents.map(x => x.weightTotal);
            return [weights.most_common_value(), this];
        }

        return incorrect.first().getIncorrect();
    }

    get name() {
        return this._name;
    }

    get isRoot() {
        return this._isRoot;
    }

    set isRoot(val) {
        this._isRoot = val;
    }

    get children() {
        return this._children;
    }

    get parents() {
        return this._parents;
    }

    get depth() {
        return this._depth;
    }

    get bottom() {
        if (this._children.length === 0) {
            return this;
        }

        return this._children.map(x => x.bottom).sort((a, b) => a.depth - b.depth).pop();
    }

    get weight() {
        return this._weight;
    }

    set weight(val) {
        this._weight = val;
    }

    get weightTotal() {
        return this._weight + this.weightParents;
    }

    get weightParents() {
        let weight = 0;

        for (const parent of this._parents) {
            weight += parent.weightTotal;
        }

        return weight;
    }
}

function build_graph(input) {
    const graph = {};
    const root = [];

    input.split_newline().forEach(x => {
        const parser = /(.*?)\s*\((\d*)\)(?:\s*->\s*(.*))?/;
        const match = parser.exec(x);

        const name = match[1].trim();
        const weight = Number(match[2]);

        if (graph[name] === undefined) {
            graph[name] = new GraphNode(name, match[3] === undefined);
        } else {
            graph[name].isRoot = match[3] === undefined;
        }

        graph[name].weight = weight;

        if (match[3] !== undefined) {
            match[3].split(",").map(x => x.trim()).forEach(x => {
                if (graph[x] === undefined) {
                    graph[x] = new GraphNode(x, false);
                }

                graph[x].addChild(graph[name]);
                graph[name].calculateDepth();
            });
        } else {
            root.push(graph[name]);
        }
    });

    return [root, graph];
}

function day7_part1(input) {
    const graph = build_graph(input);

    return graph[0].map(x => x.bottom).reduce((x, y) => x.depth < y.depth ? y : x).name;
}

function day7_part2(input) {
    const graph = build_graph(input);

    let bottom = graph[0].map(x => x.bottom).reduce((x, y) => x.depth < y.depth ? y : x);
    let incorrect = bottom.getIncorrect();
    
    return incorrect[0] - incorrect[1].weightParents;
}

base.start("day7.in", day7_part1);
base.start("day7.in", day7_part2);
