import React, { useState } from "react";
import ReactFlow from "react-flow-renderer";
import "./mindmap.css";

const rolesData = [
  {
    id: "1",
    role: "President",
    brief: "The ceremonial head of state and supreme commander of the armed forces.",
    qualifications: "Must be an Indian citizen, at least 35 years old, and eligible for election as a Member of the Lok Sabha.",
    maxNumber: 1,
    currentMembers: 1,
    minAge: 35,
    maxTenure: "5 years (can be re-elected)"
  },
  {
    id: "2",
    role: "Prime Minister",
    brief: "Leader of the executive government and head of the Council of Ministers.",
    qualifications: "Must be a Member of the Lok Sabha or Rajya Sabha and generally be the leader of the majority party in the Lok Sabha.",
    maxNumber: 1,
    currentMembers: 1,
    minAge: 25,
    maxTenure: "No fixed term (remains in office as long as they command a majority in Lok Sabha)"
  },
  {
    id: "3",
    role: "Council of Ministers",
    brief: "Assists the Prime Minister in policy-making and implementing executive decisions in various ministries.",
    qualifications: "Members are appointed by the President based on the recommendation of the Prime Minister. Must be elected members of the Lok Sabha or Rajya Sabha.",
    maxNumber: "15% of the total members of Lok Sabha",
    currentMembers: 78,
    minAge: 25,
    maxTenure: "No fixed term (serves at the pleasure of the President)"
  },
  {
    id: "4",
    role: "Vice-President",
    brief: "Acts as the Chairman of the Rajya Sabha and steps in as Acting President if needed.",
    qualifications: "Must be an Indian citizen, at least 35 years old, and eligible for election as a Member of the Rajya Sabha.",
    maxNumber: 1,
    currentMembers: 1,
    minAge: 35,
    maxTenure: "5 years (can be re-elected)"
  },
  {
    id: "5",
    role: "Chief Justice of India",
    brief: "Presides over the judiciary, ensuring the law of the land is upheld and the constitution is followed.",
    qualifications: "Must be a senior judge of the Supreme Court of India, appointed by the President.",
    maxNumber: 1,
    currentMembers: 1,
    minAge: "No specific minimum age (must be a senior judge)",
    maxTenure: "Up to age 65"
  },
  {
    id: "6",
    role: "Supreme Court",
    brief: "The highest judicial body in India. It handles appeals and constitutional matters.",
    qualifications: "Judges are appointed by the President of India based on recommendations from the judiciary.",
    maxNumber: "34 judges (including the Chief Justice of India)",
    currentMembers: 34,
    minAge: "No specific minimum age (judges are senior legal professionals)",
    maxTenure: "Up to age 65"
  },  
  {
    id: "7",
    role: "Governors of States",
    brief: "Represent the President in their state and act as a liaison between the state and central government.",
    qualifications: "Appointed by the President. Typically a senior politician or a retired judge.",
    maxNumber: 28, // Plus 3 for Union Territories
    currentMembers: 28, // Plus 3 for Union Territories
    minAge: 35,
    maxTenure: "5 years (can be re-appointed or serve at the pleasure of the President)"
  },
  {
    id: "8",
    role: "Chief Ministers of States",
    brief: "Leads the state government and manages policies, development, and state administration.",
    qualifications: "Must be a Member of the State Legislature and the leader of the majority party in the state.",
    maxNumber: 28,
    currentMembers: 28,
    minAge: 25,
    maxTenure: "No fixed term (serves as long as they command the majority in the state legislative assembly)"
  },
  {
    id: "9",
    role: "Speakers of Lok Sabha and Rajya Sabha",
    brief: "Oversees legislative proceedings and ensures order in their respective houses of Parliament.",
    qualifications: "Must be a member of the respective house. Elected by the members of the house.",
    maxNumber: 2, // 1 for Lok Sabha, 1 for Rajya Sabha
    currentMembers: 2,
    minAge: 25, // Lok Sabha Speaker
    maxTenure: "Varies based on election cycle"
  },
  {
    id: "10",
    role: "Executive",
    brief: "Powers of the Governor, Chief Minister, and State Council of Ministers. Manages state administration and enforces laws.",
    qualifications: "No specific qualifications beyond those for Governor, Chief Minister, and Council of Ministers.",
    maxNumber: "Varies by state",
    currentMembers: "Varies by state",
    minAge: "Varies by role",
    maxTenure: "Varies by state and role"
  },
  {
    id: "11",
    role: "State Legislature",
    brief: "Structure and functions of Legislative Assemblies and Councils. Enacts laws and oversees the state government.",
    qualifications: "Members are elected by state voters. Must fulfill election criteria for respective legislative bodies.",
    maxNumber: "Varies by state (Uttar Pradesh has 403 members)",
    currentMembers: "Varies by state",
    minAge: 25,
    maxTenure: "5 years (unless dissolved sooner)"
  },
  {
    id: "12",
    role: "Legislative Powers",
    brief: "Governor’s power to issue ordinances. Allows for legislation on urgent matters when the legislature is not in session.",
    qualifications: "Governor must have the authority under the Constitution to issue ordinances.",
    maxNumber: "No specific number",
    currentMembers: "No specific number",
    minAge: "No specific minimum age",
    maxTenure: "No fixed term"
  },
  {
    id: "13",
    role: "High Courts",
    brief: "Powers, jurisdiction, and role of High Courts in the states. Handles important legal cases and disputes.",
    qualifications: "Judges are appointed based on seniority and experience in the judiciary.",
    maxNumber: "Varies by state",
    currentMembers: "Varies by state",
    minAge: "No specific minimum age",
    maxTenure: "Up to age 62 for judges"
  },
  {
    id: "14",
    role: "Subordinate Courts",
    brief: "Framework for courts below the High Courts. Includes District Courts, Magistrate Courts, etc.",
    qualifications: "Judges are appointed based on state laws and regulations, typically involving legal experience and exams.",
    maxNumber: "Varies by district and state",
    currentMembers: "Varies",
    minAge: "Varies (usually around 21-35 years based on recruitment exams)",
    maxTenure: "No fixed term"
  },
  {
    id: "15",
    role: "Gram Panchayat",
    brief: "The basic unit of rural local government at the village level.",
    qualifications: "Elected by village residents; must be at least 18 years old.",
    maxNumber: "Varies by village",
    currentMembers: "Varies",
    minAge: "18",
    maxTenure: "5 years"
  },
  {
    id: "16",
    role: "Block Panchayat (Tahsil)",
    brief: "Governance body for a group of villages, focusing on block-level administration.",
    qualifications: "Elected members from Gram Panchayats; must be at least 21 years old.",
    maxNumber: "Varies by Block",
    currentMembers: "Varies",
    minAge: "21",
    maxTenure: "5 years"
  },
  {
    id: "17",
    role: "Zilla Parishad",
    brief: "District-level governance body managing administration and development.",
    qualifications: "Elected by Block Panchayat members; must be at least 25 years old.",
    maxNumber: "Varies by district",
    currentMembers: "Varies",
    minAge: "21",
    maxTenure: "5 years"
  },
  {
    id: "18",
    role: "Municipal Corporation",
    brief: "Governs large cities or metropolitan areas, overseeing urban infrastructure and services.",
    qualifications: "Elected by city residents; must be at least 21 years old.",
    maxNumber: "Varies by city size",
    currentMembers: "Varies",
    minAge: "21",
    maxTenure: "5 years"
  },
  {
    id: "19",
    role: "Municipality",
    brief: "Governs smaller towns or cities, managing local services and development.",
    qualifications: "Elected by town residents; must be at least 21 years old.",
    maxNumber: "Varies by town size",
    currentMembers: "Varies",
    minAge: "21",
    maxTenure: "5 years"
  },
  {
    id: "20",
    role: "City Council",
    brief: "Governs smaller cities similar to Municipal Corporation but for less populous areas.",
    qualifications: "Elected by city residents; must be at least 21 years old",
    maxNumber: "Varies by city",
    currentMembers: "Varies",
    minAge: "21",
    maxTenure: "5 years"
  }
];


