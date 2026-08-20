import { useEffect, useMemo, useRef, useState } from 'react'
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion'
import Lenis from 'lenis'
import {
  AlertTriangle,
  ArrowRight,
  BedDouble,
  BellRing,
  BookOpen,
  Bot,
  BrainCircuit,
  Building2,
  Car,
  Check,
  ChevronDown,
  CircleCheck,
  Clock3,
  Headphones,
  Inbox,
  ListChecks,
  Menu,
  MessageCircle,
  Network,
  Route,
  Send,
  Sparkles,
  Utensils,
  Wifi,
  Wrench,
  X,
} from 'lucide-react'

const officialSite = 'https://chatblu.ai/'
const bookDemoUrl = 'https://chatblu.ai/book/'
const imageBase = `${import.meta.env.BASE_URL}images/`

const navItems = [
  ['Product', '#product'],
  ['Guest Experience', '#guest-experience'],
  ['Hotel Operations', '#hotel-operations'],
  ['How It Works', '#how-it-works'],
  ['Why ChatBlu', '#why-chatblu'],
]

const journeyStages = [
  {
    label: 'Before Arrival',
    time: '11:42 AM',
    guest: 'Can I arrive around noon?',
    intent: 'Early arrival',
    action: 'Shares check-in guidance and starts the early-arrival workflow.',
    reply: 'I’ve shared the arrival details and let the hotel know.',
  },
  {
    label: 'Arrival',
    time: '3:08 PM',
    guest: 'Where should I park?',
    intent: 'Property information',
    action: 'Uses property-specific arrival information.',
    reply: 'The guest garage entrance is just past the main drive.',
  },
  {
    label: 'During Stay',
    time: '7:16 PM',
    guest: 'Can you recommend somewhere for dinner?',
    intent: 'Dining recommendation',
    action: 'Brings forward hotel-aware dining guidance.',
    reply: 'Here are a few nearby options selected for your evening.',
  },
  {
    label: 'Service Request',
    time: '9:34 PM',
    guest: 'Could I get extra pillows?',
    intent: 'Housekeeping request',
    action: 'Routes a clear request to the appropriate team.',
    reply: 'Housekeeping has your request. The pillows are on the way.',
  },
  {
    label: 'Departure',
    time: '8:20 AM',
    guest: 'Can I check out later?',
    intent: 'Late checkout',
    action: 'Checks policy context and requests staff approval.',
    reply: 'I’m checking availability with the front desk now.',
  },
]

const useCases = {
  'Guest Information': {
    icon: BookOpen,
    guest: 'What time does the pool close?',
    understanding: 'Amenity hours · Pool',
    action: 'Find the property-approved answer',
    outcome: 'The pool is open until 10 PM this evening.',
    team: 'Answered instantly',
  },
  Housekeeping: {
    icon: BedDouble,
    guest: 'Could we get two extra bath towels?',
    understanding: 'Service request · Towels · Room context',
    action: 'Create a clear housekeeping request',
    outcome: 'Housekeeping has accepted your towel request.',
    team: 'Assigned to Housekeeping',
  },
  Maintenance: {
    icon: Wrench,
    guest: "My shower isn't getting hot.",
    understanding: 'Maintenance issue · Plumbing / hot water',
    action: 'Route room and issue summary to maintenance',
    outcome: "We've notified the hotel team and will keep you updated.",
    team: 'Maintenance notified',
  },
  Dining: {
    icon: Utensils,
    guest: 'Can I order breakfast for tomorrow morning?',
    understanding: 'Dining request · Scheduled service',
    action: 'Surface the appropriate hotel workflow',
    outcome: 'I can help get that request to the right team.',
    team: 'Dining workflow ready',
  },
  Concierge: {
    icon: Sparkles,
    guest: 'Where can we hear live music tonight?',
    understanding: 'Local recommendation · Evening activity',
    action: 'Prepare a hotel-aware recommendation',
    outcome: 'Here are a few nearby options for tonight.',
    team: 'Guest guidance prepared',
  },
  'Check-in / Checkout': {
    icon: Clock3,
    guest: 'Could we check out at 2 PM?',
    understanding: 'Late checkout · Approval may be required',
    action: 'Route with policy and stay context',
    outcome: "We're checking late-checkout availability for you.",
    team: 'Front Desk review',
  },
  'Service Recovery': {
    icon: Headphones,
    guest: 'The AC still is not working. This is my second message.',
    understanding: 'Repeated issue · Negative sentiment',
    action: 'Escalate with conversation summary and context',
    outcome: 'A team member is stepping in to help personally.',
    team: 'Human attention recommended',
  },
}

