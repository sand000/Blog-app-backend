const mongoose = require("mongoose");

const dbConnect = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
    });
    console.log(`MongoDb connected ${connect.connection.host}`);
  } catch (error) {
    console.log(`MongoDb connection error : ${error}`);
    process.exit(1);
  }
};
module.exports = dbConnect;
