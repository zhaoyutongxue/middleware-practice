const express = require('express');
const app = express();
const morgan = require('morgan');




app.use(morgan('tiny'));

// print out request time for every request 
// app.use((req, res, next) => {
//     req.requestTime = Date.now();
//     console.log(req.method, req.path);
//     next();
// })



app.get('/', (req, res) => {
    console.log(`REQUEST DATE: ${req.requestTime}`)
    res.send('HOME PAGE!')
})


app.use('/dogs', (req, res, next) => {
    console.log("I LOVE DOGS!!")
    next();
})


app.get('/dogs', (req, res) => {
    console.log(`REQUEST DATE: ${req.requestTime}`)
    res.send('WOOF WOOF!')
})

// http://localhost:3000/secret?password=lalala
// type in the URL above to reveal the secret
const verifyPassword = (req, res, next) => {
    const { password } = req.query;
    if (password === 'lalala') {
        next();
    }
    // res.send("PASSWORD Needed!")
    throw new Error('Password needed!')
}

app.get('/secret', verifyPassword, (req, res) => {
    res.send('MY SECRET IS: Sometimes I wear headphones in public so I dont have to talk to anyone')
})

app.get("/error", (req, res) => {
    chick();
})

// define custom error handler. This error handler will run for all errors. 
// Which means the previous "throw error" will not run. 
app.use((err, req, res, next) => {
    console.log("********************");
    // you can pass the err to the next error handler if you want. So that you can have several error handlers.
    // next(err);
})

app.use((req, res) => {
    res.status(404).send('NOT FOUND!')
})

app.listen(3000, () => {
    console.log('App is running on localhost:3000')
})