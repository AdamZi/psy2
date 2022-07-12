//const dotenv = require("dotenv").config();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

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
  const response = await client.db("animals").collection("dogs").insertOne(dog);
  if (!response.acknowledged) throw Error("error writing to database");
  return client.db("animals").collection("dogs").find({}).toArray();
};

const deleteDog = async id => {
  console.log(id);
  const response = await client
    .db("animals")
    .collection("dogs")
    .deleteOne({ _id: ObjectId(id._id) });
  console.log(response);
  if (!response.acknowledged) throw Error("error writing to database");
  return client.db("animals").collection("dogs").find({}).toArray();
};

module.exports = { getDogs, saveDog, deleteDog };
