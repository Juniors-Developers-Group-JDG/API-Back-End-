import bodyParser from 'body-parser';
import express from 'express';
import routes from './routes/Routes';
import projectsRoutes from './routes/projectsRoutes';

const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());

app.use('/api', routes);
app.use('/api/projetos', projectsRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}/api`);
});
