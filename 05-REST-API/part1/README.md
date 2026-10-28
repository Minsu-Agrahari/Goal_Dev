# REST API — Part 1

A Node.js/Express API scaffold for user registration and authentication, using MongoDB through Mongoose. This README describes the files and behavior currently present in this folder.

> **Status: work in progress.** The authentication flow is not currently usable end to end. In particular, the Express app does not mount the auth router, and there are issues in the database connection, request validation, and user model that need to be resolved before the API can run reliably.

## Requirements

- Node.js and npm
- A MongoDB instance and connection URI

## Setup

From this directory:

```bash
npm install
cp env.example .env
```

Edit `.env` and provide real values. The application reads these environment variables:

| Variable | Purpose | Default |
| --- | --- | --- |
| `PORT` | Port for the HTTP server | `5000` |
| `MONGODB_URI` | MongoDB connection URI | None; required by the database connection code |
| `JWT_ACCESS_SECRET` | Secret used to sign and verify access tokens | None |
| `JWT_ACCESS_EXPIRES_IN` | Access-token lifetime | `15m` |
| `JWT_REFRESH_SECRET` | Secret used to sign and verify refresh tokens | None |
| `JWT_REFRESH_EXPIRES_IN` | Refresh-token lifetime | `7d` |

`env.example` is a template and does not currently list `MONGODB_URI`; add it to `.env`. Keep real credentials and secrets out of source control.

## Running

The package does not define a start script. The server entry point is `server.js`, so the direct command is:

```bash
node server.js
```

This is the intended launch command, but startup is not reliable yet: the database connection helper does not await the Mongoose connection and accesses the connection through the unresolved promise. It also catches connection errors without propagating them.

## Authentication services and routes

The auth service exports the functions below. The paths in the **Route mapping** column are suggested router-relative endpoints for those services; they are documentation of the intended mapping, not a claim that every route is implemented. No auth-router mount path is configured in `src/app.js`, so a final URL prefix has not been established.

| Service | Purpose | Route mapping | Current route status |
| --- | --- | --- | --- |
| `register` | Checks for an existing email, creates a user, and returns a user object without the password or verification token. Email verification delivery is TODO. | `POST /register` | Declared in `auth.routes.js` and connected to the register controller, but not reachable until the router is mounted and the existing setup issues are fixed. |
| `login` | Finds a user and is intended to authenticate them, check verification, and issue access/refresh tokens. Password checking is not implemented. | `POST /login` | Service function only; no route or controller is declared. |
| `logout` | Clears the user's stored refresh token. | `POST /logout` | Service function only; no route or controller is declared. |
| `refresh` | Verifies a refresh token and issues a new access token. | `POST /refresh` | Service function only; no route or controller is declared. |
| `forgotPassword` | Generates and stores a password-reset token with an expiry. Sending the email is TODO. | `POST /forgot-password` | Service function only; no route or controller is declared. |

The router currently declares only `POST /register`. It expects a JSON body with:

| Field | Requirements |
| --- | --- |
| `name` | String, trimmed, 4–50 characters |
| `email` | Valid email address; converted to lowercase |
| `password` | String, at least 8 characters |
| `role` | `Customer` or `Vendor`; defaults to `Customer` |

The controller is intended to return HTTP `201` with a JSON response shaped like:

```json
{
  "success": true,
  "message": "Registration sucess",
  "data": {}
}
```

This endpoint is **not currently reachable**: `src/app.js` only creates and exports an Express app. It does not configure JSON body parsing or mount the auth router. There are also code issues in the validation middleware and user model that must be fixed before registration will work. The login, logout, refresh, and forgot-password mappings above are not implemented as HTTP routes yet.

## Project files

```text
.
├── env.example
├── package.json
├── package-lock.json
├── server.js
└── src
    ├── app.js
    ├── common
    │   ├── config
    │   │   └── db.js
    │   ├── dto
    │   │   └── base.dto.js
    │   ├── middleware
    │   │   └── validate.middleware.js
    │   └── utils
    │       ├── api-error.js
    │       ├── api-response.js
    │       └── jwt.utils.js
    └── modules
        └── auth
            ├── auth.controller.js
            ├── auth.middleware.js
            ├── auth.model.js
            ├── auth.routes.js
            ├── auth.service.js
            └── dto
                └── register.dto.js
```

### File responsibilities

- `server.js` loads environment variables, attempts to connect to MongoDB, and starts the HTTP listener.
- `src/app.js` creates and exports the Express application. Middleware and routes are not registered yet.
- `src/common/config/db.js` contains the Mongoose connection helper.
- `src/common/dto/base.dto.js` provides shared Joi validation behavior; `src/modules/auth/dto/register.dto.js` defines registration input validation.
- `src/common/middleware/validate.middleware.js` adapts a DTO validator into Express middleware.
- `src/common/utils/api-error.js` defines an HTTP-status-bearing API error; `src/common/utils/api-response.js` provides JSON success-response helpers.
- `src/common/utils/jwt.utils.js` contains JWT sign/verify helpers and token hashing/generation utilities.
- `src/modules/auth/auth.model.js` defines the Mongoose user schema.
- `src/modules/auth/auth.routes.js` declares the registration route; `auth.controller.js` handles the registration request.
- `src/modules/auth/auth.service.js` contains registration and partially implemented authentication-related service functions.
- `src/modules/auth/auth.middleware.js` is currently empty.

## Dependencies and scripts

Runtime dependencies listed in `package.json`:

- Express 5 for HTTP routing
- Mongoose for MongoDB models and connections
- Joi for request validation
- `jsonwebtoken` for JWT operations
- `dotenv` for loading environment variables
- `crypto` for token generation and hashing

The `test` script in `package.json` is a placeholder that exits with an error; no automated tests are configured yet.
