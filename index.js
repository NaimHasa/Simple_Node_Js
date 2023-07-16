const express = require('express')
const app = express();
const cors = require('cors')
const { MongoClient, ServerApiVersion } = require('mongodb');

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


//MongoDB DATABASE

const uri = "mongodb+srv://naimarafat7:kHiOjhk1Jad5RkTb@cluster0.bmfhuqu.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        const userCollection = client.db('simpleNode').collection('user');
        const user = { name: 'Naim Hasan', email: 'naimhasan@gmail.com' }


        app.post('/user', async (req, res) => {
            // console.log('Post API Called')
            const user = req.body;
            const result = await userCollection.insertOne(user)
            console.log(result);

            user.id = result.insertedId;
            res.send(user)
        })

        // console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);


//Database User Or Pass 
// userName: naimarafat7
//PassWord: kHiOjhk1Jad5RkTb



app.get('/user', (req, res) => {
    if (req.query.name) {
        const search = req.query.name;
        const filtered = users.filter(usr => usr.name.toLowerCase().indexOf(search) >= 0)
        res.send(filtered);

    }
    else {
        res.send(users);
    }

})

// app.post('/user', (req, res) => {
//     console.log('Post API Called')
//     const user = req.body;
//     user.id = users.length + 1;
//     users.push(user)
//     console.log(user)
//     res.send(user)
// })

app.listen(port, () => {
    console.log(`Simple Node Server is Running ${port}`);
})