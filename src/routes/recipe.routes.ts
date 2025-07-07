import { Router } from 'express';
import * as recipeController from '../controllers/recipe.controller';

const router = Router();

// Changed from POST to GET since we're not receiving body anymore
router.get('/generate', recipeController.generateRecipe);
router.get('/', recipeController.getAllRecipes);
router.delete('/:id', recipeController.deleteRecipe);

export default router;