const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser')
const authRoutes = require('./routes/authRoutes');


const app = express();
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static('public'));
app.set('view engine', 'ejs');

app.use(session({
    secret: 'secret-key',
    resave: false,
    saveUninitialized:false
}))

app.use('/', authRoutes);
app.listen(3000,() => {
    console.log('Server đang chạy ở http://localhost:3000');
})