const MindMap = () => {
  const [hoveredRole, setHoveredRole] = useState(null);

  // Define nodes with hierarchical positions
  const nodes = [
    { id: '1', data: { label: 'President' }, position: { x: 600, y: 10 }, className: 'node' },
    { id: '2', data: { label: 'Prime Minister' }, position: { x: 600, y: 60 }, className: 'node' },
    { id: '3', data: { label: 'Council of Ministers' }, position: { x: 600, y: 110 }, className: 'node' },
    { id: '4', data: { label: 'Vice-President' }, position: { x: 600, y: 180 }, className: 'node' },
    { id: '5', data: { label: 'Chief Justice of India' }, position: { x: 600, y: 230 }, className: 'node' },
    { id: '6', data: { label: 'Supreme Court' }, position: { x: 600, y: 300 }, className: 'node' },
    { id: '7', data: { label: 'Governors of States' }, position: { x: 400, y: 340 }, className: 'node' },
    { id: '8', data: { label: 'Chief Ministers of States' }, position: { x: 800, y: 340 }, className: 'node' },
    { id: '9', data: { label: 'Speakers of Lok Sabha and Rajya Sabha' }, position: { x: 600, y: 400 }, className: 'node' },
    { id: '10', data: { label: 'Executive' }, position: { x: 400, y: 460 }, className: 'node' },
    { id: '11', data: { label: 'State Legislature' }, position: { x: 800, y: 460 }, className: 'node' },
    { id: '12', data: { label: 'Legislative Powers' }, position: { x: 400, y: 510 }, className: 'node' },
    { id: '13', data: { label: 'High Courts' }, position: { x: 800, y: 530 }, className: 'node' },
    { id: '14', data: { label: 'Subordinate Courts' }, position: { x: 600, y: 570 }, className: 'node' },
    { id: '15', data: { label: 'Gram Panchayat' }, position: { x: 400, y: 640 }, className: 'node' },
    { id: '16', data: { label: 'Block Panchayat (Tahsil)' }, position: { x: 600, y: 640 }, className: 'node' },
    { id: '17', data: { label: 'Zilla Parishad' }, position: { x: 800, y: 640 }, className: 'node' },
    { id: '18', data: { label: 'Municipal Corporation' }, position: { x: 400, y: 740 }, className: 'node' },
    { id: '19', data: { label: 'Municipality' }, position: { x: 600, y: 740 }, className: 'node' },
    { id: '20', data: { label: 'City Council' }, position: { x: 800, y: 740 }, className: 'node' }
  ];
  

  // hierarchical edges
  const edges = [
    { id: 'e1-2', source: '1', target: '2', style: { stroke: '#ff0000' } },
    { id: 'e2-3', source: '2', target: '3', style: { stroke: '#ff0000' } },
    { id: 'e3-4', source: '3', target: '4', style: { stroke: '#ff0000' } },
    { id: 'e3-5', source: '3', target: '5', style: { stroke: '#ff0000' } },
    { id: 'e3-6', source: '3', target: '6', style: { stroke: '#ff0000' } },
    { id: 'e6-9', source: '6', target: '9', style: { stroke: '#ff0000' } },
    { id: 'e7-10', source: '7', target: '10', style: { stroke: '#ff0000' } },
    { id: 'e8-10', source: '8', target: '10', style: { stroke: '#ff0000' } },
    { id: 'e10-11', source: '10', target: '11', style: { stroke: '#ff0000' } },
    { id: 'e11-12', source: '11', target: '12', style: { stroke: '#ff0000' } },
    { id: 'e12-13', source: '12', target: '13', style: { stroke: '#ff0000' } },
    { id: 'e13-14', source: '13', target: '14', style: { stroke: '#ff0000' } },
    { id: 'e14-15', source: '14', target: '15', style: { stroke: '#ff0000' } },
    { id: 'e14-16', source: '14', target: '16', style: { stroke: '#ff0000' } },
    { id: 'e15-17', source: '15', target: '17', style: { stroke: '#ff0000' } },
    { id: 'e17-18', source: '17', target: '18', style: { stroke: '#ff0000' } },
    { id: 'e18-19', source: '18', target: '19', style: { stroke: '#ff0000' } },
    { id: 'e19-20', source: '19', target: '20', style: { stroke: '#ff0000' } }
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
          <p><strong>Max Number:</strong> {hoveredRole.maxNumber}</p>
          <p><strong>Current Members:</strong> {hoveredRole.currentMembers}</p>
          <p><strong>Minimum Age:</strong> {hoveredRole.minAge}</p>
          <p><strong>Max Tenure:</strong> {hoveredRole.maxTenure}</p>
        </div>
      )}
    </div>
  );
};

export default MindMap;
