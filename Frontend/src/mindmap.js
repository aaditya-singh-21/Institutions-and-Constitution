import React, { useState } from "react";
import ReactFlow from "react-flow-renderer";
import "./MindMap.css"; // Create this file for styling

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
  // Add more roles as per the flowchart design
];

const MindMap = () => {
  const [hoveredRole, setHoveredRole] = useState(null);

  const elements = rolesData.map((role, index) => ({
    id: role.id,
    data: { label: role.role },
    position: { x: 250, y: index * 100 },
    onMouseEnter: () => setHoveredRole(role),
    onMouseLeave: () => setHoveredRole(null),
  }));

  return (
    <div className="mindmap-container">
      <ReactFlow elements={elements} />
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
