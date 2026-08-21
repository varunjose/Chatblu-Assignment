import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import {
  ArrowRight,
  BarChart3,
  BellRing,
  BriefcaseBusiness,
  Building2,
  CalendarCheck2,
  Check,
  ChevronRight,
  CircleCheck,
  Clock3,
  HeartHandshake,
  Hotel,
  LineChart,
  Menu,
  MessageCircle,
  MoonStar,
  Sparkles,
  SunMedium,
  UserRoundCheck,
  UsersRound,
  UtensilsCrossed,
  Workflow,
  X,
} from 'lucide-react'
import './styles.css'

const bookDemoUrl = 'https://chatblu.ai/book/'
const brandMarkUrl = `${import.meta.env.BASE_URL}chatblu-mark.png`
const wordmarkUrl = `${import.meta.env.BASE_URL}chatblu-wordmark.png`
const imageBase = `${import.meta.env.BASE_URL}images/`
const pressLogoBase = `${import.meta.env.BASE_URL}logos/press/`

const navItems = [
  ['Platform', '#platform'],
  ['Watch demo', '#watch-demo'],
  ['Who it is for', '#for-hotels'],
  ['Value', '#value'],
  ['Why ChatBlu', '#why-chatblu'],
]

const guestOperations = [
  {
    number: '01',
    moment: 'Before arrival',
    title: 'Check-in, already prepared',
    description:
      'Confirm details, collect preferences, coordinate early arrivals, and answer questions on WhatsApp, voice, or chat.',
    icon: CalendarCheck2,
    view: 'arrival',
  },
  {
    number: '02',
    moment: 'During the stay',
    title: 'Dinner, reserved',
    description:
      'Find the right table, remember dietary needs, make the booking, and post eligible charges back to the folio.',
    icon: UtensilsCrossed,
    view: 'dining',
  },
  {
    number: '03',
    moment: 'Wellness',
    title: 'Spa, thoughtfully booked',
    description:
      'Recommend treatments, fill open appointments, remember therapist preferences, and confirm every detail.',
    icon: Sparkles,
    view: 'wellness',
  },
  {
    number: '04',
    moment: 'Any hour',
    title: 'Every request, followed through',
    description:
      'Handle transport, room service, housekeeping, local recommendations, and service recovery, with a human handoff when judgment matters.',
    icon: MoonStar,
    view: 'requests',
  },
]

const hotelOperations = [
  {
    number: '01',
    moment: 'On demand',
    title: 'Financial analysis, in plain English',
    description:
      'Ask questions about the P&L, compare departments, surface anomalies, and understand what changed without building another report.',
    icon: BarChart3,
    view: 'analysis',
  },
  {
    number: '02',
    moment: 'Live property view',
    title: 'Occupancy that explains itself',
    description:
      'Track occupancy, ADR, RevPAR, pickup, cancellations, and pace, with context across dates and properties.',
    icon: LineChart,
    view: 'property',
  },
  {
    number: '03',
    moment: 'Every morning',
    title: 'The GM briefing, ready',
    description:
      'Review arrivals, VIPs, unresolved requests, staffing pressure, revenue movement, and operational risks before the first meeting.',
    icon: SunMedium,
    view: 'briefing',
  },
  {
    number: '04',
    moment: 'Across departments',
    title: 'Work routed and closed',
    description:
      'Turn guest intent into housekeeping, finance, HR, and operations workflows, then write outcomes back to each system of record.',
    icon: Workflow,
    view: 'workflow',
  },
]

const audiences = [
  {
    icon: Hotel,
    label: 'Hotel leaders',
    title: 'See the whole property without chasing every detail.',
    copy: 'A clearer view of guest needs, operating pressure, and what deserves attention next.',
  },
  {
    icon: HeartHandshake,
    label: 'Guest-facing teams',
    title: 'Stay present with guests, not buried in repetitive work.',
    copy: 'Consistent answers and thoughtful follow-through, with people stepping in when judgment matters.',
  },
  {
    icon: UsersRound,
    label: 'Department teams',
    title: 'Receive work with context, ownership, and a path to closure.',
    copy: 'Less ambiguity between departments and a shared understanding of the guest behind each request.',
  },
]

