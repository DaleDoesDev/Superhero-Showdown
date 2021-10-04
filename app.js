let express = require("express");
app = express();
app.use(express.static(__dirname + "/public"));

app.use("*", (req, res) => {
  res.sendFile("index.html", {
    root: "public/app/views/",
  });
});

let PORT = process.env.PORT || 3000;
app.listen(PORT);
console.log(`App running on port: ${PORT}.`);
