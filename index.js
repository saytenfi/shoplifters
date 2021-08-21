const server = require('./server');
const mongoose = require('mongoose');

const port = process.env.PORT || 5000;

console.log('> Test')
mongoose.connect(
  'mongodb+srv://endb:endb@cluster0.hgprh.mongodb.net/myFirstDatabase?authSource=admin&replicaSet=atlas-nv1yux-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
    useCreateIndex: true,
  }).then(() => {
    server.listen(port, () => {
      console.log(`Listening on http://localhost:${port}`);
    });
  }).catch((error) => {
      console.log("could not connect to database" + error);
  });
