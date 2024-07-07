import bodyParser from "body-parser";
import express, { Express } from "express";
import http from "http";
import cors from "cors";
import dotenv from "dotenv";
import router from "./routes/routes";
import mongoose from "mongoose";
import { error } from "console";

const app:Express=express();
const server=http.createServer(app)

//express configuration

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.set("PORT",3000);
app.set("BASE_URL","local host");

dotenv.config();

//define the routes

app.use("/api/v1",router)

//mongo connection
const mongoURI=process.env.MONGO_DB_URI

if(!mongoURI){
    console.error("Mongo DB URL is not defined")
    process.exit(1);
}
mongoose.connect(mongoURI,{}).then(()=>{
    console.log("Mongo DB is connected");
})
.catch((error)=>{
    console.log(error)
});



//start the server

try {
    const port: Number=app.get("PORT")
    const baseUrl:String=app.get("BASE_URL")
    server.listen(port,():void =>{
        console.log("Server is Listening")
    })
    
} catch (error) {
    console.log(error)
}

export default server;