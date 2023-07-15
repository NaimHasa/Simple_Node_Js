const express = require('express')
const app = express();
const port = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send('Node server is Running')
})

const users = [
    { id: 1, name: 'Naim Hasan', email: 'naim@gmail.com' },
    { id: 2, name: 'Tanvir', email: 'tanvir@gmail.com' },
    { id: 3, name: 'Mokter', email: 'mokter@gmail.com' },
    { id: 4, name: 'Ahamed', email: 'ahamed@gmail.com' },
];

app.get('/user', (req, res) => {
    res.send(users);
})

app.listen(port, () => {
    console.log(`Simple Node Server is Running ${port}`);
})