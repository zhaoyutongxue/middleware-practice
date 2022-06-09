const express = require('express');
const app = express();
const morgan = require('morgan');


app.use(morgan('common'));



app.listen(3000, () => {
    console.log('App is running on localhost:3000')
})