// require dependencies 

const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

//define the schema 
const ticketSchema = new Schema({
    Event: {type: String, required: true },
    Section: { type: Number },
    Row: { type: Number },
    Price: { type: Number },
    compeleted: Boolean
}, {timestamps: true});


//export the model to be accessed in server.js
module.exports = mongoose.model('Ticket', ticketSchema);