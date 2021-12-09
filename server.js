// requuire deps 

const express = require ('express');
const mongoose = require ('mongoose');
const Ticket = require ('./models/tickets');

//initialize app 
const app = express ();

//configure settigns 
require ('dotenv').config ();

//connect to an configure mongoDB with mongoose 

mongoose.connect(process.env.DATABASE_URL);

const db = mongoose.connection;

//set up mongoDB event listener 

db.on ('connected', () => console.log('Connected to MongoDB'));
db.on('error', (err) => console.log('mongoDB error: ' + err.message))

// mount middleware 

app.use(express.urlencoded({ extended: false })) // creates req.body 

// mount routes

// Index route 

app.get('/tickets' , (req,res) => {
    Ticket.find({}, (err,allTickets) => {
        res.render('index.ejs', {tickets: allTickets});   // {} pass datata into a  
    });
});

//New Route 

app.get('/tickets/new' , (req,res) => {
    res.render('new.ejs');
});

//Create Route 
app.post('/tickets', (req,res) => {
    if (req.body.completed === "on") {
        req.body.completed = true 
    } else {
        req.body.completed = false 
    }
    console.log(req.body);

    Ticket.create(req.body, (err, ticket) => {
        if (err ) {
            res.status(500).send(err.message)
        } else {
            res.redirect ('/tickets');
        }
    });
})


//Show route 

app.get('/tickets/:id' , (req,res) => { 
    Ticket.findById(req.params.id, (err,ticket) => {
        res.render('show.ejs', { ticket } );
    });
});

// tell the app to listen 

const PORT = process.env.PORT;

app.listen (PORT, () => {
    console.log ('Express is listening on port: ' + PORT)
})


