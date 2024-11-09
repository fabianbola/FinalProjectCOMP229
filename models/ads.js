/* 
  File Name: ads.js
  Description: Defines the Mongoose schema and model for advertisement entries, specifying the structure, 
               validation, and data types for ads in the MongoDB database.   
  Team's name: BOFC 
  Group number: 04
  Date: November 9, 2024
*/

// Import Mongoose library for MongoDB interaction
const mongoose = require('mongoose');

// Alias for Mongoose schema creation
const Schema = mongoose.Schema;

// Define schema for ads entries, specifying each field, its data type and validations. 
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
  price: {
    type: Number,
    required: 'Price is required',
    min: [0, 'Price must be a positive number']
  },
  isActive: {
    type: Boolean,
    default: true
  },
  startDate: {
    type: Date,
    required: 'Start date is required',
    validate: {
      validator: function(value) {
        return value > Date.now();
      },
      message: 'Start date must be later than the current date.'
    }
  },
  endDate: {
    type: Date,
    required: 'End date is required',
    validate: {
      validator: function(value) {
        // End date must be later than start date
        return value > this.startDate;
      },
      message: 'End date must be later than start date.'
    }
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

// Export the Ads model based on the defined schema
module.exports = mongoose.model('Ad', AdSchema);