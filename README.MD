# Web Scraper de Productos Éxito + API REST + Supabase

Taller desarrollado para la asignatura de Arquitectura y Patrones Avanzados.

El sistema implementa una arquitectura compuesta por:

- Un Web Scraper desarrollado en Python.
- Una API REST desarrollada en Node.js con Express.
- Una base de datos PostgreSQL administrada mediante Supabase.

El scraper obtiene información de productos del supermercado Éxito, la envía automáticamente a la API y ésta la almacena de forma persistente en la base de datos.

---

# Arquitectura

```
                 ┌─────────────────────┐
                 │    exito.com        │
                 └─────────┬───────────┘
                           │
                     Web Scraping
                           │
                           ▼
                 ┌─────────────────────┐
                 │  scraper.py         │
                 │     (Python)        │
                 └─────────┬───────────┘
                           │
                     HTTP POST (JSON)
                           │
                           ▼
                 ┌─────────────────────┐
                 │ API REST (Express)  │
                 │     Node.js         │
                 └─────────┬───────────┘
                           │
                    Inserción masiva
                           │
                           ▼
                 ┌─────────────────────┐
                 │ PostgreSQL          │
                 │ Supabase            │
                 └─────────────────────┘
```

---

# Funcionalidades

El scraper realiza búsquedas automáticas de las siguientes categorías:

- Arroz
- Papas
- Agua
- Galletas
- Gaseosa

Por cada producto se almacena:

- Categoría
- Nombre
- Precio
- Precio de lista (si existe)
- URL del producto
- Imagen

---

# Tecnologías utilizadas

## Backend

- Node.js
- Express
- Supabase JS

## Scraper

- Python
- Selenium
- Requests

## Base de datos

- PostgreSQL
- Supabase

---

# Estructura del proyecto

```
Proyecto/

│
├── api/
│   ├── controllers/
│   │     itemsController.js
│   │
│   ├── routes/
│   │     items.js
│   │
│   ├── services/
│   │     supabaseService.js
│   │
│   ├── .env
│   ├── package.json
│   ├── package-lock.json
│   └── server.js
│
├── scripts/
│   └── scraper.py
│   └── requeriments.txt
│
├── README.md
└── .gitignore
```

---

# Instalación

## 1. Clonar el repositorio

```bash
git clone <URL_DEL_REPOSITORIO>

cd Proyecto
```

---

## 2. Instalar dependencias de Python

```bash
pip install -r requirements.txt
```

---

## 3. Instalar dependencias de Node

```bash
cd api

npm install
```

---

# Configuración

Crear un archivo `.env` dentro de la carpeta `api` con el siguiente contenido:

```env
SUPABASE_URL=TU_SUPABASE_URL

SUPABASE_KEY=TU_SUPABASE_ANON_KEY
```

---

# Ejecución

## 1. Iniciar la API

```bash
cd api

npm run dev
```

La API iniciará por defecto en:

```
http://localhost:3000
```

---

## 2. Ejecutar el scraper

En otra terminal:

```bash
cd scripts

python scraper.py
```

El scraper:

- realiza las búsquedas,
- construye el JSON,
- envía automáticamente los datos a la API mediante HTTP POST,
- la API valida e inserta los registros en Supabase.

---

# Endpoints disponibles

## GET

Obtiene todos los productos almacenados.

```
GET /api/items
```

Respuesta:

```json
{
    "success": true,
    "cantidad": 100,
    "items": [
        ...
    ]
}
```

---

## POST

Inserta múltiples productos en la base de datos.

```
POST /api/items
```

Body:

```json
[
    {
        "categoria": "arroz",
        "nombre": "...",
        "precio": "...",
        "precio_lista": "...",
        "url": "...",
        "imagen": "..."
    }
]
```

---

# Base de datos

La información se almacena en una tabla denominada:

```
scraped_items
```

Cada registro contiene:

- id
- categoria
- nombre
- precio
- precio_lista
- url
- imagen
- created_at

---

# Flujo del sistema

```
Exito.com
     │
     ▼
Scraper Python
     │
     ▼
JSON
     │
HTTP POST
     │
     ▼
API REST
     │
     ▼
Supabase PostgreSQL
     │
     ▼
GET /api/items
```

---

# Autores
- Juan José Campos Covaleda