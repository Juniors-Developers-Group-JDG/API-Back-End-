import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import express from "express";

import usuariosRoutes from './routes/usuariosRoutes';

dotenv.config();
const app = express()

app.set('view engine', 'ejs');
app.use(cors());
app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/", usuariosRoutes);

app.listen("3000", () => {
  console.log("Server is running on port 3000")
})
