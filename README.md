# Innotiva Backend - Replicate SDXL (Experiencia Premium)

Backend Node.js para la experiencia premium de Innotiva, que:

- Recibe la foto del espacio del cliente (habitación, sala, etc.).
- Recibe el producto seleccionado desde Shopify.
- Genera una visualización "ANTES / DESPUÉS" usando **Replicate + SDXL (image-to-image)**.
- Devuelve las URLs de:
  - Imagen original (Cloudinary).
  - Imagen generada por IA (Cloudinary).
  - URL del producto en Shopify.
  - Mensaje personalizado para la página de resultado.

## 🧱 Estructura del proyecto

```bash
.
├── server.js
├── package.json
├── .env.example
└── src
    ├── controllers
    │   ├── experienciaController.js
    │   └── productsController.js
    ├── routes
    │   ├── experienciaRoutes.js
    │   └── productsRoutes.js
    ├── services
    │   ├── cloudinaryService.js
    │   ├── replicateService.js
    │   └── shopifyService.js
    └── helpers
        └── messageHelper.js
```

## ⚙️ Variables de entorno

Copia `.env.example` a `.env` y rellena tus claves reales:

```bash
cp .env.example .env
```

Edita `.env`:

- `SHOPIFY_STORE_DOMAIN` → dominio de tu tienda (ej: `innotiva-vision.myshopify.com`)
- `SHOPIFY_STOREFRONT_TOKEN` → token de Storefront API
- `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`
- `REPLICATE_API_TOKEN` → token `r8_...` de Replicate
- `PORT` → Render suele usar `10000`

## 🚀 Scripts

Instalar dependencias:

```bash
npm install
```

Ejecutar en local:

```bash
npm start
```

El servidor se levantará en:

- `http://localhost:10000/` (o el puerto que definas)

## 🔗 Endpoints

### Healthcheck

`GET /`

Devuelve un mensaje simple para verificar que el backend está funcionando.

### Productos para el formulario

`GET /productos-shopify`

Devuelve una lista de productos adaptada para el formulario de Shopify:

```json
{
  "success": true,
  "products": [
    {
      "id": "handle-del-producto",
      "handle": "handle-del-producto",
      "title": "Nombre",
      "description": "Descripción",
      "image": "https://...",
      "url": "https://tu-tienda.myshopify.com/products/handle-del-producto"
    }
  ]
}
```

### Experiencia premium

`POST /experiencia-premium`

**Body (multipart/form-data):**

- `roomImage` -> archivo de imagen (foto del espacio)
- `productId` -> handle del producto
- `productName` -> nombre del producto
- `idea` -> texto opcional con la idea del cliente
- `productUrl` -> URL opcional del producto (si no se envía, se construye con el handle)

**Respuesta:**

```json
{
  "success": true,
  "message": "Texto personalizado para el cliente",
  "userImageUrl": "https://res.cloudinary.com/...",
  "generatedImageUrl": "https://res.cloudinary.com/...",
  "productUrl": "https://tu-tienda.myshopify.com/products/handle-del-producto",
  "productName": "Nombre del producto"
}
```

## 🧠 Notas

- Este backend está pensado para integrarse con:
  - Un formulario en Shopify (página de experiencia premium).
  - Una página de resultado que lee `sessionStorage` y pinta el "ANTES / DESPUÉS".
- El modelo usado en Replicate es **SDXL (B)** con configuración balanceada entre fidelidad y creatividad.

Cualquier ajuste de prompts, fuerza de imagen (`strength`), pasos (`num_inference_steps`) o escalado (`guidance_scale`) se puede hacer en `src/services/replicateService.js`.
