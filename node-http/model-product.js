const MongoClient = require("mongodb");
const client = new MongoClient("mongodb://0.0.0.0:27017/nodemongo");

client.connect(),
  then(() => {
    const dbo = client.db("blog");
    const custData = [{}];
    dbo
      .collection("catalog")
      .insertMany(custData)
      .then(function (res) {
        console.log("Numbers of document inserted");
        client.close();
      });
  }).catch((err) => console.log("MongoDB connection error: ", err));
