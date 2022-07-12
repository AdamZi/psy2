const express = require("express");
const router = express.Router();

const { getDogs, saveDog, deleteDog } = require("../db");

function mapDogs(dogs) {
  return dogs.map(dog => {
    const age = Math.floor((Date.now() - Date.parse(dog.birth)) / 31556952000);
    return {
      _id: dog._id,
      name: dog.name,
      birth: dog.birth,
      age: age,
    };
  });
}
router.get("/dogs", async (req, res) => {
  const dogs = (await getDogs()).reverse();
  res.send(mapDogs(dogs));
});

router.post("/dogs/add", async (req, res) => {
  console.log(req.body);
  const dogs = (await saveDog(req.body)).reverse();
  res.send(mapDogs(dogs));
});

router.post("/dogs/delete", async (req, res) => {
  console.log(req.body);
  const dogs = (await deleteDog(req.body)).reverse();
  res.send(mapDogs(dogs));
});
module.exports = router;
