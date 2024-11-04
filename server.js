const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const router = express.Router();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files
//add the router
app.use('/', router);

router.get('/error', (req, res) => {
    res.sendFile(path.join(__dirname,'public/error.html'));
});

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,'public/index.html'));
});

router.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname,'public/index.html'));
});

router.get('/logout', (req, res) => {
    res.sendFile(path.join(__dirname,'public/index.html'));
});

router.get('/stocks', (req, res) => {
    res.sendFile(path.join(__dirname,'public/stocks.html'));
});

router.get('/stockExchanges', (req, res) => {
    res.sendFile(path.join(__dirname,'public/stockExchanges.html'));
});

router.get('/stocksExchangeRelation', (req, res) => {
    res.sendFile(path.join(__dirname,'public/stockExchangeRel.html'));
});

router.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname,'public/dashboard.html'));
});


// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    
});