const faqs = [
  {
    q: 'What does ChatBlu actually do?',
    a: 'ChatBlu helps hotels respond to guest questions and move guest requests toward action. It understands the conversation, uses property context, and either answers, routes, or hands the request to a hotel team.',
  },
  {
    q: 'What types of guest requests can it handle?',
    a: 'ChatBlu is designed for common hospitality moments: property information, amenity questions, housekeeping needs, maintenance issues, dining inquiries, arrival and departure questions, and situations that require staff attention.',
  },
  {
    q: 'How does ChatBlu know when to involve staff?',
    a: 'The experience is designed to recognize requests that need approval, operational follow-through, or human judgment. Those moments can be packaged with the relevant conversation and property context for the team.',
  },
  {
    q: 'Does ChatBlu replace hotel staff?',
    a: 'No. ChatBlu handles predictable communication and organizes routine follow-through so hotel teams can spend more attention on complex, sensitive, and memorable guest moments.',
  },
  {
    q: 'Can ChatBlu use information specific to our property?',
    a: 'Yes. Property-aware answers are central to the product experience: hotel information, services, policies, and operating context can inform how ChatBlu responds.',
  },
  {
    q: 'How does ChatBlu fit into existing hotel operations?',
    a: 'ChatBlu is presented as an intelligence layer between guest conversations and hotel workflows. The exact implementation should be scoped with the ChatBlu team around each property’s current operation.',
  },
]

function SmoothScroll() {
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    if (reduceMotion) return undefined

    const lenis = new Lenis({
      duration: 1.08,
      smoothWheel: true,
      wheelMultiplier: 0.92,
      anchors: { offset: -86 },
    })
    let frame

    const raf = (time) => {
      lenis.raf(time)
      frame = requestAnimationFrame(raf)
    }

    frame = requestAnimationFrame(raf)
    return () => {
      cancelAnimationFrame(frame)
      lenis.destroy()
    }
  }, [reduceMotion])

  return null
}

function Logo({ compact = false }) {
  return (
    <a className="brand" href="#top" aria-label="ChatBlu home">
      <span className="brand-mark" aria-hidden="true">
        <i />
        <i />
      </span>
      {!compact && <span>ChatBlu</span>}
    </a>
  )
}

function PrimaryButton({ children, href = bookDemoUrl, dark = false, onClick }) {
  return (
    <a
      className={`button button-primary${dark ? ' button-dark' : ''}`}
      href={href}
      onClick={onClick}
      {...(href.startsWith('http') ? { target: '_blank', rel: 'noreferrer' } : {})}
    >
      <span>{children}</span>
      <ArrowRight size={17} aria-hidden="true" />
    </a>
  )
}

function SecondaryButton({ children, href }) {
  return (
    <a className="button button-secondary" href={href}>
      <span>{children}</span>
      <ArrowRight size={17} aria-hidden="true" />
    </a>
  )
}

function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 36)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.classList.toggle('menu-open', open)
    return () => document.body.classList.remove('menu-open')
  }, [open])

  return (
    <header className={`site-nav${scrolled ? ' is-scrolled' : ''}`}>
      <div className="nav-shell">
        <Logo />
        <nav className="desktop-nav" aria-label="Primary navigation">
          {navItems.map(([label, href]) => (
            <a key={href} href={href}>{label}</a>
          ))}
        </nav>
        <div className="nav-actions">
          <PrimaryButton>Book a Demo</PrimaryButton>
          <button
            className="menu-button"
            type="button"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      <AnimatePresence>
        {open && (
          <motion.nav
            className="mobile-nav"
            aria-label="Mobile navigation"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
          >
            {navItems.map(([label, href], index) => (
              <motion.a
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.04 }}
              >
                <span>{label}</span><ArrowRight size={18} />
              </motion.a>
            ))}
            <PrimaryButton>Book a Demo</PrimaryButton>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}

function Reveal({ children, className = '', delay = 0, direction = 'up' }) {
  const reduceMotion = useReducedMotion()
  const offsets = {
    up: { y: 42, x: 0 },
    left: { x: -34, y: 0 },
    right: { x: 34, y: 0 },
  }
  const offset = offsets[direction] || offsets.up

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, ...offset, scale: 0.975, filter: 'blur(5px)' }}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1, filter: 'blur(0px)' }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.68, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

function SectionLabel({ children }) {
  return (
    <div className="section-label">
      <span aria-hidden="true" />
      {children}
    </div>
  )
}

function FlowPath({ vertical = false, className = '' }) {
  return (
    <div className={`flow-path${vertical ? ' is-vertical' : ''} ${className}`} aria-hidden="true">
      <span className="flow-path-line" />
      <span className="flow-pulse" />
    </div>
  )
}

