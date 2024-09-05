// backend/models/Session.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SessionSchema = new Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  login_time: { type: Date, default: Date.now },
  logout_time: { type: Date },
  status: { type: String, default: 'active' }
});

module.exports = mongoose.model('Session', SessionSchema);
