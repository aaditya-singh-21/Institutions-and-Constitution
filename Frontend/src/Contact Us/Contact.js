import React from 'react';
import './Contact.css'; // Import the CSS file

const Contact = () => {
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Add logic for form submission if needed
    console.log("Form submitted");
  };

  return (
    <div className="container">
      <div className="form">
        <div className="contact-info">
          {/* You can add contact information here */}
        </div>

        <div className="contact-form">
          <form onSubmit={handleSubmit}>
            <h3 className="title">Contact us</h3>
            <div className="input-container">
              <input
                type="text"
                name="name"
                className="input"
                placeholder="Username"
                required
              />
            </div>

            <div className="input-container">
              <input
                type="email"
                name="email"
                className="input"
                placeholder="Email"
                required
              />
            </div>

            <div className="input-container">
              <input
                type="number"
                name="phone"
                className="input"
                placeholder="Phone"
                title="Error Message"
                pattern="[1-9]{1}[0-9]{9}"
                required
              />
            </div>

            <div className="input-container textarea">
              <textarea
                name="message"
                className="input"
                placeholder="Message"
                required
              ></textarea>
            </div>

            <input type="submit" value="Send" className="btn" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
