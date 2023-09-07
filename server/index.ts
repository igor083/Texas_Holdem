import express from "express";
const app = express();


app.get("/", (req, res) => {
  res.send("Hello Worldssss!");
});


app.listen(8080, () => console.log("Server running on port 8080"));