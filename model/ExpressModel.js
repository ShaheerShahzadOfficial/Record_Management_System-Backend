
import mongoose from "mongoose";

const ExpenseModel = new mongoose.Schema({
  ExpenseTotal: {
    type: String,
    required:true,
  },
  FileType: {
    type: String,
    required:true,
  },
  ExpenseFile: {
    type:String,
    required:true,
  },
  Month: {
    type:String,
    required:true,
  },
  User:{
    required:true,
    type: mongoose.Schema.ObjectId,
  }
});

const Expense = mongoose.model("Expenses",ExpenseModel)

export default Expense