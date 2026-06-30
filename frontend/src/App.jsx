import {
  ReactFlow,
  Controls,
  MiniMap,
  Background,
  useNodesState,
  useEdgesState,
} from "reactflow";


import { getLayoutedElements } from "./layout";
import "reactflow/dist/style.css";
import "./App.css";

function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  async function analyseRepository() {
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/analyse?path=."
      );

      const graph = await response.json();

      const flowNodes = graph.nodes.map((node, index) => ({
        id: node.id,
        position: {
          x: 100,
          y: index * 100,
        },
        data: {
          label: node.id,
        },
      }));

      const flowEdges = graph.edges.map((edge, index) => ({
        id: `e${index}`,
        source: edge.source,
        target: edge.target,
      }));

      const layoutedGraph = getLayoutedElements(flowNodes, flowEdges);

      setNodes(layoutedGraph.nodes);
      setEdges(layoutedGraph.edges);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <button onClick={analyseRepository}>
        Analyse Repository
      </button>

      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        fitView
      >
        <Background />
        <MiniMap />
        <Controls />
      </ReactFlow>
    </div>
  );
}

export default App;