# API de Scraping de Productos Éxito

API REST desarrollada en **Node.js** que integra un scraper en **Python** utilizando **Selenium** para obtener información de productos del supermercado **Éxito**.

El proyecto permite realizar búsquedas de productos y obtener información estructurada en formato JSON, incluyendo nombre, precio, precio de lista, imagen y enlace al producto.

---

# Arquitectura

```
Cliente (Navegador / Postman)

            │
            ▼

      API REST (Node.js)
         Express.js

            │
            ▼

     Scraper Service
 (Child Process - spawn)

            │
            ▼

      Python 3 + Selenium

            │
            ▼

      Sitio Web de Éxito

            │
            ▼

       Respuesta JSON
```

---

# Tecnologías utilizadas

### Backend

- Node.js

### Scraping

- Python 3
- Selenium

---

# Estructura del proyecto

```
TALLER1/

├── api/
│   ├── controllers/
│   ├── routes/
│   ├── services/
│   ├── package.json
│   ├── package-lock.json
│   ├── server.js
│   └── .env
│
├── scripts/
│   ├── scraper.py
│   ├── scraper_api.py
│   └── requirements.txt
│
├── frontend/
│
├── README.md
└── .gitignore
```

---

# Instalación

## 1. Clonar el repositorio

```bash
git clone <URL_DEL_REPOSITORIO>
```

---

## 2. Instalar dependencias de Node

Entrar a la carpeta de la API:

```bash
cd api
```

Instalar dependencias:

```bash
npm install
```

---

## 3. Instalar dependencias de Python

Entrar a la carpeta de scripts:

```bash
cd ../scripts
```

Instalar:

```bash
pip install -r requirements.txt
```

---

## 4. Configurar el archivo `.env`

Dentro de la carpeta `api` crear un archivo:

```
.env
```

Con el siguiente contenido:

```env
PYTHON_PATH=C:\Ruta\A\Tu\python.exe
```

Ejemplo:

```env
PYTHON_PATH=C:\Users\usuario\anaconda3\envs\MiEntorno\python.exe
```

---

# Ejecutar la API

Desde la carpeta:

```
api
```

Ejecutar:

```bash
npm run dev
```

La API iniciará en:

```
http://localhost:3000
```

---

# Endpoints disponibles

## Estado de la API

```
GET /health
```

Respuesta:

```json
{
    "status": "OK"
}
```

---

## Buscar productos

```
GET /productos?busqueda=arroz
```

Ejemplo:

```
http://localhost:3000/productos?busqueda=arroz
```

Respuesta:

```json
{
    "success": true,
    "busqueda": "arroz",
    "cantidad": 16,
    "productos": [
        {
            "nombre": "...",
            "precio": "...",
            "precio_lista": "...",
            "url": "...",
            "imagen": "..."
        }
    ]
}
```

---

# Flujo de funcionamiento

1. El cliente realiza una petición HTTP.
2. Express recibe la solicitud.
3. El controlador invoca el servicio.
4. El servicio ejecuta `scraper_api.py`.
5. Python llama al scraper desarrollado con Selenium.
6. Selenium obtiene la información desde la página de Éxito.
7. Python devuelve un JSON.
8. Node responde al cliente.

---

# Requisitos

- Node.js 20 o superior
- Python 3.10 o superior
- Google Chrome instalado
- ChromeDriver compatible con la versión de Chrome

---

# Estado del proyecto

Actualmente el proyecto permite:

- Consultar productos por nombre.
- Obtener nombre del producto.
- Obtener precio actual.
- Obtener precio de lista (cuando existe).
- Obtener imagen del producto.
- Obtener URL del producto.
- Exponer toda la información mediante una API REST.

---

# Autor

Juan José Campos Covaleda

Universidad de La Sabana

Ingeniería Informática
