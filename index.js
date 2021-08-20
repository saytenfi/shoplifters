const mongoose = require("mongoose");
const express = require("express");
bodyParser = require("body-parser");
const cors = require("cors");
// const dotenv = require("dotenv");
require("./models/users");
////////////////////////////////
const signup = require("./routes/signup");
const resetpass = require("./routes/resetPassword");
const app = express();
app.use(cors());
app.use(bodyParser.json());

mongoose
  .connect(
  "mongodb+srv://endb:endb@cluster0.hgprh.mongodb.net/myFirstDatabase?authSource=admin&replicaSet=atlas-nv1yux-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true"
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    }
  )
  .then(() => console.log("Connected to MongoDb ..."))
  .catch((error) => console.log("could not connect to database" + error));
app.use(express.json());
// console.log(process.env);
app.use("/", signup);
app.use("/reset", resetpass);

// mongoose
//   .connect(
//     "mongodb+srv://zeeshan:zeeshan@shoplifter.uiz47.mongodb.net/myFirstDatabase?authSource=admin&replicaSet=atlas-pizl99-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true",
//     {
//       useNewUrlParser: true,
//       useCreateIndex: true,
//       useUnifiedTopology: true,
//       useFindAndModify: true,
//     }
//   )
//   .then(() => {
//     server.listen(port, () => {
//       console.log(`Server is listening on http://localhost:${port}`);
//     });
//   });
const port = process.env.PORT || 9000;
app.listen(port, () => console.log(`listening to port ${port}`));