function HeroProduct() {
  const reduceMotion = useReducedMotion()
  const [phase, setPhase] = useState(reduceMotion ? 4 : 0)

  useEffect(() => {
    if (reduceMotion) {
      setPhase(4)
      return undefined
    }
    const timer = window.setInterval(() => setPhase((value) => (value + 1) % 5), 1450)
    return () => window.clearInterval(timer)
  }, [reduceMotion])

  return (
    <div className="hero-product" aria-label="Animated ChatBlu request workflow">
      <div className="demo-window-top">
        <div className="window-dots"><i /><i /><i /></div>
        <span>Live guest request</span>
        <span className="live-status"><i /> Live</span>
      </div>

      <div className="guest-message-card">
        <div className="message-avatar">MC</div>
        <div>
          <div className="message-meta"><strong>Guest · Room 412</strong><span>now</span></div>
          <p>“Could I get two more towels and a late checkout?”</p>
        </div>
      </div>

      <div className="hero-flow-stage" aria-live="polite">
        <div className="hero-flow-core">
          <span className="mini-brand-mark"><Bot size={17} /></span>
          <span>ChatBlu</span>
          {phase === 0 ? (
            <span className="typing"><i /><i /><i /></span>
          ) : (
            <span className="understood"><Check size={13} /> Understood</span>
          )}
        </div>

        <AnimatePresence mode="wait">
          {phase === 0 && (
            <motion.div
              key="thinking"
              className="processing-copy"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              Understanding the request…
            </motion.div>
          )}

          {phase >= 1 && (
            <motion.div
              key="intents"
              className="intent-grid"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="intent-card">
                <div className="intent-icon"><BedDouble size={17} /></div>
                <div><span>Intent 01</span><strong>Extra towels</strong></div>
                <ArrowRight size={15} />
                <b>Housekeeping</b>
              </div>
              <div className="intent-card">
                <div className="intent-icon"><Clock3 size={17} /></div>
                <div><span>Intent 02</span><strong>Late checkout</strong></div>
                <ArrowRight size={15} />
                <b>Front Desk</b>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {phase >= 2 && (
            <motion.div
              className="hero-status-row"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              <span><CircleCheck size={14} /> Housekeeping accepted</span>
              <span className="review"><Clock3 size={14} /> Front Desk review</span>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {phase >= 3 && (
            <motion.div
              className="ai-reply"
              initial={{ opacity: 0, y: 14, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="mini-brand-mark"><Sparkles size={15} /></div>
              <p>Absolutely. Housekeeping has your towel request. I’m checking late-checkout availability now.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="context-strip">
        <span><small>Demo property</small>The Meridian</span>
        <span><small>Guest</small>Maya Chen</span>
        <span><small>Room</small>412</span>
        <span><small>Confidence</small><i /> High</span>
      </div>
    </div>
  )
}

function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 110])
  const visualY = useTransform(scrollYProgress, [0, 1], [0, -50])
  const opacity = useTransform(scrollYProgress, [0, 0.83], [1, 0.22])

  return (
    <section className="hero" id="top" ref={ref}>
      <div className="hero-atmosphere" aria-hidden="true">
        <div className="ambient ambient-one" />
        <div className="ambient ambient-two" />
        <div className="hero-architecture" />
        <div className="particle-field"><i /><i /><i /><i /><i /><i /></div>
      </div>
      <motion.div className="hero-shell page-shell" style={{ opacity }}>
        <motion.div className="hero-copy" style={{ y: contentY }}>
          <SectionLabel>AI Hospitality, in Motion</SectionLabel>
          <h1>Every Guest Request, <em>Already in Motion.</em></h1>
          <p className="hero-lede">ChatBlu understands what guests need, answers what it can, and turns everything else into action across your hotel.</p>
          <div className="hero-buttons">
            <PrimaryButton>Book a Demo</PrimaryButton>
            <SecondaryButton href="#how-it-works">Watch ChatBlu Work</SecondaryButton>
          </div>
          <div className="hero-proofline">
            <span>Questions answered.</span>
            <span>Requests routed.</span>
            <span>Staff informed.</span>
            <span>Guests updated.</span>
          </div>
        </motion.div>

        <motion.div className="hero-visual" style={{ y: visualY }}>
          <div className="floating-chip chip-one"><Wifi size={14} /> Property-aware</div>
          <div className="floating-chip chip-two"><Route size={14} /> Right team</div>
          <HeroProduct />
        </motion.div>
      </motion.div>
      <div className="hero-scroll-cue">
        <span>Follow the request</span>
        <FlowPath vertical />
      </div>
    </section>
  )
}

function WorkflowSection() {
  const stages = [
    { number: '01', title: 'Guest message', body: '“Can I check out at 2?”', icon: MessageCircle },
    { number: '02', title: 'Understanding', body: 'Late-checkout request', icon: BrainCircuit },
    { number: '03', title: 'Hotel context', body: 'Policy · Occupancy · Guest profile', icon: Building2 },
    { number: '04', title: 'Decision', body: 'Staff approval needed', icon: Route },
    { number: '05', title: 'Answer / action', body: 'Front Desk notified · Guest updated', icon: Send },
  ]

  return (
    <section className="section workflow-section" id="how-it-works">
      <div className="page-shell sticky-story">
        <div className="sticky-copy">
          <SectionLabel>One Message. Multiple Actions.</SectionLabel>
          <h2>ChatBlu Doesn’t Just Reply. <em>It Gets Things Moving.</em></h2>
          <p>Behind every conversation, ChatBlu understands the guest, uses hotel context, and determines what should happen next.</p>
          <div className="sticky-note"><i /> The Blu Flow follows intent all the way to resolution.</div>
        </div>
        <div className="workflow-stack">
          {stages.map((stage, index) => {
            const Icon = stage.icon
            return (
              <Reveal key={stage.number} delay={index * 0.06} direction={index % 2 ? 'right' : 'left'}>
                <motion.article className="workflow-stage" whileHover={{ y: -5 }}>
                  <div className="stage-number">{stage.number}</div>
                  <div className="stage-icon"><Icon size={20} /></div>
                  <div><h3>{stage.title}</h3><p>{stage.body}</p></div>
                  <span className="stage-check"><Check size={15} /></span>
                </motion.article>
                {index < stages.length - 1 && <FlowPath vertical className="stage-connector" />}
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function AnswerVisual() {
  const questions = [
    ['What’s the Wi-Fi?', 'Connect to MeridianGuest. Your access code is on your key sleeve.'],
    ['When does the pool close?', 'The pool is open until 10 PM tonight.'],
    ['Can I park overnight?', 'Yes. Overnight guest parking is available.'],
  ]
  return (
    <div className="capability-visual answer-visual">
      {questions.map(([q, a], index) => (
        <motion.div
          className="quick-answer"
          key={q}
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.14 }}
        >
          <p>{q}</p>
          <span><Sparkles size={13} /> {a}</span>
        </motion.div>
      ))}
      <div className="property-aware"><i /> Property-aware response</div>
    </div>
  )
}

function ActVisual() {
  return (
    <div className="capability-visual action-visual">
      <div className="action-message">“Please send a crib to room 805.”</div>
      <FlowPath vertical />
      <div className="request-ticket">
        <div className="ticket-head"><span>New request</span><strong>Room 805</strong></div>
        <div className="ticket-row"><span>Type</span><b>Service request</b></div>
        <div className="ticket-row"><span>Team</span><b>Housekeeping</b></div>
        <div className="ticket-row"><span>Priority</span><b>Normal</b></div>
        <div className="ticket-status"><CircleCheck size={15} /> Housekeeping accepted</div>
      </div>
      <div className="guest-update"><Check size={14} /> Your request is on the way.</div>
    </div>
  )
}

function HandoffVisual() {
  return (
    <div className="capability-visual handoff-visual">
      <div className="sentiment-message">“The AC still isn’t working and this is the second time I’ve called.”</div>
      <div className="signal-row">
        <span><AlertTriangle size={14} /> Repeated issue</span>
        <span>Negative sentiment</span>
      </div>
      <div className="human-route">
        <div className="human-avatar">FD</div>
        <div><small>Route to Front Desk</small><strong>Human attention recommended</strong></div>
        <ArrowRight size={18} />
      </div>
      <div className="summary-chip"><Sparkles size={14} /> Conversation summary attached</div>
    </div>
  )
}

function Capabilities() {
  const panels = [
    { number: '01', kicker: 'ANSWER', title: 'Answers Without the Wait.', body: 'Give guests immediate answers using information specific to your property.', Visual: AnswerVisual },
    { number: '02', kicker: 'ACT', title: 'Turn Requests Into Action.', body: 'Move routine requests toward resolution instead of leaving them inside a conversation.', Visual: ActVisual },
    { number: '03', kicker: 'HAND OFF', title: 'Human When It Matters.', body: 'Know when automation should stop and hospitality should become personal.', Visual: HandoffVisual },
  ]

  return (
    <section className="section capabilities-section" id="product">
      <div className="page-shell">
        <Reveal className="section-heading split-heading">
          <div><SectionLabel>Three Modes of Service</SectionLabel><h2>Answer. Act. <em>Know when to step aside.</em></h2></div>
          <p>One intelligence layer adapts to the moment—fast when the answer is clear, operational when work is required, human when judgment matters.</p>
        </Reveal>
        <div className="capabilities-list">
          {panels.map(({ number, kicker, title, body, Visual }, index) => (
            <Reveal key={number} delay={0.05 * index}>
              <article className={`capability-panel panel-${index + 1}`}>
                <div className="capability-copy">
                  <span className="capability-number">{number}</span>
                  <span className="capability-kicker">{kicker}</span>
                  <h3>{title}</h3>
                  <p>{body}</p>
                </div>
                <Visual />
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function GuestJourney() {
  const [active, setActive] = useState(0)
  const stage = journeyStages[active]

  return (
    <section className="section journey-section" id="guest-experience">
      <div className="page-shell">
        <Reveal className="section-heading centered-heading">
          <SectionLabel>The Guest Journey</SectionLabel>
          <h2>One Intelligence Layer <em>Across the Stay.</em></h2>
          <p>From the first arrival question to the final checkout request, context travels with the conversation.</p>
        </Reveal>

        <Reveal className="journey-experience">
          <div className="journey-tabs" role="tablist" aria-label="Guest journey stages">
            <span className="journey-progress" style={{ '--progress': `${(active / (journeyStages.length - 1)) * 100}%` }} />
            {journeyStages.map((item, index) => (
              <button
                key={item.label}
                type="button"
                className={active === index ? 'is-active' : ''}
                onClick={() => setActive(index)}
                role="tab"
                aria-selected={active === index}
              >
                <i><Check size={12} /></i>
                <span>{item.label}</span>
              </button>
            ))}
          </div>
          <div className="journey-content">
            <AnimatePresence mode="wait">
              <motion.div
                className="journey-phone"
                key={`phone-${active}`}
                initial={{ opacity: 0, x: -22 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 16 }}
                transition={{ duration: 0.35 }}
              >
                <div className="phone-top"><span>ChatBlu</span><small>{stage.time}</small></div>
                <div className="phone-day">Today</div>
                <div className="phone-message guest">{stage.guest}</div>
                <div className="phone-thinking"><i /><i /><i /></div>
                <div className="phone-message blu">{stage.reply}</div>
              </motion.div>
            </AnimatePresence>
            <AnimatePresence mode="wait">
              <motion.div
                className="journey-context"
                key={`context-${active}`}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
              >
                <SectionLabel>{stage.label}</SectionLabel>
                <h3>{stage.intent}</h3>
                <div className="context-steps">
                  <div><span>01</span><p>Guest intent understood</p><Check size={15} /></div>
                  <div><span>02</span><p>{stage.action}</p><Check size={15} /></div>
                  <div><span>03</span><p>Guest receives a clear update</p><Check size={15} /></div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

const dashboardRequests = [
  { room: '412', request: 'Extra towels', team: 'Housekeeping', status: 'In progress', tone: 'blue', icon: BedDouble },
  { room: '628', request: 'AC issue', team: 'Maintenance', status: 'Priority', tone: 'red', icon: Wrench },
  { room: '301', request: 'Late checkout', team: 'Front Desk', status: 'Approval', tone: 'amber', icon: Clock3 },
  { room: '827', request: 'Breakfast hours', team: 'AI answered', status: 'Resolved', tone: 'green', icon: Utensils },
]

function OperationsDashboard() {
  return (
    <section className="section operations-section" id="hotel-operations">
      <div className="page-shell">
        <Reveal className="section-heading split-heading">
          <div><SectionLabel>The Hotel Team Experience</SectionLabel><h2>Your Team Sees What Matters. <em>Not More Noise.</em></h2></div>
          <p>Guest intent arrives as organized work—with the room, request, team, context, and current status already clear.</p>
        </Reveal>

        <Reveal className="dashboard-wrap">
          <div className="dashboard-glow" />
          <div className="dashboard">
            <aside className="dashboard-sidebar">
              <Logo compact />
              <nav>
                <a className="active" href="#hotel-operations"><Inbox size={17} /><span>Inbox</span><b>4</b></a>
                <a href="#hotel-operations"><ListChecks size={17} /><span>Guest Requests</span></a>
                <a href="#hotel-operations"><BellRing size={17} /><span>Teams</span></a>
                <a href="#hotel-operations"><BrainCircuit size={17} /><span>Insights</span></a>
                <a href="#hotel-operations"><BookOpen size={17} /><span>Property Knowledge</span></a>
              </nav>
              <div className="property-switcher"><Building2 size={17} /><span><small>Demo property</small>The Meridian</span><ChevronDown size={15} /></div>
            </aside>
            <main className="dashboard-main">
              <div className="dashboard-header">
                <div><span className="eyebrow">OPERATIONS</span><h3>Live Guest Operations</h3></div>
                <div className="dashboard-health"><i /> All teams available</div>
              </div>
              <div className="dashboard-filter-row">
                <div className="filter-tabs"><button className="active" type="button">All requests <span>4</span></button><button type="button">Needs attention <span>2</span></button><button type="button">Resolved</button></div>
                <div className="dashboard-date">Today · Live</div>
              </div>
              <div className="request-list">
                <div className="request-list-head"><span>Guest / Room</span><span>Request</span><span>Team</span><span>Status</span><span /></div>
                {dashboardRequests.map((request, index) => {
                  const Icon = request.icon
                  return (
                    <motion.div
                      className="request-row"
                      key={request.room}
                      initial={{ opacity: 0, x: 24 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <span className="room-cell"><b>{request.room}</b><small>In-house guest</small></span>
                      <span className="request-cell"><i><Icon size={16} /></i><b>{request.request}</b></span>
                      <span>{request.team}</span>
                      <span><em className={`status-pill ${request.tone}`}><i />{request.status}</em></span>
                      <span><ArrowRight size={17} /></span>
                    </motion.div>
                  )
                })}
              </div>
              <div className="dashboard-footer"><span><i /> Live sync</span><span>Guest context stays attached to every request.</span></div>
            </main>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function RoutingSection() {
  const nodes = [
    { label: 'Guest', icon: MessageCircle, className: 'node-guest' },
    { label: 'Front Desk', icon: BellRing, className: 'node-front' },
    { label: 'Housekeeping', icon: BedDouble, className: 'node-housekeeping' },
    { label: 'Maintenance', icon: Wrench, className: 'node-maintenance' },
    { label: 'Guest Services', icon: Headphones, className: 'node-services' },
    { label: 'Property Info', icon: BookOpen, className: 'node-property' },
  ]

  return (
    <section className="section routing-section">
      <div className="page-shell routing-layout">
        <Reveal className="routing-copy" direction="left">
          <SectionLabel>Intelligent Routing</SectionLabel>
          <h2>One Request. <em>The Right Team.</em></h2>
          <p>ChatBlu reads beyond the words—finding urgency, department, room context, and who else needs visibility.</p>
          <div className="routing-example">
            <div className="routing-quote">“Water is leaking from the bathroom.”</div>
            <ul>
              <li><Check size={14} /> Urgent maintenance intent</li>
              <li><Check size={14} /> Maintenance receives the request</li>
              <li><Check size={14} /> Front Desk gains visibility</li>
              <li><Check size={14} /> Guest receives an update</li>
            </ul>
          </div>
        </Reveal>
        <Reveal className="routing-network" direction="right">
          <svg className="network-lines" viewBox="0 0 620 620" aria-hidden="true">
            <defs>
              <linearGradient id="lineGlow" x1="0" y1="0" x2="1" y2="1">
                <stop stopColor="#2e71ff" stopOpacity=".08" />
                <stop offset=".5" stopColor="#79b9ff" stopOpacity=".8" />
                <stop offset="1" stopColor="#2e71ff" stopOpacity=".08" />
              </linearGradient>
            </defs>
            <path d="M310 310 L86 155" />
            <path d="M310 310 L310 70" />
            <path d="M310 310 L540 160" />
            <path d="M310 310 L550 430" />
            <path d="M310 310 L310 550" />
            <path d="M310 310 L75 440" />
            <circle className="route-dot route-dot-1" r="5"><animateMotion dur="3.2s" repeatCount="indefinite" path="M86 155 L310 310 L550 430" /></circle>
            <circle className="route-dot route-dot-2" r="4"><animateMotion dur="4s" repeatCount="indefinite" path="M310 550 L310 310 L540 160" /></circle>
          </svg>
          <div className="network-core">
            <span><BrainCircuit size={28} /></span>
            <strong>ChatBlu</strong>
            <small>Intent engine</small>
            <i />
          </div>
          {nodes.map(({ label, icon: Icon, className }) => (
            <motion.div className={`network-node ${className}`} key={label} whileHover={{ scale: 1.05 }}>
              <span><Icon size={18} /></span><b>{label}</b>
            </motion.div>
          ))}
          <div className="network-signal"><span>Urgent</span> Maintenance request</div>
        </Reveal>
      </div>
    </section>
  )
}

function ValueSection() {
  const values = [
    { number: '01', title: 'Faster Guest Responses', body: 'Give guests access to routine answers without waiting for staff availability.', icon: MessageCircle },
    { number: '02', title: 'Fewer Repetitive Questions', body: 'Let ChatBlu handle common information requests throughout the day.', icon: Sparkles },
    { number: '03', title: 'Cleaner Staff Workflows', body: 'Turn guest intent into organized operational action.', icon: Route },
    { number: '04', title: 'More Human Attention', body: 'Give teams more time for complex and memorable guest moments.', icon: Headphones },
  ]

  return (
    <section className="section value-section">
      <div className="page-shell">
        <Reveal className="section-heading centered-heading">
          <SectionLabel>Hotel Value</SectionLabel>
          <h2>Less Repetition. <em>More Hospitality.</em></h2>
        </Reveal>
        <div className="value-cards">
          {values.map(({ number, title, body, icon: Icon }, index) => (
            <Reveal key={number} delay={index * 0.06} className={`value-card-wrap card-${index + 1}`}>
              <motion.article className="value-card" whileHover={{ y: -7, scale: 1.012 }}>
                <div className="value-card-top"><span>{number}</span><i><Icon size={21} /></i></div>
                <h3>{title}</h3>
                <p>{body}</p>
                <div className="mini-motion">
                  <span /><span /><span />
                  <i><Check size={11} /></i>
                </div>
              </motion.article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function BridgeSection() {
  return (
    <section className="section bridge-section">
      <div className="page-shell">
        <Reveal className="section-heading centered-heading">
          <SectionLabel>Shared Value</SectionLabel>
          <h2>Better for Guests. <em>Lighter for Teams.</em></h2>
        </Reveal>
        <Reveal className="bridge-visual">
          <div className="bridge-side guest-side">
            <span className="bridge-eyebrow">FOR GUESTS</span>
            <h3>A stay that feels effortless.</h3>
            <ul><li><Check /> Faster answers</li><li><Check /> Less waiting</li><li><Check /> Simpler requests</li><li><Check /> Clear updates</li></ul>
            <div className="bridge-message">Could we get two bottles of water?</div>
          </div>
          <div className="bridge-center">
            <div className="bridge-core"><Logo compact /><strong>ChatBlu</strong><small>understands</small></div>
            <div className="bridge-flow"><span /><i /><span /></div>
            <div className="bridge-intent"><BedDouble size={14} /> Guest amenity request</div>
          </div>
          <div className="bridge-side team-side">
            <span className="bridge-eyebrow">FOR HOTEL TEAMS</span>
            <h3>Work that arrives organized.</h3>
            <ul><li><Check /> Less repetitive work</li><li><Check /> Clearer requests</li><li><Check /> Smarter routing</li><li><Check /> More visibility</li></ul>
            <div className="bridge-ticket"><span>Room 412 · Water</span><b><i /> Assigned</b></div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function WhyChatBlu() {
  const features = [
    { title: 'Property-Aware', body: 'Understands your hotel’s information, policies, services, and operating context.', icon: Building2, className: 'why-one' },
    { title: 'Action-Oriented', body: 'Moves beyond conversation by turning guest intent into operational workflows.', icon: Route, className: 'why-two' },
    { title: 'Hospitality-Specific', body: 'Designed around the situations hotel teams handle every day.', icon: BellRing, className: 'why-three' },
    { title: 'Human-Aware', body: 'Recognizes when a conversation needs judgment, empathy, or personal attention.', icon: Headphones, className: 'why-four' },
  ]

  return (
    <section className="section why-section" id="why-chatblu">
      <div className="page-shell">
        <Reveal className="section-heading centered-heading">
          <SectionLabel>Why ChatBlu</SectionLabel>
          <h2>Not Another <em>Hotel Chatbot.</em></h2>
          <p>Generic chat ends with a reply. ChatBlu is designed to understand what the hotel needs to do next.</p>
        </Reveal>
        <div className="why-orbit">
          <div className="orbit-ring ring-one" /><div className="orbit-ring ring-two" />
          <div className="why-core"><span><BrainCircuit size={34} /></span><strong>Hospitality<br />intelligence</strong><small>Conversation → Action</small></div>
          {features.map(({ title, body, icon: Icon, className }, index) => (
            <Reveal className={`why-card ${className}`} key={title} delay={index * 0.08}>
              <div className="why-card-icon"><Icon size={21} /></div>
              <h3>{title}</h3><p>{body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function IntelligenceLayers() {
  const layers = [
    { number: '01', name: 'Guest Channels', detail: 'The conversation begins', icon: MessageCircle },
    { number: '02', name: 'ChatBlu Understanding', detail: 'Intent, sentiment, urgency', icon: BrainCircuit },
    { number: '03', name: 'Property Knowledge', detail: 'Hotel-specific context', icon: BookOpen },
    { number: '04', name: 'Decision + Workflow', detail: 'Answer, act, or hand off', icon: Route },
    { number: '05', name: 'Hotel Teams', detail: 'The right team gets context', icon: BellRing },
    { number: '06', name: 'Guest Resolution', detail: 'A clear update returns', icon: CircleCheck },
  ]

  return (
    <section className="section intelligence-section">
      <div className="page-shell intelligence-layout">
        <Reveal className="intelligence-copy" direction="left">
          <SectionLabel>Under the Conversation</SectionLabel>
          <h2>Hospitality Intelligence, <em>Working in the Background.</em></h2>
          <p>Each layer adds the context needed to move a guest from question to resolution—without exposing complexity to the guest.</p>
          <div className="intelligence-callout"><Sparkles size={16} /><span><b>One connected thought:</b> understand the guest, understand the property, then choose the next best move.</span></div>
        </Reveal>
        <div className="layer-stack">
          {layers.map(({ number, name, detail, icon: Icon }, index) => (
            <Reveal key={number} delay={index * 0.06} direction="right">
              <motion.div className={`intelligence-layer layer-${index + 1}`} whileHover={{ x: -8 }}>
                <span className="layer-number">{number}</span>
                <span className="layer-icon"><Icon size={19} /></span>
                <div><strong>{name}</strong><small>{detail}</small></div>
                <i className="layer-light" />
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function UseCaseExplorer() {
  const caseNames = useMemo(() => Object.keys(useCases), [])
  const [active, setActive] = useState(caseNames[0])
  const current = useCases[active]
  const ActiveIcon = current.icon

  return (
    <section className="section cases-section">
      <div className="page-shell">
        <Reveal className="section-heading split-heading">
          <div><SectionLabel>Use Case Explorer</SectionLabel><h2>See the Flow <em>for Every Kind of Stay.</em></h2></div>
          <p>Select a hospitality moment to see how guest language becomes understanding, action, and a clear outcome.</p>
        </Reveal>
        <Reveal className="case-explorer">
          <div className="case-tabs" role="tablist" aria-label="ChatBlu use cases">
            {caseNames.map((name) => {
              const Icon = useCases[name].icon
              return (
                <button key={name} type="button" role="tab" aria-selected={active === name} className={active === name ? 'active' : ''} onClick={() => setActive(name)}>
                  <Icon size={17} /><span>{name}</span><ArrowRight size={15} />
                </button>
              )
            })}
          </div>
          <div className="case-stage">
            <AnimatePresence mode="wait">
              <motion.div key={active} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}>
                <div className="case-stage-head"><span><ActiveIcon size={18} /></span><div><small>ACTIVE FLOW</small><strong>{active}</strong></div><em><i /> Live example</em></div>
                <div className="case-conversation">
                  <div className="case-guest"><span>Guest · Room 516</span><p>{current.guest}</p></div>
                  <div className="case-flow-line"><i /><span>ChatBlu</span><i /></div>
                  <div className="case-analysis">
                    <div><small>UNDERSTANDING</small><p>{current.understanding}</p></div>
                    <div><small>NEXT ACTION</small><p>{current.action}</p></div>
                    <div className="case-team"><Check size={14} />{current.team}</div>
                  </div>
                  <div className="case-outcome"><Sparkles size={16} /><p>{current.outcome}</p><span>Guest updated <Check size={13} /></span></div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function WhoItsFor() {
  const audiences = [
    { title: 'Independent Hotels', body: 'Deliver responsive service without turning every guest question into front-desk work.', image: `${imageBase}chatblu-hero-hotel.webp` },
    { title: 'Luxury & Lifestyle Hotels', body: 'Use automation without losing the high-touch experience your brand depends on.', image: `${imageBase}chatblu-human-hospitality.webp` },
    { title: 'Hotel Groups', body: 'Create more consistent guest communication and workflows across properties.', image: `${imageBase}chatblu-hero-hotel.webp` },
    { title: 'Guest Experience Teams', body: 'Understand what guests need and move requests toward resolution faster.', image: `${imageBase}chatblu-human-hospitality.webp` },
  ]

  return (
    <section className="section audience-section">
      <div className="page-shell">
        <Reveal className="section-heading centered-heading">
          <SectionLabel>Who It’s For</SectionLabel>
          <h2>Built for Hotels That Want <em>Service to Move Faster.</em></h2>
        </Reveal>
        <div className="audience-grid">
          {audiences.map((audience, index) => (
            <Reveal className={`audience-card card-${index + 1}`} key={audience.title} delay={index * 0.06}>
              <motion.article whileHover={{ y: -6 }}>
                <img src={audience.image} alt="" loading="lazy" />
                <div className="audience-overlay" />
                <span>0{index + 1}</span>
                <div><h3>{audience.title}</h3><p>{audience.body}</p><i><ArrowRight size={18} /></i></div>
              </motion.article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function HumanHospitality() {
  return (
    <section className="human-section">
      <div className="human-image" aria-hidden="true" />
      <div className="human-ui ui-one"><span><Check size={13} /> Request handled</span></div>
      <div className="human-ui ui-two"><span>Guest updated</span><i /></div>
      <Reveal className="human-copy">
        <SectionLabel>Human Hospitality</SectionLabel>
        <h2>The Best Part of Hospitality <em>Should Still Be Human.</em></h2>
        <p>ChatBlu handles the predictable moments so your team has more time for the unforgettable ones.</p>
      </Reveal>
    </section>
  )
}

function FAQ() {
  const [open, setOpen] = useState(0)
  return (
    <section className="section faq-section">
      <div className="page-shell faq-layout">
        <Reveal className="faq-heading" direction="left">
          <SectionLabel>FAQ</SectionLabel>
          <h2>The Practical <em>Questions.</em></h2>
          <p>Clear answers about what ChatBlu is designed to do—and where a property conversation begins.</p>
          <PrimaryButton>Talk to ChatBlu</PrimaryButton>
        </Reveal>
        <div className="faq-list">
          {faqs.map((item, index) => {
            const isOpen = open === index
            return (
              <Reveal key={item.q} delay={index * 0.04}>
                <div className={`faq-item${isOpen ? ' is-open' : ''}`}>
                  <button type="button" aria-expanded={isOpen} onClick={() => setOpen(isOpen ? -1 : index)}>
                    <span><i>0{index + 1}</i>{item.q}</span><ChevronDown size={21} />
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div className="faq-answer" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }}>
                        <p>{item.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function FinalCTA() {
  return (
    <section className="final-section" id="contact">
      <div className="final-atmosphere" aria-hidden="true"><i /><i /><i /></div>
      <div className="page-shell final-shell">
        <Reveal className="final-flow">
          <div className="final-message"><span>Guest · Room 704</span><p>“Could we get breakfast sent up tomorrow at 8?”</p></div>
          <FlowPath />
          <div className="final-core"><Logo compact /><span>ChatBlu</span><i /></div>
          <FlowPath />
          <div className="final-resolution">
            <span><Check /> Request understood</span>
            <span><Check /> Hotel workflow ready</span>
            <span><Check /> Guest updated</span>
          </div>
        </Reveal>
        <Reveal className="final-copy" delay={0.12}>
          <SectionLabel>The Next Request Is Coming</SectionLabel>
          <h2>Turn Every Guest Request <em>Into Forward Motion.</em></h2>
          <p>See how ChatBlu can help your hotel respond faster, reduce repetitive communication, and keep hospitality moving.</p>
          <div className="final-buttons"><PrimaryButton dark>Book a Demo</PrimaryButton><SecondaryButton href="#product">Explore the Product</SecondaryButton></div>
        </Reveal>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="page-shell">
        <div className="footer-top">
          <div><Logo /><p>Intelligence behind every stay.</p></div>
          <nav aria-label="Footer navigation">
            <div><span>Explore</span><a href="#product">Product</a><a href="#guest-experience">Guest Experience</a><a href="#hotel-operations">Hotel Operations</a></div>
            <div><span>Learn</span><a href="#how-it-works">How It Works</a><a href="#why-chatblu">Why ChatBlu</a><a href={officialSite} target="_blank" rel="noreferrer">Contact</a></div>
          </nav>
        </div>
        <div className="footer-bottom"><span>© {new Date().getFullYear()} ChatBlu</span><div><a href="https://app.chatblu.ai/privacy" target="_blank" rel="noreferrer">Privacy</a><a href="https://app.chatblu.ai/terms" target="_blank" rel="noreferrer">Terms</a></div><span>Guest asks. ChatBlu understands. The hotel moves.</span></div>
      </div>
    </footer>
  )
}

export default function App() {
  return (
    <>
      <SmoothScroll />
      <Navigation />
      <main>
        <Hero />
        <WorkflowSection />
        <Capabilities />
        <GuestJourney />
        <OperationsDashboard />
        <RoutingSection />
        <ValueSection />
        <BridgeSection />
        <WhyChatBlu />
        <IntelligenceLayers />
        <UseCaseExplorer />
        <WhoItsFor />
        <HumanHospitality />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </>
  )
}
