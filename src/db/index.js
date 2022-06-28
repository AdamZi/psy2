//const dotenv = require("dotenv").config();
const { MongoClient, ServerApiVersion } = require("mongodb");

const client = new MongoClient(process.env.CONNECTIONSTRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

client
  .connect()
  .then(() => console.log("connected to mongodb.."))
  .catch(err => console.error("could not connect to mongodb", err));

const getDogs = async () => {
  return client.db("animals").collection("dogs").find({}).toArray();
};

const saveDog = async dog => {
  return client.db("animals").collection("dogs").insertOne(dog);
  //return client.db("animals").collection("dogs").find({}).toArray();
};

module.exports = { getDogs, saveDog };
