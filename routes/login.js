var express = require("express");
var router = express.Router();
const { MongoClient } = require("mongodb");
async function check(username, password) {
  const uri =
    "mongodb+srv://namtran:namcoi123@cluster0.gej9x9n.mongodb.net/?retryWrites=true&w=majority";
  const client = new MongoClient(uri);
  let doc;
  try {
    const database = client.db("ytedoanhnghiep");
    const col = database.collection("taikhoan");
    const query = { taikhoan: `${username}` };
    doc = await col.findOne(query);
    if (doc.matkhau === password)
      return { ...doc, message: "Đăng nhập thành công" };
    else return { message: "Sai mật khẩu" };
  } catch (err) {
    console.log(err);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
  return { message: "Tài khoản không tồn tại" };
}
router.post("/", async function (req, res, next) {
  var username = req.body.username;
  var password = req.body.password;
  var dbRes = await check(username, password);
  res.send(dbRes);
});

module.exports = router;
