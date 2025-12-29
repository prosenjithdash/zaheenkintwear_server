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
    // await client.db("admin").command({ ping: 1 });
      console.log("ZaheenKintwear successfully connected to MongoDB!");
      
    // DB Collections 
      // create database for products collection  
      const productsCollection = client.db('zaheenkintwear').collection('products')

      const cartCollection = client.db('zaheenkintwear').collection('cart')



    // Get all products
    app.get('/products', async (req, res) => {
      const result = await productsCollection.find().toArray();
      res.send(result);
    });

      
    // Add to cart
    app.post('/cart', async (req, res) => {
      const product = req.body;

      const existing = await cartCollection.findOne({
        productId: product.productId,
      });

      if (existing) {
        const update = await cartCollection.updateOne(
          { productId: product.productId },
          { $inc: { quantity: 1 } }
        );
        return res.send(update);
      }

      const result = await cartCollection.insertOne({
        ...product,
        quantity: 1,
        addedAt: new Date(),
      });

      res.send(result);
    });

      
      // Get cart items
    app.get('/cart', async (req, res) => {
      const result = await cartCollection.find().toArray();
      res.send(result);
    });

  } finally {
  }
}
run().catch(console.dir);




app.get('/', (req, res) => {
  res.send('Hello Sir!')
})

app.listen(port, () => {
  console.log(`zaheenkintwear app listening on port ${port}`)
})
