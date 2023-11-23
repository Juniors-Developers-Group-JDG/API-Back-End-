import bodyParser from 'body-parser';
import express from 'express';
import usuariosRoutes from './routes/usuariosRoutes';
import routes from './routes/Routes';

const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());

app.use("/api", usuariosRoutes);
app.use('/api', routes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}/api`);
});