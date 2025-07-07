import { Schema, model, Document } from 'mongoose';

export interface ISensorData extends Document {
    temperature: number;
    humidity: number;
    timestamp: Date;
}

const sensorDataSchema = new Schema<ISensorData>({
    temperature: { 
        type: Number,
        required: true,
        min: [-40, 'Temperatura nu poate fi mai mică de -40°C'],
        max: [100, 'Temperatura nu poate fi mai mare de 100°C']
    },
    humidity: {
        type: Number,
        required: true,
        min: [0, 'Umiditatea nu poate fi mai mică de 0%'],
        max: [100, 'Umiditatea nu poate depăși 100%']
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

export default model<ISensorData>('SensorData', sensorDataSchema);