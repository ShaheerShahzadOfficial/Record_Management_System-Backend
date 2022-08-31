import app from "./app.js";
import http from "http";
import DBConnection from "./DatabaseConnection/database.js";
import{Storage} from '@google-cloud/storage';
import path from "path";
import {fileURLToPath} from 'url';

// const keyFilename = await import("./docai-poc-b40620c41d16.json", {
//   assert: { type: "json" },
// });

// console.log({ "keyFilename.default":keyFilename });

const Server = http.createServer(app);
DBConnection();


// resolving __dirname in Es Modules
const __filename = fileURLToPath(import.meta.url);

// 👇️ "/home/john/Desktop/javascript"
const __dirname = path.dirname(__filename);

const gc = new Storage({
keyFilename:path.join(__dirname,"./docai-poc-b40620c41d16.json"),
projectId:"docai-poc"

});

export const internWork = gc.bucket("interns-work")


// console.log()

// gc.getBuckets().then((result) => {
//     console.log(result)
//   })



  // console.log(`Bucket ${bucketName.name} Connected.`);

// ConnectStorage().catch(console.error);


Server.listen(10000, () => {
  console.log("App is Working on port 10000");
});
