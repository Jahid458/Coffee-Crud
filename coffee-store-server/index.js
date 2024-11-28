const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000 ; 


//middleware
app.use(cors());
app.use(express.json());


// coffeemaster
// RPKMpfUVxIb2wHpy
console.log(process.env.DB_USER)
console.log(process.env.DB_PASS)

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster1.7i4ix.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1`;
console.log(uri)


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

    const coffeeCollections = client.db('coffeeDB').collection('coffee');


    //read
    app.get('/coffee',async(req,res)=>{
       const  cursor = coffeeCollections.find()
       const result = await cursor.toArray();
       res.send(result)
    })

    //update found single id

    app.get('/coffee/:id', async(req,res)=>{
      const id = req.params.id;
      const query = {_id: new ObjectId(id)};
      const result = await coffeeCollections.findOne(query);
      res.send(result);
    })

    //update id 
    app.put('/coffee/:id', async(req,res)=>{
      const id = req.params.id;
      const filter = {_id: new ObjectId(id)}
      const options = {upsert : true}
      const updatedCoffee = req.body;
      const coffee = {
        $set:{
          name:updatedCoffee.name,
          quantity:updatedCoffee.quantity, 
          Supplier:updatedCoffee.Supplier,
          taste: updatedCoffee.taste,
          category:updatedCoffee.category, 
          Photo:updatedCoffee.Photo
        }
      }

      const result = await coffeeCollections.updateOne(filter,coffee,options)
      res.send(result)
    })



    //create
    app.post('/coffee', async(req,res)=>{
      const newCoffee = req.body;
      console.log(newCoffee)

      const result = await coffeeCollections.insertOne(newCoffee);
      res.send(result);
    })

    //delete coffee
    app.delete('/coffee/:id', async(req,res)=>{
      const id = req.params.id;
      const query = {_id: new ObjectId(id)}

      const result = await coffeeCollections.deleteOne(query);
      res.send(result);

    })





    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);



app.get('/',(req,res)=>{
    res.send('Cofee Server is running!')
})

app.listen(port, ()=>{
  console.log(`Coffee Server is Running on port:${port}`)
})

