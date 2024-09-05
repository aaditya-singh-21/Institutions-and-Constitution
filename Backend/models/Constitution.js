// backend/models/Constitution.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ConstitutionSchema = new Schema({
  part: { type: String, required: true },  // 'Part 5' or 'Part 6'
  section: { type: String, required: true },  // Section in Part 5 or 6
  description: { type: String, required: true },  // Law description
  state_variations: [
    {
      state_name: { type: String, required: true },  // State
      law_variation: { type: String, required: true }  // State-specific law
    }
  ],
  role_variations: [
    {
      role: { type: String, required: true },  // Role (e.g., 'Governor')
      law_variation: { type: String, required: true }  // Role-specific law
    }
  ]
});

module.exports = mongoose.model('Constitution', ConstitutionSchema);
