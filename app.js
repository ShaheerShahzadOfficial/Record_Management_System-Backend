import express from "express";
import bodyParser from "body-parser";
import cors from "cors"
import UserRoute from "./Routes/userRoute.js";
// import fileUpload from "express-fileupload"
import cookieParser from "cookie-parser"
import ExpenseRoute from "./controller/ExpenseController.js";


const app = express()

app.use(
    cors({
        origin: true,
credentials: true
    })
    // cors()
)

app.use(express.json())
app.use(express.urlencoded({extended:true}))


app.use(bodyParser.json({ limit: '1000mb' }));
app.use(bodyParser.urlencoded({ limit: '1000mb', extended: true }));

// app.use(bodyParser.json())
app.use(cookieParser());
// app.use(fileUpload())
app.use("/user", UserRoute)
app.use("/upload", ExpenseRoute)

app.get('/', (req, res) => {
    res.send('Hello from Express!')
})

// Error  🤦‍♂️🤦‍♂️


app.use((req, res) => {
    res.status(404).json({
        Error: "URL Not Found"
    })
})





export default app