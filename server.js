// requuire deps 

const express = require ('express');
const mongoose = require ('mongoose');
const Ticket = require ('./models/tickets');
const methodOverride = require ('method-override');

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
app.use(methodOverride('_method'));
app.use(express.static('public'))

// mount routes

// seed route 

// Index route 

app.get('/tickets' , (req,res) => {
    try {
        Ticket.find({}, (err,allTickets) => {
            res.render('index.ejs', {tickets: allTickets});   // {} pass datata into a  
        }); 
    } catch (error) {
        console.log (error);
    }
  
});

//New Route 

app.get('/tickets/new' , (req,res) => {
    res.render('new.ejs');
});


// Deleted Route 

app.delete('/tickets/:id' , (req,res) => {
    Ticket.findByIdAndDelete(req.params.id, (err,deletedticket) => {
        res.redirect('/tickets');
    });
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


// EDIT 

app.get ('/tickets/:id/edit', (req,res) => {
    Ticket.findById(req.params.id, (err, foundTicket) => {
        res.render('edit.ejs', { ticket: foundTicket })
    });
});
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


