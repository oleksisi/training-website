import { Router, Request, Response } from 'express';
import { container } from '../config/container';
import { ManateeRepository } from '../repositories/ManateeRepository';

// Створюємо новий обробник HTTP-запитів Express
const router = Router();
// Отримуємо екземпляр репозиторію ламантинів з контейнера інверсії залежностей
const manateeRepository = container.get(ManateeRepository);

// Обробка HTTP-запиту GET / - отримання всіх записів ламантинів
router.get('/', (async (_req: Request, res: Response) => {
    try {
        // Отримуємо всі записи ламантинів з бази даних через репозиторій
        const manatees = await manateeRepository.findAll();
        res.json(manatees);
    } catch (error) {
        // Обробка помилки
        const errorMessage = error instanceof Error ? error.message : 'Виникла невідома помилка';
        res.status(500).json({ message: errorMessage });
    }
}) as unknown as (req: Request, res: Response) => void);

// Обробка HTTP-запиту GET /:id - отримання запису одного ламантина за ідентифікатором
router.get('/:id', (async (req: Request, res: Response) => {
    try {
        // Пошук ламантина за ідентифікатором
        const manatee = await manateeRepository.findById(req.params.id);
        if (manatee) {
            res.json(manatee);
        } else {
            // Якщо ламантина не знайдено, повертаємо 404 помилку
            res.status(404).json({ message: 'Запис ламантина не знайдено' });
        }
    } catch (error) {
        // Обробка помилки
        const errorMessage = error instanceof Error ? error.message : 'Виникла невідома помилка';
        res.status(500).json({ message: errorMessage });
    }
}) as unknown as (req: Request, res: Response) => void);

// Обробка HTTP-запиту POST / - створення нового запису ламантина
router.post('/', (async (req: Request, res: Response) => {
    try {
        // Створюємо новий запис ламантина з даних запиту
        const newManatee = await manateeRepository.create(req.body);
        // Повертаємо статус 201 (Created) і дані створеного ламантина
        res.status(201).json(newManatee);
    } catch (error) {
        // Обробка помилки
        const errorMessage = error instanceof Error ? error.message : 'Виникла невідома помилка';
        res.status(400).json({ message: errorMessage });
    }
}) as unknown as (req: Request, res: Response) => void);

// Обробка HTTP-запиту PUT /:id - повне оновлення запису ламантина
router.put('/:id', (async (req: Request, res: Response) => {
    try {
        // Перевірка наявності всіх обов'язкових полів для PUT запиту
        const requiredFields = ['name', 'age', 'height', 'weight', 'gender'];
        const missingFields = requiredFields.filter(field => !(field in req.body));

        // Якщо є відсутні поля, повертаємо помилку 400 Bad Request
        if (missingFields.length > 0) {
            return res.status(400).json({
                message: `Відсутні обов'язкові поля: ${missingFields.join(', ')}`,
            });
        }

        // Оновлюємо ламантина з вказаним ID
        const manatee = await manateeRepository.update(req.params.id, req.body);
        if (manatee) {
            return res.json(manatee);
        } else {
            // Якщо ламантина не знайдено, повертаємо 404 помилку
            return res.status(404).json({ message: 'Запис ламантина не знайдено' });
        }
    } catch (error) {
        // Обробка помилки
        const errorMessage = error instanceof Error ? error.message : 'Виникла невідома помилка';
        return res.status(400).json({ message: errorMessage });
    }
}) as unknown as (req: Request, res: Response) => void);

// Обробка HTTP-запиту PATCH /:id - часткове оновлення запису ламантина
router.patch('/:id', (async (req: Request, res: Response) => {
    try {
        // Часткове оновлення запису ламантина - передаються лише ті поля, які потрібно змінити
        const manatee = await manateeRepository.patch(req.params.id, req.body);
        if (manatee) {
            res.json(manatee);
        } else {
            // Якщо ламантина не знайдено, повертаємо 404 помилку
            res.status(404).json({ message: 'Запис ламантина не знайдено' });
        }
    } catch (error) {
        // Обробка помилки
        const errorMessage = error instanceof Error ? error.message : 'Виникла невідома помилка';
        res.status(400).json({ message: errorMessage });
    }
}) as unknown as (req: Request, res: Response) => void);

// Обробка HTTP-запиту DELETE /:id - видалення запису ламантина
router.delete('/:id', (async (req: Request, res: Response) => {
    try {
        // Видаляємо дані про ламантина за ID
        const manatee = await manateeRepository.delete(req.params.id);
        if (manatee) {
            // У разі успіху повертаємо повідомлення про видалення
            res.json({ message: 'Запис про ламантина видалено' });
        } else {
            // Якщо ламантина не знайдено, повертаємо 404 помилку
            res.status(404).json({ message: 'Запис про ламантина не знайдено' });
        }
    } catch (error) {
        // Обробка помилки
        const errorMessage = error instanceof Error ? error.message : 'Виникла невідома помилка';
        res.status(500).json({ message: errorMessage });
    }
}) as unknown as (req: Request, res: Response) => void);

export default router;
