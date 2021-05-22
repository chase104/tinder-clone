const mongoose = require('mongoose')
 

const chatSchema = mongoose.Schema({
    users: Object,
    messages: Array
})


module.exports = mongoose.model('chats', chatSchema)
