const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const config = require('./config/config').get(process.env.NODE_ENV);
const app = express();

mongoose.Promise = global.Promise;
mongoose.connect(config.DATABASE);

app.use(bodyParser.json());
app.use(cookieParser());

app.use(express.static('client/build'))

const bookRouter = require('./routes/books');
const userRouter = require('./routes/users');
  
app.use('/api/book', bookRouter);
app.use('/api/user', userRouter); 

if(process.env.NODE_ENV === 'production'){
    const path = require('path');
    app.get('/*', (req, res) => {
        res.sendfile(path.resolve(__dirname, '../client', 'build', 'index.html'))
    })
}

const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log('SERVER RUNNING')
})