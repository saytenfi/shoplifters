const server = require('./server');
const mongoose = require("mongoose");

// bodyParser = require("body-parser");
// const cors = require("cors");

// server.use(cors());
// server.use(bodyParser.json());

const port = process.env.PORT || 9000;

mongoose
  .connect(
  "mongodb+srv://endb:endb@cluster0.hgprh.mongodb.net/myFirstDatabase?authSource=admin&replicaSet=atlas-nv1yux-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
    useCreateIndex: true,
  }
  ).then(() => {
    server.listen(port, () => {
      console.log(`Listening on http://localhost:${port}`);
    })
  })
  .catch((error) => console.log("could not connect to database" + error));


// require("./models/users");
// ////////////////////////////////
// const signup = require("./routes/signup");
// const resetpass = require("./routes/resetPassword");




// // console.log(process.env);
// app.use("/", signup);
// app.use("/reset", resetpass);


