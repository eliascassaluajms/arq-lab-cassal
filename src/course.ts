export type UnitId = 'ec1' | 'ec2' | 'ec3' | 'ec4' | 'ec5' | 'ec6'

type Question = { prompt: string; options: string[]; correct: number; explanation: string }

export type Unit = {
  id: UnitId; code: string; title: string; tone: string; summary: string; objective: string; evidence: string
  topics: string[]; lesson: { title: string; text: string }[]; keyIdea: string
  lab: { title: string; objective: string; equipment: string[]; safety: string; steps: string[]; expected: string }
  autonomous: string[]; reflection: string; questions: Question[]
}

export const units: Unit[] = [
  {
    id: 'ec1', code: 'EC1', title: 'Memorias', tone: 'mint',
    summary: 'Cómo se guarda y se recupera la información, desde los registros hasta el almacenamiento.',
    objective: 'Identificar y diferenciar memorias RAM, ROM y caché, y explicar cómo su organización influye en el rendimiento.',
    evidence: 'Informe técnico, cuestionario de jerarquía y mapa de memoria documentado.',
    topics: ['Función y clasificación', 'RAM: SRAM y DRAM', 'ROM: PROM, EPROM y EEPROM', 'Caché y jerarquía', 'Mapa de memoria', 'Localidad y rendimiento'],
    lesson: [
      { title: 'La memoria como espacio de trabajo', text: 'Qué información conserva cada tipo de memoria y cómo se relaciona con el procesador.' },
      { title: 'RAM, ROM y caché', text: 'Diferencias de función, estructura y uso; SRAM y DRAM; variantes de memoria de solo lectura.' },
      { title: 'Jerarquía y localidad', text: 'Por qué hay varios niveles y cómo la localidad temporal y espacial puede mejorar el acceso.' },
      { title: 'Mapas de memoria', text: 'Representa regiones y direcciones para una configuración dada, haciendo explícitas las unidades.' },
    ],
    keyIdea: 'La jerarquía organiza memorias con distintas capacidades y tiempos de acceso; no existe una sola memoria óptima para todo.',
    lab: { title: 'Reconoce y organiza memorias', objective: 'Compara la función, el tipo y la ubicación de memorias a partir de componentes o fichas técnicas.', equipment: ['Componentes o imágenes de RAM/ROM', 'Ficha de registro', 'Configuración de memoria dada por el docente'], safety: 'Si observas componentes físicos, utiliza equipos desenergizados y sigue las indicaciones del docente; no retires módulos por cuenta propia.', steps: ['Identifica el nombre o etiqueta visible de cada componente.', 'Registra tipo, capacidad y función con apoyo de la ficha técnica.', 'Clasifica cada memoria como RAM, ROM, caché u otra categoría indicada.', 'Ordena los niveles por proximidad al procesador y justifica la secuencia.', 'Dibuja un mapa de memoria con las direcciones de la configuración entregada.'], expected: 'Diferencias entre capacidad, volatilidad y velocidad, y datos necesarios para construir un mapa preciso.' },
    autonomous: ['Lee el apartado sobre clasificación y estructura de memorias de la bibliografía del curso.', 'Resuelve ejercicios de clasificación y estructura; contrasta con la jerarquía vista en clase.', 'Investiga la evolución de las tecnologías de memoria y redacta un resumen conceptual.', 'Compara memorias en procesadores x86, ARM y RISC-V con fuentes identificables.'],
    reflection: '¿Qué dato adicional necesitas para comparar dos memorias sin confundir capacidad con velocidad?',
    questions: [
      { prompt: '¿Cuál es una función característica de la memoria caché?', options: ['Conservar archivos de forma permanente', 'Mantener datos de uso frecuente cerca del procesador', 'Reemplazar siempre la memoria principal', 'Controlar periféricos de entrada'], correct: 1, explanation: 'La caché mantiene copias de datos o instrucciones usados recientemente para reducir el tiempo de acceso.' },
      { prompt: '¿Qué principio describe que un dato usado recientemente podría volver a utilizarse pronto?', options: ['Localidad temporal', 'Direccionamiento indirecto', 'Interrupción externa', 'Acceso secuencial'], correct: 0, explanation: 'La localidad temporal es la probabilidad de reutilizar pronto un dato o instrucción accedido recientemente.' },
    ],
  },
  {
    id: 'ec2', code: 'EC2', title: 'El microprocesador', tone: 'coral',
    summary: 'La estructura interna de la CPU, sus instrucciones y el ciclo que transforma datos en resultados.',
    objective: 'Describir ALU, registros y unidad de control; seguir el ciclo de instrucción y comparar ISA con ejemplos.',
    evidence: 'Diagrama interno, comparación CISC/RISC, análisis fetch-decode-execute y cuestionario.',
    topics: ['Función y clasificación', 'ALU y registros', 'Unidad de control', 'Conjunto de instrucciones (ISA)', 'Arquitecturas CISC y RISC', 'Ciclo de instrucción'],
    lesson: [
      { title: 'Qué hace el microprocesador', text: 'Cómo coordina operaciones y datos al ejecutar las instrucciones de un programa.' },
      { title: 'ALU, registros y control', text: 'El papel de la unidad lógico-aritmética, los registros y la unidad de control.' },
      { title: 'Instrucciones y arquitecturas', text: 'Qué define una ISA y cómo comparar CISC y RISC sin reducirlas a una sola característica.' },
      { title: 'Buscar, decodificar, ejecutar', text: 'Recorrido de una instrucción, desde la búsqueda hasta la escritura del resultado.' },
    ],
    keyIdea: 'El ciclo de instrucción es un modelo para seguir el trabajo de la CPU; implementaciones reales pueden añadir etapas y mecanismos.',
    lab: { title: 'Sigue una instrucción paso a paso', objective: 'Representa el flujo de una instrucción e identifica qué componente participa en cada etapa.', equipment: ['Logisim Evolution o simulador indicado', 'Diagrama de bloques', 'Ficha para trazar instrucciones'], safety: 'Trabaja en el simulador y en los ejemplos autorizados; no cambies la configuración de equipos del laboratorio.', steps: ['Reconoce ALU, registros, unidad de control y memoria en el diagrama.', 'Selecciona una instrucción sencilla del ejemplo guiado.', 'Traza la búsqueda y anota qué registro conserva cada dato.', 'Describe la decodificación y señala qué operación debe realizarse.', 'Sigue la ejecución y registra dónde queda el resultado.'], expected: 'Componentes que intervienen, cambios en los registros y relación entre instrucción y operación.' },
    autonomous: ['Lee la sección sobre microprocesadores de la bibliografía base.', 'Resuelve ejercicios de estructura interna y trazado de instrucciones.', 'Investiga la evolución de las arquitecturas de procesadores.', 'Prepara un informe comparativo CISC/RISC con ejemplos y fuentes verificables.', 'Explora RISC-V como ISA abierta y distingue arquitectura de microarquitectura.'],
    reflection: '¿Qué evidencia usarías para explicar que una instrucción fue ejecutada correctamente en el modelo?',
    questions: [
      { prompt: '¿Qué componente realiza operaciones aritméticas y lógicas?', options: ['Unidad de control', 'Unidad lógica aritmética (ALU)', 'Reloj de tiempo real', 'Controlador DMA'], correct: 1, explanation: 'La ALU realiza operaciones aritméticas y lógicas; la unidad de control coordina las acciones necesarias.' },
      { prompt: '¿Qué ocurre durante la etapa de decodificación?', options: ['Se interpreta la instrucción para determinar la operación', 'Se elimina la instrucción de memoria', 'Se apaga el reloj del procesador', 'Se copia todo el almacenamiento a los registros'], correct: 0, explanation: 'La unidad de control interpreta la instrucción y determina las acciones necesarias para ejecutarla.' },
    ],
  },
  {
    id: 'ec3', code: 'EC3', title: 'Arquitectura de una computadora', tone: 'blue',
    summary: 'Los buses, controladores y componentes que conectan y coordinan el sistema.',
    objective: 'Identificar componentes arquitectónicos y explicar cómo se comunican mediante rutas de datos y control.',
    evidence: 'Diagrama general, informe sobre buses y chipset, análisis funcional y cuestionario.',
    topics: ['Estructura general', 'Sistema de buses', 'BIOS y firmware', 'Reloj e interrupciones', 'Acceso directo a memoria (DMA)', 'USART, controladores y chipset'],
    lesson: [
      { title: 'Una computadora como sistema', text: 'Cómo se integran procesador, memoria, controladores y periféricos.' },
      { title: 'Buses y comunicación', text: 'Rutas de datos, direcciones y control; ejemplos como PCIe y USB.' },
      { title: 'Inicialización y coordinación', text: 'El papel del firmware/BIOS, el reloj de tiempo real y el controlador de interrupciones.' },
      { title: 'DMA y chipset', text: 'Cómo se coordina el acceso a memoria y qué función cumple el chipset en una plataforma.' },
    ],
    keyIdea: 'La arquitectura describe relaciones y flujos entre componentes; enumerar las piezas no basta para explicar el sistema.',
    lab: { title: 'Traza las conexiones de la placa', objective: 'Construye un diagrama de componentes y relaciona cada conexión con el tipo de comunicación.', equipment: ['Placa madre de demostración o fotografía', 'Ficha de identificación', 'Diagrama de arquitectura'], safety: 'Usa una placa desenergizada o imágenes y no manipules conectores ni ajustes de BIOS sin supervisión.', steps: ['Localiza componentes y puertos visibles en la placa o su fotografía.', 'Anota la función de cada elemento usando documentación del curso.', 'Dibuja rutas principales entre CPU, memoria, almacenamiento y periféricos.', 'Marca las conexiones que corresponden a buses o interfaces.', 'Explica con un ejemplo cuándo intervienen una interrupción o DMA.'], expected: 'Qué componentes intercambian información, por qué rutas y qué documentación respalda su identificación.' },
    autonomous: ['Lee los capítulos sobre arquitectura de computadora.', 'Resuelve ejercicios de identificación y análisis de componentes.', 'Investiga la evolución de buses y chipsets usando fuentes actuales.', 'Prepara un informe sobre el sistema de buses de una plataforma documentada.', 'Compara arquitecturas de computadores personales, servidores y dispositivos móviles.'],
    reflection: '¿Qué cambia al dibujar el flujo de datos en vez de enumerar componentes?',
    questions: [
      { prompt: '¿Qué describe principalmente un sistema de buses?', options: ['Conexión y transferencia de información entre componentes', 'La lista de programas instalados', 'El sistema de archivos', 'La temperatura del procesador'], correct: 0, explanation: 'Las interconexiones transportan datos, direcciones y señales de control entre componentes.' },
      { prompt: '¿Cuál es el propósito general de DMA?', options: ['Transferir datos entre dispositivos y memoria con menor intervención de la CPU', 'Reemplazar todas las interrupciones', 'Almacenar permanentemente el BIOS', 'Aumentar la frecuencia del reloj'], correct: 0, explanation: 'DMA permite ciertas transferencias hacia o desde memoria con menos intervención directa del procesador.' },
    ],
  },
  {
    id: 'ec4', code: 'EC4', title: 'Unidades periféricas', tone: 'yellow',
    summary: 'Dispositivos de entrada, salida y almacenamiento: interfaces, controladores y especificaciones.',
    objective: 'Comparar periféricos y tecnologías de almacenamiento, identificando especificaciones y compatibilidad.',
    evidence: 'Tabla comparativa, informe de controladores, exposición y evaluación de especificaciones.',
    topics: ['Controladores y tarjetas', 'Almacenamiento magnético y óptico', 'HDD y SSD', 'Puertos serie, paralelo y USB', 'Entrada y salida', 'Especificaciones y compatibilidad'],
    lesson: [
      { title: 'El computador se comunica', text: 'Dispositivos de entrada y salida, controladores e interfaces.' },
      { title: 'Almacenamiento', text: 'Comparación de HDD, SSD y unidades ópticas por capacidad, velocidad y uso.' },
      { title: 'Puertos y conexión', text: 'Qué permiten las interfaces serie, paralelo, USB, SATA y NVMe en sus contextos.' },
      { title: 'Leer una especificación', text: 'Cómo interpretar características técnicas y comprobar compatibilidad.' },
    ],
    keyIdea: 'Una recomendación de hardware relaciona el uso previsto con especificaciones y compatibilidad, no solo con una cifra aislada.',
    lab: { title: 'Compara periféricos con criterios claros', objective: 'Analiza especificaciones y justifica qué dispositivo resulta apropiado para un caso de uso.', equipment: ['Fichas técnicas o catálogos', 'Computador de demostración', 'Tabla comparativa'], safety: 'Utiliza fichas técnicas o dispositivos de demostración; no conectes ni retires periféricos de equipos activos sin indicación del docente.', steps: ['Elige dos dispositivos del mismo tipo para comparar.', 'Registra interfaz, capacidad o resolución y otros datos relevantes.', 'Identifica qué cifras son comparables y cuáles dependen del contexto.', 'Relaciona los datos con el caso de uso planteado.', 'Escribe una recomendación y señala sus límites o información faltante.'], expected: 'Qué especificaciones justifican la recomendación y qué aspecto de compatibilidad debe comprobarse.' },
    autonomous: ['Lee el capítulo sobre unidades periféricas.', 'Resuelve ejercicios de análisis de especificaciones técnicas.', 'Investiga la evolución de almacenamiento e interfaces.', 'Prepara una tabla comparativa de tecnologías de almacenamiento.', 'Analiza tendencias en dispositivos inalámbricos y USB-C.'],
    reflection: '¿Qué especificación importa más para tu caso de uso y por qué las demás no bastan por sí solas?',
    questions: [
      { prompt: 'Al comparar dos unidades de almacenamiento, ¿qué enfoque es más adecuado?', options: ['Comparar capacidad, rendimiento y confiabilidad según el uso', 'Elegir la que tenga el número más grande', 'Ignorar la interfaz y comparar solo precio', 'Suponer que todos los dispositivos funcionan igual'], correct: 0, explanation: 'La comparación considera varias especificaciones relacionadas con el uso y la compatibilidad.' },
      { prompt: '¿Cuál es una función de un controlador de periférico?', options: ['Gestionar la comunicación entre el sistema y un dispositivo', 'Sustituir la memoria RAM', 'Aumentar el espacio físico del disco', 'Convertir toda instrucción en ensamblador'], correct: 0, explanation: 'El controlador participa en la comunicación y operación del dispositivo dentro del sistema.' },
    ],
  },
  {
    id: 'ec5', code: 'EC5', title: 'Programación en ensamblador', tone: 'lavender',
    summary: 'Instrucciones de bajo nivel, registros, bifurcaciones y ciclos conectados con la arquitectura.',
    objective: 'Escribir y analizar programas sencillos en Debug y MASM, usando estructuras de control e interrupciones.',
    evidence: 'Programas en Debug y MASM, informe técnico, proyecto integrador y examen práctico.',
    topics: ['Estructura del ensamblador', 'Comandos de Debug', 'Registros e instrucciones', 'Condiciones y bifurcaciones', 'Ciclos e interrupciones', 'MASM y enlace con alto nivel'],
    lesson: [
      { title: 'Del lenguaje al procesador', text: 'Cómo las instrucciones representan operaciones que la arquitectura puede ejecutar.' },
      { title: 'Registros e instrucciones', text: 'Sintaxis y propósito de MOV, ADD, SUB y otras instrucciones básicas.' },
      { title: 'Flujo de control', text: 'Condiciones, saltos y ciclos; lectura guiada de la ruta que sigue el programa.' },
      { title: 'Debug, MASM e integración', text: 'Herramientas, interrupciones y convenciones de llamada contempladas en el programa.' },
    ],
    keyIdea: 'En ensamblador, cada instrucción y registro hacen explícitos detalles que otros lenguajes suelen ocultar.',
    lab: { title: 'Construye un programa por etapas', objective: 'Escribe, inspecciona y traza un ejemplo pequeño en el entorno de práctica indicado.', equipment: ['Entorno autorizado por el docente', 'DEBUG.COM o MASM según disponibilidad', 'Guía de instrucciones y hoja de trazado'], safety: 'Trabaja únicamente en el entorno autorizado; no ejecutes programas descargados cuyo comportamiento no hayas revisado.', steps: ['Lee el objetivo y señala entradas, proceso y resultado esperado.', 'Identifica los registros que utiliza el ejemplo.', 'Escribe o completa las instrucciones iniciales según la guía.', 'Traza cada instrucción y registra los cambios observables.', 'Añade una condición o ciclo guiado y comprueba las rutas posibles.', 'Documenta el resultado y las diferencias con lo esperado.'], expected: 'Qué hace cada instrucción, cómo cambia el flujo y qué evidencia muestra el resultado.' },
    autonomous: ['Lee la documentación de Debug y MASM indicada en clase.', 'Resuelve ejercicios progresivos de programación en ensamblador.', 'Investiga convenciones de llamada como cdecl y stdcall.', 'Prepara un informe técnico que explique un programa paso a paso.', 'Compara una rutina en ensamblador con el código generado por un compilador.'],
    reflection: '¿Qué información del estado del procesador fue más útil para entender el resultado?',
    questions: [
      { prompt: '¿Qué instrucción representa habitualmente una transferencia de datos?', options: ['MOV', 'JNZ', 'LOOP', 'INT'], correct: 0, explanation: 'MOV transfiere datos entre operandos compatibles; detalles dependen de la arquitectura y sintaxis.' },
      { prompt: '¿Qué propósito tiene una bifurcación condicional?', options: ['Cambiar el flujo si se cumple una condición', 'Borrar todos los registros', 'Convertir un programa en datos', 'Detener siempre el procesador'], correct: 0, explanation: 'Una bifurcación condicional dirige la ejecución a otra dirección cuando se cumple su condición.' },
    ],
  },
  {
    id: 'ec6', code: 'EC6', title: 'Mantenimiento de hardware', tone: 'orange',
    summary: 'Planificación, diagnóstico y documentación con seguridad y cuidado de los componentes.',
    objective: 'Planificar y documentar mantenimiento preventivo o correctivo aplicando precauciones de seguridad verificadas.',
    evidence: 'Plan preventivo, informe correctivo, checklist de seguridad y registro de actividades.',
    topics: ['Mantenimiento preventivo', 'Diagnóstico y mantenimiento correctivo', 'Herramientas y software', 'Seguridad y ESD', 'Registro y trazabilidad', 'Buenas prácticas'],
    lesson: [
      { title: 'Prevenir antes que reparar', text: 'Planificación de tareas, identificación del equipo y registro de su estado.' },
      { title: 'Diagnosticar con evidencia', text: 'Reúne síntomas, observaciones y resultados antes de proponer una intervención.' },
      { title: 'Herramientas y seguridad', text: 'Uso previsto de herramientas y precauciones para energía, ESD y espacio de trabajo.' },
      { title: 'Registrar cada cambio', text: 'Documentación del procedimiento, configuración y trazabilidad del mantenimiento.' },
    ],
    keyIdea: 'Un procedimiento comienza con seguridad y diagnóstico; toda intervención debe estar autorizada y documentada.',
    lab: { title: 'Prepara un plan de mantenimiento seguro', objective: 'Diseña una ficha de intervención que priorice seguridad, diagnóstico y trazabilidad.', equipment: ['Checklist de seguridad', 'Ficha de inventario', 'Herramientas si el docente las autoriza'], safety: 'Desconecta la energía antes de manipular componentes, aplica precauciones ESD y trabaja en un espacio ventilado. No abras la fuente de alimentación; sigue la supervisión y el protocolo institucional.', steps: ['Identifica el equipo y registra su estado inicial sin desmontarlo.', 'Describe el problema con observaciones verificables.', 'Lista riesgos y pasos de seguridad requeridos.', 'Propón acciones o pruebas de diagnóstico autorizadas.', 'Define qué evidencia se registrará antes, durante y después.', 'Revisa el plan con el docente antes de intervenir.'], expected: 'Qué se observó, qué acción se propone, quién la autoriza y cómo quedará documentada.' },
    autonomous: ['Lee manuales de mantenimiento y seguridad indicados por el docente.', 'Investiga herramientas de diagnóstico y explica qué evidencia aporta cada una.', 'Prepara un plan de mantenimiento preventivo documentado.', 'Resuelve casos de diagnóstico correctivo justificando cada decisión.', 'Analiza fallos comunes y estrategias de prevención con fuentes verificables.'],
    reflection: '¿Qué dato o precaución no puede faltar antes de autorizar una intervención?',
    questions: [
      { prompt: 'Antes de manipular componentes internos, ¿qué precaución es esencial?', options: ['Desconectar la energía y aplicar medidas de protección ESD', 'Aumentar la velocidad del ventilador', 'Cambiar el firmware para comprobar la placa', 'Retirar cables sin documentarlos'], correct: 0, explanation: 'El programa incluye desconexión de energía y manejo de componentes electrostáticos entre las precauciones.' },
      { prompt: '¿Qué debe contener un registro de mantenimiento útil?', options: ['Acciones, observaciones y cambios de configuración', 'Solo el nombre del técnico', 'Únicamente una fotografía', 'Una lista de piezas sin contexto'], correct: 0, explanation: 'La documentación debe permitir comprender y rastrear la actividad y los cambios realizados.' },
    ],
  },
]
