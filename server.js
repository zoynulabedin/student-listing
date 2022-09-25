const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const expressEjsLayouts = require('express-ejs-layouts');
const PageRoutes = require('./routes/studentsRoutes');

// environment
dotenv.config();
const PORT = process.env.PORT || 5454;

// app inlitiation
const app = express();

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended:false}));

// ejs

app.set('view engine', 'ejs');
app.use(expressEjsLayouts);
app.use("/", PageRoutes);



// server listening
app.listen(PORT, () => {
    console.log(`server listening on ${PORT}`);
});