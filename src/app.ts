import express from 'express';
import userRoutes from './routes/v1';

const app = express();

app.use(express.json());
app.use('/api', userRoutes);

const PORT = process.env.PORT || 3002;

app.listen(PORT, async () => {
    console.log(`Server is running on port ${PORT}`);
});
