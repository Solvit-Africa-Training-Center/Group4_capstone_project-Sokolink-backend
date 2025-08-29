import express from "express";
import { config } from "dotenv";
import { Database } from "./database";
import redis from "./utils/redis";

config();

Database
const app = express();

app.use(express.json());

const port = parseInt(process.env.PORT as string) || 5000;
redis.connect().catch(console.error);

app.get('/',(req, res) => {
  res.send('Hello world')
  });

  app.listen(port,()=>{
    console.log("server started seccessfully")

  })




