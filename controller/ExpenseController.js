import processFileMiddleware from "./initializingGoogleCloud.js";

import { format } from "util";

import express from "express"

import { internWork } from "../server.js";

import Expense from "../model/ExpressModel.js"
import checkToken from "../middleware/Auth.js";
import ExpensewithOutFile from "../model/ExpenseModel.js";


const ExpenseRoute = express.Router()

const upload = async (req, res) => {
  try {
    await processFileMiddleware(req, res);
    console.log(req.file, 'file')

    if (!req.file) {
      return res.status(400).send({ message: "Please upload a file!" });
    }
    // Create a new blob in the bucket and upload the file data.
    const blob = internWork.file(req.file.originalname);
    const blobStream = blob.createWriteStream({
      resumable: false,
    });
    blobStream.on("error", (err) => {
      res.status(500).send({ message: err.message });
    });
    blobStream.on("finish", async (data) => {
      // Create URL for directly file access via HTTP.

      const publicUrl = format(
        `https://storage.googleapis.com/${internWork.name}/${blob.name}`
      );
      const { ExpenseTotal, FileType, Month } = req.body

      await Expense.create({
        ExpenseTotal, FileType, ExpenseFile: publicUrl, Month, User: req.user.id
      }).then((result) => {
        res.status(201).send({
          result
        });
      }).catch((err) => {
        console.log(err)
      }); try {
        // Make the file public
        await internWork.file(req.file.originalname).makePublic();



      }
      catch {
        return res.status(500).send({
          message:
            `Uploaded the file successfully: ${req.file.originalname}, but public access is denied!`,
          url: publicUrl,
        });
      }


    });
    blobStream.end(req.file.buffer);
  } catch (err) {
    res.status(500).send({
      message: `Could not upload the file: ${req.file}. ${err}`,
    });
  }





};


const getAllExpense = async (req, res) => {

  const expenses = await Expense.find({ User: req.user.id })

  res.status(200).json({
    success: true,
    expenses,
  })
}




const expenseWithOutFile = async (req, res) => {
  const { ExpenseTotal, ExpenseName } = req.body
  await ExpensewithOutFile.create({ ExpenseTotal, ExpenseName, User: req.user.id }).then((result) => {
    res.status(201).json({
      expense: result
    })
  }).catch((err) => {
    res.status(500).json({
      err
    })
  });
}



const getExpenseWithOutFile = async (req, res) => {
  const expense = await ExpensewithOutFile.find({ User: req.user.id })

  res.status(200).json({
    success: true,
    expense
  })

}

const deleteExpenseById = async (req, res) => {

  const expense = await ExpensewithOutFile.findById(req.params.id);

  if (!expense) {
    return res.status(404).json({
      msg: "Data not found"
    })

  }

  await expense.remove()

  res.status(200).json({
    success: true,
    expense
  })

}



const UpdateExpenseById = async (req, res) => {
  const { ExpenseTotal, ExpenseName } = req.body

  const expense = await ExpensewithOutFile.findByIdAndUpdate(req.params.id, { ExpenseTotal, ExpenseName });

  if (!expense) {
    return res.status(404).json({
      msg: "Data not found"
    })

  }

  // await expense.save({ExpenseTotal,ExpenseName})

  res.status(200).json({
    success: true,
    expense
  })

}



ExpenseRoute.route("/AddExpenses").post(checkToken, upload)
ExpenseRoute.route("/AllExpense").get(checkToken, getAllExpense)
ExpenseRoute.route("/AddExpenseWithOutFile").post(checkToken, expenseWithOutFile)
ExpenseRoute.route("/GetExpenses").get(checkToken, getExpenseWithOutFile)
ExpenseRoute.route("/delete/:id").delete(checkToken, deleteExpenseById)
ExpenseRoute.route("/update/:id").put(checkToken, UpdateExpenseById)


export default ExpenseRoute


