import { useEffect, useState, type FormEvent } from 'react'
import {
  Activity, ArrowDownRight, ArrowLeft, ArrowRight, BookOpen, Check,
  CheckCircle2, ChevronDown, CircleHelp, CircuitBoard, Cpu, Download,
  GraduationCap, HardDrive, Home, Laptop, Lightbulb, Menu, MonitorCog,
  Moon, NotebookPen, Search, ShieldCheck, Sparkles, Sun, Wifi, WifiOff, X,
  type LucideIcon,
} from 'lucide-react'
import { units, type Unit, type UnitId } from './course'
import './App.css'

type TabId = 'class' | 'lab' | 'autonomous' | 'questions'
type InstallEvent = Event & { prompt: () => Promise<void>; userChoice: Promise<{ outcome: string }> }

const unitIcons: LucideIcon[] = [HardDrive, Cpu, CircuitBoard, Laptop, Activity, ShieldCheck]
const tabs: { id: TabId; label: string; icon: LucideIcon }[] = [
  { id: 'class', label: 'Clase magistral', icon: BookOpen },
  { id: 'lab', label: 'Laboratorio', icon: CircuitBoard },
  { id: 'autonomous', label: 'Trabajo autónomo', icon: NotebookPen },
  { id: 'questions', label: 'Preguntas tipo test', icon: CircleHelp },
]

function urlUnit(): UnitId | null {
  const id = new URLSearchParams(location.search).get('unidad')
  return units.some((unit) => unit.id === id) ? id as UnitId : null
}

function savedValue<T>(key: string, fallback: T): T {
  try { return JSON.parse(localStorage.getItem(key) ?? JSON.stringify(fallback)) as T }
  catch { return fallback }
}

