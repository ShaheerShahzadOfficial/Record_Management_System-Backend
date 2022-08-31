import mongoose from "mongoose";
import dotenv from "dotenv";
import Grid from "gridfs-stream"
dotenv.config();

const DBConnection = () => {


  const mongoURI ="mongodb+srv://ShaheerShahzad:ShaheerDev@ecommerce.w8dyp.mongodb.net/RecordManagementSystem?retryWrites=true&w=majority"
  // Create mongo connection
  mongoose.connect(process.env.URI || mongoURI , { useNewUrlParser: true }).then((result) => {
    console.log(`DATABASE CONNECTED WITH THE HOST ${result.connection.host}`)
})
};

export default DBConnection;
