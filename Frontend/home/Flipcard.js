import React, { useState } from 'react';
import './Flipcard.css';  //CSS is in Flipcard.css
import parliament_icon from './images/parlaiment_icon.png';

function Flipcard() {
    const [isFlipped, setIsFlipped] = useState(false);

    const handleFlip = () => {
        setIsFlipped(!isFlipped);
    };

    return (
        <div className="flip-card-container" onClick={handleFlip}>
            <div className={`flip-card ${isFlipped ? 'flipped' : ''}`}>
                <div className="flip-card-front">
                    <img src={parliament_icon} alt="Parliament Icon" className='flip-card-icon'></img>
                    <h2>PART V</h2>
                    <p>Part V of the Indian Constitution outlines the Union Government’s structure and functions. It covers:</p>
                    <ul>
                        <li><strong>Executive:</strong> Powers of the President, Vice President, Prime Minister, and Council of Ministers.</li>
                        <li><strong>Parliament:</strong> Structure and functions of Rajya Sabha and Lok Sabha.</li>
                        <li><strong>Legislation:</strong> President’s legislative powers, including issuing ordinances.</li>
                        <li><strong>Judiciary:</strong> Powers and jurisdiction of the Supreme Court.</li>
                        <li><strong>Comptroller and Auditor-General:</strong> Auditing government accounts.</li>
                    </ul>
                </div>
                <div className="flip-card-back">
                    <img src={parliament_icon} alt="Parliament Icon" className='flip-card-icon'></img>
                    <h2>PART VI</h2>
                    <p>Part VI of the Indian Constitution deals with the States, outlining their structure and functions. It covers:</p>
                    <ul>
                        <li><strong>Executive:</strong> Powers of the Governor, Chief Minister, and State Council of Ministers.</li>
                        <li><strong>State Legislature:</strong> Structure and functions of Legislative Assemblies and Councils.</li>
                        <li><strong>Legislative Powers:</strong> Governor’s power to issue ordinances.</li>
                        <li><strong>High Courts:</strong> Powers, jurisdiction, and role of High Courts in the states.</li>
                        <li><strong>Subordinate Courts:</strong> Framework for courts below the High Courts.</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Flipcard;