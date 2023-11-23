import bodyParser from 'body-parser';
import express from "express";

import usuariosRoutes from './routes/usuariosRoutes';

const app = express()

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api", usuariosRoutes);

app.listen("3000", () => {
  console.log("Server is running on port 3000")
})
