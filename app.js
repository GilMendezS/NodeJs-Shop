const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const ErrorController = require('./controllers/error');
const MongoConnect = require('./util/database').MongoConnect;
const app = express();
app.set('view engine', 'ejs');
app.set('views', 'views');

const User = require('./models/user')

const adminData = require('./routes/admin')
const shopRoutes = require('./routes/shop.js')
const port = process.env.PORT || 3000;
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname,'public')));

app.use((req, res, next) => {
    User.findById("5bfa31ec93639f4d1467cc14")
    .then(user => {
        req.user = user;
        console.log(req.user)
        next();
    })
    .catch(err => {
        console.log(err);
    })
})

app.use('/admin', adminData.router)
app.use(shopRoutes)
app.use(ErrorController.get404);

MongoConnect(() => {
    app.listen(port, () => {
        console.log(`Server listening at port: ${port}`);
    })
})

