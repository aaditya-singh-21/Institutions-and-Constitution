import React, { useState } from 'react';
import './Feedback.css';

const Feedback = () => {
    const [feedback, setFeedback] = useState('');
    const [nickname, setNickname] = useState('');
    const [email, setEmail] = useState('');
    const [isPublic, setIsPublic] = useState(null);
    const [acceptTerms, setAcceptTerms] = useState(false);

    const handleSubmit = () => {
        if (acceptTerms) {
            console.log({
                feedback,
                nickname,
                email,
                isPublic,
                acceptTerms
            });
        } else {
            alert('Please accept the terms and conditions.');
        }
    };

    return (
        <div className="feedback-container">
            <h1>Give us your valuable feedback</h1>
            <p>Your feedback is very important to us</p>
            <div className="emoji-box">
                <button className="btn-normal">&#128578;</button>
                <button className="btn-normal">&#128515;</button>
                <button className="btn-normal">&#128519;</button>
                <button className="btn-normal">&#128531;</button>
                <button className="btn-normal">&#128532;</button>
                <button className="btn-normal">&#128545;</button>
            </div>
            <p className="question">What do you want to say?</p>
            <textarea
                id="textarea"
                cols="20"
                rows="5"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
            ></textarea>
            <p className="question">Do you want to share this publicly?</p>
            <div className="radio-btns">
                <div className="one-btn">
                    <input
                        type="radio"
                        name="public"
                        id="Yes"
                        value="Yes"
                        checked={isPublic === 'Yes'}
                        onChange={() => setIsPublic('Yes')}
                    />
                    <label htmlFor="Yes">Yes</label>
                </div>
                <div className="one-btn">
                    <input
                        type="radio"
                        name="public"
                        id="No"
                        value="No"
                        checked={isPublic === 'No'}
                        onChange={() => setIsPublic('No')}
                    />
                    <label htmlFor="No">No</label>
                </div>
            </div>
            <div className="info-field">
                <div className="name">
                    <label>
                        <input
                            type="text"
                            placeholder=" "
                            value={nickname}
                            onChange={(e) => setNickname(e.target.value)}
                        />
                        <span>Nickname</span>
                    </label>
                </div>
                <div className="email">
                    <label>
                        <input
                            type="email"
                            placeholder=" "
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <span>Email address (Will not be published)</span>
                    </label>
                </div>
            </div>
            <div className="accept">
                <input
                    type="checkbox"
                    id="accept"
                    checked={acceptTerms}
                    onChange={() => setAcceptTerms(!acceptTerms)}
                />
                <label>
                    I accept the <a href="#">terms and conditions</a>
                </label>
            </div>
            <div className="center">
                <button className="btn button" onClick={handleSubmit}>
                    Send
                </button>
            </div>
        </div>
    );
};

export default Feedback;
