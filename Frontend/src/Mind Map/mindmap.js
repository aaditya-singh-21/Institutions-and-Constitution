import React, { useState, useEffect, useMemo } from "react";
import ReactFlow, {
  useNodesState,
  useEdgesState,
  MarkerType,
  Background,
  Controls,
  MiniMap,
  Handle,
  Position
} from "reactflow";
import 'reactflow/dist/style.css';
import dagre from 'dagre';
import { useNavigate } from 'react-router-dom';
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

const initialNodes = [
  { id: '1', data: { label: 'President' }, position: { x: 0, y: 0 } },
  { id: '2', data: { label: 'Prime Minister' }, position: { x: 0, y: 0 } },
  { id: '3', data: { label: 'Council of Ministers' }, position: { x: 0, y: 0 } },
  { id: '4', data: { label: 'Vice-President' }, position: { x: 0, y: 0 } },
  { id: '5', data: { label: 'Chief Justice of India' }, position: { x: 0, y: 0 } },
  { id: '6', data: { label: 'Supreme Court' }, position: { x: 0, y: 0 } },
  { id: '7', data: { label: 'Governors of States' }, position: { x: 0, y: 0 } },
  { id: '8', data: { label: 'Chief Ministers of States' }, position: { x: 0, y: 0 } },
  { id: '9', data: { label: 'Speakers of Lok Sabha and Rajya Sabha' }, position: { x: 0, y: 0 } },
  { id: '10', data: { label: 'Executive' }, position: { x: 0, y: 0 } },
  { id: '11', data: { label: 'State Legislature' }, position: { x: 0, y: 0 } },
  { id: '12', data: { label: 'Legislative Powers' }, position: { x: 0, y: 0 } },
  { id: '13', data: { label: 'High Courts' }, position: { x: 0, y: 0 } },
  { id: '14', data: { label: 'Subordinate Courts' }, position: { x: 0, y: 0 } },
  { id: '15', data: { label: 'Gram Panchayat' }, position: { x: 0, y: 0 } },
  { id: '16', data: { label: 'Block Panchayat (Tahsil)' }, position: { x: 0, y: 0 } },
  { id: '17', data: { label: 'Zilla Parishad' }, position: { x: 0, y: 0 } },
  { id: '18', data: { label: 'Municipal Corporation' }, position: { x: 0, y: 0 } },
  { id: '19', data: { label: 'Municipality' }, position: { x: 0, y: 0 } },
  { id: '20', data: { label: 'City Council' }, position: { x: 0, y: 0 } }
];

const initialEdges = [
  { id: 'e1-2', source: '1', target: '2' },
  { id: 'e2-3', source: '2', target: '3' },
  { id: 'e3-4', source: '3', target: '4' },
  { id: 'e3-5', source: '3', target: '5' },
  { id: 'e3-6', source: '3', target: '6' },
  { id: 'e6-9', source: '6', target: '9' },
  { id: 'e7-10', source: '7', target: '10' },
  { id: 'e8-10', source: '8', target: '10' },
  { id: 'e10-11', source: '10', target: '11' },
  { id: 'e11-12', source: '11', target: '12' },
  { id: 'e12-13', source: '12', target: '13' },
  { id: 'e13-14', source: '13', target: '14' },
  { id: 'e14-15', source: '14', target: '15' },
  { id: 'e14-16', source: '14', target: '16' },
  { id: 'e15-17', source: '15', target: '17' },
  { id: 'e17-18', source: '17', target: '18' },
  { id: 'e18-19', source: '18', target: '19' },
  { id: 'e19-20', source: '19', target: '20' }
].map(edge => ({ ...edge, type: 'smoothstep', animated: true, markerEnd: { type: MarkerType.ArrowClosed, color: '#da5c4f' }, style: { stroke: '#da5c4f', strokeWidth: 2 } }));


const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

const nodeWidth = 200;
const nodeHeight = 60;

