import express from 'express';
import connectDB from './db';
import routes from './routes';
import cors from 'cors';
const app = express();
const PORT = 3000;
app.use(express.json());
app.use(cors());
routes(app);

const start = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

start();
