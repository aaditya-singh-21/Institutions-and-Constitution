import React from 'react';
import './login.css';  // Import the CSS file

const Login = () => {
  React.useEffect(() => {
    // Load the Google API script dynamically
    const script = document.createElement('script');
    script.src = "https://apis.google.com/js/api.js";
    script.onload = () => {
      // Initialize Google API client
      window.gapi.load('auth2', function() {
        window.gapi.auth2.init({
          client_id: '61556619119-2nf5h3jprq2kq2i5in3pesoogur4cb29.apps.googleusercontent.com', 
          scope: 'profile email'
        });
      });
    };
    document.body.appendChild(script);

    return () => {
      // Clean up the script when the component is unmounted
      document.body.removeChild(script);
    };
  }, []);

  const googleLogin = () => {
    const auth2 = window.gapi.auth2.getAuthInstance();
    auth2.signIn().then(function() {
      const profile = auth2.currentUser.get().getBasicProfile();
      console.log('Signed in as: ' + profile.getName());
      console.log('Email: ' + profile.getEmail());
    });
  };

  return (
    <section className="container forms">
      <div className="form login">
        <div className="form-content">
          <header>Login</header>
          <form>
            <div className="field input-field">
              <input type="email" placeholder="Email" className="input" />
            </div>

            <div className="field input-field">
              <input type="password" placeholder="Password" className="input" />
              <i className='bx bx-hide eye-icon'></i>
            </div>

            <div className="form-link">
              <a href="" className="forget-pass">Forgot password?</a>       
            </div>

            <div className="field button-field">
              <button type="button" onClick={googleLogin}>Login</button>
            </div>
          </form>
          <div className="form-link">
            <span>Already have an account? <a href="" className="link signup-link">Signup</a></span>  
          </div>
        </div>

        <div className="line"></div>

        <div className="media-options">
          <a href="" className="field google" onClick={googleLogin}>
            <img src="/google.jpg" alt="google-icon" className="google-img" />
            <span>Login with Google</span>
          </a>
        </div>  
      </div>

      {/* Signup form */}
      <div className="form signup">
        <div className="form-content">
          <header>Signup</header>
          <form>
            <div className="field input-field">
              <input type="email" placeholder="Email" className="input" />
            </div>

            <div className="field input-field">
              <input type="password" placeholder="Create Password" className="input" />
            </div>

            <div className="field input-field">
              <input type="password" placeholder="Confirm Password" className="input" />
              <i className='bx bx-hide eye-icon'></i>
            </div>

            <div className="field button-field">
              <button type="button">Signup</button>
            </div>
          </form>

          <div className="form-link">
            <span>Already have an account? <a href="" className="login-link">Login</a></span>  
          </div>
        </div>

        <div className="line"></div>

        <div className="media-options">
          <a href="" className="field google" onClick={googleLogin}>
            <img src="/google.jpg" alt="google-icon" className="google-img" />
            <span>Continue with Google</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Login;