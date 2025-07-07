# CoolSave API

This is the **backend API for CoolSave**, a smart food expiration and recipe generation system.

> **🏆 First Place Winner at Tech Venture Hackathon 2025**

## Features

- REST API for managing **food products** with expiration tracking
- **Sensor data ingestion** (temperature, humidity) and latest retrieval
- **Automated recipe generation** using OpenAI based on available ingredients
- Uses **MongoDB for persistence**
- Clean, organized TypeScript Express architecture

## Endpoints

### Health Check

- `GET /health`

### Food Products

- `POST /api/food-products` - Create food product
- `GET /api/food-products` - List all food products
- `GET /api/food-products/:id` - Get food product by ID
- `PUT /api/food-products/:id` - Update food product
- `DELETE /api/food-products/:id` - Delete food product

### Recipes

- `GET /api/recipe/generate` - Generate a recipe using current fridge contents
- `GET /api/recipe` - List all recipes
- `DELETE /api/recipe/:id` - Delete recipe

### Sensors

- `POST /api/sensors` - Add temperature and humidity data
- `GET /api/sensors/latest` - Get the latest sensor reading

## Getting Started

1. **Clone the repository:**

    ```
    git clone https://github.com/andreicosmin02/CoolSave_API.git
    cd CoolSave_API
    ```

2. **Install dependencies:**

    ```
    npm install
    ```

3. **Configure environment variables:**

    Create a `.env` file:

    ```
    MONGODB_URI=mongodb://localhost:27017/coolsave
    PORT=3000
    OPENAI_API_KEY=your_openai_key_here
    ```

4. **Run the server:**

    ```
    npm run dev
    ```

    The API will be available at `http://localhost:3000`.

## Project Structure

- `src/index.ts` - Entry point and server configuration
- `src/config/db.ts` - MongoDB connection setup
- `src/controllers/` - Controllers for food products, recipes, sensors
- `src/models/` - Mongoose models
- `src/routes/` - Express routers for each resource

## Tech Stack

- **Node.js / Express**
- **TypeScript**
- **MongoDB (Mongoose)**
- **OpenAI API** for recipe generation

## Notes

- Ensure MongoDB is running locally or use a cloud MongoDB URI in your `.env`.
- The OpenAI API is used for generating recipe titles, ingredients, and instructions automatically.
- This backend is designed to work seamlessly with [CoolSave Frontend](https://github.com/andreicosmin02/CoolSave).

## Contributing

Contributions are welcome for improvements, new features, or refactoring to keep the code clean and scalable.
