import { Schema, model } from 'mongoose';

// Інтерфейс для об'єкта "Ламантин"
interface IManatee {
    name: string;
    age: number;
    height: number;
    weight: number;
    gender: 'male' | 'female';
    description?: string;
    dateAdded: Date;
}

// Схема MongoDB для моделі "Ламантин"
const manateeSchema = new Schema<IManatee>({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    height: { type: Number, required: true },
    weight: { type: Number, required: true },
    gender: { type: String, required: true, enum: ['male', 'female'] },
    description: String,
    dateAdded: { type: Date, default: Date.now },
});

// Створення моделі Mongoose на основі схеми
export const Manatee = model<IManatee>('Manatee', manateeSchema);
export type { IManatee };
