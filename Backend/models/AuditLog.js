// backend/models/AuditLog.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AuditLogSchema = new Schema({
  action: { type: String, required: true },  // 'create', 'update', 'delete'
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  affected_document: { type: mongoose.Schema.Types.ObjectId, ref: 'Constitution', required: true },
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('AuditLog', AuditLogSchema);
