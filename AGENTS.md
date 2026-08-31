# Footify Backend Guide

## Project Identity
Footify is an online football store backend. It serves a JSON API for the customer-facing SPA and an Express/EJS admin panel for store administration.

Current stack:
- Node.js, TypeScript, CommonJS
- Express 4
- MongoDB with Mongoose
- EJS admin views
- JWT member auth and express-session admin auth
- Multer disk uploads under `uploads/`

## Architecture
Entry point is `src/server.ts`. It loads `.env`, connects to MongoDB using `MONGO_URL`, then starts the Express app from `src/app.ts`.

`src/app.ts` configures static assets, `/uploads`, body parsing, CORS, cookies, Morgan logging, Mongo-backed sessions, EJS, and routers:
- `src/router.ts` is the JSON API mounted at `/`.
- `src/routerAdmin.ts` is the admin EJS surface mounted at `/admin`.

Request flow is generally:
`router -> auth/upload middleware if needed -> controller -> service in src/models -> Mongoose schema in src/schema -> response`.

Controllers catch their own errors and return either `Errors` instances or `Errors.standard`; there is no global Express error middleware.

## Domain Model
Main entities found in the code:
- `Member`: users and admins, with `memberType`, `memberStatus`, nick, phone, password, optional profile fields, image, and points.
- `Product`: football store product with status, category, optional kit type, brand, name, price, stock count, size, color, description, images, views, and likes.
- `Order`: member-owned order with total, delivery fee, status, and member reference.
- `OrderItem`: item rows linked to an order and product, with quantity and item price.
- `View`: member/product view records used to prevent duplicate product view increments.

Implemented product categories are `KIT`, `BOOTS`, `BALL`, and `GLOVES`. Implemented product statuses are `PAUSE`, `PROCESS`, and `DELETE`. Implemented order statuses are `PAUSED`, `PROCESSING`, `FINISHED`, and `DELETE`.

## Coding Conventions
- Service classes live in `src/models/*.service.ts` and hold business/database logic.
- Mongoose schemas live in `src/schema/*.model.ts`.
- Shared enums live in `src/libs/enums`.
- Shared TypeScript interfaces live in `src/libs/types`.
- Controllers are plain objects typed with the loose `T` index signature.
- Imports use relative paths and double quotes.
- Async controller methods use local `try/catch` blocks.
- Existing code commonly mutates request-derived input before passing it to Mongoose.

Prefer small, local changes that match these patterns unless a broader refactor is explicitly approved.

## API Conventions
Customer API routes in `src/router.ts`:
- `POST /member/signup`
- `POST /member/login`
- `POST /member/logout`
- `GET /member/detail`
- `POST /member/update`
- `GET /member/top-users`
- `GET /product/all`
- `GET /product/:id`
- `POST /order/create`
- `GET /order/all`
- `POST /order/update`

Admin routes in `src/routerAdmin.ts`:
- `GET /admin`, `/admin/login`, `/admin/signup`, `/admin/logout`, `/admin/check-me`
- `GET /admin/product/all`
- `POST /admin/product/create`
- `POST /admin/product/:id`
- `GET /admin/user/all`
- `POST /admin/user/edit`

Pagination/filter values are read from `req.query` and assembled in controllers, then normalized where services need safe defaults.

## Database Conventions
- IDs are converted with `shapeIntoMongooseObjectId` from `src/libs/config.ts`.
- Product listing uses aggregation with `$match`, `$sort`, `$skip`, and `$limit`.
- Order listing uses aggregation plus `$lookup` into `orderItems` and `products`.
- Product images and member images are stored as disk paths.
- Product duplicate prevention is an index on `productName`, `productSize`, and `productBrand`.
- Be careful when changing schemas or enums because existing MongoDB data may depend on current values.

## Authentication And Authorization
Customer/member auth:
- Signup/login create a JWT with `SECRET_TOKEN` and a 24 hour duration from `AUTH_TIMER`.
- The token is returned in JSON and also set as an `accessToken` cookie.
- `memberController.verifyAuth` reads `accessToken` from cookies, verifies it, attaches `req.member`, and calls `next()`.
- `memberController.retrieveAuth` optionally attaches `req.member` for public product detail view tracking.

Admin auth:
- Admin signup/login uses `express-session` persisted in MongoDB.
- `adminController.verifyAdmin` allows admin routes only when `req.session.member.memberType === ADMIN`.
- Public member signup must never be allowed to create an admin account.

## Error Handling
Project-level errors use `src/libs/Errors.ts`, with `HttpCode` and `Message` enums. Controllers generally catch exceptions and return:
- `res.status(err.code).json(err)` for known `Errors`.
- `res.status(500).json(Errors.standard)` for unknown API errors.
- Admin EJS flows often return small script alerts and redirects.

## Environment
Expected variable names:
- `PORT`: HTTP port, defaults to `3003` in `src/server.ts`.
- `MONGO_URL`: MongoDB connection string and session store URI.
- `SESSION_SECRET`: Express session signing secret.
- `SECRET_TOKEN`: JWT signing/verifying secret.

Never expose or copy actual `.env` values.

## Commands
Supported scripts from `package.json`:
- `npm run start`: run `src/server.ts` with `ts-node`.
- `npm run start:dev`: run with `nodemon --exec ts-node src/server.ts`.
- `npm run build`: compile TypeScript to `dist`.
- `npm test`: placeholder only; currently exits with "Error: no test specified".

No lint script is configured.

## Development Rules For Future Codex Work
- Read related router, controller, service, schema, type, and enum files before changing a feature.
- Preserve the current Express/EJS/Mongoose architecture unless a real bug requires a change.
- Keep fixes minimal and scoped.
- Do not rewrite modules just for modernization.
- Do not casually change database schemas, enum values, or indexes.
- Do not upgrade dependencies without explicit approval.
- Do not expose `.env` values or secrets.
- Do not trust client-submitted authorization, prices, totals, status, or ownership fields without checking service logic.
- Treat existing dirty worktree changes as user-owned unless explicitly told otherwise.

## Known Technical Debt
- Validation is mostly manual or delegated to Mongoose; there is no central request validation layer.
- File upload handling lacks server-side file type and size limits.
- Order creation still trusts client-submitted item prices and does not reconcile product stock/status.
- There are many debug `console.log` statements and a small amount of commented legacy upload code.
