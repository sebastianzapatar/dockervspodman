# Docker vs Podman

Este repositorio contiene material para comparar y contrastar **Docker** y **Podman**.

## Estructura del Proyecto

*   **`index.html`**: Presentación que detalla las diferencias, arquitectura, ventajas y desventajas entre Docker y Podman. Puede abrirse directamente en cualquier navegador web.
*   **`cron-app/`**: Una aplicación de ejemplo en TypeScript que sirve como prueba de concepto. Incluye tanto un `Dockerfile` como un `Containerfile` para demostrar cómo se pueden construir imágenes y ejecutar contenedores utilizando ambas herramientas de manera equivalente.

## Cómo visualizar la presentación

Simplemente abre el archivo `index.html` en tu navegador preferido.

## Ejemplo Práctico (`cron-app`)

Dentro del directorio `cron-app` encontrarás el código fuente de una pequeña aplicación y las instrucciones (`Dockerfile` y `Containerfile`) para contenerizarla.

### Con Docker
```bash
cd cron-app
docker build -t cron-app-docker -f Dockerfile .
docker run -d cron-app-docker
```

### Con Podman
```bash
cd cron-app
podman build -t cron-app-podman -f Containerfile .
podman run -d cron-app-podman
```