const differences = [
  {
    number: '01',
    title: 'One shared intelligence',
    copy: 'Guest preferences, property context, and operational priorities inform the same conversation.',
  },
  {
    number: '02',
    title: 'Action, not another inbox',
    copy: 'ChatBlu moves from understanding a request to coordinating what should happen next.',
  },
  {
    number: '03',
    title: 'Hospitality in the loop',
    copy: 'Automation handles the predictable. Hotel teams keep the moments that need empathy and judgment.',
  },
]

const operatorBrands = [
  { name: 'Courtyard', detail: 'by Marriott' },
  { name: 'Unscripted', detail: 'by Hyatt' },
  { name: 'Meliá', detail: 'Hotels & Resorts' },
  { name: 'Grand Isle', detail: 'Resort & Residences' },
  { name: 'Anichi', detail: 'Resort & Spa' },
]

const testimonials = [
  {
    property: 'Marriott Courtyard',
    quote:
      'ChatBlu helped us save 36% in payroll for our opening hiring plan, automating the equivalent of 16 FTE roles.',
    name: 'Richard Dillon',
    role: 'COO, Marriott Courtyard, Dominica',
    featured: true,
  },
  {
    property: 'Anichi Resort',
    quote: 'Our back office costs dropped 30% and nothing slips through the cracks anymore.',
    name: 'Alick Lawrence',
    role: 'Owner, Anichi Resort',
  },
  {
    property: 'PPM Corporation',
    quote: 'Our resolution time dropped 39% and our guest scores have never been higher.',
    name: 'Purvi Panwala',
    role: 'President, PPM Corporation',
  },
]

const pressLogos = [
  {
    name: 'Forbes',
    logo: 'forbes.svg',
    href: 'https://forbes.es/brandvoice/782612/chatblu-el-gestor-de-inventario-con-ia-made-in-spain-que-hara-que-los-duenos-de-tiendas-online-se-podran-olvidar-ya-de-su-inventario/',
  },
  {
    name: 'Business Insider',
    logo: 'business_insider.svg',
    href: 'https://markets.businessinsider.com/news/stocks/chatblu-raises-500k-to-launch-first-autonomous-ai-inventory-agent-aiming-to-replace-human-managers-in-e-commerce-1035005149',
  },
  {
    name: 'Yahoo Finance',
    logo: 'yahoo_finance.svg',
    href: 'https://finance.yahoo.com/news/ai-startup-chatblu-secures-500k-214300643.html',
  },
  {
    name: 'GQ',
    logo: 'gq.svg',
    href: 'https://gq.co.za/culture/tech/how-chatblu-helps-brands-backed-by-mls-pros-like-atlaua-to-save-costs-using-ai/',
  },
  {
    name: 'Daily Mail',
    logo: 'daily_mail.svg',
    href: 'https://www.dailymail.co.uk/news/article-15010405/Kristian-Lukauskis-Alexander-Dillon-Join-Europes-Youngest-Founders-500K-AI-Startup-Raise.html',
  },
  {
    name: 'Mashable',
    logo: 'mashable.svg',
    href: 'https://nl.mashable.com/ecommerce/11809/inside-chatblus-game-changing-approach-to-multi-platform-inventory-management-that-has-vcs-with-y-combinator',
  },
]

function Brand() {
  return (
    <a className="brand" href="#top" aria-label="ChatBlu home">
      <img src={brandMarkUrl} alt="" />
      <span>ChatBlu</span>
    </a>
  )
}

