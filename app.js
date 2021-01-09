const express = require("express");
const app = express();
const path = require("path");
const port = process.env.port || 3000;

require("./db/connect")
const Register = require("./models/db")

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/static', express.static('static'));

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
    const params = {};
    res.status(200).render('index.pug', params);
});

app.post('/register', async (req, res) => {
    try {
        const subscriber = new Register({
            name: req.body.name,
            email: req.body.email,
            subject: req.body.subject,
            message: req.body.message
        })
        const registered = await subscriber.save();
        res.status(201).render('index');
    }
    catch (error) {
        res.status(400).send(error);
    }
})
app.listen(port, () => {
    console.log(`Server started successfully at port ${port}`);
});