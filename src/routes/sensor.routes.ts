import { Router } from 'express';
import * as sensorController from '../controllers/sensor.controller';

const router = Router();

router.post('/', sensorController.createSensorData);
router.get('/latest', sensorController.getLatestSensorData);

export default router;