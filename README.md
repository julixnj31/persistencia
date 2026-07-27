# API RESTful - Sistema de Inventario

API REST para gestión de productos y categorías desarrollada con Node.js y Express, siguiendo una arquitectura en capas y usando persistencia en memoria.

## Tecnologías

- **Node.js** v18+
- **Express** ^5.2.1
- **Nodemon** ^3.1.0 (desarrollo)

## Arquitectura

El proyecto está organizado en 4 capas responsabilidad única:

```
src/
├── data/          # Datos simulados (arreglos en memoria)
│   ├── products.data.js
│   └── categories.data.js
├── models/        # Lógica de negocio y manipulación de datos
│   ├── product.model.js
│   └── category.model.js
├── controllers/   # Manejo de peticiones y respuestas HTTP
│   ├── product.controller.js
│   └── category.controller.js
└── routes/        # Definición de rutas y verbos HTTP
    ├── product.routes.js
    └── category.routes.js
```

```
Cliente HTTP → Routes → Controllers → Models → Data (memoria)
```

## Instalación

```bash
# 1. Clonar el repositorio
git clone <repo-url>
cd persistencia-1.0.0

# 2. Instalar dependencias
npm install

# 3. Iniciar servidor
npm run dev     # Con recarga automática (nodemon)
# o
npm start       # Con node
```

El servidor arranca en `http://localhost:3000`.

## Uso de la API

Todas las respuestas siguen un formato JSON estandarizado:

```json
{
  "success": true,
  "message": "Mensaje descriptivo",
  "data": [],
  "errors": []
}
```

### Endpoints — Categorías

| Método   | Ruta | Descripción | Cuerpo (JSON) |
|----------|------|-------------|---------------|
| `GET`    | `/categories` | Listar todas las categorías | — |
| `GET`    | `/categories/:id` | Obtener una categoría por ID | — |
| `POST`   | `/categories` | Crear una categoría | `{ "name": "..." }` |
| `PUT`    | `/categories/:id` | Actualizar una categoría | `{ "name": "..." }` |
| `DELETE` | `/categories/:id` | Eliminar una categoría | — |
| `GET`    | `/categories/:id/products` | Productos de una categoría | — |

> **Nota:** Al eliminar una categoría, si tiene productos vinculados la API responde con `409 Conflict` y no permite la operación.

### Endpoints — Productos

| Método   | Ruta | Descripción | Cuerpo (JSON) |
|----------|------|-------------|---------------|
| `GET`    | `/products` | Listar todos los productos | — |
| `GET`    | `/products/:id` | Obtener un producto por ID | — |
| `POST`   | `/products` | Crear un producto | `{ "name": "...", "price": 99, "categoryId": 1 }` |
| `PUT`    | `/products/:id` | Actualizar un producto | `{ "name"?: "...", "price"?: 99, "categoryId"?: 1 }` |
| `DELETE` | `/products/:id` | Eliminar un producto | — |

### Ejemplos con curl

```bash
# Verificar que la API responde
curl http://localhost:3000

# Crear una categoría
curl -X POST http://localhost:3000/categories \
  -H "Content-Type: application/json" \
  -d '{"name":"Electrodomésticos"}'

# Crear un producto vinculado a la categoría
curl -X POST http://localhost:3000/products \
  -H "Content-Type: application/json" \
  -d '{"name":"Lavadora", "price":500, "categoryId":1}'

# Listar productos de una categoría
curl http://localhost:3000/categories/2/products

# Intentar eliminar categoría con productos (devuelve 409)
curl -X DELETE http://localhost:3000/categories/2

# Eliminar producto
curl -X DELETE http://localhost:3000/products/1
```

## Base de datos (futura migración)

El archivo `database.sql` contiene el script para migrar a MySQL con:

- Tabla `categories` con `id`, `name` y timestamps
- Tabla `products` con `id`, `name`, `categori_id` y timestamps
- **Llave foránea** con `ON DELETE RESTRICT` (misma regla de integridad implementada en la capa de controladores)

## Desarrollo

```bash
# Ejecutar en modo desarrollo con recarga automática
npm run dev
```

## Licencia

ISC
