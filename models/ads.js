const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AdSchema = new Schema({
  title: {
    type: String,
    required: 'Title is required',
    trim: true
  },
  description: {
    type: String,
    required: 'Description is required',
    trim: true
  },
  category: {
    type: String,
    required: 'Category is required',
    immutable: true  
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    immutable: true 
  },
  isActive: {
    type: Boolean,
    default: true
  },
  startDate: {
    type: Date,
    required: 'Start date is required'
  },
  endDate: {
    type: Date,
    required: 'End date is required'
  },
  created: {
    type: Date,
    default: Date.now,
    immutable: true
  },
  updated: {
    type: Date,
    default: Date.now
  }
}, {
  collection: "ads"
});


module.exports = mongoose.model('Ad', AdSchema);