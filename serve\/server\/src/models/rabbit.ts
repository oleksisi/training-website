import { Schema, model } from 'mongoose';

// Інтерфейс для об'єкта "Ламантин"
interface IManatee {
    name: string; // Ім'я ламантина
    age: number; // Вік ламантина у роках
    height: number; // Висота ламантина в сантиметрах
    weight: number; // Вага ламантина в кілограмах
    gender: 'male' | 'female'; // Стать ламантина: 'male' - самець, 'female' - самка
    description?: string; // Опис ламантина (необов'язкове поле)
    dateAdded: Date; // Дата додавання запису до бази даних
}

// Схема MongoDB для моделі "Ламантин"
const manateeSchema = new Schema<IManatee>({
    name: {
        type: String,
        required: true, // Поле є обов'язковим
    },
    age: {
        type: Number,
        required: true, // Поле є обов'язковим
    },
    height: {
        type: Number,
        required: true, // Поле є обов'язковим
    },
    weight: {
        type: Number,
        required: true, // Поле є обов'язковим
    },
    gender: {
        type: String,
        required: true, // Поле є обов'язковим
        enum: ['male', 'female'], // Допустимі значення: 'male' або 'female'
    },
    description: String, // Необов'язкове текстове поле
    dateAdded: {
        type: Date,
        default: Date.now, // Значення за замовчуванням - поточна дата і час
    },
});

// Створення моделі Mongoose на основі схеми
export const Manatee = model<IManatee>('Manatee', manateeSchema);
export type { IManatee }; // Експортуємо інтерфейс для використання в інших файлах