if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express');
const app = express();

const bodyParser = require('body-parser');
// app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json({
    limit: "500mb"
}));

const authRoutes = require('./routes/auth-routes');

const PORT = 2020;

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Headers", "Orgin, X-Requested-With, Content-Type, Accept");
    // res.header('Content-Type', 'application/x-www-form-urlencoded');
    // res.header('Content-Type', 'applicaton-json')
    // res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    // res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});


app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
})

app.use('/', authRoutes);