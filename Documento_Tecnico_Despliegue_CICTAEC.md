# Documento Técnico de Despliegue: CICTAEC

**Proyecto:** Interfaz de Usuario CICTAEC  
**Tecnologías:** HTML5, CSS3, JavaScript (Vanilla JS), Bootstrap  
**Repositorio origen:** GitHub (`cictaec1-hub/CICTAEC1`)  
**Producción actual:** GitHub Pages con dominio personalizado `www.cictaec.es`

---

## 1. Introducción
Este documento describe el proceso real de publicación del sitio web CICTAEC, compuesto por archivos estáticos frontend (HTML, CSS, JS, imágenes), desde GitHub hacia producción.

> **Alcance actual:** No existe backend Java en este proyecto y no se ejecuta build Java para publicar el sitio.

---

## 2. Arquitectura simplificada (estado real)
- **Origen:** Repositorio GitHub.
- **Edición de código:** Visual Studio Code.
- **Publicación:** GitHub Pages (rama configurada en el repositorio).
- **Dominio personalizado:** `www.cictaec.es` mediante archivo `CNAME`.
- **DNS:** El dominio resuelve a IPs de GitHub Pages (`185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`).

### Flujo resumido
1. Desarrollo local (HTML/CSS/JS).
2. `git add` + `git commit` + `git push` a `main`.
3. GitHub Pages publica automáticamente la última versión.
4. El dominio personalizado sirve el contenido publicado.

---

## 3. Fase de preparación (Build)
Para este sitio, la fase de build es mínima:
- No hay compilación Java/Maven/Gradle.
- No hay carpeta `/dist` obligatoria.
- Se publican archivos estáticos directamente desde el repositorio.

**Resultado:** La salida de despliegue coincide con los archivos del proyecto (`index.html`, `styles.css`, `script.js`, páginas auxiliares, `images/`, etc.).

---

## 4. Procedimiento de publicación
### Paso 1: Desarrollo y validación local
- Editar y probar en entorno local.
- Verificar enlaces internos, recursos y comportamiento responsive.

### Paso 2: Sincronización con GitHub
- Ejecutar commits con mensajes claros.
- Hacer push a la rama de publicación (actualmente `main`).

### Paso 3: Publicación en producción
- GitHub Pages actualiza el sitio automáticamente tras el push.
- Validar en:
  - `https://www.cictaec.es/`
  - `http://www.cictaec.es/` (redirección esperada hacia HTTPS)

---

## 5. Configuración de dominio y DNS
- Mantener el archivo `CNAME` con el valor: `www.cictaec.es`.
- En el proveedor DNS, apuntar:
  - `A` (raíz/apex) a IPs de GitHub Pages.
  - `CNAME` de `www` al host recomendado por GitHub Pages (según configuración activa).
- Verificar propagación con:
  - `nslookup cictaec.es`
  - `nslookup www.cictaec.es`

---

## 6. Verificaciones y pruebas de conformidad
| Elemento | Validación | Estado |
|---|---|---|
| CSS | Carga de estilos y responsive | Conforme |
| JavaScript | Ejecución de interacciones del sitio | Conforme |
| Recursos estáticos | Imágenes, CSS, JS accesibles | Conforme |
| SEO técnico | `robots.txt`, `sitemap.xml`, metas OG, JSON-LD | Conforme |
| SSL/HTTPS | Sitio accesible por HTTPS | Activo |

---

## 7. Mantenimiento y actualizaciones
Ciclo recomendado:
1. Cambio en código fuente.
2. Commit + Push a GitHub.
3. Verificación post-despliegue en dominio público.
4. Actualización de `sitemap.xml` (`lastmod`) cuando haya cambios relevantes.

---

## 8. Seguridad
- No incluir credenciales o tokens en el repositorio ni en `.git/config`.
- Usar variables/secretos en GitHub si en el futuro se automatiza con workflows.
- Mantener dependencias CDN actualizadas (Bootstrap).
- Mantener HTTPS habilitado y forzado.
- Si se reemplaza Google Forms por formulario propio, añadir anti-spam (reCAPTCHA/hCaptcha + validaciones servidor).

---

## 9. Gestión de logs y monitoreo
En el modelo actual (GitHub Pages):
- No hay acceso a logs de servidor como en cPanel tradicional.
- El monitoreo se realiza con:
  - Disponibilidad del sitio (HTTP/HTTPS).
  - Google Search Console (indexación/sitemap).
  - Analítica web externa (si aplica).

---

## 10. Despliegue automatizado (opcional)
Actualmente la publicación ya es automática vía GitHub Pages.

Opcionalmente se puede añadir GitHub Actions para:
- validaciones previas (lint/check links),
- control de calidad antes de publicar,
- notificaciones de despliegue.

---

## 11. DNS y firewall
### 11.1 DNS
- Confirmar que los registros del dominio apuntan a GitHub Pages.
- Ajustar TTL según necesidad operativa.

### 11.2 Firewall
- No aplica para publicación estándar en GitHub Pages (no hay servidor propio expuesto para despliegue FTP/SSH).

### 11.3 Verificación
- `nslookup cictaec.es`
- Prueba de acceso por HTTP y HTTPS desde navegador.

---

## 12. Indexación y SEO
El sitio incorpora:
- `sitemap.xml`.
- `robots.txt`.
- Etiquetas `title` y `meta description` en páginas principales.
- Open Graph/Twitter Cards.
- Datos estructurados JSON-LD (`Organization` y `WebSite`).

---

## 13. Nota sobre migración a GoDaddy (si se decide)
Si en el futuro se migra a hosting compartido GoDaddy (`/public_html`):
- Este documento debe versionarse como **v2 (GoDaddy)**.
- Se debe sustituir el bloque de arquitectura/publicación/dns por flujo FTP/SFTP o Actions hacia GoDaddy.
- Debe mantenerse una sola estrategia activa para evitar inconsistencias operativas.
