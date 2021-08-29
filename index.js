const server = require('./server');
const mongoose = require('mongoose');

const port = process.env.PORT || 5000;

mongoose.connect(
  'mongodb+srv://api_user2:EyQVsU5nLLjyDyP6@uwshoplifters.zmjrf.mongodb.net/UWShopLifters?retryWrites=true&w=majority',
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
