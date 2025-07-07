import { Request, Response } from 'express';
import SensorData from '../models/SensorData';

export const createSensorData = async (req: Request, res: Response): Promise<any>  => {
    try {
        const { temperature, humidity } = req.body;
        
        // Validare manuală suplimentară
        if (typeof temperature !== 'number' || typeof humidity !== 'number') {
            return res.status(400).json({ message: 'Date invalide: temperatura și umiditatea trebuie să fie numere' });
        }

        const newData = new SensorData({
            temperature: parseFloat(temperature.toFixed(1)),
            humidity: parseFloat(humidity.toFixed(1))
        });

        await newData.save();
        res.status(201).json({
            message: 'Date salvate cu succes',
            data: newData
        });
    } catch (error) {
        res.status(500).json({ 
            message: 'Eroare la salvarea datelor',
            error: error instanceof Error ? error.message : 'Eroare necunoscută'
        });
    }
};

export const getLatestSensorData = async (req: Request, res: Response): Promise<any>  => {
    try {
        const latestData = await SensorData.findOne()
            .sort({ timestamp: -1 })
            .select('temperature humidity timestamp')
            .lean();

        if (!latestData) {
            return res.status(404).json({ message: 'Nu există date înregistrate' });
        }

        // Formatează datele pentru răspuns
        const responseData = {
            ...latestData,
            timestamp: latestData.timestamp.toISOString(),
            temperature: `${latestData.temperature}°C`,
            humidity: `${latestData.humidity}%`
        };

        res.json(responseData);
    } catch (error) {
        res.status(500).json({ 
            message: 'Eroare la preluarea datelor',
            error: error instanceof Error ? error.message : 'Eroare necunoscută'
        });
    }
};