function App() {
  const [unitId, setUnitId] = useState<UnitId | null>(urlUnit)
  const [bankOpen, setBankOpen] = useState(() => new URLSearchParams(location.search).get('vista') === 'banco')
  const [tab, setTab] = useState<TabId>('class')
  const [menuOpen, setMenuOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [theme, setTheme] = useState<'light' | 'dark'>(() => savedValue('arq1-theme', 'light'))
  const [online, setOnline] = useState(navigator.onLine)
  const [installEvent, setInstallEvent] = useState<InstallEvent | null>(null)
  const [done, setDone] = useState<UnitId[]>(() => savedValue('arq1-completed', []))
  const [notes, setNotes] = useState<Record<string, string>>(() => savedValue('arq1-notes', {}))
  const activeUnit = units.find((item) => item.id === unitId) ?? null

  useEffect(() => {
    const syncUrl = () => {
      setUnitId(urlUnit())
      setBankOpen(new URLSearchParams(location.search).get('vista') === 'banco')
    }
    const goOnline = () => setOnline(true)
    const goOffline = () => setOnline(false)
    const offerInstall = (event: Event) => { event.preventDefault(); setInstallEvent(event as InstallEvent) }
    window.addEventListener('popstate', syncUrl)
    window.addEventListener('online', goOnline)
    window.addEventListener('offline', goOffline)
    window.addEventListener('beforeinstallprompt', offerInstall)
    return () => {
      window.removeEventListener('popstate', syncUrl)
      window.removeEventListener('online', goOnline)
      window.removeEventListener('offline', goOffline)
      window.removeEventListener('beforeinstallprompt', offerInstall)
    }
  }, [])

  useEffect(() => localStorage.setItem('arq1-completed', JSON.stringify(done)), [done])
  useEffect(() => localStorage.setItem('arq1-notes', JSON.stringify(notes)), [notes])
  useEffect(() => {
    document.documentElement.dataset.theme = theme
    localStorage.setItem('arq1-theme', JSON.stringify(theme))
  }, [theme])

  function navigate(next: UnitId | null) {
    setUnitId(next); setBankOpen(false); setTab('class'); setMenuOpen(false); setQuery('')
    const url = new URL(location.href)
    if (next) url.searchParams.set('unidad', next)
    else url.searchParams.delete('unidad')
    url.searchParams.delete('vista')
    history.pushState({}, '', url)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function navigateToBank() {
    setUnitId(null); setBankOpen(true); setMenuOpen(false); setQuery('')
    const url = new URL(location.href)
    url.searchParams.delete('unidad')
    url.searchParams.set('vista', 'banco')
    history.pushState({}, '', url)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  async function install() {
    if (!installEvent) return
    await installEvent.prompt(); await installEvent.userChoice; setInstallEvent(null)
  }

  return <div className="app-shell">
    <button className={`scrim ${menuOpen ? 'is-visible' : ''}`} aria-label="Cerrar navegación" onClick={() => setMenuOpen(false)} tabIndex={menuOpen ? 0 : -1} />
    <aside className={`sidebar ${menuOpen ? 'sidebar-open' : ''}`}>
      <div className="brand-lockup"><div className="brand-mark"><Cpu size={23} /></div><div><span className="brand-name">ARQ<span>/</span>LAB</span><span className="brand-caption">Aula de arquitectura</span></div><button className="icon-button sidebar-close" aria-label="Cerrar menú" onClick={() => setMenuOpen(false)}><X size={20} className="icon-animate" /></button></div>
      <nav className="side-nav" aria-label="Navegación del curso">
        <span className="nav-label">ESPACIO DE APRENDIZAJE</span>
        <button className={`nav-link ${!activeUnit && !bankOpen ? 'nav-link-active' : ''}`} onClick={() => navigate(null)}><Home size={19} className="icon-animate" /><span>Inicio</span>{!activeUnit && !bankOpen && <span className="nav-active-mark" />}</button>
        <button className={`nav-link ${bankOpen ? 'nav-link-active' : ''}`} onClick={navigateToBank}><CircleHelp size={19} className="icon-animate" /><span>Banco de preguntas</span>{bankOpen && <span className="nav-active-mark" />}</button>
        <div className="nav-divider" /><div className="nav-heading"><span className="nav-label">RUTA FORMATIVA</span><span className="nav-count">06</span></div>
        {units.map((unit, index) => { const Icon = unitIcons[index]; return <button key={unit.id} className={`nav-link unit-nav-link ${unitId === unit.id ? 'nav-link-active' : ''}`} onClick={() => navigate(unit.id)} aria-current={unitId === unit.id ? 'page' : undefined}><span className={`nav-unit-icon tone-${unit.tone}`}><Icon size={17} className="icon-animate" /></span><span className="nav-unit-text"><span>{unit.code}</span>{unit.title}</span>{done.includes(unit.id) && <CheckCircle2 size={16} className="nav-completed" />}{unitId === unit.id && <span className="nav-active-mark" />}</button> })}
      </nav>
      <div className="sidebar-bottom"><div className="semester-note"><span className="semester-orbit"><GraduationCap size={18} className="icon-animate" /></span><div><strong>Primer semestre</strong><span>Ingeniería Informática</span></div><ArrowDownRight size={16} className="semester-arrow" /></div><span className="sidebar-footnote">Universidad Autónoma Juan Misael Saracho</span></div>
    </aside>

    <div className="app-main">
      <header className="topbar"><div className="topbar-leading"><button className="icon-button menu-toggle" aria-label="Abrir menú" onClick={() => setMenuOpen(true)}><Menu size={22} className="icon-animate" /></button><span className="breadcrumb">DIC-112 <span>/</span> Arquitectura de Computadores I</span></div><div className="topbar-actions"><button className="theme-switch" aria-label={theme === 'light' ? 'Activar tema oscuro' : 'Activar tema claro'} title={theme === 'light' ? 'Tema oscuro' : 'Tema claro'} onClick={() => setTheme((current) => current === 'light' ? 'dark' : 'light')}>{theme === 'light' ? <Moon size={18} className="icon-animate" /> : <Sun size={18} className="icon-animate" />}<span>{theme === 'light' ? 'Oscuro' : 'Claro'}</span></button><span className={`connection-status ${online ? '' : 'connection-offline'}`}>{online ? <Wifi size={15} /> : <WifiOff size={15} />}{online ? 'En línea' : 'Disponible sin conexión'}</span>{installEvent && <button className="install-button" onClick={install}><Download size={16} className="icon-animate" /> Instalar app</button>}<div className="avatar-chip" aria-label="Estudiante">AR</div></div></header>
      <main className="content-area"><div className="content-inner">{activeUnit ? <UnitPage unit={activeUnit} tab={tab} setTab={setTab} done={done.includes(activeUnit.id)} toggleDone={() => setDone((current) => current.includes(activeUnit.id) ? current.filter((id) => id !== activeUnit.id) : [...current, activeUnit.id])} note={notes[activeUnit.id] ?? ''} setNote={(value) => setNotes((current) => ({ ...current, [activeUnit.id]: value }))} onNavigate={navigate} /> : bankOpen ? <QuestionBankPage query={query} setQuery={setQuery} /> : <HomePage query={query} setQuery={setQuery} doneCount={done.length} onNavigate={navigate} onOpenBank={navigateToBank} />}</div></main>
    </div>
  </div>
}

function HomePage({ query, setQuery, doneCount, onNavigate, onOpenBank }: { query: string; setQuery: (value: string) => void; doneCount: number; onNavigate: (id: UnitId | null) => void; onOpenBank: () => void }) {
  const visible = units.filter((unit) => [unit.title, unit.summary, ...unit.topics, ...unit.lab.steps, ...unit.autonomous].join(' ').toLocaleLowerCase('es').includes(query.trim().toLocaleLowerCase('es')))
  return <>
    <section className="welcome-row"><div><div className="eyebrow"><span className="eyebrow-dot" /> CURSO · PRIMER SEMESTRE</div><h1>Explora lo que ocurre<br /><span>dentro del computador.</span></h1><p className="welcome-copy">Conceptos, prácticas y actividades para entender la arquitectura desde sus componentes.</p></div><div className="welcome-stamp"><div className="stamp-ring"><CircuitBoard size={35} className="icon-animate" /></div><span>TEORÍA<br />+ PRÁCTICA</span></div></section>
    <section className="course-stats" aria-label="Datos del curso"><div className="stat-item"><span className="stat-number">06</span><span>elementos de<br />competencia</span></div><div className="stat-item"><span className="stat-number">120<span className="stat-unit">h</span></span><span>aprendizaje<br />con docente</span></div><div className="stat-item"><span className="stat-number">120<span className="stat-unit">h</span></span><span>trabajo<br />autónomo</span></div><div className="stat-progress"><div className="stat-progress-copy"><span>Tu recorrido</span><strong>{doneCount} de 6 revisadas</strong></div><div className="progress-track"><span style={{ width: `${doneCount / 6 * 100}%` }} /></div></div></section>
    <section className="field-note"><img src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1100&q=85" alt="Placa electrónica con circuitos y componentes de computadora" className="field-image" /><div className="field-overlay" /><div className="field-caption"><span><Sparkles size={15} /> APRENDER HACIENDO</span><strong>Del concepto<br />al laboratorio.</strong></div><button className="field-cta" onClick={() => onNavigate('ec1')} aria-label="Comenzar por memorias"><ArrowRight size={20} className="icon-animate" /></button></section>
    <section className="route-section"><div className="section-heading"><div><span className="section-kicker">MAPA DEL CURSO</span><h2>Tu ruta formativa</h2></div><label className="search-box"><Search size={18} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar tema o práctica" aria-label="Buscar tema o práctica" />{query && <button type="button" className="clear-search" onClick={() => setQuery('')} aria-label="Limpiar búsqueda"><X size={15} /></button>}</label></div>
      <div className="unit-grid">{visible.map((unit) => { const index = units.indexOf(unit); const Icon = unitIcons[index]; return <button key={unit.id} className={`unit-card tone-${unit.tone}`} onClick={() => onNavigate(unit.id)}><span className="unit-card-top"><span className="unit-symbol"><Icon size={22} className="icon-animate" /></span><span className="unit-code">{unit.code}</span></span><span className="unit-card-title">{unit.title}<ArrowRight size={17} className="card-arrow icon-animate" /></span><span className="unit-card-summary">{unit.summary}</span><span className="unit-card-bottom"><span>{unit.topics.length} temas</span><span className="unit-card-dot" /><span>clase + práctica</span></span></button> })}{visible.length === 0 && <div className="empty-results"><Search size={25} /><strong>No encontramos ese tema</strong><span>Prueba con “memoria”, “buses” o “mantenimiento”.</span></div>}</div>
    </section>
    <section className="bank-promo"><div><span className="section-kicker">REPASO DEL CURSO</span><h2>¿Quieres conectar los temas?</h2><p>Explora preguntas de opción múltiple organizadas por elemento de competencia.</p></div><button onClick={onOpenBank}>Abrir banco de preguntas <ArrowRight size={18} className="icon-animate" /></button></section>
    <section className="bottom-note"><div className="bottom-note-icon"><Lightbulb size={21} className="icon-animate" /></div><div><strong>Aprende a tu ritmo, practica con propósito.</strong><p>Las notas y unidades revisadas se guardan en este dispositivo.</p></div><span className="local-badge">SOLO EN ESTE EQUIPO</span></section><Footer />
  </>
}

function UnitPage({ unit, tab, setTab, done, toggleDone, note, setNote, onNavigate }: { unit: Unit; tab: TabId; setTab: (tab: TabId) => void; done: boolean; toggleDone: () => void; note: string; setNote: (value: string) => void; onNavigate: (id: UnitId | null) => void }) {
  const index = units.indexOf(unit)
  const Icon = unitIcons[index]
  return <article className={`unit-page tone-${unit.tone}`}>
    <button className="back-link" onClick={() => onNavigate(null)}><ArrowLeft size={17} className="icon-animate" /> Volver al mapa del curso</button>
    <header className="unit-header"><div className="unit-heading-copy"><div className="eyebrow"><span className="eyebrow-dot" /> {unit.code} <span>/</span> ELEMENTO DE COMPETENCIA {index + 1}</div><h1>{unit.title}<span className="unit-title-period">.</span></h1><p className="unit-lead">{unit.summary}</p><div className="unit-header-meta"><span><BookOpen size={15} /> {unit.topics.length} temas</span><span><CircuitBoard size={15} /> Clase + laboratorio</span></div></div><div className="unit-header-art"><div className="art-grid" /><div className="art-orbit orbit-one" /><div className="art-orbit orbit-two" /><div className="art-core"><Icon size={54} strokeWidth={1.5} className="icon-animate" /></div><span className="art-code">{unit.code}</span></div></header>
    <div className="objective-band"><span className="objective-icon"><GraduationCap size={21} className="icon-animate" /></span><div><span className="micro-label">AL TERMINAR, PODRÁS</span><p>{unit.objective}</p></div><button className={`complete-button ${done ? 'is-complete' : ''}`} onClick={toggleDone}>{done ? <Check size={17} /> : <CheckCircle2 size={17} />}<span>{done ? 'Revisada' : 'Marcar revisada'}</span></button></div>
    <div className="learning-layout"><div className="learning-main"><div className="tab-list" role="tablist" aria-label="Secciones de aprendizaje">{tabs.map((item) => { const TabIcon = item.icon; return <button key={item.id} role="tab" aria-selected={tab === item.id} className={`learning-tab ${tab === item.id ? 'tab-active' : ''}`} onClick={() => setTab(item.id)}><TabIcon size={17} className="icon-animate" /><span>{item.label}</span></button> })}</div><section className="lesson-panel" role="tabpanel">{tab === 'class' && <ClassContent unit={unit} />}{tab === 'lab' && <LabContent unit={unit} note={note} setNote={setNote} />}{tab === 'autonomous' && <AutonomousContent unit={unit} />}{tab === 'questions' && <QuestionContent unit={unit} />}</section></div>
      <aside className="unit-aside"><section className="aside-card topic-card"><div className="aside-title"><span className="aside-heading-icon"><BookOpen size={17} /></span><h3>En esta unidad</h3></div><ol className="topic-list">{unit.topics.map((topic, i) => <li key={topic}><span>{String(i + 1).padStart(2, '0')}</span>{topic}</li>)}</ol></section><section className="aside-card evidence-card"><span className="micro-label">EVIDENCIA DEL PROGRAMA</span><p>{unit.evidence}</p><span className="evidence-tag"><CheckCircle2 size={14} /> Aprendizaje aplicado</span></section><section className="next-unit-card"><div><span>CONTINÚA LA RUTA</span><strong>{units[index + 1]?.title ?? 'Volver al inicio'}</strong></div><button className="next-button" aria-label="Siguiente unidad" onClick={() => onNavigate(units[index + 1]?.id ?? null)}><ArrowRight size={20} className="icon-animate" /></button></section></aside>
    </div>
    <div className="unit-pagination"><button disabled={index === 0} onClick={() => onNavigate(units[index - 1]?.id ?? null)}><ArrowLeft size={16} /> Anterior</button><span>{String(index + 1).padStart(2, '0')} <i>/</i> 06</span><button onClick={() => onNavigate(units[index + 1]?.id ?? null)}>{index === 5 ? 'Finalizar ruta' : 'Siguiente'} <ArrowRight size={16} /></button></div><Footer />
  </article>
}

function ClassContent({ unit }: { unit: Unit }) {
  const [slideIndex, setSlideIndex] = useState(0)
  const slide = unit.presentation[slideIndex]
  return <div className="content-block enter-content"><div className="panel-overline"><span className="section-kicker">PRESENTACIÓN GUIADA · {unit.code}</span><span className="duration-pill"><Activity size={14} /> {unit.presentation.length} diapositivas</span></div><h2>{unit.title}<br /><span>conceptos y conexiones.</span></h2><p className="panel-intro">Secuencia para explicar, ejemplificar y guiar preguntas en clase.</p>
    <div className="slide-progress"><span>DIAPOSITIVA {String(slideIndex + 1).padStart(2, '0')} / {String(unit.presentation.length).padStart(2, '0')}</span><div><span style={{ width: `${((slideIndex + 1) / unit.presentation.length) * 100}%` }} /></div></div>
    {unit.sourceNote && <p className="source-note"><strong>Fuente y alcance:</strong> {unit.sourceNote}</p>}
    <article className="presentation-slide" key={`${unit.id}-${slideIndex}`}><span className="slide-number">{String(slideIndex + 1).padStart(2, '0')}</span><span className="slide-topic">TEMA {String(slideIndex + 1).padStart(2, '0')} · {slide.topic ?? unit.topics[slideIndex]}</span><h3>{slide.title}</h3><p className="slide-explanation">{slide.explanation}</p><div className="slide-points"><span className="micro-label">PUNTOS PARA EXPLICAR</span><ul>{slide.keyPoints.map((point) => <li key={point}>{point}</li>)}</ul></div><div className="slide-example"><span><Lightbulb size={16} /> EJEMPLO PARA PIZARRA</span><p>{slide.example}</p></div><div className="teacher-prompt"><span><GraduationCap size={16} /> GUÍA PARA CONDUCIR LA CLASE</span><p>{slide.teacherPrompt}</p></div></article>
    <div className="slide-controls"><button disabled={slideIndex === 0} onClick={() => setSlideIndex((index) => Math.max(index - 1, 0))}><ArrowLeft size={16} /> Anterior</button><div className="slide-dots" aria-label="Seleccionar diapositiva">{unit.presentation.map((item, index) => <button key={item.title} aria-label={`Diapositiva ${index + 1}: ${item.title}`} aria-current={slideIndex === index ? 'step' : undefined} className={slideIndex === index ? 'slide-dot-active' : ''} onClick={() => setSlideIndex(index)} />)}</div><button onClick={() => setSlideIndex((index) => Math.min(index + 1, unit.presentation.length - 1))}>Siguiente <ArrowRight size={16} /></button></div>
    <div className="key-idea"><span className="key-idea-icon"><Lightbulb size={19} className="icon-animate" /></span><div><span className="micro-label">IDEA CENTRAL DE LA UNIDAD</span><p>{unit.keyIdea}</p></div></div></div>
}

function QuestionBankPage({ query, setQuery }: { query: string; setQuery: (value: string) => void }) {
  const [unitFilter, setUnitFilter] = useState<UnitId | 'all'>('all')
  const questionRows = units.flatMap((unit) => unit.questions.map((question, index) => ({ unit, question, number: index + 1 })))
  const filteredQuestions = questionRows.filter(({ unit, question }) => {
    const matchesUnit = unitFilter === 'all' || unit.id === unitFilter
    const haystack = [question.prompt, ...question.options, question.explanation, unit.title].join(' ').toLocaleLowerCase('es')
    return matchesUnit && haystack.includes(query.trim().toLocaleLowerCase('es'))
  })
  return <section className="question-bank-page"><button className="back-link" onClick={() => { history.pushState({}, '', location.pathname); window.dispatchEvent(new PopStateEvent('popstate')) }}><ArrowLeft size={17} className="icon-animate" /> Volver al curso</button><div className="bank-heading"><div><div className="eyebrow"><span className="eyebrow-dot" /> BANCO GENERAL · EC1–EC6</div><h1>Preguntas para <span>repasar.</span></h1><p>Cuestionarios de opción múltiple basados en los temas del curso. Funcionan como material de estudio: no califican ni guardan respuestas.</p></div><div className="bank-total"><strong>{filteredQuestions.length}</strong><span>preguntas<br />disponibles</span></div></div><div className="bank-filters"><label className="search-box"><Search size={18} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar conceptos, respuestas o unidades" aria-label="Buscar en el banco de preguntas" /></label><label className="unit-filter"><span>Filtrar por EC</span><select value={unitFilter} onChange={(event) => setUnitFilter(event.target.value as UnitId | 'all')}><option value="all">Todos los elementos</option>{units.map((unit) => <option key={unit.id} value={unit.id}>{unit.code} · {unit.title}</option>)}</select></label></div><div className="bank-question-list">{filteredQuestions.map(({ unit, question, number }) => <article className="question-card bank-question-card" key={`${unit.id}-${question.prompt}`}><div className="bank-question-meta"><span className={`bank-unit-tag tone-${unit.tone}`}>{unit.code} · {unit.title}</span><span className="question-number">PREGUNTA {String(number).padStart(2, '0')}</span></div><h2>{question.prompt}</h2><ol className="answer-options">{question.options.map((option, index) => <li key={option}><span>{String.fromCharCode(65 + index)}</span>{option}</li>)}</ol><details className="answer-explanation"><summary>Ver respuesta orientativa <ChevronDown size={16} /></summary><p><strong>{String.fromCharCode(65 + question.correct)}.</strong> {question.explanation}</p></details></article>)}{filteredQuestions.length === 0 && <div className="empty-results"><Search size={25} /><strong>No hay preguntas con esos filtros</strong><span>Cambia el elemento de competencia o la búsqueda.</span></div>}</div><Footer /></section>
}

function LabContent({ unit, note, setNote }: { unit: Unit; note: string; setNote: (value: string) => void }) {
  function updateNote(event: FormEvent<HTMLTextAreaElement>) { setNote(event.currentTarget.value) }
  return <div className="content-block enter-content"><div className="panel-overline"><span className="section-kicker">PRÁCTICA DE LABORATORIO</span><span className="duration-pill"><MonitorCog size={14} /> Guía paso a paso</span></div><h2>{unit.lab.title}</h2><p className="panel-intro">{unit.lab.objective}</p><div className="equipment-strip"><span className="equipment-icon"><HardDrive size={18} /></span><div><span className="micro-label">MATERIALES Y EQUIPO</span><p>{unit.lab.equipment.join(' · ')}</p></div></div><div className="safety-note"><ShieldCheck size={18} /><p><strong>Antes de empezar:</strong> {unit.lab.safety}</p></div><ol className="lab-steps">{unit.lab.steps.map((step, i) => <li key={step}><span className="step-number">{String(i + 1).padStart(2, '0')}</span><div><strong>{step}</strong><span>Pausa y registra qué observas antes de continuar.</span></div><CheckCircle2 size={19} className="step-check" /></li>)}</ol><div className="observation-box"><div className="observation-heading"><span><NotebookPen size={17} /> CUADERNO DE LABORATORIO</span><span className="local-badge">GUARDADO EN ESTE EQUIPO</span></div><label htmlFor="lab-notes">Observaciones, datos o dudas que quieras retomar</label><textarea id="lab-notes" value={note} onChange={updateNote} placeholder="Escribe aquí tus observaciones..." rows={4} /><div className="notes-status"><span><CheckCircle2 size={14} /> Se guarda automáticamente en este navegador</span><span>{note.length} caracteres</span></div></div><div className="expected-result"><span className="result-icon"><Sparkles size={17} /></span><div><span className="micro-label">QUÉ DEBES PODER EXPLICAR</span><p>{unit.lab.expected}</p></div></div></div>
}

function AutonomousContent({ unit }: { unit: Unit }) {
  return <div className="content-block enter-content"><div className="panel-overline"><span className="section-kicker">TRABAJO AUTÓNOMO</span><span className="duration-pill"><NotebookPen size={14} /> Estudia y aplica</span></div><h2>Un paso más,<br /><span>a tu propio ritmo.</span></h2><p className="panel-intro">Actividades para acompañar lo trabajado en clase, volver a los conceptos y plantear nuevas preguntas.</p><div className="autonomous-list">{unit.autonomous.map((task, i) => <div className="autonomous-item" key={task}><span className={`task-symbol task-tone-${i % 3}`}>{i === 0 ? <BookOpen size={19} /> : i === 1 ? <Search size={19} /> : <NotebookPen size={19} />}</span><div><span className="micro-label">ACTIVIDAD {String(i + 1).padStart(2, '0')}</span><p>{task}</p></div><ArrowRight size={17} className="autonomous-arrow icon-animate" /></div>)}</div><div className="reflection-box"><span className="reflection-mark">“</span><div><span className="micro-label">PARA CERRAR</span><p>{unit.reflection}</p></div></div></div>
}

function QuestionContent({ unit }: { unit: Unit }) {
  return <div className="content-block enter-content"><div className="panel-overline"><span className="section-kicker">CUESTIONARIO · MATERIAL DE REPASO</span><span className="duration-pill"><CircleHelp size={14} /> Opción múltiple</span></div><h2>Comprueba cómo<br /><span>conectas las ideas.</span></h2><p className="panel-intro">Preguntas para estudiar. No se envían respuestas ni se registra una calificación.</p><div className="question-list">{unit.questions.map((question, i) => <article className="question-card" key={question.prompt}><div className="question-number">PREGUNTA {String(i + 1).padStart(2, '0')}</div><h3>{question.prompt}</h3><ol className="answer-options">{question.options.map((option, j) => <li key={option}><span>{String.fromCharCode(65 + j)}</span>{option}</li>)}</ol><details className="answer-explanation"><summary>Ver respuesta orientativa <ChevronDown size={16} /></summary><p><strong>{String.fromCharCode(65 + question.correct)}.</strong> {question.explanation}</p></details></article>)}</div></div>
}

function Footer() { return <footer className="site-footer"><span>ARQ/LAB · DIC-112</span><span>Material formativo basado en el Proyecto Formativo V2</span></footer> }

export default App
