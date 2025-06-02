import { injectable } from 'inversify';
import { Manatee, IManatee } from '../models/manatee';

// Клас-репозиторій для роботи з ламантинами
// Анотація injectable дозволяє впровадити цей репозиторій через IoC контейнер
@injectable()
class ManateeRepository {
    // Метод для отримання всіх ламантинів з бази даних
    public async findAll(): Promise<IManatee[]> {
        return Manatee.find();
    }

    // Метод для пошуку ламантина за унікальним ідентифікатором
    public async findById(id: string): Promise<IManatee | null> {
        return Manatee.findById(id);
    }

    // Метод для створення нового ламантина в базі даних
    public async create(manateeData: IManatee): Promise<IManatee> {
        const manatee = new Manatee(manateeData);
        return manatee.save();
    }

    // Метод для видалення ламантина за ідентифікатором
    public async delete(id: string): Promise<boolean> {
        const result = await Manatee.findByIdAndDelete(id);
        return result !== null;
    }

    // Метод для повного оновлення даних про ламантина (заміна всіх полів)
    public async update(id: string, manateeData: IManatee): Promise<IManatee | null> {
        return Manatee.findByIdAndUpdate(id, manateeData, { new: true });
    }

    // Метод для часткового оновлення даних про ламантина (оновлення лише вказаних полів)
    public async patch(id: string, manateeData: Partial<IManatee>): Promise<IManatee | null> {
        return Manatee.findByIdAndUpdate(id, { $set: manateeData }, { new: true });
    }
}

export { ManateeRepository };
