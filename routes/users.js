var express = require("express");
const { MongoClient } = require("mongodb");
var router = express.Router();
async function run() {
  const uri =
    "mongodb+srv://namtran:namcoi123@cluster0.gej9x9n.mongodb.net/?retryWrites=true&w=majority";
  const client = new MongoClient(uri);
  let doc;
  try {
    const database = client.db("ytedoanhnghiep");
    const col = database.collection("taikhoan");
    // Query for a movie that has the title 'Back to the Future'
    const query = { taikhoan: "admin" };
    doc = await col.findOne(query);
  } catch (err) {
    console.log(err);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
  return doc;
}
/* GET users listing. */
router.get("/", async function (req, res, next) {
  const resData = await run();
  res.send(resData);
});

module.exports = router;
