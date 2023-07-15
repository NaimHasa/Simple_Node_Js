const express = require('express')
const app = express();
const cors = require('cors')

const port = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send('Node server is Running')
})

app.use(cors());
app.use(express.json())

const users = [
    { id: 1, name: 'Naim Hasan', email: 'naim@gmail.com' },
    { id: 2, name: 'Tanvir', email: 'tanvir@gmail.com' },
    { id: 3, name: 'Mokter', email: 'mokter@gmail.com' },
    { id: 4, name: 'Ahamed', email: 'ahamed@gmail.com' },
];

app.get('/user', (req, res) => {
    res.send(users);
})

app.post('/user', (req, res) => {
    console.log('Post API Called')
    const user = req.body;
    user.id = users.length + 1;
    users.push(user)
    console.log(user)
    res.send(user)
})

app.listen(port, () => {
    console.log(`Simple Node Server is Running ${port}`);
})