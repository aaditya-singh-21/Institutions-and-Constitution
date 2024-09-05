import React, { useState } from "react";
import ReactFlow from "react-flow-renderer";
import "./mindmap.css";

const rolesData = [
  { id: "1", role: "President", brief: "The ceremonial head of state and supreme commander of the armed forces.", qualifications: "Must be an Indian citizen, at least 35 years old, and eligible for election as a Member of the Lok Sabha." },

  { id: "2", role: "Prime Minister", brief: "Leader of the executive government and head of the Council of Ministers.", qualifications: "Must be a Member of the Lok Sabha or Rajya Sabha and generally be the leader of the majority party in the Lok Sabha." },

  { id: "3", role: "Council of Ministers", brief: "Assists the Prime Minister in policy-making and implementing executive decisions in various ministries.", qualifications: "Members are appointed by the President based on the recommendation of the Prime Minister. Must be elected members of the Lok Sabha or Rajya Sabha." },

  { id: "4", role: "Vice-President", brief: "Acts as the Chairman of the Rajya Sabha and steps in as Acting President if needed.", qualifications: "Must be an Indian citizen, at least 35 years old, and eligible for election as a Member of the Rajya Sabha." },

  { id: "5", role: "Chief Justice of India", brief: "Presides over the judiciary, ensuring the law of the land is upheld and the constitution is followed.", qualifications: "Must be a senior judge of the Supreme Court of India, appointed by the President." },

  { id: "6", role: "Governors of States", brief: "Represent the President in their state and act as a liaison between the state and central government.", qualifications: "Appointed by the President. Typically a senior politician or a retired judge." },

  { id: "7", role: "Chief Ministers of States", brief: "Leads the state government and manages policies, development, and state administration.", qualifications: "Must be a Member of the State Legislature and the leader of the majority party in the state." },

  { id: "8", role: "Speakers of Lok Sabha and Rajya Sabha", brief: "Oversees legislative proceedings and ensures order in their respective houses of Parliament.", qualifications: "Must be a member of the respective house. Elected by the members of the house." },

  { id: "9", role: "Executive", brief: "Powers of the Governor, Chief Minister, and State Council of Ministers. Manages state administration and enforces laws.", qualifications: "No specific qualifications beyond those for Governor, Chief Minister, and Council of Ministers." },

  { id: "10", role: "State Legislature", brief: "Structure and functions of Legislative Assemblies and Councils. Enacts laws and oversees the state government.", qualifications: "Members are elected by state voters. Must fulfill election criteria for respective legislative bodies." },

  { id: "11", role: "Legislative Powers", brief: "Governor’s power to issue ordinances. Allows for legislation on urgent matters when the legislature is not in session.", qualifications: "Governor must have the authority under the Constitution to issue ordinances." },

  { id: "12", role: "High Courts", brief: "Powers, jurisdiction, and role of High Courts in the states. Handles important legal cases and disputes.", qualifications: "Judges are appointed based on seniority and experience in the judiciary." },
  
  { id: "13", role: "Subordinate Courts", brief: "Framework for courts below the High Courts. Includes District Courts, Magistrate Courts, etc.", qualifications: "Judges are appointed based on state laws and regulations, typically involving legal experience and exams." }
];

const MindMap = () => {
  const [hoveredRole, setHoveredRole] = useState(null);

  // Ensure enough space between nodes for hierarchy
  const nodes = [
    { id: '1', data: { label: 'President' }, position: { x: 400, y: 50 }, className: 'node' },
    { id: '2', data: { label: 'Prime Minister' }, position: { x: 400, y: 150 }, className: 'node' },
    { id: '3', data: { label: 'Council of Ministers' }, position: { x: 400, y: 250 }, className: 'node' },
    { id: '4', data: { label: 'Vice-President' }, position: { x: 200, y: 250 }, className: 'node' },
    { id: '5', data: { label: 'Chief Justice of India' }, position: { x: 600, y: 250 }, className: 'node' },
    { id: '6', data: { label: 'Governors of States' }, position: { x: 200, y: 350 }, className: 'node' },
    { id: '7', data: { label: 'Chief Ministers of States' }, position: { x: 600, y: 350 }, className: 'node' },
    { id: '8', data: { label: 'Speakers of Lok Sabha and Rajya Sabha' }, position: { x: 400, y: 450 }, className: 'node' },
    { id: '9', data: { label: 'Executive' }, position: { x: 200, y: 450 }, className: 'node' },
    { id: '10', data: { label: 'State Legislature' }, position: { x: 600, y: 450 }, className: 'node' },
    { id: '11', data: { label: 'Legislative Powers' }, position: { x: 200, y: 550 }, className: 'node' },
    { id: '12', data: { label: 'High Courts' }, position: { x: 600, y: 550 }, className: 'node' },
    { id: '13', data: { label: 'Subordinate Courts' }, position: { x: 400, y: 650 }, className: 'node' }
  ];

  const edges = [
    { id: 'e1-2', source: '1', target: '2', style: { stroke: '#ff0000' }},
    { id: 'e2-3', source: '2', target: '3', style: { stroke: '#ff0000' } },
    { id: 'e2-4', source: '2', target: '4', style: { stroke: '#ff0000' } },
    { id: 'e3-5', source: '3', target: '5', style: { stroke: '#ff0000' } },
    { id: 'e3-6', source: '3', target: '6', style: { stroke: '#ff0000' } },
    { id: 'e3-7', source: '3', target: '7', style: { stroke: '#ff0000' } },
    { id: 'e7-8', source: '7', target: '8', style: { stroke: '#ff0000' } },
    { id: 'e4-9', source: '4', target: '9', style: { stroke: '#ff0000' } },
    { id: 'e6-10', source: '6', target: '10', style: { stroke: '#ff0000' } },
    { id: 'e11-12', source: '11', target: '12', style: { stroke: '#ff0000' } },
    { id: 'e12-13', source: '12', target: '13', style: { stroke: '#ff0000' } }
  ];

  
  const handleNodeMouseEnter = (event, node) => {
    const role = rolesData.find(role => role.id === node.id);
    setHoveredRole(role);
  };

  const handleNodeMouseLeave = () => {
    setHoveredRole(null);
  };

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
        nodeTypes={{ default: ({ id }) => (
          <div
            className="node"
            onMouseEnter={(event) => handleNodeMouseEnter(event, { id })}
            onMouseLeave={handleNodeMouseLeave}
          >
            {nodes.find(node => node.id === id)?.data.label}
          </div>
        )}}
      />
      {hoveredRole && (
        <div className="hover-card">
          <h3>{hoveredRole.role}</h3>
          <p>{hoveredRole.brief}</p>
          <p><strong>Qualifications:</strong> {hoveredRole.qualifications}</p>
        </div>
      )}
    </div>
  );
};

export default MindMap;