import dagre from "@dagrejs/dagre";

const graph = new dagre.graphlib.Graph();

graph.setDefaultEdgeLabel(() => ({}));

export function getLayoutedElements(nodes, edges) {

    graph.setGraph({
        rankdir: "TB",
    });

    nodes.forEach((node) => {
        graph.setNode(node.id, {
            width: 170,
            height: 40,
        });
    });

    edges.forEach((edge) => {
        graph.setEdge(edge.source, edge.target);
    });

    dagre.layout(graph);

    nodes.forEach((node) => {

        const position = graph.node(node.id);

        node.position = {
            x: position.x,
            y: position.y,
        };
    });

    return { nodes, edges };
}