window.TOUR_SCENES = {
  pasillo: {
    title: "Recorrido principal",
    label: "Pasillo principal",
    framePath: "assets/frames/pasillo/",
    frameCount: 482,
    pixelsPerFrame: 12,

    hotspots: [
      {
        start: 145,
        end: 190,
        title: "Proyectos realizados",
        text: "Puedes entrar al primer espacio o seguir avanzando por el pasillo.",
        actions: [
          { label: "Entrar al salón 1", type: "goto", target: "espacio1" },
          { label: "Seguir", type: "continue" }
        ]
      },

      {
        start: 220,
        end: 265,
        title: "Opiniones y experiencias",
        text: "Aquí puedes entrar al segundo espacio o continuar el recorrido.",
        actions: [
          { label: "Entrar al salón 2", type: "goto", target: "espacio2" },
          { label: "Seguir", type: "continue" }
        ]
      },

      {
        start: 390,
        end: 405,
        title: "Podcast y sonido",
        text: "Puedes entrar al estudio de podcast o continuar el recorrido.",
        actions: [
          {
            label: "Entrar al podcast",
            type: "goto",
            target: "podcast"
          },
          {
            label: "Seguir",
            type: "continue"
          }
        ]
      },

      {
        start: 410,
        end: 470,
        title: "Transmedia e IA",
        text: "Explora una pieza relacionada con análisis del entorno colombiano.",
        actions: [
          {
            label: "Ver video",
            type: "modalVideo",
            video: "analisis_entorno_colombiano_web.mp4",
            modalTitle: "Transmedia e IA"
          },
          {
            label: "Volver al inicio",
            type: "home"
          }
        ]
      }
    ]
  },

  espacio1: {
    title: "Espacio 1",
    label: "Salón 1",
    framePath: "assets/frames/espacio1/",
    frameCount: 150,
    pixelsPerFrame: 16,
    returnTo: "pasillo",

    hotspots: [
      {
        start: 130,
        end: 150,
        title: "Punto interactivo del salón",
        text: "Has llegado al final del recorrido del salón. Puedes abrir el contenido asociado o volver al pasillo.",
        actions: [
          {
            label: "Ver video del salón 1",
            type: "modalVideo",
            video: "05_espacio_1_video_click_1_web.mp4",
            modalTitle: "Video del salón 1"
          },
          {
            label: "Volver al pasillo",
            type: "return"
          }
        ]
      }
    ]
  },

  espacio2: {
    title: "Espacio 2",
    label: "Salón 2",
    framePath: "assets/frames/espacio2/",
    frameCount: 240,
    pixelsPerFrame: 16,
    returnTo: "pasillo",

    hotspots: [
      {
        start: 215,
        end: 240,
        title: "Punto interactivo del salón",
        text: "Has llegado al final del recorrido del salón. Puedes abrir el contenido asociado o volver al pasillo.",
        actions: [
          {
            label: "Ver contenido",
            type: "modalVideo",
            video: "analisis_entorno_colombiano_web.mp4",
            modalTitle: "Contenido del salón 2"
          },
          {
            label: "Volver al pasillo",
            type: "return"
          }
        ]
      }
    ]
  },

  podcast: {
    title: "Podcast y sonido",
    label: "Estudio de podcast",
    framePath: "assets/frames/podcast/",
    frameCount: 260,
    pixelsPerFrame: 14,
    returnTo: "pasillo",

    hotspots: [
      {
        start: 230,
        end: 260,
        title: "Estación de podcast",
        text: "Has llegado al espacio de podcast. Puedes reproducir el video o volver al pasillo.",
        actions: [
          {
            label: "Ver podcast",
            type: "modalVideo",
            video: "04_podcast_sonido_web.mp4",
            modalTitle: "Podcast y sonido"
          },
          {
            label: "Volver al pasillo",
            type: "return"
          }
        ]
      }
    ]
  }
};