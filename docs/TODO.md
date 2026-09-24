# Fixly CRM — TODO

Позначай виконані пункти `[x]` в процесі роботи.

## 0. Основа проєкту

- [ ] Створити структуру `fixly-crm/frontend`, `fixly-crm/backend`, `fixly-crm/docs` [x]
- [ ] Ініціалізувати Git-репозиторій, перший commit [x]
- [ ] Створити `.gitignore` (node_modules, .env, dist) [x]
- [ ] Створити README.md-заглушку

## 1. PostgreSQL + Prisma

- [ ] Розібратись із базовими поняттями: table, row, primary key, foreign key, relation [x]
- [ ] Встановити PostgreSQL локально (або через Docker) [x]
- [ ] Ініціалізувати Prisma в `backend/` [x]
- [ ] Створити першу тестову модель і зробити міграцію
- [ ] Перевірити дані через Prisma Studio

## 2. Проєктування бази даних

- [ ] Описати моделі: Business, User, Customer, Service, Appointment
- [ ] Прописати зв'язки (foreign keys) між ними
- [ ] Зробити `npx prisma migrate dev`
- [ ] Звірити схему з `docs/database.md`

## 3. Backend foundation

- [ ] Налаштувати Express-сервер (`server.js`)
- [ ] Підключити Prisma Client
- [ ] Налаштувати `.env` (DATABASE_URL, JWT_SECRET, PORT)
- [ ] Створити структуру `src/controllers`, `src/routes`, `src/middleware`, `src/services`
- [ ] Глобальний error handler middleware

## 4. Authentication

- [ ] `POST /api/auth/register` — створює Business + admin User
- [ ] `POST /api/auth/login` — видає access + refresh токени
- [ ] `POST /api/auth/logout`
- [ ] Middleware `authenticate` (перевірка JWT)
- [ ] Middleware `authorize(role)` (перевірка ролі)
- [ ] Frontend: сторінки Login/Register
- [ ] Frontend: `ProtectedRoute` компонент

## 5. Customers

- [ ] Backend CRUD (`GET/POST/PUT/DELETE /api/customers`)
- [ ] Перевірити фільтрацію по `businessId` у кожному запиті
- [ ] Frontend: сторінка списку + пошук
- [ ] Frontend: форма створення/редагування (модалка)
- [ ] Frontend: сторінка профілю клієнта з історією записів
- [ ] Підключити через RTK Query

## 6. Services

- [ ] Backend CRUD
- [ ] Frontend: список + форма створення/редагування
- [ ] Підключити через RTK Query

## 7. Appointments

- [ ] Backend CRUD (`customerId`, `serviceId`, `employeeId`, `date`, `status`)
- [ ] Валідація: усі FK належать тому самому `businessId`
- [ ] Frontend: список записів з фільтрами
- [ ] Frontend: форма створення запису (вибір клієнта/послуги/працівника/часу)
- [ ] Підключити через RTK Query

## 8. Employees

- [ ] Backend CRUD (доступно лише `admin`)
- [ ] Frontend: список + форма додавання

## 9. Dashboard

- [ ] Backend: `GET /api/dashboard/summary`
- [ ] Frontend: картки статистики + список найближчих записів

## 10. UI / Tailwind

- [ ] Базові компоненти: Button, Input, Modal, Card, Table, Sidebar, Navbar, Badge
- [ ] Перевірити консистентність стилів по всіх сторінках
- [ ] Адаптивність (мобільний вигляд хоча б для Dashboard і списків)

## 11. Business / SaaS isolation (критична перевірка)

- [ ] Написати тест/сценарій: user з Business A не бачить дані Business B
      (спробувати вручну через `/api/customers/:id` чужого клієнта)
- [ ] Перевірити всі контролери на наявність фільтра `businessId`

## 12. Swagger

- [ ] Встановити `swagger-jsdoc` + `swagger-ui-express`
- [ ] Описати Auth, Customers, Services, Appointments, Employees endpoints
- [ ] Перевірити, що документація відкривається на `/api-docs`

## 13. Docker + deployment

- [ ] `Dockerfile` для backend
- [ ] `Dockerfile` для frontend
- [ ] `docker-compose.yml` (frontend + backend + PostgreSQL)
- [ ] Налаштувати environment variables для production
- [ ] Задеплоїти (напр. Render/Railway/VPS)

## 14. README

- [ ] Опис проєкту, features, tech stack
- [ ] Схема архітектури
- [ ] Опис бази даних
- [ ] Посилання на API-документацію (Swagger)
- [ ] Скріншоти
- [ ] Інструкція "How to run locally"

## Поза MVP (не чіпати до завершення основного циклу)

- [ ] Публічна сторінка бронювання
- [ ] Перевірка конфліктів розкладу + робочі години
- [ ] Email/SMS нагадування
- [ ] Тарифні плани / підписка
