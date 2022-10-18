import express from "express";
import dotenv from "dotenv";
dotenv.config();

import {
  createWorkersTable,
  createCommandsTable,
  createCommandTypesTable,
  createCommandTypeFields
} from "./models/workersTable";

createWorkersTable();
createCommandsTable();
createCommandTypesTable();
createCommandTypeFields()

//knx.from('pizzas').select("*").orderBy("price","desc").then((data)=> console.log(data))
//knx.from('pizzas').select("*").where("price", "<", "800").then((data) => console.log(data))
//knx.from('pizzas').select('*').whereLike('title', '%Пеп%').then((data) => console.log(data))

const app = express();
const port = process.env.PORT || 4000;

app.listen(port, () => console.log(`Listening at http://localhost:${port}`));
