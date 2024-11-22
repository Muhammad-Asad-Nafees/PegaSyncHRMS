import express from 'express';
import userRoutes from './routes/v1';

const app = express();

// Middleware to parse JSON
app.use(express.json());

// Public Routes
app.use('/api/public', (req, res) => {
    res.json({ message: 'This is a public route' });
});


// Protected Routes
app.use('/api', userRoutes);

// Start the server
const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
