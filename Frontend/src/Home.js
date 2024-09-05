import React, { useState } from 'react';
import './Home.css'; // Import your CSS
import { useNavigate } from 'react-router-dom';
import parliamentImage from './images/parliament.jpg'; // Add your images to the /src/images/ folder
import ambedkarImage from './images/ambedkar.jpg'; // Replace with actual image paths
import ayyarImage from './images/ayyar.jpg';
import prasadImage from './images/prasad.jpg';
import patelImage from './images/patel.jpg';
import nehruImage from './images/nehru.jpg';
import Flipcard from './Flipcard';
import MindMap from './mindmap';

const Home = () => {
    
    const navigate = useNavigate(); // Initialize navigate
    const architects = [
        {
            name: "Dr. B.R. Ambedkar",
            description: "Often hailed as the principal architect of the Indian Constitution, Dr. Ambedkar was the chairman of the Drafting Committee. His deep commitment to social justice and equality shaped many of the Constitution's fundamental rights and principles.",
            image : ambedkarImage,
        },
        {
            name: "Alladi Krishnaswami Ayyar",
            description: "A legal luminary and a member of the Drafting Committee, Ayyar made crucial contributions to the legal and constitutional aspects of the document, particularly in ensuring a balance between individual rights and state authority.",
            image: ayyarImage,
        },
        {
            name: "Dr. Rajendra Prasad",
            description: "The first President of India and a key figure in the drafting process, Dr. Prasad presided over the Constituent Assembly, ensuring a fair and inclusive process.",
            image: prasadImage,
        },
        {
            name: "Sardar Vallabhbhai Patel",
            description: "Known as the 'Iron Man of India,' Patel was instrumental in the integration of princely states into the Indian Union and contributed significantly to the administrative structure of the nation.",
            image: patelImage,
        },
        {
            name: "Jawaharlal Nehru",
            description: "As the first Prime Minister of India and a key figure in the freedom movement, Nehru played a significant role in shaping the vision of a sovereign, socialist, secular, and democratic republic.",
            image: nehruImage,
        },
    ];

    const [visibleIndex, setVisibleIndex] = useState(0);

    const handleNext = () => {
        setVisibleIndex((prevIndex) => (prevIndex + 3) % architects.length);
    };

    const handlePrev = () => {
        setVisibleIndex((prevIndex) => (prevIndex - 3 + architects.length) % architects.length);
    };

    const visibleCards = architects.slice(visibleIndex, visibleIndex + 3);

    return (
        <div className="App">
            {/* Header Section */}
            <header className="header">
                <div className="nav">
                    <button id="login">LOGIN</button>
                    <span>HOME</span>
                    <span>PARTS</span>
                    <span>ABOUT US</span>
                    <span>CONTACT US</span>
                </div>
                <div className="logo">
                    <h1 id="headline">
                        Institutions & Constitution</h1>
                        <br />
                        <span id="subline">"Where Complex Laws Become Simple"</span>
                    
                </div>
            </header>

            {/* Why Constitution Matters Section */}
            <section className="why-constitution-matters">
                <h2>Why understanding the Constitution matters</h2>
                <h3>Empower Your Rights and Duties</h3>
                <p>
                    The Constitution of India is not just a legal document; it is the foundation of our democracy.
                    Understanding it helps you to know your rights, fulfill your duties, and participate meaningfully in the nation's governance.
                </p>
                <button className="explore-btn" onClick={() => navigate('/more-info')}>Explore More</button>

            </section>

            {/* Parliament Image Section */}
            <section className="parliament-section">
                <img
                    src={parliamentImage}
                    alt="Indian Parliament"
                    className="parliament-image"
                />
            </section>

            {/* Architects of the Constitution Section */}
            <section className="architects">
                <h2>Architects of the Constitution</h2>
                <div className="carousel-container">
                    <div className="carousel">
                        <button className="arrow left-arrow" onClick={handlePrev}>
                            &lt;
                        </button>
                        <div className="architects-cards">
                            {visibleCards.map((architect, index) => (
                                <div className="architect-card" key={index}>
                                    <img src={architect.image} alt={architect.name} />
                                    <h3>{architect.name}</h3>
                                    <p>{architect.description}</p>
                                </div>
                            ))}
                        </div>
                        <button className="arrow right-arrow" onClick={handleNext}>
                            &gt;
                        </button>
                    </div>
                </div>
            </section>

            {/* About Us Section */}
            <section className="about-us">
                <p>
                    Parts 5 and 6 of the Indian Constitution are pivotal in understanding the governance of India. Part 5 outlines the roles and powers of the
                    Union government, including the President, Vice-President, and the Supreme Court, while Part 6 defines the state governments' structure,
                    covering the Governor, State Legislature, and High Courts. Together, they form the foundation of India’s federal structure.
                </p>
                <p>
                    Our mission is to simplify the complex language of these sections, making it accessible to everyone. Through interactive mind maps
                    and quizzes, we break down dense legal concepts into engaging and understandable formats making them easy to understand for students,
                    educators, and anyone interested in Indian governance.
                </p>
            </section>

            {/* FlipCard Section */}
            <section className="flip-card-section">
                <h2>Explore the Constitution</h2>
                <Flipcard /> {/* Add the FlipCard component */}
            </section>
            <button className="mindmap-btn" onClick={() => navigate('/mind-map')}>Explore MindMaps</button>

            {/* Footer Section */}
            <footer className="footer">
                <p>&copy; 2024 Institutions & Constitution. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default Home;