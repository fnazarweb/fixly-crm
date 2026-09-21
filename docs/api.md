# Fixly CRM — API

Базовий URL: `/api`

Формат: REST, JSON. Авторизація — JWT (access + refresh token, через
httpOnly cookie). Кожен захищений роут дістає `businessId` і `role`
поточного користувача з токена через middleware, а не з тіла запиту.

## Auth

```
POST   /api/auth/register     Реєстрація нового бізнесу + admin-користувача
POST   /api/auth/login        Логін, повертає access/refresh токени
POST   /api/auth/logout       Логаут, інвалідує refresh token
POST   /api/auth/refresh      Оновити access token за refresh token
GET    /api/auth/me           Дані поточного користувача
```

`POST /api/auth/register` одразу створює і `Business`, і першого `User` з
роллю `admin` — це "вхідна точка" мультитенантності.

## Users / Employees

```
GET    /api/employees         Список працівників бізнесу
POST   /api/employees         Додати працівника (тільки admin)
GET    /api/employees/:id     Профіль працівника
PUT    /api/employees/:id     Редагувати
DELETE /api/employees/:id     Видалити (тільки admin)
```

## Customers

```
GET    /api/customers         Список клієнтів бізнесу (+ query для пошуку ?q=)
POST   /api/customers         Створити клієнта
GET    /api/customers/:id     Профіль клієнта
PUT    /api/customers/:id     Редагувати
DELETE /api/customers/:id     Видалити
GET    /api/customers/:id/appointments   Історія записів клієнта
```

## Services

```
GET    /api/services          Список послуг бізнесу
POST   /api/services          Створити послугу
GET    /api/services/:id      Деталі послуги
PUT    /api/services/:id      Редагувати
DELETE /api/services/:id      Видалити
```

## Appointments

```
GET    /api/appointments               Список записів (фільтри: ?date=, ?employeeId=, ?status=)
POST   /api/appointments               Створити запис
GET    /api/appointments/:id           Деталі запису
PUT    /api/appointments/:id           Редагувати (в т.ч. змінити статус)
DELETE /api/appointments/:id           Видалити / скасувати
```

## Dashboard

```
GET    /api/dashboard/summary   Кількість клієнтів, записів сьогодні,
                                 дохід за період, найближчі записи
```

## Правила безпеки для кожного роуту

1. Middleware `authenticate` — перевіряє JWT, дістає `userId`, `businessId`,
   `role`.
2. Middleware `authorize(role)` — для роутів, доступних лише `admin`
   (напр. видалення працівника).
3. У кожному контролері / сервісному шарі — обов'язковий фільтр
   `where: { businessId: req.user.businessId }`. Це головне правило
   ізоляції даних між бізнесами і найкритичніше місце для тестування.

## На майбутнє (поза MVP)

```
GET    /api/public/:businessSlug/booking-info   Публічна інформація для бронювання
POST   /api/public/:businessSlug/appointments   Створення запису клієнтом без логіну
```

Ці роути не захищені JWT, але потребують окремого rate-limiting і валідації,
оскільки відкриті назовні.
