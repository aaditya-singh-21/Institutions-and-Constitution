import React from 'react';
import './Home.css'; // Import your CSS
import Slider from "react-slick"; // Import react-slick slider
import "slick-carousel/slick/slick.css"; // slick-carousel CSS
import "slick-carousel/slick/slick-theme.css"; // slick-carousel theme CSS
import parliamentImage from '../images/parliament.jpg'; // Add your images to the /src/images/ folder
import ambedkarImage from '../images/ambedkar.jpg'; // Replace with actual image paths
import ayyarImage from '../images/ayyar.jpg';
import prasadImage from '../images/prasad.jpg';
import patelImage from '../images/patel.jpg';
import nehruImage from '../images/nehru.jpg';
import Flipcard from './Flipcard';
import { useNavigate } from 'react-router-dom';
import Footer from '../HomeNew/components/Footer';


const Home = () => {
  const navigate = useNavigate();

  // Generic navigation function
  const handleNavigation = (path) => {
    navigate(path);
  };
  const architects = [
    {
      name: "Dr. B.R. Ambedkar",
      description: "Often hailed as the principal architect of the Indian Constitution, Dr. Ambedkar was the chairman of the Drafting Committee. His deep commitment to social justice and equality shaped many of the Constitution's fundamental rights and principles.",
      image: ambedkarImage,
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


  // react-slick slider settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2, // Show 2 cards at once
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2, // Show 2 cards at medium screens
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1, // Show 1 card at small screens
        },
      },
    ],
  };

  return (
    <div className="App">
      {/* Header Section */}
      <header className="header">
        <div className="nav">        
          <span>HOME</span>
          <button id="login" onClick={() => handleNavigation('/Login')}>Login</button>
          <button className='contact' onClick={() => handleNavigation('/ContactUs')}>CONTACT US</button>
          
        </div>
      </header>
      <div className="logo">
        <h1>
          Institutions & Constitution
          <br />
          <span>"Where Complex Laws Become Simple"</span>
        </h1>
      </div>

      {/* Why Constitution Matters Section */}
      <div className="container">
        <section className="why-constitution-matters">
          <h2>Why understanding the Constitution matters</h2>
          <hr class="custom-hr" />
          <h3>Empower Your Rights and Duties</h3>
          <p>
            The Constitution of India is not just a legal document; it is the foundation of our democracy.
            Understanding it helps you to know your rights, fulfill your duties, and participate meaningfully in the nation's governance.
          </p>
          <button className="explore-btn"  onClick={() => handleNavigation('/more-info')}>Explore More</button>
        </section>
      </div>

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
          <Slider {...settings}>
            {architects.map((architect, index) => (
              <div className="architect-card" key={index}>
                <img src={architect.image} alt={architect.name} />
                <h3>{architect.name}</h3>
                <p>{architect.description}</p>
              </div>
            ))}
          </Slider>
        </div>
      </section>

      {/* About Us Section */}
      <section className="about-us">
        <h2>Simplifying Constitutional Law</h2>
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
        <h3>Try clicking below on Card</h3>
        <Flipcard /> {/* Add the FlipCard component */}
      </section>
      <button className='mindmap' onClick={() => handleNavigation('/mind-map')}>Check Mind Map</button>

      {/* Footer Section */}
      {/*<footer className="footer">
        <p>&copy; 2024 Institutions & Constitution. All rights reserved.</p>
      </footer>*/}
      <Footer />
    </div>
  );
};

export default Home;
