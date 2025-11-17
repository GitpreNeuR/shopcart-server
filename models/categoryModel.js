const mongoose = require('mongoose');

const categorySchema=mongoose.Schema({

    name: {
        type: String,
        required: [true, 'Please enter category name'],
      },
      description: {
        type: String,
        required: [true, 'Please enter category description'],
      },

});

module.exports = mongoose.model('Category', categorySchema); 