# Conociendo el laboratorio — prototipo de tour virtual

Este ZIP contiene una primera versión funcional del tour virtual.

## Qué incluye

- Pantalla de inicio con botón Entrar y Activar sonido.
- Video principal controlado por scroll.
- Hotspots temporales en el pasillo.
- Entrada a Salón 1 y Salón 2.
- Modal para abrir videos clickeables.
- Botón para volver al pasillo.
- Configuración editable en `data/escenas.js`.

## Cómo probarlo

1. Comprime tus videos originales en formato web.
2. Copia los videos comprimidos dentro de `assets/videos/`.
3. Abre `index.html` en un navegador.

Si el navegador bloquea el video por abrirlo como archivo local, usa un servidor simple:

```bash
python -m http.server 8000
```

Después abre:

```text
http://localhost:8000
```

## Videos esperados

Coloca estos archivos dentro de `assets/videos/`:

```text
01_pasillo_principal_web.mp4
02_espacio_1_salon1_web.mp4
03_espacio_2_salon_web.mp4
04_podcast_sonido_web.mp4
```

## Cómo comprimir los videos

Puedes usar HandBrake:

- Preset: Fast 720p30
- Formato: MP4
- Codec: H.264
- Quality: RF 30–34
- Web Optimized: activado

O usa los scripts en la carpeta `tools/` si tienes FFmpeg instalado.

## Dónde editar los hotspots

Abre:

```text
data/escenas.js
```

Ahí puedes cambiar:

- Nombre de cada escena.
- Video usado.
- Tiempo de aparición de cada hotspot.
- Texto de los botones.
- Acciones de cada botón.

## Estado actual

Este prototipo está preparado con los materiales que ya existen:

- Pasillo + laboratorio.
- Espacio 1 / Salón 1.
- Espacio 2 / Salón 2.
- Podcast / sonido.

Los videos no están incluidos dentro del ZIP para evitar que el archivo pese más de 1 GB. La estructura queda lista para que pegues las versiones comprimidas.
