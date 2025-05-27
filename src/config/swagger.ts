// Експорт специфікації Swagger/OpenAPI для документації про API
export const swaggerSpec = {
    // Версія специфікації OpenAPI
    openapi: '3.0.0',
    // Загальна інформація про API
    info: {
        title: 'API Сайту про Ламантинів',
        version: '1.0.0',
        description: 'Документація API для Сайту про Ламантинів',
    },
    // Налаштування серверів для тестування API
    servers: [
        {
            url:
                process.env.CODESPACE_NAME !== undefined
                    ? `https://${process.env.CODESPACE_NAME}-5000.app.github.dev`
                    : 'http://localhost:5000',
            description: 'Development server',
        },
    ],
    // Визначення кінцевих точок (endpoints) REST API та операцій з ними
    paths: {
        '/api/rabbits': {
            // GET запит для отримання всіх ламантинів
            get: {
                summary: 'Отримати всіх ламантинів',
                responses: {
                    '200': {
                        description: 'Список всіх ламантинів',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'array',
                                    items: { $ref: '#/components/schemas/Manatee' },
                                },
                            },
                        },
                    },
                },
            },

            // POST запит для створення нового ламантина
            post: {
                summary: 'Створити нового ламантина',
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: { $ref: '#/components/schemas/Manatee' },
                        },
                    },
                },
                responses: {
                    '201': {
                        description: "Створений об'єкт ламантина",
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/Manatee' },
                            },
                        },
                    },
                },
            },
        },

        // Операції для конкретного ламантина за ID
        '/api/rabbits/{id}': {
            // GET запит для отримання ламантина за ID
            get: {
                summary: 'Отримати ламантина за ID',
                parameters: [
                    {
                        in: 'path',
                        name: 'id',
                        required: true,
                        schema: { type: 'string' },
                        description: 'ID ламантина',
                    },
                ],
                responses: {
                    '200': {
                        description: "Об'єкт ламантина",
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/Manatee' },
                            },
                        },
                    },
                    '404': { description: 'Ламантина не знайдено' },
                },
            },

            // PUT запит для повного оновлення ламантина за ID
            put: {
                summary: 'Повністю оновити ламантина',
                parameters: [
                    {
                        in: 'path',
                        name: 'id',
                        required: true,
                        schema: { type: 'string' },
                        description: 'ID ламантина',
                    },
                ],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: { $ref: '#/components/schemas/Manatee' },
                        },
                    },
                },
                responses: {
                    '200': {
                        description: "Оновлений об'єкт ламантина",
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/Manatee' },
                            },
                        },
                    },
                    '404': { description: 'Ламантина не знайдено' },
                },
            },
            // PATCH запит для часткового оновлення ламантина за ID
            patch: {
                summary: 'Частково оновити ламантина',
                parameters: [
                    {
                        in: 'path',
                        name: 'id',
                        required: true,
                        schema: { type: 'string' },
                        description: 'ID ламантина',
                    },
                ],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: { $ref: '#/components/schemas/Manatee' },
                        },
                    },
                },
                responses: {
                    '200': {
                        description: "Оновлений об'єкт ламантина",
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/Manatee' },
                            },
                        },
                    },
                    '404': { description: 'Ламантина не знайдено' },
                },
            },
            // DELETE запит для видалення даних про ламантина за ID
            delete: {
                summary: 'Видалити дані про ламантина',
                parameters: [
                    {
                        in: 'path',
                        name: 'id',
                        required: true,
                        schema: { type: 'string' },
                        description: 'ID ламантина',
                    },
                ],
                responses: {
                    '200': { description: 'Повідомлення про успішне видалення' },
                    '404': { description: 'Ламантина не знайдено' },
                },
            },
        },
    },

    // Визначення компонентів для повторного використання
    components: {
        // Схеми даних
        schemas: {
            // Схема об'єкта Ламантин
            Manatee: {
                type: 'object',
                required: ['name', 'age', 'height', 'weight', 'gender'],
                properties: {
                    name: {
                        type: 'string',
                        description: "Ім'я ламантина",
                    },
                    age: {
                        type: 'number',
                        description: 'Вік ламантина у роках',
                    },
                    height: {
                        type: 'number',
                        description: 'Висота ламантина в сантиметрах',
                    },
                    weight: {
                        type: 'number',
                        description: 'Вага ламантина в кілограмах',
                    },
                    gender: {
                        type: 'string',
                        enum: ['male', 'female'],
                        description: 'Стать ламантина',
                    },
                    description: {
                        type: 'string',
                        description: "Опис ламантина (необов'язкове поле)",
                    },
                },
            },
        },
    },
};
