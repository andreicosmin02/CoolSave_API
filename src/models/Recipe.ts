import { Schema, model, Document } from 'mongoose';

export interface IRecipe extends Document {
    title: string;
    ingredients: string[];
    instructions: string;
    created_at: Date;
}

const recipeSchema = new Schema<IRecipe>({
    title: { type: String, required: true },
    ingredients: { type: [String], required: true },
    instructions: { type: String, required: true },
    created_at: { type: Date, default: Date.now }
});

export default model<IRecipe>('Recipe', recipeSchema);