# Fixly CRM — UI / Frontend Routes

## Маршрути (React Router)

```
/register                Реєстрація бізнесу + admin-акаунта
/login                   Логін

/dashboard                Головна сторінка після входу

/customers                Список клієнтів
/customers/:id            Профіль клієнта (+ історія записів)
/customers/new             Форма створення клієнта
/customers/:id/edit        Форма редагування

/services                 Список послуг
/services/new              Форма створення послуги
/services/:id/edit         Форма редагування послуги

/appointments              Список / календар записів
/appointments/new           Форма створення запису
/appointments/:id/edit      Форма редагування запису

/employees                 Список працівників (тільки admin)
/employees/new               Форма додавання працівника
/employees/:id               Профіль працівника

/settings                  Профіль користувача + дані бізнесу
```

Усі роути, крім `/register` і `/login`, — захищені (`ProtectedRoute`), яка
перевіряє наявність валідного токена і редіректить на `/login`, якщо його
немає. Роути `/employees/*` додатково перевіряють `role === "admin"`.

## Базові UI-компоненти (Tailwind)

Створюються один раз і перевикористовуються на всіх сторінках:

- `Button` (variants: primary, secondary, danger)
- `Input` / `Select` / `Textarea`
- `Modal` (для форм створення/редагування, підтвердження видалення)
- `Card`
- `Table` (з підтримкою сортування/пагінації для списків)
- `Sidebar` (навігація: Dashboard, Customers, Services, Appointments,
  Employees, Settings)
- `Navbar` (ім'я користувача, назва бізнесу, logout)
- `Badge` (для статусів запису: scheduled / completed / cancelled)

## Структура сторінок

### Dashboard
- Картки-статистика: кількість клієнтів, записів сьогодні, дохід.
- Список найближчих записів (5–10 штук).

### Customers
- Таблиця з пошуком по імені/телефону.
- Кнопка "Додати клієнта" → модалка або окрема сторінка.
- Клік по рядку → профіль клієнта з історією записів.

### Services
- Таблиця: назва, ціна, тривалість.
- CRUD через модалки (для MVP можна без окремих сторінок).

### Appointments
- Список записів (на MVP-етапі, до калдендаря) з фільтрами по даті,
  працівнику, статусу.
- Форма створення: вибір клієнта, послуги, працівника, дати/часу.
- Пізніше — переключення на вигляд календаря (тиждень/день).

### Employees
- Таблиця працівників (тільки для admin).
- Форма додавання: ім'я, email, пароль (тимчасовий), роль.

### Settings
- Форма редагування профілю користувача.
- Форма редагування даних бізнесу (назва).

## Стан і дані (Redux Toolkit + RTK Query)

- Один `api` slice (RTK Query) з endpoint-ами під кожну сутність
  (customersApi, servicesApi, appointmentsApi, employeesApi, authApi).
- `authSlice` — тільки для зберігання поточного користувача/токена в
  клієнтському стані (сам токен краще тримати в httpOnly cookie, а не в
  Redux/localStorage).
- Автоматичний refetch/invalidation тегів RTK Query після
  create/update/delete — щоб таблиці одразу оновлювались.
