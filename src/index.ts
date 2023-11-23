import express from 'express';
import routes from './routes/Routes';

const app = express();

app.use(express.json());
app.use('/api', routes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}/api`);
});