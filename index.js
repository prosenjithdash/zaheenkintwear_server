require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');

const app = express();
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.kybpity.mongodb.net/?appName=Cluster0`;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

let productsCollection;
let cartCollection;

// Connect to MongoDB only once
async function initDB() {
  if (!productsCollection || !cartCollection) {
    await client.connect();
    const db = client.db('zaheenkintwear');
    productsCollection = db.collection('products');
    cartCollection = db.collection('cart');
    console.log("MongoDB connected ✅");
  }
}

// Routes
app.get('/products', async (req, res) => {
  try {
    await initDB();
    const products = await productsCollection.find().toArray();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/cart', async (req, res) => {
  try {
    await initDB();
    const product = req.body;

    const existing = await cartCollection.findOne({ productId: product.productId });
    if (existing) {
      const update = await cartCollection.updateOne(
        { productId: product.productId },
        { $inc: { quantity: 1 } }
      );
      return res.json(update);
    }

    const result = await cartCollection.insertOne({
      ...product,
      quantity: 1,
      addedAt: new Date(),
    });

    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/cart', async (req, res) => {
  try {
    await initDB();
    const cart = await cartCollection.find().toArray();
    res.json(cart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Root route
app.get('/', (req, res) => {
  res.send('ZaheenKnitwear Server is running 🚀');
});

// ✅ Local server (ignored by Vercel)
if (process.env.NODE_ENV !== 'production') {
  const port = process.env.PORT || 8000;
  app.listen(port, () => {
    console.log(`Local server running on port ${port}`);
  });
}

// ✅ Export for Vercel
module.exports = app;
