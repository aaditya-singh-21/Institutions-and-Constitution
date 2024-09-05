const express = require('express');
const cors = require('cors');
const { google } = require('googleapis');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const oauth2Client = new google.auth.OAuth2(
  '61556619119-baf1s55lll986531f5moetv0fo9v7qts.apps.googleusercontent.com',
  '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',
  'http://localhost:3000/auth/google/callback'
);

const scopes = ['profile', 'email'];

app.get('/auth/google', (req, res) => {
  const url = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: scopes,
  });
  res.redirect(url);
});

app.get('/auth/google/callback', async (req, res) => {
  const code = req.query.code;
  try {
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);
    const oauth2 = google.oauth2('v2');
    const userinfo = await oauth2.userinfo.get({ auth: oauth2Client });
    const userData = userinfo.data;
    // Store the user data in your database or session
    res.redirect('/login-success');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error authenticating with Google');
  }
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
