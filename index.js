import express from 'express';
import path from 'path';
import 'dotenv/config';
import mongoose from 'mongoose';
import cors from 'cors';
import userRoutes from './routes/users.js';

const app = express();
const PORT = process.env.PORT || 3600;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors());
app.use('/', express.static('public'));

app.use('/api/users', userRoutes);

app.get('*', (_, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'), function (err) {
    if (err) {
      res.status(500).send(err);
    }
  });
});

const connectDB = async () => {
  try {
    mongoose.connect(process.env.DB_CONNECTION);
    console.log('MongoDB connected');
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

app.listen(PORT, () => {
  connectDB();
  console.log(`App listening at ${PORT}`);
});
