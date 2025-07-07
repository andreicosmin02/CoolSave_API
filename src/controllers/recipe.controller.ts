import { Request, Response } from 'express';
import OpenAI from 'openai';
import Recipe from '../models/Recipe';
import FoodProduct from '../models/FoodProduct';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

// Helper pentru apeluri OpenAI
async function getOpenAIResponse(prompt: string): Promise<string> {
    const completion = await openai.chat.completions.create({
        messages: [{ role: "user", content: prompt }],
        model: "gpt-3.5-turbo",
    });

    return completion.choices[0].message.content?.trim() || '';
}

export const generateRecipe = async (req: Request, res: Response): Promise<any> => {
    try {
        const foodProducts = await FoodProduct.find()
            .sort({ expirationDate: 1 })
            .select('name -_id')
            .lean();

        if (foodProducts.length === 0) {
            return res.status(400).json({ message: 'Nu există ingrediente în baza de date.' });
        }

        const ingredients = foodProducts.map(fp => fp.name).join(', ');

        // === Pas 1: Titlul ===
        const titlePrompt = `Am următoarele ingrediente: ${ingredients}. Propune un titlu sugestiv pentru o rețetă românească care folosește aceste ingrediente. Scrie doar titlul.`;
        const title = await getOpenAIResponse(titlePrompt);

        if (!title) {
            return res.status(400).json({ message: 'Nu s-a putut genera titlul rețetei.' });
        }

        // === Pas 2: Ingrediente ===
        const ingredientsPrompt = `Pornind de la titlul rețetei: "${title}" și ingredientele: ${ingredients}, scrie o listă clară de ingrediente necesare pentru preparat. Fiecare ingredient pe linie separată.`;
        const ingredientsListRaw = await getOpenAIResponse(ingredientsPrompt);
        const ingredientsList = ingredientsListRaw.split('\n').map(i => i.trim()).filter(Boolean);

        if (ingredientsList.length === 0) {
            return res.status(400).json({ message: 'Nu s-a putut genera lista de ingrediente.' });
        }

        // === Pas 3: Instrucțiuni ===
        const instructionsPrompt = `Având titlul rețetei "${title}" și lista de ingrediente:\n${ingredientsList.join('\n')}\nScrie instrucțiuni pas cu pas pentru prepararea rețetei. Numerotează pașii.`;
        const instructions = await getOpenAIResponse(instructionsPrompt);

        if (!instructions || instructions.length < 20) {
            return res.status(400).json({ message: 'Nu s-au putut genera instrucțiuni valide.' });
        }

        const newRecipe = new Recipe({
            title,
            ingredients: ingredientsList,
            instructions
        });

        await newRecipe.save();
        res.status(201).json(newRecipe);

    } catch (error) {
        console.error('Eroare în generateRecipe:', error);
        res.status(500).json({
            message: 'Eroare la generarea rețetei.',
            error: error instanceof Error ? error.message : error,
        });
    }
};

export const getAllRecipes = async (req: Request, res: Response) => {
    try {
        const recipes = await Recipe.find().sort({ created_at: -1 });
        res.json(recipes);
    } catch (error) {
        res.status(500).json({ message: 'Eroare la preluarea rețetelor' });
    }
};

export const deleteRecipe = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await Recipe.findByIdAndDelete(id);
        res.json({ message: 'Rețeta ștearsă cu succes' });
    } catch (error) {
        res.status(500).json({ message: 'Eroare la ștergerea rețetei' });
    }
};