# Fixly CRM — Database

## Загальна схема зв'язків

```
Business
   │
   ├── Users (admin / employee)
   ├── Customers
   ├── Services
   └── Appointments
          │
          ├── Customer   (belongs to)
          ├── Service    (belongs to)
          └── Employee   (User, belongs to)
```

Усі сутності, крім самого `Business`, мають поле `businessId` і належать
рівно одному бізнесу. Жоден запит не повинен повертати дані без фільтра по
`businessId` користувача, який робить запит.

## Моделі

### Business

| Поле | Тип       | Опис                    |
|------|-----------|-------------------------|
| id   | UUID/Int  | Первинний ключ          |
| name | String    | Назва бізнесу           |
| createdAt | DateTime | Дата створення     |

На пізнішому етапі сюди додаються робочі години, часова зона, план підписки.

### User

| Поле       | Тип      | Опис                              |
|------------|----------|------------------------------------|
| id         | UUID/Int | Первинний ключ                    |
| name       | String   | Ім'я користувача                  |
| email      | String   | Унікальний, використовується для логіну |
| password   | String   | Хеш пароля (bcrypt)                |
| role       | Enum     | `admin` \| `employee`              |
| businessId | FK       | Посилання на Business              |

Перший користувач, який реєструє бізнес, автоматично отримує роль `admin`.

### Customer

| Поле       | Тип      | Опис                     |
|------------|----------|--------------------------|
| id         | UUID/Int | Первинний ключ           |
| name       | String   | Ім'я клієнта             |
| email      | String?  | Необов'язково            |
| phone      | String?  | Необов'язково            |
| businessId | FK       | Посилання на Business    |

### Service

| Поле        | Тип      | Опис                        |
|-------------|----------|------------------------------|
| id          | UUID/Int | Первинний ключ               |
| name        | String   | Напр. "Haircut"               |
| description | String?  | Опис послуги                  |
| price       | Decimal  | Напр. 80.00                   |
| duration    | Int      | У хвилинах, напр. 45           |
| businessId  | FK       | Посилання на Business          |

### Appointment

| Поле       | Тип      | Опис                                        |
|------------|----------|----------------------------------------------|
| id         | UUID/Int | Первинний ключ                                |
| customerId | FK       | Посилання на Customer                          |
| serviceId  | FK       | Посилання на Service                           |
| employeeId | FK       | Посилання на User (роль employee)              |
| businessId | FK       | Посилання на Business                          |
| date       | DateTime | Дата й час запису                              |
| status     | Enum     | `scheduled` \| `completed` \| `cancelled`      |

## Правила цілісності, які варто закласти в Prisma-схему

- При видаленні `Service`/`Customer`/`Employee`, які використані в
  `Appointment`, або забороняти видалення (якщо є активні записи), або
  використовувати `onDelete: Restrict` — щоб не залишати "осиротілі" записи.
- Всі зовнішні ключі (`customerId`, `serviceId`, `employeeId`) повинні
  посилатись на сутності **того самого** `businessId`, що й сам `Appointment`
  — це варто перевіряти на рівні бекенд-логіки (сервісний шар), Prisma сама
  цього не гарантує.
- Індекс на `businessId` у кожній таблиці — для швидкої фільтрації.
- Індекс на `(businessId, date)` в `Appointment` — знадобиться для календаря
  і Dashboard.

## На майбутнє (поза MVP)

- Таблиця `WorkingHours` (businessId, employeeId?, day, startTime, endTime).
- Таблиця `SubscriptionPlan` / `BusinessSubscription`.
- Поле `notes` / `history` для Customer.
