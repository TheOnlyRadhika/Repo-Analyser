import { useState } from "react";
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
import Sidebar from "./Sidebar";

function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [summary, setSummary] = useState("");

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
          ...node,
          label: node.name,
        }
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
  async function handleNodeClick(event, node) {
    setSelectedFile(node.data);
    await fetchSummary(node.data);
  }



  async function fetchSummary(file) {
    console.log("Summary state:", summary);

    const response = await fetch(
      "http://127.0.0.1:8000/summarise",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          path: file.path,
          max_words: 150,
          style: "technical",
        }),
      },
      console.log(file)
    );

    const data = await response.json();

    console.log("Response from backend:", data);

    setSummary(data.summary);
  }

  return (
    <div
      style={{
        display: "flex",
        width: "100vw",
        height: "100vh",
      }}
    >

      <div style={{ flex: 3 }}>

        <button onClick={analyseRepository}>
          Analyse Repository
        </button>

        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onNodeClick={handleNodeClick}
          fitView
        >
          <Background />
          <MiniMap />
          <Controls />
        </ReactFlow>

      </div>

      <Sidebar
        file={selectedFile}
        summary={summary}
      />

    </div>
  );
}

export default App;