import React, { useState } from "react";
import ReactFlow from "react-flow-renderer";
import "./mindmap.css"; // Create this file for styling

const rolesData = [
  {
    id: "1",
    role: "President",
    brief: "The ceremonial head of state and supreme commander of the armed forces.",
  },
  {
    id: "2",
    role: "Prime Minister",
    brief: "Leader of the executive government and head of the Council of Ministers.",
  },
  {
    id: "3",
    role:"Council of Minister",
    brief:"Assists the Prime Minister in running the government and formulating policies."
  },
  {
    id: "4",
    role:"Vice-President",
    brief:"Second-highest constitutional office, primarily Chairman of the Rajya Sabha."
  },
  {
    id: "5",
    role:"Chief Justice of India",
    brief:"Head of the judiciary and presides over the Supreme Court."
  },
  {
    id: "6",
    role:"Governors of States",
    brief:"Representatives of the President in each state, overseeing state administration."
  },
  {
    id: "7",
    role:"Chief Ministers of States",
    brief:"Heads of state governments, formulating state policies."
  },
  {
    id: "8",
    role:"Speakers of the Lok Sabha and Rajya Sabha",
    brief:"Preside over the proceedings of their respective houses of Parliament."
  }
  
  // Add more roles as per the flowchart design
];

const MindMap = () => {
  const [hoveredRole, setHoveredRole] = useState(null);

  const nodes = rolesData.map((role, index) => ({
    id: role.id,
    data: { label: role.role },
    position: { x: 250, y: index * 100 },
    style: {border: '1px solid #222', borderRadius: '5px',padding: '10px'}
  }));
  const edgesData = [
    { id: "e1-2", source: "1", target: "2" },
    { id: "e2-3", source: "2", target: "3" },
    { id: "e3-4", source: "3", target: "4" },
    { id: "e4-5", source: "4", target: "5" },
    { id: "e5-6", source: "5", target: "6" },
    { id: "e6-7", source: "6", target: "7" },
    { id: "e7-8", source: "7", target: "8" },
    
    // Add more edges as needed
  ];

  const edges =edgesData.map(edge => ({
    id:edge.id,
    source:edge.source,
    target: edge.target,
    style:{stroke: '#ff0000'}

  }))

  return (
    <div className="mindmap-container">
      <ReactFlow
       nodes={nodes}
       edges={edges}
       nodesDraggable={false}
       nodesConnectable={false}
       zoomable={false}
       panOnDrag={false}
       zoomOnScroll={false}
      />
      {hoveredRole && (
        <div className="hover-card">
          <h3>{hoveredRole.role}</h3>
          <p>{hoveredRole.brief}</p>
          <button className="details-btn">View Detailed Overview</button>
        </div>
      )}
    </div>
  );
};

export default MindMap;
