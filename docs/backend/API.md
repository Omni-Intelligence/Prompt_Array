# API Documentation

## Authentication Endpoints

```http
POST /auth/register
POST /auth/login
POST /auth/refresh-token
POST /auth/logout
```

## Prompt Management

```http
GET /api/prompts
POST /api/prompts
GET /api/prompts/:id
PUT /api/prompts/:id
DELETE /api/prompts/:id
GET /api/prompts/:id/versions
POST /api/prompts/:id/fork
```

## Group Management

```http
GET /api/groups
POST /api/groups
GET /api/groups/:id
PUT /api/groups/:id
DELETE /api/groups/:id
POST /api/groups/:id/prompts
DELETE /api/groups/:id/prompts/:promptId
```

## User Management

```http
GET /api/users/me
PUT /api/users/me
GET /api/users/favorites
POST /api/users/favorites/:promptId
DELETE /api/users/favorites/:promptId
```

For detailed API specifications, see our [OpenAPI documentation](./openapi.yaml).