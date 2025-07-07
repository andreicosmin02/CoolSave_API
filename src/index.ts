import express from 'express';
import connectDB from './config/db';
import foodProductRoutes from './routes/foodProduct.routes';
import recipeRoutes from './routes/recipe.routes';
import sensorRoutes from './routes/sensor.routes';

const app = express();
const port = process.env.PORT || 3000;

// Connect to MongoDB and create first admin
connectDB()
    .catch(error => {
        console.error('Error connecting to database:', error);
        process.exit(1);
    });
  
app.use(express.json());

app.use('/api', foodProductRoutes);
app.use('/api/recipe', recipeRoutes);

app.use('/api/sensors', sensorRoutes);

app.get('/health', (_req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});