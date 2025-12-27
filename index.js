require('dotenv').config();
const express = require('express')
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express()
const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.kybpity.mongodb.net/?appName=Cluster0`;

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
    // Connect the client to the server	(optional starting in v4.7)
      await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
      console.log("ZaheenKintwear successfully connected to MongoDB!");
      
    // DB Collections
      // create database for products collection  
      const productsCollection = client.db('zaheenkintwear').collection('products')


    // Get all products
    app.get('/products', async (req, res) => {
      const result = await productsCollection.find().toArray();
      res.send(result);
    });


      
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);




app.get('/', (req, res) => {
  res.send('Hello Sir!')
})

app.listen(port, () => {
  console.log(`zaheenkintwear app listening on port ${port}`)
})
