window.TOUR_SCENES = {
  pasillo: {
    title: "Recorrido principal",
    label: "Pasillo principal",
    framePath: "assets/frames/pasillo/",
    frameCount: 482,
    pixelsPerFrame: 12,

    spatialSound: {
      key: "person",
      start: 330,
      peak: 405,
      end: 470
    },

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
          { label: "Entrar al podcast", type: "goto", target: "podcast" },
          { label: "Seguir", type: "continue" }
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
            modalTitle: "Transmedia e IA",
            sound: "transmedia",
            quiz: {
              question: "¿Cuál es la función principal del Espacio Transmedia?",
              options: [
                "Grabar únicamente podcasts",
                "Implementar experiencias innovadoras como hologramas",
                "Almacenar equipos del laboratorio"
              ],
              correct: 1
            }
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
        title: "Contenido del salón 1",
        text: "Has llegado al final del recorrido del salón. Puedes abrir el contenido asociado o volver al punto donde estabas.",
        actions: [
          {
            label: "Ver video del salón 1",
            type: "modalVideo",
            video: "05_espacio_1_video_click_1_web.mp4",
            modalTitle: "Video del salón 1",
            sound: "salon1",
            quiz: {
              question: "¿Para qué tipo de producción está pensado el espacio de podcast?",
              options: [
                "Para entrevistas, conversaciones y programas de audio",
                "Para fabricar piezas metálicas",
                "Para almacenar archivos administrativos"
              ],
              correct: 0
            }
          },
          { label: "Volver al punto del pasillo", type: "return" }
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
        title: "Contenido del salón 2",
        text: "Has llegado al final del recorrido del salón. Puedes abrir el contenido asociado o volver al punto donde estabas.",
        actions: [
          {
            label: "Ver contenido",
            type: "modalVideo",
            video: "analisis_entorno_colombiano_web.mp4",
            modalTitle: "Contenido del salón 2",
            sound: "salon2",
            quiz: {
              question: "¿Qué busca integrar el laboratorio en sus proyectos?",
              options: [
                "Solo clases tradicionales",
                "Audio, video, inteligencia artificial y experiencias transmedia",
                "Únicamente documentos impresos"
              ],
              correct: 1
            }
          },
          { label: "Volver al punto del pasillo", type: "return" }
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
        start: 220,
        end: 260,
        title: "Espacio Podcast",
        text: "Este ambiente está diseñado para grabar podcasts, gestionar audio y producir contenido sonoro.",
        actions: [
          {
            label: "Ver video podcast",
            type: "modalVideo",
            video: null,
            modalTitle: "Espacio Podcast",
            sound: "podcast",
            quiz: {
              question: "¿Qué permite hacer el Espacio Podcast?",
              options: [
                "Capturar sonido con claridad y gestionar niveles de audio",
                "Realizar tratamientos térmicos",
                "Proyectar únicamente hologramas"
              ],
              correct: 0
            }
          },
          { label: "Volver al punto del pasillo", type: "return" }
        ]
      }
    ]
  },

  transmedia: {
    title: "Transmedia e IA",
    label: "Pantalla verde",
    framePath: "assets/frames/pasillo/",
    frameCount: 482,
    pixelsPerFrame: 12,
    returnTo: "pasillo",

    hotspots: [
      {
        start: 410,
        end: 470,
        title: "Transmedia e IA",
        text: "Este espacio integra inteligencia artificial y experiencias transmedia como hologramas.",
        actions: [
          {
            label: "Ver video",
            type: "modalVideo",
            video: "analisis_entorno_colombiano_web.mp4",
            modalTitle: "Transmedia e IA",
            sound: "transmedia",
            quiz: {
              question: "¿Qué se desarrolla en el Espacio Transmedia?",
              options: [
                "Experiencias innovadoras con hologramas",
                "Procesos médicos",
                "Grabaciones sin audio"
              ],
              correct: 0
            }
          },
          { label: "Volver al punto del pasillo", type: "return" }
        ]
      }
    ]
  }
};

window.TOUR_NAV = [
  {
    id: "pasillo",
    label: "Pasillo",
    target: "pasillo",
    startFrame: 1,
    activeRange: [1, 120]
  },
  {
    id: "salon1",
    label: "Salón 1",
    target: "pasillo",
    startFrame: 145,
    activeRange: [145, 190]
  },
  {
    id: "salon2",
    label: "Salón 2",
    target: "pasillo",
    startFrame: 220,
    activeRange: [220, 265]
  },
  {
    id: "podcast",
    label: "Podcast",
    target: "pasillo",
    startFrame: 390,
    activeRange: [390, 405]
  },
  {
    id: "transmedia",
    label: "Transmedia IA",
    target: "pasillo",
    startFrame: 410,
    activeRange: [410, 470]
  }
];