function ArrowButton({ children, href, variant = 'primary', external = false }) {
  return (
    <a
      className={`button button--${variant}`}
      href={href}
      {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
    >
      <span>{children}</span>
      <ArrowRight size={17} aria-hidden="true" />
    </a>
  )
}

function Reveal({ children, className = '', delay = 0, direction = 'up', ...props }) {
  const reduceMotion = useReducedMotion()
  const axis = direction === 'left' ? { x: 18, y: 0 } : direction === 'right' ? { x: -18, y: 0 } : { x: 0, y: 20 }

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, ...axis }}
      whileInView={reduceMotion ? undefined : { opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.14 }}
      transition={{ duration: 0.62, delay, ease: [0.22, 1, 0.36, 1] }}
      {...props}
    >
      {children}
    </motion.div>
  )
}

function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.classList.toggle('menu-open', open)
    return () => document.body.classList.remove('menu-open')
  }, [open])

  return (
    <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="header-inner">
        <Brand />
        <nav className="desktop-nav" aria-label="Main navigation">
          {navItems.map(([label, href]) => (
            <a key={href} href={href}>
              {label}
            </a>
          ))}
        </nav>
        <div className="header-actions">
          <a className="header-demo" href={bookDemoUrl} target="_blank" rel="noreferrer">
            Book a demo <ArrowRight size={15} aria-hidden="true" />
          </a>
          <button
            className="menu-button"
            type="button"
            aria-expanded={open}
            aria-controls="mobile-navigation"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-navigation"
            className="mobile-nav"
            aria-label="Mobile navigation"
            initial={{ opacity: 0, y: -14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.22 }}
          >
            {navItems.map(([label, href], index) => (
              <motion.a
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.045 }}
              >
                <span>{label}</span>
                <ChevronRight size={18} />
              </motion.a>
            ))}
            <ArrowButton href={bookDemoUrl} external>
              Book a demo
            </ArrowButton>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}

