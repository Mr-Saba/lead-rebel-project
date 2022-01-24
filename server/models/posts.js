const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema({
  date: {
    type: String
  },
  tasks: [{
    name: String,
    fixed: String
  }]
})

module.exports = mongoose.model('Post', PostSchema)
