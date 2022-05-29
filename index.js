const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');


app.use(express.json());
app.use(cors());


const port = process.env.PORT || 8000;
const host = process.env.HOST || '0.0.0.0';

// connect db
mongoose.connect('mongodb+srv://mert:mert1234@cluster0.6v8r9ta.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true }
    , (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log('connected to db');
        }
    }
);


const server = app.listen(port, host, () => {
    console.log(`Server running at http://${host}:${port}/`);
    }
);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/reactapi.js');
})

// User
const UserRouter = require('./src/User/router');
app.use('/user', UserRouter);

// Company
const CompanyRouter = require('./src/Company/router');
app.use('/company', CompanyRouter);

// Product
const ProductRouter = require('./src/Product/router');
app.use('/product', ProductRouter);