function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero-noise" aria-hidden="true" />
      <div className="page-shell hero-layout">
        <div className="hero-copy">
          <motion.p
            className="eyebrow eyebrow--ink"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
          >
            AI agents for hotel operations
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.82, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          >
            Hospitality,
            <br />
            handled <em>as one.</em>
          </motion.h1>
          <motion.p
            className="hero-intro"
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.72, delay: 0.2 }}
          >
            ChatBlu is one AI platform for the guest experience and the hotel operation, answering,
            coordinating, and helping every part of the property move with more context.
          </motion.p>
          <motion.div
            className="hero-actions"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.3 }}
          >
            <ArrowButton href={bookDemoUrl} external>
              Book a demo
            </ArrowButton>
            <ArrowButton href="#platform" variant="text">
              Explore the platform
            </ArrowButton>
          </motion.div>
        </div>

        <motion.div
          className="hero-visual"
          initial={{ opacity: 0, scale: 0.97, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.95, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
        >
          <img src={`${imageBase}chatblu-hero-hotel.webp`} alt="An atmospheric hotel interior" />
          <div className="hero-visual-shade" aria-hidden="true" />
          <motion.div
            className="hero-conversation"
            animate={{ y: [0, -4, 0], rotate: [-1.15, -0.7, -1.15] }}
            transition={{ duration: 5.8, repeat: Infinity, ease: 'easeInOut' }}
          >
            <div className="conversation-topline">
              <span className="imessage-avatar" aria-hidden="true">M</span>
              <span>
                <strong>Guest · Room 412</strong>
                <small>iMessage</small>
              </span>
              <span className="imessage-info" aria-hidden="true">i</span>
            </div>
            <div className="imessage-thread">
              <span className="imessage-timestamp">Today 11:42 AM</span>
              <div className="imessage-bubble imessage-bubble--guest">
                <p>Could I arrive early, and can you book dinner for two?</p>
              </div>
              <div className="imessage-bubble imessage-bubble--chatblu">
                <p>Absolutely. Your arrival is noted, and dinner is being coordinated.</p>
              </div>
              <span className="message-meta">Delivered</span>
            </div>
            <div className="understood-row">
              <span><Check size={13} /> Arrival coordinated</span>
              <span><Check size={13} /> Dining in motion</span>
            </div>
          </motion.div>
          <motion.div
            className="hero-context-card hero-context-card--action"
            animate={{ y: [0, 3, 0], rotate: [-1.7, -1.05, -1.7] }}
            transition={{ duration: 6.6, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
          >
            <div className="context-card-heading">
              <span>Hotel action</span>
              <small>Live</small>
            </div>
            <div className="context-action-row">
              <CircleCheck size={17} aria-hidden="true" />
              <span><strong>Arrival coordinated</strong><small>Front desk has the guest context</small></span>
            </div>
            <div className="context-action-row context-action-row--pending">
              <Clock3 size={17} aria-hidden="true" />
              <span><strong>Dining in motion</strong><small>Request sent to guest services</small></span>
            </div>
          </motion.div>
          <div className="hero-caption">
            <span>For the guest</span>
            <i aria-hidden="true" />
            <span>For the hotel</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function PressMarquee() {
  return (
    <section className="press-marquee" aria-label="As seen in">
      <div className="press-label">
        <span>Press folio</span>
        <strong>As seen in</strong>
        <small>Selected coverage</small>
      </div>
      <div className="press-window">
        <div className="press-track">
          {[false, true].map((duplicate) => (
            <div
              className="press-sequence"
              aria-hidden={duplicate ? 'true' : undefined}
              key={duplicate ? 'duplicate' : 'primary'}
            >
              {pressLogos.map(({ name, logo, href }, index) => (
                <a
                  className="press-logo-link"
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  tabIndex={duplicate ? -1 : undefined}
                  key={`${name}-${duplicate ? 'duplicate' : 'primary'}`}
                >
                  <span className="press-index">{String(index + 1).padStart(2, '0')}</span>
                  <img src={`${pressLogoBase}${logo}`} alt={duplicate ? '' : name} />
                </a>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function ArrivalVisual() {
  return (
    <div className="tour-scene arrival-scene">
      <div className="scene-label"><MessageCircle size={14} /> Guest conversation</div>
      <div className="message message--guest">Our flight lands early. Could we arrive around noon?</div>
      <div className="intent-row">
        <span>Early arrival</span><span>Preference captured</span>
      </div>
      <div className="route-line"><i /><span>ChatBlu is coordinating with the property</span></div>
      <div className="message message--blu">Of course. I’ve noted your arrival time and will keep you updated.</div>
      <div className="scene-status"><CircleCheck size={17} /> Arrival plan prepared</div>
    </div>
  )
}

function DiningVisual() {
  return (
    <div className="tour-scene dining-scene">
      <div className="scene-label"><UtensilsCrossed size={14} /> Dining request</div>
      <div className="message message--guest">Somewhere quiet for dinner. One of us is gluten-free.</div>
      <div className="reservation-card">
        <div><small>Recommended</small><strong>Terrace dining</strong></div>
        <div className="reservation-meta"><span>2 guests</span><span>7:30 PM</span><span>Gluten-free</span></div>
        <button type="button">Confirm reservation <ChevronRight size={14} /></button>
      </div>
      <div className="scene-status"><CircleCheck size={17} /> Guest preference remembered</div>
    </div>
  )
}

function WellnessVisual() {
  return (
    <div className="tour-scene wellness-scene">
      <div className="scene-label"><Sparkles size={14} /> Wellness concierge</div>
      <div className="message message--guest">Is there a relaxing treatment available tomorrow afternoon?</div>
      <div className="treatment-card">
        <div className="treatment-icon"><Sparkles size={19} /></div>
        <div><small>Matched to the guest</small><strong>Restorative massage</strong><span>Tomorrow · afternoon availability</span></div>
      </div>
      <div className="confirmation-strip"><Check size={15} /> Details ready to confirm</div>
    </div>
  )
}

function RequestsVisual() {
  return (
    <div className="tour-scene request-scene">
      <div className="scene-label"><BellRing size={14} /> Live guest requests</div>
      <div className="request-row"><span className="request-icon">01</span><div><strong>Airport transport</strong><small>Coordinating</small></div><i className="status-pulse" /></div>
      <div className="request-row"><span className="request-icon">02</span><div><strong>Extra pillows</strong><small>Housekeeping accepted</small></div><Check size={17} /></div>
      <div className="request-row request-row--human"><span className="request-icon"><UserRoundCheck size={15} /></span><div><strong>Service recovery</strong><small>Human attention recommended</small></div><ChevronRight size={17} /></div>
      <div className="scene-status"><CircleCheck size={17} /> Every request has a next step</div>
    </div>
  )
}

function AnalysisVisual() {
  return (
    <div className="tour-scene analysis-scene">
      <div className="scene-label"><BarChart3 size={14} /> Ask ChatBlu</div>
      <div className="analysis-question">What changed in food &amp; beverage performance this month?</div>
      <div className="thinking-line"><span /><span /><span /> Looking across the P&amp;L</div>
      <div className="analysis-answer">
        <small>Plain-English summary</small>
        <strong>The movement is concentrated in two operating areas.</strong>
        <p>Review the departmental comparison and the dates where the variance first appeared.</p>
      </div>
      <div className="context-chips"><span>Department comparison</span><span>Anomaly surfaced</span></div>
    </div>
  )
}

function PropertyVisual() {
  return (
    <div className="tour-scene property-scene">
      <div className="scene-label"><Building2 size={14} /> Live property view</div>
      <div className="property-heading"><div><small>Performance context</small><strong>Today, with the why attached.</strong></div><span>Live view</span></div>
      <div className="metric-grid">
        {['Occupancy', 'ADR', 'RevPAR', 'Pickup'].map((metric, index) => (
          <div className="metric-tile" key={metric}><span>{metric}</span><i style={{ '--fill': `${58 + index * 9}%` }} /></div>
        ))}
      </div>
      <div className="property-note"><LineChart size={17} /><span><strong>Pace in context</strong>Compare dates, cancellations, and property movement together.</span></div>
    </div>
  )
}

function BriefingVisual() {
  return (
    <div className="tour-scene briefing-scene">
      <div className="briefing-head"><div className="sun-icon"><SunMedium size={18} /></div><div><small>Morning briefing</small><strong>What needs your attention today</strong></div><span>Ready</span></div>
      <div className="briefing-list">
        {[
          ['Arrivals & VIPs', 'Prepared for review'],
          ['Unresolved requests', 'Follow-up highlighted'],
          ['Staffing pressure', 'Operating context included'],
          ['Revenue movement', 'Change explained'],
        ].map(([label, state], index) => (
          <div key={label}><span className="briefing-number">0{index + 1}</span><strong>{label}</strong><small>{state}</small><ChevronRight size={15} /></div>
        ))}
      </div>
    </div>
  )
}

function WorkflowVisual() {
  return (
    <div className="tour-scene workflow-scene">
      <div className="scene-label"><Workflow size={14} /> Cross-department workflow</div>
      <div className="workflow-origin"><MessageCircle size={17} /><span><small>Guest intent</small><strong>Request understood with context</strong></span></div>
      <div className="workflow-path" aria-hidden="true"><i /><i /><i /></div>
      <div className="workflow-teams">
        <span>Housekeeping</span><span>Finance</span><span>HR</span><span>Operations</span>
      </div>
      <div className="workflow-close"><CircleCheck size={18} /><span><strong>Outcome recorded</strong><small>Work closed with the result attached</small></span></div>
    </div>
  )
}

function TourVisual({ view }) {
  const visualMap = {
    arrival: ArrivalVisual,
    dining: DiningVisual,
    wellness: WellnessVisual,
    requests: RequestsVisual,
    analysis: AnalysisVisual,
    property: PropertyVisual,
    briefing: BriefingVisual,
    workflow: WorkflowVisual,
  }
  const Visual = visualMap[view]

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={view}
        className="tour-visual-content"
        initial={{ opacity: 0, y: 14, scale: 0.985 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -10, scale: 0.99 }}
        transition={{ duration: 0.36, ease: [0.22, 1, 0.36, 1] }}
      >
        <Visual />
      </motion.div>
    </AnimatePresence>
  )
}

function ProductTour() {
  const [side, setSide] = useState('guest')
  const [activeIndex, setActiveIndex] = useState(0)
  const operations = side === 'guest' ? guestOperations : hotelOperations
  const active = operations[activeIndex]

  const selectSide = (nextSide) => {
    setSide(nextSide)
    setActiveIndex(0)
  }

  return (
    <section className="platform-section" id="platform">
      <div className="platform-orbit platform-orbit--one" aria-hidden="true" />
      <div className="platform-orbit platform-orbit--two" aria-hidden="true" />
      <div className="page-shell">
        <Reveal className="platform-intro">
          <p className="eyebrow">One platform · The entire operation</p>
          <h2>Two sides of<br /><em>the same house.</em></h2>
          <p className="platform-summary">
            ChatBlu takes care of the guest experience up front and gives hotel teams the analysis,
            coordination, and answers they need behind the scenes.
          </p>
        </Reveal>

        <Reveal className="intelligence-bridge" delay={0.05} aria-label="Shared guest and property intelligence">
          <span aria-hidden="true" />
          <p><Sparkles size={15} /> Shared guest and property intelligence</p>
          <span aria-hidden="true" />
        </Reveal>

        <Reveal className="tour-switcher" delay={0.08} role="tablist" aria-label="Choose an operation view">
          <button
            type="button"
            role="tab"
            aria-selected={side === 'guest'}
            className={side === 'guest' ? 'is-active' : ''}
            onClick={() => selectSide('guest')}
          >
            <span>Guest operations</span>
            <strong>Front of house</strong>
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={side === 'hotel'}
            className={side === 'hotel' ? 'is-active' : ''}
            onClick={() => selectSide('hotel')}
          >
            <span>Hotel operations</span>
            <strong>Back of house</strong>
          </button>
        </Reveal>

        <Reveal className="tour-layout" delay={0.12}>
          <div className="tour-list" role="tabpanel">
            {operations.map((item, index) => {
              const Icon = item.icon
              const isActive = index === activeIndex
              return (
                <motion.button
                  type="button"
                  className={`tour-item ${isActive ? 'is-active' : ''}`}
                  key={`${side}-${item.number}`}
                  onClick={() => setActiveIndex(index)}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.055 }}
                  aria-pressed={isActive}
                >
                  <span className="tour-number">{item.number}</span>
                  <span className="tour-copy">
                    <small>{item.moment}</small>
                    <strong>{item.title}</strong>
                    <span>{item.description}</span>
                  </span>
                  <span className="tour-icon"><Icon size={18} /></span>
                </motion.button>
              )
            })}
          </div>

          <div className="tour-visual" aria-live="polite">
            <div className="tour-visual-topbar">
              <span><img className="tour-brand-mark" src={brandMarkUrl} alt="" /> Interactive product tour</span>
              <span>{side === 'guest' ? 'Guest experience' : 'Hotel intelligence'}</span>
            </div>
            <TourVisual view={active.view} />
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function WatchDemo() {
  return (
    <section className="demo-section" id="watch-demo">
      <div className="page-shell">
        <div className="demo-heading">
          <Reveal>
            <p className="eyebrow eyebrow--ink">Watch the demo · 1:28</p>
            <h2>See ChatBlu<br /><em>in the hotel.</em></h2>
          </Reveal>
          <Reveal delay={0.1} direction="left">
            <p>
              A short product walkthrough of how ChatBlu brings guest conversations and hotel
              operations into one connected experience.
            </p>
            <a href="https://www.youtube.com/watch?v=7s8_2Ngwr7o" target="_blank" rel="noreferrer">
              Open on YouTube <ArrowRight size={15} />
            </a>
          </Reveal>
        </div>

        <Reveal className="demo-frame-wrap">
          <div className="demo-frame-topbar">
            <span><i /> ChatBlu Demo</span>
            <span>Product walkthrough</span>
          </div>
          <div className="demo-frame">
            <iframe
              src="https://www.youtube-nocookie.com/embed/7s8_2Ngwr7o?rel=0&modestbranding=1"
              title="ChatBlu Demo"
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function WhoItsFor() {
  return (
    <section className="audience-section" id="for-hotels">
      <div className="page-shell">
        <div className="audience-heading">
          <Reveal>
            <p className="eyebrow eyebrow--ink">Who it is for</p>
            <h2>Built for the people<br />carrying <em>the stay.</em></h2>
          </Reveal>
          <Reveal delay={0.1} direction="left">
            <p>
              For hotels where guest expectations, property performance, and daily operations all
              move at once, and every team needs the same picture.
            </p>
          </Reveal>
        </div>

        <div className="audience-grid">
          {audiences.map((audience, index) => {
            const Icon = audience.icon
            return (
              <Reveal key={audience.label} delay={index * 0.09} className="audience-card">
                <span className="audience-index">0{index + 1}</span>
                <div className="audience-icon"><Icon size={21} /></div>
                <p className="audience-label">{audience.label}</p>
                <h3>{audience.title}</h3>
                <p>{audience.copy}</p>
              </Reveal>
            )
          })}
        </div>

        <Reveal className="audience-image-wrap">
          <img src={`${imageBase}chatblu-human-hospitality.webp`} alt="A hotel team member welcoming a guest" />
          <div className="audience-image-copy">
            <p>Technology should make the hotel feel more attentive, not less human.</p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function Value() {
  return (
    <section className="value-section" id="value">
      <div className="page-shell">
        <Reveal className="value-heading">
          <div>
            <p className="eyebrow eyebrow--ink">The value</p>
            <h2>Better for guests.<br /><em>Lighter for teams.</em></h2>
          </div>
          <p className="value-intro">
            One shared layer helps guests get what they need while giving hotel teams clearer,
            better-organized work.
          </p>
        </Reveal>

        <Reveal className="value-pair" delay={0.08}>
          <article className="value-panel value-panel--guest">
            <div className="value-panel-top">
              <span className="value-index">01</span>
              <span><MessageCircle size={19} /> For hotel guests</span>
            </div>
            <h3>Less waiting.<br />More being looked after.</h3>
            <p>Guests get clear answers, smoother coordination, and thoughtful continuity from before arrival through the stay.</p>
            <ul>
              <li><Check size={15} /> Questions answered in the moment</li>
              <li><Check size={15} /> Preferences carried forward</li>
              <li><Check size={15} /> Requests followed through</li>
            </ul>
          </article>

          <article className="value-panel value-panel--hotel">
            <div className="value-panel-top">
              <span className="value-index">02</span>
              <span><BriefcaseBusiness size={19} /> For hotel teams</span>
            </div>
            <h3>Less chasing.<br />More clarity.</h3>
            <p>Teams receive useful context, organized work, and a more direct view of what the property needs next.</p>
            <ul>
              <li><Check size={15} /> Repetitive work reduced</li>
              <li><Check size={15} /> Requests routed with context</li>
              <li><Check size={15} /> Decisions easier to understand</li>
            </ul>
          </article>
        </Reveal>
      </div>
    </section>
  )
}

function WhyChatBlu() {
  return (
    <section className="why-section" id="why-chatblu">
      <div className="page-shell why-layout">
        <Reveal className="why-heading">
          <p className="eyebrow eyebrow--ink">Why ChatBlu is different</p>
          <h2>Not a chatbot<br />at the edge of <em>the hotel.</em></h2>
          <p>
            ChatBlu connects the conversation a guest has with the context and coordination the hotel
            needs behind it.
          </p>
        </Reveal>

        <div className="difference-list">
          {differences.map((item, index) => (
            <Reveal className="difference-row" key={item.number} delay={index * 0.08} direction="left">
              <span>{item.number}</span>
              <div><h3>{item.title}</h3><p>{item.copy}</p></div>
              <div className="difference-arrow"><ArrowRight size={19} /></div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function Testimonials() {
  return (
    <section className="testimonials-section" aria-labelledby="testimonials-title">
      <div className="testimonials-photo" aria-hidden="true" />
      <div className="page-shell testimonials-shell">
        <div className="testimonials-heading">
          <Reveal>
            <p className="eyebrow eyebrow--ink">Trusted by hotel operators</p>
            <h2 id="testimonials-title">Better stays.<br /><em>Stronger operations.</em></h2>
          </Reveal>
          <Reveal delay={0.1} direction="left">
            <p>
              Outcomes shared by hospitality operators using ChatBlu across guest-facing and
              back-office workflows.
            </p>
          </Reveal>
        </div>

        <Reveal className="operator-strip" delay={0.08} aria-label="Hospitality operators using ChatBlu">
          {operatorBrands.map((brand) => (
            <div className="operator-brand" key={brand.name}>
              <strong>{brand.name}</strong>
              <span>{brand.detail}</span>
            </div>
          ))}
        </Reveal>

        <Reveal className="testimonial-grid" delay={0.12}>
          {testimonials.map((testimonial, index) => (
            <article
              className={`testimonial-card ${testimonial.featured ? 'testimonial-card--featured' : ''}`}
              key={testimonial.property}
            >
              <p className="testimonial-property">{testimonial.property}</p>
              <blockquote>“{testimonial.quote}”</blockquote>
              <footer>
                <strong>{testimonial.name}</strong>
                <span>{testimonial.role}</span>
              </footer>
              <span className="testimonial-number" aria-hidden="true">0{index + 1}</span>
            </article>
          ))}
        </Reveal>
      </div>
    </section>
  )
}

function FinalCta() {
  return (
    <section className="final-cta" id="demo">
      <div className="cta-glow" aria-hidden="true" />
      <div className="page-shell cta-layout">
        <Reveal className="cta-copy">
          <p className="eyebrow">The next step</p>
          <h2>See both sides<br />working <em>as one.</em></h2>
          <p>
            Explore how ChatBlu can support the guest experience up front and give hotel teams more
            clarity behind the scenes.
          </p>
          <ArrowButton href={bookDemoUrl} external variant="light">
            Book a demo
          </ArrowButton>
        </Reveal>

        <Reveal className="cta-note" direction="left" delay={0.12}>
          <div className="cta-note-top"><span className="avatar">C</span><div><strong>ChatBlu</strong><small>One platform · The entire operation</small></div></div>
          <p>From the guest’s first question to the team’s next decision, keep the whole hotel moving with shared context.</p>
          <div className="cta-flow">
            <span>Guest</span><i /><span>ChatBlu</span><i /><span>Hotel</span>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="page-shell footer-shell">
        <div className="footer-lead">
          <div className="footer-heading">
            <p className="eyebrow eyebrow--ink">One platform · The entire operation</p>
            <h2>Intelligence behind<br /><em>every stay.</em></h2>
          </div>
          <div className="footer-action">
            <p>See how one shared intelligence layer can help your guests and hotel teams move together.</p>
            <ArrowButton href={bookDemoUrl} external>Book a demo</ArrowButton>
          </div>
        </div>

        <div className="footer-directory">
          <nav aria-label="Footer navigation">
            {navItems.map(([label, href]) => <a href={href} key={href}>{label}</a>)}
          </nav>
          <div className="footer-legal" aria-label="Legal links">
            <a href="https://app.chatblu.ai/privacy" target="_blank" rel="noreferrer">Privacy</a>
            <a href="https://app.chatblu.ai/terms" target="_blank" rel="noreferrer">Terms</a>
          </div>
        </div>

        <a className="footer-wordmark" href="#top" aria-label="ChatBlu home">
          <img src={wordmarkUrl} alt="ChatBlu" />
        </a>

        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} ChatBlu</span>
          <p>Guest asks. ChatBlu understands. The hotel moves.</p>
        </div>
      </div>
    </footer>
  )
}

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <PressMarquee />
        <ProductTour />
        <WatchDemo />
        <WhoItsFor />
        <Value />
        <WhyChatBlu />
        <Testimonials />
        <FinalCta />
      </main>
      <Footer />
    </>
  )
}
