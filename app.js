import express from "express";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors"
import conversorController from "./controllers/conversorController.js";
import error404 from "./controllers/errorController.js";

const port = process.env.port || 5000;
const corsOption={
  origin:"*",
  credential:true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  
};
const app = express()
const storage=multer.memoryStorage()
const upload = multer({storage,limits:0});

app.use(helmet());
app.use(morgan("dev"));
app.use(cors(corsOption));
//app.use(express.json({ limit: "200mb" }));
app.use(express.urlencoded({ extended: true, limit: "200mb" }));
app.get('/',(req,res)=>{
  res.status(200).json({
    error: false,
    ok: true,
    statusText: "Ok",
    message: "access the path /getPicture using the post method to convert your images",
  })
})
app.post("/getPicture", upload.array("file"), conversorController);

app.use(error404);

app.listen(port);
