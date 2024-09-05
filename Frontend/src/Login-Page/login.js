// Google login function
function googleLogin() {
    // Initialize Google API client
    gapi.load('auth2', function() {
      // Get the Google Auth instance
      var auth2 = gapi.auth2.getAuthInstance({
        client_id: 'YOUR_CLIENT_ID', // Replace with your client ID
        scope: 'profile email'
      });
  
      // Sign in with Google
      auth2.signIn().then(function() {
        // Get the user's profile information
        var profile = auth2.currentUser.get().getBasicProfile();
        console.log('Signed in as: ' + profile.getName());
  
        // You can also get the user's email address
        var email = profile.getEmail();
        console.log('Email: ' + email);
  
        // You can now use the user's profile information to authenticate with your server
        // or perform other actions
      });
    });
  }