import { Schema, model, Document } from 'mongoose';

interface IFoodProduct extends Document {
    name: string,
    category: string,
    expirationDate: Date
}

const foodProductSchema = new Schema<IFoodProduct>({
    name: {
        type: String,
        required: true,
        trim: true
    },
    category: {
        type: String,
        required: true,
        trim: true
    },
    expirationDate: {
        type: Date,
        required: true
    }
}, {
    timestamps: true
});

export default model <IFoodProduct>('FoodProduct', foodProductSchema);