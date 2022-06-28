const express = require("express");
const router = express.Router();
const { getDogs, saveDog } = require("../db");

router.get("/dogs", async (req, res) => {
  dogs = (await getDogs()).reverse();
  res.send(
    dogs.map(dog => {
      const age = Math.floor(
        (Date.now() - Date.parse(dog.birth)) / 31556952000
      );
      return {
        name: dog.name,
        age: age,
      };
    })
  );
});

router.post("/dogs/add", async (req, res) => {
  console.log(req.body);
  const mongoRes = await saveDog(req.body);
  res.send(mongoRes);
});

module.exports = router;
