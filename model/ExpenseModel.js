import mongoose from "mongoose";

const ExpenseModel = new mongoose.Schema({
  ExpenseTotal: {
    type: String,
    required:true,
  },
  ExpenseName:{
    type:String,
    required:true
  },
  User:{
    required:true,
    type: mongoose.Schema.ObjectId,
  }
});

const ExpensewithOutFile = mongoose.model("ExpenseswithOutFile",ExpenseModel)

export default ExpensewithOutFile