const mongoose = require("mongoose");
const createApp = require("./createApp");

//connecting to mongo
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

const app = createApp();

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