const getLayoutedElements = (nodes, edges, direction = 'TB') => {
  dagreGraph.setGraph({ rankdir: direction, ranksep: 80, nodesep: 50 });

  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
  });

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  const layoutedNodes = nodes.map((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    node.targetPosition = direction === 'TB' ? 'top' : 'left';
    node.sourcePosition = direction === 'TB' ? 'bottom' : 'right';

    // We are shifting the dagre node position (anchor=center center) to the top left
    // so it matches the React Flow node anchor point (top left).
    node.position = {
      x: nodeWithPosition.x - nodeWidth / 2,
      y: nodeWithPosition.y - nodeHeight / 2,
    };

    return node;
  });

  return { nodes: layoutedNodes, edges };
};


const MindMap = () => {
  const [hoveredRole, setHoveredRole] = useState(null);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [hiddenNodes, setHiddenNodes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
      initialNodes,
      initialEdges
    );

    setNodes(layoutedNodes.map(node => ({
      ...node,
      className: 'node',
    })));
    setEdges(layoutedEdges);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  const handleNodeMouseEnter = (event, node) => {
    const role = rolesData.find(role => role.id === node.id);
    setHoveredRole(role);
  };

  const handleNodeMouseLeave = () => {
    setHoveredRole(null);
  };

  const handleNodeClick = (event, node) => {
    // Find children
    const childEdges = initialEdges.filter(e => e.source === node.id);
    if (childEdges.length === 0) return; // No children to hide/show

    const childIds = childEdges.map(e => e.target);

    // Check if children are currently hidden
    const childrenHidden = hiddenNodes.includes(childIds[0]);

    let newHiddenNodes = [...hiddenNodes];

    const getDescendants = (id) => {
        let descendants = [];
        const children = initialEdges.filter(e => e.source === id).map(e => e.target);
        descendants.push(...children);
        children.forEach(child => descendants.push(...getDescendants(child)));
        return descendants;
    };

    const allDescendants = getDescendants(node.id);

    if (childrenHidden) {
      // Show children
      newHiddenNodes = newHiddenNodes.filter(id => !allDescendants.includes(id));
    } else {
      // Hide children
      newHiddenNodes = [...newHiddenNodes, ...allDescendants];
    }

    setHiddenNodes(newHiddenNodes);

    // Apply visibility
    const visibleNodes = initialNodes.filter(n => !newHiddenNodes.includes(n.id));
    const visibleEdges = initialEdges.filter(e => !newHiddenNodes.includes(e.target) && !newHiddenNodes.includes(e.source));

    // Recalculate layout
    const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
      visibleNodes,
      visibleEdges
    );

    setNodes(layoutedNodes.map(n => ({
        ...n,
        className: `node ${n.id === node.id ? 'pulsing' : ''}`, // Pulse the clicked node
        style: { ...n.style, opacity: 0, animation: 'fadeIn 0.5s forwards' } // Entrance animation
    })));

    setEdges(layoutedEdges);

    setTimeout(() => {
        setNodes(nds => nds.map(n => ({...n, className: 'node'})));
    }, 2000); // Stop pulse after 2s
  };

  const nodeTypes = useMemo(() => ({
    default: ({ id, data, targetPosition, sourcePosition }) => (
      <div
        onMouseEnter={(event) => handleNodeMouseEnter(event, { id })}
        onMouseLeave={handleNodeMouseLeave}
        style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative'}}
      >
        <Handle type="target" position={Position.Top} style={{ visibility: 'hidden' }} />
        {data.label}
        <Handle type="source" position={Position.Bottom} style={{ visibility: 'hidden' }} />
      </div>
    )
  }), []);

  return (
    <div className="mindmap-container">
      <div className="mindmap-header">
         <button className="back-btn" onClick={() => navigate('/')}>← Back to Home</button>
      </div>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={handleNodeClick}
        nodeTypes={nodeTypes}
        fitView
        attributionPosition="bottom-right"
        minZoom={0.2}
      >
        <Background color="#aaa" gap={16} />
        <Controls />
        <MiniMap nodeStrokeColor={(n) => {
            return '#00254d';
        }} nodeColor={(n) => {
            return '#00254d';
        }} />
      </ReactFlow>

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