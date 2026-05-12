import { useState, useEffect, useRef } from "react";
import {
  User, Briefcase, Settings, Star, Mail, Menu, X,
  ChevronRight, ChevronLeft, ArrowLeft, Award, Users,
  TrendingUp, MessageCircle, Phone, MapPin, Send,
  CheckCircle, Globe, Layers, BarChart2, BookOpen,
  Target, Zap, Quote, FileText, Clock, ExternalLink
} from "lucide-react";

/* ─────────────────── THEME ─────────────────── */
const GOLD   = "#E8B84B";
const BG     = "#060E1A";
const CARD   = "#0C1B2B";
const NAVY   = "#0A1929";

/* ─────────────────── GLOBAL CSS ─────────────────── */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400&family=Outfit:wght@300;400;500;600;700&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html,body{overflow-x:hidden}
.ff-d{font-family:'Cormorant Garamond',Georgia,serif}
.ff-b{font-family:'Outfit',system-ui,sans-serif}
@keyframes fadeInUp{from{opacity:0;transform:translateY(26px)}to{opacity:1;transform:translateY(0)}}
@keyframes fadeIn{from{opacity:0}to{opacity:1}}
@keyframes scaleIn{from{opacity:0;transform:scale(0.95) translateY(10px)}to{opacity:1;transform:scale(1) translateY(0)}}
@keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-7px)}}
@keyframes barGrow{from{width:0}to{width:var(--w)}}
@keyframes chatPop{from{opacity:0;transform:scale(0.82) translateY(14px)}to{opacity:1;transform:scale(1) translateY(0)}}
@keyframes blink{0%,80%,100%{opacity:0}40%{opacity:1}}
@keyframes stag0{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
.page-in{animation:scaleIn 0.38s cubic-bezier(0.16,1,0.3,1) both}
.s0{animation:stag0 0.5s 0.0s ease both}
.s1{animation:stag0 0.5s 0.1s ease both}
.s2{animation:stag0 0.5s 0.2s ease both}
.s3{animation:stag0 0.5s 0.3s ease both}
.s4{animation:stag0 0.5s 0.4s ease both}
.s5{animation:stag0 0.5s 0.5s ease both}

/* ── NAV ── */
.nl{color:#6B7F93;font-size:0.77rem;font-weight:500;letter-spacing:0.1em;text-transform:uppercase;cursor:pointer;transition:color 0.2s;position:relative;padding-bottom:3px}
.nl:hover,.nl.act{color:#E8B84B}
.nl.act::after{content:'';position:absolute;bottom:-1px;left:0;width:100%;height:1px;background:#E8B84B}

/* ── HUB CARDS ── */
.hc{background:#0C1B2B;border:1px solid rgba(255,255,255,0.05);border-radius:14px;padding:34px 30px;cursor:pointer;transition:all 0.32s cubic-bezier(0.16,1,0.3,1);position:relative;overflow:hidden}
.hc::before{content:'';position:absolute;inset:0;background:linear-gradient(140deg,rgba(232,184,75,0.07),transparent 55%);opacity:0;transition:opacity 0.32s}
.hc:hover{transform:translateY(-8px);border-color:rgba(232,184,75,0.42);box-shadow:0 24px 64px rgba(0,0,0,0.5)}
.hc:hover::before{opacity:1}
.hc:hover .ha{transform:translateX(5px);opacity:1}
.ha{opacity:0.3;transition:all 0.28s;color:#E8B84B}

/* ── BUTTONS ── */
.bg{background:#E8B84B;color:#060E1A;border:none;border-radius:7px;font-family:'Outfit',sans-serif;font-weight:700;font-size:0.77rem;letter-spacing:0.1em;text-transform:uppercase;cursor:pointer;transition:all 0.22s;display:inline-flex;align-items:center;gap:7px;padding:13px 26px;white-space:nowrap}
.bg:hover{background:#F5CC6A;transform:translateY(-2px);box-shadow:0 8px 26px rgba(232,184,75,0.38)}
.bo{background:transparent;color:#E2EBF3;border:1px solid rgba(232,184,75,0.35);border-radius:7px;font-family:'Outfit',sans-serif;font-weight:500;font-size:0.77rem;letter-spacing:0.1em;text-transform:uppercase;cursor:pointer;transition:all 0.22s;display:inline-flex;align-items:center;gap:7px;padding:13px 26px;white-space:nowrap}
.bo:hover{border-color:#E8B84B;background:rgba(232,184,75,0.07);transform:translateY(-2px)}

/* ── SERVICE CARD ── */
.sc{background:#0C1B2B;border:1px solid rgba(255,255,255,0.05);border-radius:12px;padding:28px;transition:all 0.28s}
.sc:hover{border-color:rgba(232,184,75,0.3);transform:translateY(-4px);background:#0F2035}

/* ── CASE CARD ── */
.cc{background:#0C1B2B;border:1px solid rgba(255,255,255,0.05);border-radius:14px;overflow:hidden;transition:all 0.32s}
.cc:hover{transform:translateY(-6px);box-shadow:0 22px 60px rgba(0,0,0,0.45);border-color:rgba(232,184,75,0.25)}

/* ── TESTIMONIAL ── */
.tc{background:#0C1B2B;border:1px solid rgba(255,255,255,0.06);border-radius:14px;padding:34px;transition:all 0.28s}
.tc:hover{border-color:rgba(232,184,75,0.28);transform:translateY(-4px)}
.tc.active{border-color:rgba(232,184,75,0.45)!important}

/* ── FORM ── */
.fi{width:100%;background:#0B192A;border:1px solid rgba(255,255,255,0.08);border-radius:8px;padding:13px 15px;color:#E2EBF3;font-family:'Outfit',sans-serif;font-size:0.89rem;outline:none;transition:border-color 0.2s;resize:vertical}
.fi:focus{border-color:rgba(232,184,75,0.55)}
.fi::placeholder{color:#4B5F73}

/* ── SKILL BAR ── */
.sb{height:5px;background:rgba(255,255,255,0.06);border-radius:99px;overflow:hidden}
.sf{height:100%;background:linear-gradient(90deg,#E8B84B,#F5CC6A);border-radius:99px;animation:barGrow 1.1s cubic-bezier(0.16,1,0.3,1) forwards}

/* ── GRID BG ── */
.gpat{background-image:linear-gradient(rgba(232,184,75,0.022) 1px,transparent 1px),linear-gradient(90deg,rgba(232,184,75,0.022) 1px,transparent 1px);background-size:50px 50px}

/* ── CHAT ── */
.chat-pop{animation:chatPop 0.32s cubic-bezier(0.16,1,0.3,1) both}
.dt span{display:inline-block;width:5px;height:5px;background:#E8B84B;border-radius:50%;margin:0 2px;animation:blink 1.3s infinite}
.dt span:nth-child(2){animation-delay:0.22s}
.dt span:nth-child(3){animation-delay:0.44s}

/* ── SCROLLBAR ── */
::-webkit-scrollbar{width:4px}
::-webkit-scrollbar-track{background:#060E1A}
::-webkit-scrollbar-thumb{background:rgba(232,184,75,0.22);border-radius:99px}

/* ── RESPONSIVE ── */
@media(max-width:760px){
  .hm{display:none!important}
  .sm{display:flex!important}
  .mob-col{flex-direction:column!important}
}
@media(min-width:761px){.sm{display:none!important}}
`;

/* ─────────────────── DATA ─────────────────── */
const CASE_STUDIES = [
  {
    tag:"Logistics & Operations", color:"#3A7BD5",
    title:"Project Aqua — Distribution Infrastructure",
    challenge:"Design a multi-zone distribution network for a new bottled water brand across Lagos and Ogun State from scratch, with no existing logistics framework or vendor relationships.",
    solution:"Led WBS Activities 3.3 & 3.4: mapped 9 delivery zones (LG-1 to LG-6, OG-1 to OG-3), evaluated 7 logistics vendors including GIG Logistics, Kobo360 & ACE Logistics, and produced formal RFQ document PA-RFQ-DIST-001.",
    result:"A comprehensive, execution-ready distribution blueprint with vetted logistics partners and cost benchmarks — reducing vendor selection time by an estimated 60%.",
    metrics:["9 Zones Mapped","7 Partners Vetted","RFQ Delivered"],
  },
  {
    tag:"Education & Curriculum", color:"#E8B84B",
    title:"Lucid Hub — Teaching Series Architecture",
    challenge:"Build a structured leadership development curriculum for a growing organization with no existing formal program, spanning diverse domains of human development from scratch.",
    solution:"Designed the 19-session Lucid Spark Teaching Series across 6 domains: Personal Development, Emotional Intelligence, Finance, Health & Wellbeing, Spiritual Formation, and Character & Community Leadership — with complete facilitator guides.",
    result:"Full curriculum delivered with facilitator guides; three revenue monetization channels identified (digital products, speaking engagements, membership community) enabling organizational sustainability.",
    metrics:["19 Sessions Built","6 Domains Covered","3 Revenue Channels"],
  },
  {
    tag:"Financial Compliance", color:"#2ECC71",
    title:"Avodah Finance — Regulatory Documentation",
    challenge:"Complete a comprehensive corporate disclosure and compliance document meeting regulatory requirements before a firm submission deadline — with multiple critical governance sections required simultaneously.",
    solution:"Structured and authored the full compliance document covering management profiles, shareholder disclosures, governance policies, and the organizational chart — coordinating multi-stakeholder input under time pressure.",
    result:"Submission-ready compliance document delivered on deadline with zero revision cycles, and clearly flagged placeholder fields for final completion before filing.",
    metrics:["5 Governance Sections","0 Revision Cycles","Deadline Met"],
  },
  {
    tag:"Data & Information Management", color:"#9B59B6",
    title:"RCCG IMC — National Directory Database",
    challenge:"Extract, organize, and structure regional pastor contact data from a national directory spanning 65 regions, each with inconsistent formats and incomplete records requiring significant reconciliation.",
    solution:"Systematically mapped all PICR role codes across 65 regions, built a clean hierarchical database sorted by region, role, and contact type — enabling precise, scalable outreach at a national level.",
    result:"An organized, communication-ready database that dramatically reduced regional lookup time and enabled efficient, targeted outreach coordination across all national regions.",
    metrics:["65 Regions Covered","Clean Structured DB","Outreach-Ready"],
  },
];

const SERVICES = [
  {Icon:Layers, title:"Project Lifecycle Management", desc:"End-to-end planning, execution, monitoring, and closure — with structured documentation and clear deliverables at every phase from initiation to handoff."},
  {Icon:FileText, title:"Strategic Documentation", desc:"Regulatory compliance documents, project charters, SOPs, reports, and governance frameworks crafted with precision, clarity, and full stakeholder alignment."},
  {Icon:Users, title:"Team Leadership & Coordination", desc:"Cross-functional team alignment, RACI matrix design, role-clarity workshops, and conflict resolution for high-performing, accountable project teams."},
  {Icon:BarChart2, title:"Stakeholder Communication", desc:"Executive presentations, status reports, briefings, and communication plans that keep every voice informed and every decision backed by clear data."},
  {Icon:BookOpen, title:"Curriculum & Program Design", desc:"Structured learning programs, workshop curricula, and facilitator guides for leadership development, onboarding, and organizational capacity building."},
  {Icon:TrendingUp, title:"PMO Strategy & Advisory", desc:"Project management office setup, methodology selection (Agile / Waterfall / Hybrid), KPI frameworks, and organizational change management consulting."},
];

const TESTIMONIALS = [
  {name:"Paul O.", role:"Project Manager, Project Aqua", rating:5, text:"Olugbenga's distribution strategy was remarkably thorough. He mapped complex delivery zones, shortlisted logistics partners, and produced a professional RFQ with a precision that far exceeded expectations. An indispensable contributor to the team."},
  {name:"Leadership Team", role:"Lucid Hub Organization", rating:5, text:"The curriculum Olugbenga designed became the entire backbone of our teaching series. His ability to synthesize diverse domains — from emotional intelligence to financial literacy — into a cohesive 19-session program was genuinely extraordinary work."},
  {name:"Finance Director", role:"Avodah Finance", rating:5, text:"His attention to regulatory detail and documentation precision saved us weeks of revision cycles. Every section was structured, compliant, and submission-ready. We trust Olugbenga with our most sensitive and highest-stakes documentation projects."},
  {name:"Regional Coordinator", role:"RCCG Central Missions Board", rating:5, text:"Organizing 65 regional directories was no small undertaking. Olugbenga delivered a clean, structured database that completely transformed how we handle regional communication and outreach. His efficiency and organizational skill are genuinely remarkable."},
];

const SKILLS = [
  {label:"Project Planning & Execution", pct:92},
  {label:"Documentation & Compliance", pct:90},
  {label:"Stakeholder Management", pct:88},
  {label:"Team Leadership", pct:87},
  {label:"Risk Assessment & QA", pct:84},
  {label:"Agile / Scrum Methodologies", pct:80},
];

const CERTS = [
  {name:"Google Project Management Professional", issuer:"Google / Coursera", year:"2024", color:"#4285F4"},
  {name:"DSA Certification", issuer:"Digital Skills Alliance", year:"2023", color:"#E8B84B"},
  {name:"DEXA Certification", issuer:"Excellence Academy", year:"2023", color:"#2ECC71"},
  {name:"Exford Global PM Certificate", issuer:"Exford Global Institute", year:"2024", color:"#9B59B6"},
];

const VALUES = [
  {Icon:Target, label:"Strategic Clarity", desc:"Every engagement starts with a sharp objective. I translate ambiguous goals into actionable, measurable plans."},
  {Icon:CheckCircle, label:"Dependable Execution", desc:"I deliver on commitments — on time, to scope, and with a quality standard that speaks for itself."},
  {Icon:Users, label:"People-First Leadership", desc:"Great projects are built by great teams. I invest in people and alignment before tools and processes."},
  {Icon:Zap, label:"Adaptive Thinking", desc:"When circumstances shift, I shift with them — keeping projects on track without losing momentum or morale."},
];

/* ─────────────────── SHARED COMPONENTS ─────────────────── */
const P = "0 max(24px, calc((100% - 1180px) / 2))";

function PageHeader({ title, subtitle, onBack }) {
  return (
    <div style={{padding:"100px 0 36px", textAlign:"center"}}>
      {onBack && (
        <div style={{textAlign:"left", marginBottom:28}}>
          <button onClick={onBack} className="bo" style={{padding:"9px 18px", fontSize:"0.72rem"}}>
            <ArrowLeft size={13}/> Home
          </button>
        </div>
      )}
      <p style={{fontFamily:"Outfit,sans-serif", color:GOLD, fontSize:"0.72rem", fontWeight:700, letterSpacing:"0.22em", textTransform:"uppercase", marginBottom:12}}>{subtitle}</p>
      <h1 className="ff-d" style={{fontSize:"clamp(2.4rem,6vw,4.2rem)", fontWeight:600, color:"#F0F4F8", lineHeight:1.08}}>{title}</h1>
      <div style={{width:56, height:3, background:`linear-gradient(90deg, transparent, ${GOLD}, transparent)`, margin:"18px auto 0", borderRadius:2}}/>
    </div>
  );
}

/* ─────────────────── NAV ─────────────────── */
function Nav({ page, go }) {
  const [scrolled, setScrolled] = useState(false);
  const [mob, setMob]           = useState(false);
  const links = [["about","About"],["portfolio","Portfolio"],["services","Services"],["testimonials","Testimonials"],["contact","Contact"]];

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 28);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <>
      <nav style={{
        position:"fixed", top:0, left:0, right:0, zIndex:200,
        background: scrolled ? "rgba(6,14,26,0.94)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.05)" : "none",
        transition:"all 0.35s",
        padding:`0 max(24px, calc((100% - 1180px) / 2))`,
      }}>
        <div style={{display:"flex", alignItems:"center", justifyContent:"space-between", height:70}}>
          <div onClick={() => go("home")} style={{cursor:"pointer", display:"flex", alignItems:"center", gap:11}}>
            <div style={{width:36, height:36, borderRadius:9, background:`linear-gradient(135deg, ${GOLD}, #F5CC6A)`, display:"flex", alignItems:"center", justifyContent:"center"}}>
              <span className="ff-d" style={{fontWeight:700, fontSize:"1rem", color:"#060E1A"}}>OC</span>
            </div>
            <span style={{fontFamily:"Outfit,sans-serif", fontWeight:600, fontSize:"0.9rem", color:"#E2EBF3", letterSpacing:"0.04em"}}>G.Crown</span>
          </div>
          <div className="hm" style={{display:"flex", gap:32, alignItems:"center"}}>
            {links.map(([k,l]) => (
              <span key={k} className={`nl ${page===k?"act":""}`} onClick={() => go(k)}>{l}</span>
            ))}
            <button className="bg" style={{padding:"9px 20px", fontSize:"0.73rem"}} onClick={() => go("contact")}>Hire Me</button>
          </div>
          <button className="sm" onClick={() => setMob(!mob)} style={{background:"none", border:"none", color:"#E2EBF3", cursor:"pointer"}}>
            {mob ? <X size={22}/> : <Menu size={22}/>}
          </button>
        </div>
      </nav>
      {mob && (
        <div style={{position:"fixed", top:70, left:0, right:0, zIndex:199, background:"rgba(6,14,26,0.97)", backdropFilter:"blur(20px)", borderBottom:"1px solid rgba(255,255,255,0.05)", padding:"20px max(24px, calc((100% - 1180px) / 2)) 28px", animation:"fadeIn 0.2s ease"}}>
          {links.map(([k,l]) => (
            <div key={k} onClick={() => { go(k); setMob(false); }} style={{padding:"13px 0", borderBottom:"1px solid rgba(255,255,255,0.04)", fontFamily:"Outfit,sans-serif", fontSize:"1rem", fontWeight:500, color: page===k ? GOLD : "#E2EBF3", cursor:"pointer"}}>{l}</div>
          ))}
          <button className="bg" style={{marginTop:18, width:"100%", justifyContent:"center"}} onClick={() => { go("contact"); setMob(false); }}>Hire Me</button>
        </div>
      )}
    </>
  );
}

/* ─────────────────── HOME ─────────────────── */
function Home({ go }) {
  const HUB = [
    {k:"about",       Icon:User,      label:"About Me",      desc:"My story, certifications, and the values that drive every project I take on."},
    {k:"portfolio",   Icon:Briefcase, label:"Portfolio",      desc:"Real case studies with Challenge, Solution, and Results breakdowns."},
    {k:"services",    Icon:Settings,  label:"Services",       desc:"Project consulting, lifecycle management, and team leadership offerings."},
    {k:"testimonials",Icon:Star,      label:"Testimonials",   desc:"What collaborators and clients say about working with me."},
    {k:"contact",     Icon:Mail,      label:"Contact",        desc:"Start a conversation. Let's build something great together."},
  ];
  return (
    <div>
      {/* ── HERO ── */}
      <section className="gpat" style={{minHeight:"100vh", display:"flex", alignItems:"center", padding:`0 ${P}`, position:"relative", overflow:"hidden"}}>
        <div style={{position:"absolute", top:"18%", right:"8%", width:420, height:420, borderRadius:"50%", background:"radial-gradient(circle, rgba(232,184,75,0.07) 0%, transparent 68%)", pointerEvents:"none"}}/>
        <div style={{position:"absolute", bottom:"12%", left:"4%", width:280, height:280, borderRadius:"50%", background:"radial-gradient(circle, rgba(58,123,213,0.06) 0%, transparent 70%)", pointerEvents:"none"}}/>
        <div style={{maxWidth:680, paddingTop:80}}>
          <p className="s0 ff-b" style={{color:GOLD, fontSize:"0.75rem", fontWeight:700, letterSpacing:"0.25em", textTransform:"uppercase", marginBottom:22}}>Project Manager · Executive Strategist</p>
          <h1 className="s1 ff-d" style={{fontSize:"clamp(3rem,8vw,6.5rem)", fontWeight:600, lineHeight:1.0, color:"#F0F4F8"}}>
            Olugbenga<br/>
            <span style={{color:GOLD, fontStyle:"italic", fontWeight:300}}>Crown</span>
          </h1>
          <p className="s2 ff-b" style={{color:"#7B8FA3", fontSize:"clamp(0.88rem,2.2vw,1.05rem)", lineHeight:1.75, maxWidth:500, marginTop:22, marginBottom:38}}>
            I turn complex challenges into structured successes — from distribution networks to compliance frameworks. I deliver projects that move organizations forward.
          </p>
          <div className="s3" style={{display:"flex", gap:14, flexWrap:"wrap"}}>
            <button className="bg" onClick={() => go("portfolio")}>View My Work <ChevronRight size={15}/></button>
            <button className="bo" onClick={() => go("contact")}>Start a Project</button>
          </div>
          <div className="s4" style={{display:"flex", gap:44, marginTop:60, flexWrap:"wrap"}}>
            {[["4+","Certifications"],["10+","Projects Delivered"],["4+","Industries Served"]].map(([n,l]) => (
              <div key={l}>
                <div className="ff-d" style={{fontSize:"2.4rem", fontWeight:700, color:GOLD, lineHeight:1}}>{n}</div>
                <div style={{fontFamily:"Outfit,sans-serif", fontSize:"0.75rem", color:"#6B7F93", marginTop:4, letterSpacing:"0.04em"}}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HUB GRID ── */}
      <section style={{padding:`72px ${P} 96px`}}>
        <p className="ff-b" style={{color:GOLD, fontSize:"0.72rem", fontWeight:700, letterSpacing:"0.22em", textTransform:"uppercase", textAlign:"center", marginBottom:10}}>Navigate</p>
        <h2 className="ff-d" style={{fontSize:"clamp(1.8rem,4vw,3rem)", color:"#F0F4F8", textAlign:"center", marginBottom:52, fontWeight:600}}>Explore My World</h2>
        <div style={{display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(260px, 1fr))", gap:18}}>
          {HUB.map((item, i) => (
            <div key={item.k} className={`hc s${i}`} onClick={() => go(item.k)}>
              <div style={{width:50, height:50, borderRadius:12, background:"rgba(232,184,75,0.09)", border:"1px solid rgba(232,184,75,0.2)", display:"flex", alignItems:"center", justifyContent:"center", marginBottom:20}}>
                <item.Icon size={21} color={GOLD}/>
              </div>
              <h3 style={{fontFamily:"Outfit,sans-serif", fontWeight:600, fontSize:"1.08rem", color:"#E2EBF3", marginBottom:9}}>{item.label}</h3>
              <p style={{fontFamily:"Outfit,sans-serif", fontSize:"0.84rem", color:"#6B7F93", lineHeight:1.65, marginBottom:20}}>{item.desc}</p>
              <div style={{display:"flex", alignItems:"center", gap:6}}>
                <span style={{fontFamily:"Outfit,sans-serif", fontSize:"0.72rem", color:GOLD, fontWeight:700, letterSpacing:"0.12em", textTransform:"uppercase"}}>Explore</span>
                <ChevronRight size={14} className="ha"/>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

/* ─────────────────── ABOUT ─────────────────── */
function About({ go }) {
  const [vis, setVis] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, {threshold:0.1});
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div className="page-in" style={{padding:`0 ${P} 96px`}}>
      <PageHeader title="About Me" subtitle="The Person Behind the Projects" onBack={() => go("home")}/>

      <div style={{display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(300px, 1fr))", gap:36, marginTop:48, alignItems:"start"}}>
        {/* LEFT */}
        <div>
          <div style={{background:CARD, border:`1px solid rgba(232,184,75,0.14)`, borderRadius:14, padding:32, marginBottom:20}}>
            <div style={{width:78, height:78, borderRadius:14, background:`linear-gradient(135deg,${GOLD},#F5CC6A)`, display:"flex", alignItems:"center", justifyContent:"center", marginBottom:20}}>
              <span className="ff-d" style={{fontSize:"2rem", fontWeight:700, color:"#060E1A"}}>OC</span>
            </div>
            <h2 className="ff-d" style={{fontSize:"1.9rem", color:"#F0F4F8", fontWeight:600, marginBottom:6}}>Olugbenga Crown</h2>
            <p style={{fontFamily:"Outfit,sans-serif", color:GOLD, fontSize:"0.75rem", fontWeight:700, letterSpacing:"0.15em", textTransform:"uppercase", marginBottom:20}}>Project Manager · Executive Strategist</p>
            <p style={{fontFamily:"Outfit,sans-serif", color:"#8899AA", fontSize:"0.88rem", lineHeight:1.78, marginBottom:14}}>
              I am a Project Manager and organizational strategist with a foundation in Library and Information Science — now fully at home in the world of projects, processes, and people. I hold multiple PM certifications and blend structured methodology with adaptive leadership.
            </p>
            <p style={{fontFamily:"Outfit,sans-serif", color:"#8899AA", fontSize:"0.88rem", lineHeight:1.78}}>
              Currently serving as Account Officer at Avodah Finance and Executive Assistant at the RCCG Central Missions Board (IMC), I bridge operational detail with strategic vision — ensuring organizations don't just plan well, but execute exceptionally.
            </p>
          </div>
          {[
            [MapPin,"Location","Lagos, Nigeria"],
            [Briefcase,"Current Roles","Avodah Finance · RCCG IMC"],
            [BookOpen,"Education","Library & Information Science"],
            [Globe,"Focus","PM · Compliance · Curriculum Design"],
          ].map(([Icon,label,val]) => (
            <div key={label} style={{display:"flex", alignItems:"center", gap:13, padding:"11px 0", borderBottom:"1px solid rgba(255,255,255,0.04)"}}>
              <div style={{width:36, height:36, borderRadius:8, background:"rgba(232,184,75,0.09)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0}}>
                <Icon size={14} color={GOLD}/>
              </div>
              <div>
                <p style={{fontFamily:"Outfit,sans-serif", fontSize:"0.69rem", color:"#6B7F93", textTransform:"uppercase", letterSpacing:"0.08em"}}>{label}</p>
                <p style={{fontFamily:"Outfit,sans-serif", fontSize:"0.87rem", color:"#E2EBF3", fontWeight:500}}>{val}</p>
              </div>
            </div>
          ))}
        </div>

        {/* RIGHT */}
        <div>
          {/* Skills */}
          <div ref={ref} style={{background:CARD, border:"1px solid rgba(255,255,255,0.05)", borderRadius:14, padding:32, marginBottom:20}}>
            <h3 style={{fontFamily:"Outfit,sans-serif", fontWeight:600, fontSize:"0.95rem", color:"#E2EBF3", marginBottom:24, letterSpacing:"0.04em"}}>Core Competencies</h3>
            {SKILLS.map((s,i) => (
              <div key={s.label} style={{marginBottom:16}}>
                <div style={{display:"flex", justifyContent:"space-between", marginBottom:7}}>
                  <span style={{fontFamily:"Outfit,sans-serif", fontSize:"0.82rem", color:"#C5D3DE"}}>{s.label}</span>
                  <span style={{fontFamily:"Outfit,sans-serif", fontSize:"0.76rem", color:GOLD, fontWeight:700}}>{s.pct}%</span>
                </div>
                <div className="sb">
                  {vis && <div className="sf" style={{"--w":`${s.pct}%`, animationDelay:`${i*0.1}s`}}/>}
                </div>
              </div>
            ))}
          </div>
          {/* Certs */}
          <div style={{background:CARD, border:"1px solid rgba(255,255,255,0.05)", borderRadius:14, padding:32}}>
            <h3 style={{fontFamily:"Outfit,sans-serif", fontWeight:600, fontSize:"0.95rem", color:"#E2EBF3", marginBottom:22}}>Certifications</h3>
            {CERTS.map(c => (
              <div key={c.name} style={{display:"flex", alignItems:"center", gap:13, padding:"12px 0", borderBottom:"1px solid rgba(255,255,255,0.04)"}}>
                <div style={{width:8, height:8, borderRadius:"50%", background:c.color, flexShrink:0, boxShadow:`0 0 7px ${c.color}70`}}/>
                <div style={{flex:1}}>
                  <p style={{fontFamily:"Outfit,sans-serif", fontSize:"0.84rem", color:"#E2EBF3", fontWeight:500, lineHeight:1.3}}>{c.name}</p>
                  <p style={{fontFamily:"Outfit,sans-serif", fontSize:"0.73rem", color:"#6B7F93", marginTop:2}}>{c.issuer} · {c.year}</p>
                </div>
                <Award size={13} color={c.color}/>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Values */}
      <div style={{marginTop:72}}>
        <h2 className="ff-d" style={{fontSize:"2.4rem", color:"#F0F4F8", textAlign:"center", marginBottom:44, fontWeight:600}}>Core Values</h2>
        <div style={{display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(230px, 1fr))", gap:18}}>
          {VALUES.map(v => (
            <div key={v.label} className="sc">
              <div style={{width:48, height:48, borderRadius:11, background:"rgba(232,184,75,0.09)", border:"1px solid rgba(232,184,75,0.2)", display:"flex", alignItems:"center", justifyContent:"center", marginBottom:16}}>
                <v.Icon size={20} color={GOLD}/>
              </div>
              <h3 style={{fontFamily:"Outfit,sans-serif", fontWeight:600, fontSize:"0.98rem", color:"#E2EBF3", marginBottom:9}}>{v.label}</h3>
              <p style={{fontFamily:"Outfit,sans-serif", fontSize:"0.83rem", color:"#6B7F93", lineHeight:1.65}}>{v.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div style={{textAlign:"center", marginTop:68}}>
        <button className="bg" onClick={() => go("portfolio")} style={{marginRight:14}}>See My Work <ChevronRight size={15}/></button>
        <button className="bo" onClick={() => go("contact")}>Get In Touch</button>
      </div>
    </div>
  );
}

/* ─────────────────── PORTFOLIO ─────────────────── */
function Portfolio({ go }) {
  return (
    <div className="page-in" style={{padding:`0 ${P} 96px`}}>
      <PageHeader title="Case Studies" subtitle="Portfolio & Work" onBack={() => go("home")}/>
      <div style={{display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(320px, 1fr))", gap:22, marginTop:48}}>
        {CASE_STUDIES.map(cs => (
          <div key={cs.title} className="cc">
            <div style={{height:5, background:`linear-gradient(90deg, ${cs.color}, ${cs.color}55)`}}/>
            <div style={{padding:28}}>
              <span style={{background:`${cs.color}16`, color:cs.color, fontSize:"0.68rem", fontWeight:700, letterSpacing:"0.12em", textTransform:"uppercase", padding:"4px 11px", borderRadius:999, border:`1px solid ${cs.color}30`}}>{cs.tag}</span>
              <h3 style={{fontFamily:"Outfit,sans-serif", fontWeight:600, fontSize:"1.02rem", color:"#E2EBF3", marginTop:16, marginBottom:18, lineHeight:1.4}}>{cs.title}</h3>
              <div style={{display:"flex", gap:7, marginBottom:22, flexWrap:"wrap"}}>
                {cs.metrics.map(m => (
                  <span key={m} style={{background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.07)", padding:"4px 11px", borderRadius:6, fontFamily:"Outfit,sans-serif", fontSize:"0.71rem", color:"#C5D3DE", fontWeight:500}}>{m}</span>
                ))}
              </div>
              {[["Challenge", cs.challenge, "#E74C3C"],["Solution", cs.solution, "#3498DB"],["Result", cs.result, "#2ECC71"]].map(([label,text,col]) => (
                <div key={label} style={{marginBottom:8, borderRadius:8, border:"1px solid rgba(255,255,255,0.04)", overflow:"hidden"}}>
                  <div style={{padding:"10px 14px", background:"rgba(255,255,255,0.025)", display:"flex", alignItems:"center", gap:9}}>
                    <div style={{width:6, height:6, borderRadius:"50%", background:col, flexShrink:0, boxShadow:`0 0 6px ${col}80`}}/>
                    <span style={{fontFamily:"Outfit,sans-serif", fontSize:"0.72rem", fontWeight:700, color:col, textTransform:"uppercase", letterSpacing:"0.1em"}}>{label}</span>
                  </div>
                  <div style={{padding:"11px 14px"}}>
                    <p style={{fontFamily:"Outfit,sans-serif", fontSize:"0.82rem", color:"#8899AA", lineHeight:1.65}}>{text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div style={{textAlign:"center", marginTop:52}}>
        <button className="bg" onClick={() => go("contact")}>Discuss a Project <ChevronRight size={15}/></button>
      </div>
    </div>
  );
}

/* ─────────────────── SERVICES ─────────────────── */
function Services({ go }) {
  return (
    <div className="page-in" style={{padding:`0 ${P} 96px`}}>
      <PageHeader title="Services" subtitle="What I Offer" onBack={() => go("home")}/>
      <div style={{display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(290px, 1fr))", gap:18, marginTop:48}}>
        {SERVICES.map((s,i) => (
          <div key={s.title} className={`sc s${i}`}>
            <div style={{width:50, height:50, borderRadius:12, background:"rgba(232,184,75,0.08)", border:"1px solid rgba(232,184,75,0.2)", display:"flex", alignItems:"center", justifyContent:"center", marginBottom:20}}>
              <s.Icon size={21} color={GOLD}/>
            </div>
            <h3 style={{fontFamily:"Outfit,sans-serif", fontWeight:600, fontSize:"1.02rem", color:"#E2EBF3", marginBottom:11}}>{s.title}</h3>
            <p style={{fontFamily:"Outfit,sans-serif", fontSize:"0.84rem", color:"#6B7F93", lineHeight:1.7, marginBottom:18}}>{s.desc}</p>
            <div style={{borderTop:"1px solid rgba(255,255,255,0.05)", paddingTop:14}}>
              <button onClick={() => go("contact")} style={{background:"none", border:"none", color:GOLD, fontFamily:"Outfit,sans-serif", fontSize:"0.72rem", fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", cursor:"pointer", display:"flex", alignItems:"center", gap:5, padding:0}}>
                Enquire <ChevronRight size={12}/>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Process strip */}
      <div style={{marginTop:72, background:CARD, border:`1px solid rgba(232,184,75,0.12)`, borderRadius:16, padding:"44px 36px"}}>
        <h2 className="ff-d" style={{fontSize:"2.2rem", color:"#F0F4F8", textAlign:"center", marginBottom:40, fontWeight:600}}>My Process</h2>
        <div style={{display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(170px, 1fr))", gap:24}}>
          {[["01","Discovery","Deep-dive into your context, goals, and constraints."],["02","Planning","Clear roadmap with milestones, resources, and risk mitigation."],["03","Execution","Lead delivery with daily coordination and stakeholder updates."],["04","Closure","Handoff, documentation, lessons learned, measurable results."]].map(([n,t,d]) => (
            <div key={n} style={{textAlign:"center"}}>
              <div className="ff-d" style={{fontSize:"3rem", fontWeight:700, color:"rgba(232,184,75,0.18)", marginBottom:7}}>{n}</div>
              <h4 style={{fontFamily:"Outfit,sans-serif", fontWeight:600, fontSize:"0.93rem", color:"#E2EBF3", marginBottom:7}}>{t}</h4>
              <p style={{fontFamily:"Outfit,sans-serif", fontSize:"0.8rem", color:"#6B7F93", lineHeight:1.6}}>{d}</p>
            </div>
          ))}
        </div>
      </div>
      <div style={{textAlign:"center", marginTop:52}}>
        <button className="bg" onClick={() => go("contact")}>Start a Conversation <ChevronRight size={15}/></button>
      </div>
    </div>
  );
}

/* ─────────────────── TESTIMONIALS ─────────────────── */
function Testimonials({ go }) {
  const [idx, setIdx] = useState(0);
  const n = TESTIMONIALS.length;

  return (
    <div className="page-in" style={{padding:`0 ${P} 96px`}}>
      <PageHeader title="Testimonials" subtitle="What They Say" onBack={() => go("home")}/>

      {/* Feature slider */}
      <div style={{maxWidth:680, margin:"48px auto 0"}}>
        <div className="tc" key={idx} style={{animation:"scaleIn 0.28s ease"}}>
          <Quote size={30} color={`${GOLD}38`} style={{marginBottom:18}}/>
          <p style={{fontFamily:"Outfit,sans-serif", fontSize:"0.98rem", color:"#C5D3DE", lineHeight:1.82, marginBottom:26, fontStyle:"italic"}}>{TESTIMONIALS[idx].text}</p>
          <div style={{display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:10}}>
            <div>
              <p style={{fontFamily:"Outfit,sans-serif", fontWeight:600, fontSize:"0.93rem", color:"#E2EBF3"}}>{TESTIMONIALS[idx].name}</p>
              <p style={{fontFamily:"Outfit,sans-serif", fontSize:"0.77rem", color:"#6B7F93", marginTop:2}}>{TESTIMONIALS[idx].role}</p>
            </div>
            <div style={{display:"flex", gap:4}}>
              {[...Array(5)].map((_,i) => <Star key={i} size={14} color={GOLD} fill={GOLD}/>)}
            </div>
          </div>
        </div>
        <div style={{display:"flex", alignItems:"center", justifyContent:"center", gap:14, marginTop:26}}>
          <button onClick={() => setIdx((idx-1+n)%n)} className="bo" style={{padding:"9px 15px", borderRadius:8}}><ChevronLeft size={15}/></button>
          {TESTIMONIALS.map((_,i) => (
            <button key={i} onClick={() => setIdx(i)} style={{width:i===idx?22:7, height:7, borderRadius:99, border:"none", cursor:"pointer", background:i===idx?GOLD:"rgba(232,184,75,0.25)", transition:"all 0.28s", padding:0}}/>
          ))}
          <button onClick={() => setIdx((idx+1)%n)} className="bo" style={{padding:"9px 15px", borderRadius:8}}><ChevronRight size={15}/></button>
        </div>
      </div>

      {/* Grid */}
      <div style={{display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(270px, 1fr))", gap:18, marginTop:56}}>
        {TESTIMONIALS.map((t,i) => (
          <div key={i} className={`tc ${i===idx?"active":""}`} onClick={() => setIdx(i)} style={{cursor:"pointer"}}>
            <div style={{display:"flex", gap:3, marginBottom:12}}>
              {[...Array(t.rating)].map((_,j) => <Star key={j} size={12} color={GOLD} fill={GOLD}/>)}
            </div>
            <p style={{fontFamily:"Outfit,sans-serif", fontSize:"0.83rem", color:"#8899AA", lineHeight:1.7, marginBottom:18, overflow:"hidden", display:"-webkit-box", WebkitLineClamp:4, WebkitBoxOrient:"vertical"}}>{t.text}</p>
            <p style={{fontFamily:"Outfit,sans-serif", fontWeight:600, fontSize:"0.87rem", color:"#E2EBF3"}}>{t.name}</p>
            <p style={{fontFamily:"Outfit,sans-serif", fontSize:"0.75rem", color:"#6B7F93", marginTop:2}}>{t.role}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────── CONTACT ─────────────────── */
function Contact({ go }) {
  const [form, setForm] = useState({name:"", email:"", subject:"", message:""});
  const [done, setDone] = useState(false);
  const set = (k, v) => setForm(f => ({...f, [k]:v}));
  const submit = () => { if (form.name && form.email && form.message) setDone(true); };

  return (
    <div className="page-in" style={{padding:`0 ${P} 96px`}}>
      <PageHeader title="Let's Talk" subtitle="Get In Touch" onBack={() => go("home")}/>
      <div style={{display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(280px, 1fr))", gap:44, marginTop:48, alignItems:"start"}}>

        {/* Left info */}
        <div>
          <h3 style={{fontFamily:"Outfit,sans-serif", fontWeight:600, fontSize:"1.15rem", color:"#E2EBF3", marginBottom:14}}>Ready to start your next project?</h3>
          <p style={{fontFamily:"Outfit,sans-serif", fontSize:"0.88rem", color:"#8899AA", lineHeight:1.78, marginBottom:32}}>
            Whether you need a project manager, strategic consultant, or documentation specialist — I'm here. Let's discuss how I can help your organization deliver better outcomes.
          </p>
          {[
            [Mail, "Email", "hello@gcrown.pm", null],
            [Phone, "WhatsApp", "+234 (0) — [Your Number]", "https://wa.me/234XXXXXXXXXX"],
            [MapPin, "Location", "Lagos, Nigeria", null],
            [Globe, "LinkedIn", "linkedin.com/in/gcrown", "https://linkedin.com/in/gcrown"],
          ].map(([Icon,label,val,href]) => (
            <div key={label} style={{display:"flex", alignItems:"center", gap:13, marginBottom:18}}>
              <div style={{width:42, height:42, borderRadius:10, background:"rgba(232,184,75,0.08)", border:"1px solid rgba(232,184,75,0.2)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0}}>
                <Icon size={15} color={GOLD}/>
              </div>
              <div>
                <p style={{fontFamily:"Outfit,sans-serif", fontSize:"0.7rem", color:"#6B7F93", textTransform:"uppercase", letterSpacing:"0.08em"}}>{label}</p>
                {href
                  ? <a href={href} target="_blank" rel="noreferrer" style={{fontFamily:"Outfit,sans-serif", fontSize:"0.86rem", color:GOLD, fontWeight:500, textDecoration:"none"}}>{val}</a>
                  : <p style={{fontFamily:"Outfit,sans-serif", fontSize:"0.86rem", color:"#E2EBF3", fontWeight:500}}>{val}</p>
                }
              </div>
            </div>
          ))}
          <a href="https://wa.me/234XXXXXXXXXX" target="_blank" rel="noreferrer" style={{textDecoration:"none", display:"block", marginTop:14}}>
            <div style={{background:"#128C7E", borderRadius:10, padding:"15px 18px", display:"flex", alignItems:"center", gap:12, cursor:"pointer"}}>
              <MessageCircle size={19} color="white"/>
              <div>
                <p style={{fontFamily:"Outfit,sans-serif", fontWeight:600, fontSize:"0.88rem", color:"white"}}>Chat on WhatsApp</p>
                <p style={{fontFamily:"Outfit,sans-serif", fontSize:"0.76rem", color:"rgba(255,255,255,0.7)", marginTop:2}}>Typically replies within a few hours</p>
              </div>
            </div>
          </a>
        </div>

        {/* Form */}
        <div style={{background:CARD, border:"1px solid rgba(255,255,255,0.05)", borderRadius:16, padding:34}}>
          {done ? (
            <div style={{textAlign:"center", padding:"36px 0"}}>
              <div style={{width:62, height:62, borderRadius:"50%", background:"rgba(46,204,113,0.1)", border:"1px solid rgba(46,204,113,0.3)", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 18px"}}>
                <CheckCircle size={26} color="#2ECC71"/>
              </div>
              <h3 style={{fontFamily:"Outfit,sans-serif", fontWeight:600, fontSize:"1.1rem", color:"#E2EBF3", marginBottom:9}}>Message Sent!</h3>
              <p style={{fontFamily:"Outfit,sans-serif", fontSize:"0.86rem", color:"#8899AA"}}>Thank you for reaching out. I'll be in touch shortly.</p>
              <button className="bg" style={{marginTop:22}} onClick={() => { setDone(false); setForm({name:"",email:"",subject:"",message:""}); }}>Send Another</button>
            </div>
          ) : (
            <>
              <h3 style={{fontFamily:"Outfit,sans-serif", fontWeight:600, fontSize:"1.05rem", color:"#E2EBF3", marginBottom:22}}>Send a Message</h3>
              <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:12, marginBottom:12}}>
                {[["name","Full Name","text","John Doe"],["email","Email","email","john@company.com"]].map(([k,l,t,ph]) => (
                  <div key={k}>
                    <label style={{fontFamily:"Outfit,sans-serif", fontSize:"0.71rem", color:"#6B7F93", display:"block", marginBottom:5, letterSpacing:"0.07em", textTransform:"uppercase"}}>{l}</label>
                    <input className="fi" type={t} value={form[k]} onChange={e => set(k, e.target.value)} placeholder={ph}/>
                  </div>
                ))}
              </div>
              <div style={{marginBottom:12}}>
                <label style={{fontFamily:"Outfit,sans-serif", fontSize:"0.71rem", color:"#6B7F93", display:"block", marginBottom:5, letterSpacing:"0.07em", textTransform:"uppercase"}}>Subject</label>
                <input className="fi" value={form.subject} onChange={e => set("subject", e.target.value)} placeholder="Project Inquiry / Collaboration / Consulting"/>
              </div>
              <div style={{marginBottom:22}}>
                <label style={{fontFamily:"Outfit,sans-serif", fontSize:"0.71rem", color:"#6B7F93", display:"block", marginBottom:5, letterSpacing:"0.07em", textTransform:"uppercase"}}>Message</label>
                <textarea className="fi" rows={5} value={form.message} onChange={e => set("message", e.target.value)} placeholder="Tell me about your project or how I can help..."/>
              </div>
              <button className="bg" style={{width:"100%", justifyContent:"center"}} onClick={submit}>Send Message <Send size={14}/></button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────── CHATBOT ─────────────────── */
function Chatbot() {
  const [open, setOpen]   = useState(false);
  const [phase, setPhase] = useState("typing");

  useEffect(() => {
    const t = setTimeout(() => setOpen(true), 3200);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (open && phase === "typing") {
      const t = setTimeout(() => setPhase("msg"), 1700);
      return () => clearTimeout(t);
    }
  }, [open, phase]);

  const toggle = () => {
    setOpen(o => !o);
    setPhase("typing");
  };

  return (
    <div style={{position:"fixed", bottom:24, right:24, zIndex:300, display:"flex", flexDirection:"column", alignItems:"flex-end", gap:12}}>
      {open && (
        <div className="chat-pop" style={{width:290, background:"#0C1B2B", border:`1px solid rgba(232,184,75,0.28)`, borderRadius:16, overflow:"hidden", boxShadow:"0 20px 56px rgba(0,0,0,0.55)"}}>
          <div style={{background:GOLD, padding:"13px 16px", display:"flex", alignItems:"center", gap:10}}>
            <div style={{width:30, height:30, borderRadius:"50%", background:"rgba(6,14,26,0.28)", display:"flex", alignItems:"center", justifyContent:"center"}}>
              <span className="ff-d" style={{fontWeight:700, fontSize:"0.78rem", color:"#060E1A"}}>OC</span>
            </div>
            <div>
              <p style={{fontFamily:"Outfit,sans-serif", fontWeight:700, fontSize:"0.83rem", color:"#060E1A"}}>G.Crown</p>
              <p style={{fontFamily:"Outfit,sans-serif", fontSize:"0.68rem", color:"rgba(6,14,26,0.62)"}}>Project Manager</p>
            </div>
            <button onClick={() => setOpen(false)} style={{marginLeft:"auto", background:"none", border:"none", cursor:"pointer", color:"rgba(6,14,26,0.55)", display:"flex", alignItems:"center"}}>
              <X size={15}/>
            </button>
          </div>
          <div style={{padding:16, minHeight:70}}>
            {phase === "typing" ? (
              <div style={{display:"flex", gap:8, alignItems:"flex-start"}}>
                <div style={{width:26, height:26, borderRadius:"50%", background:"rgba(232,184,75,0.14)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0}}>
                  <span style={{fontSize:"0.6rem", fontWeight:700, color:GOLD}}>OC</span>
                </div>
                <div style={{background:"rgba(255,255,255,0.04)", borderRadius:"0 10px 10px 10px", padding:"10px 13px"}}>
                  <div className="dt"><span/><span/><span/></div>
                </div>
              </div>
            ) : (
              <div style={{animation:"fadeIn 0.28s ease"}}>
                <div style={{display:"flex", gap:8, alignItems:"flex-start", marginBottom:14}}>
                  <div style={{width:26, height:26, borderRadius:"50%", background:"rgba(232,184,75,0.14)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0}}>
                    <span style={{fontSize:"0.6rem", fontWeight:700, color:GOLD}}>OC</span>
                  </div>
                  <div style={{background:"rgba(255,255,255,0.04)", borderRadius:"0 10px 10px 10px", padding:"11px 13px"}}>
                    <p style={{fontFamily:"Outfit,sans-serif", fontSize:"0.83rem", color:"#E2EBF3", lineHeight:1.6}}>Hi there! 👋 Ready to start your next project? I'd love to hear what you're building.</p>
                  </div>
                </div>
                <a href="https://wa.me/234XXXXXXXXXX" target="_blank" rel="noreferrer" style={{textDecoration:"none", display:"block"}}>
                  <button style={{width:"100%", background:"#128C7E", border:"none", borderRadius:8, padding:10, fontFamily:"Outfit,sans-serif", fontWeight:600, fontSize:"0.79rem", color:"white", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:7}}>
                    <MessageCircle size={14}/> Chat on WhatsApp
                  </button>
                </a>
              </div>
            )}
          </div>
        </div>
      )}
      <button onClick={toggle} style={{width:52, height:52, borderRadius:"50%", background:`linear-gradient(135deg,${GOLD},#F5CC6A)`, border:"none", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", boxShadow:`0 8px 22px rgba(232,184,75,0.42)`, animation:"float 3s ease-in-out infinite"}}>
        {open ? <X size={19} color="#060E1A"/> : <MessageCircle size={19} color="#060E1A"/>}
      </button>
    </div>
  );
}

/* ─────────────────── FOOTER ─────────────────── */
function Footer({ go }) {
  return (
    <footer style={{borderTop:"1px solid rgba(255,255,255,0.05)", padding:`52px ${P} 28px`}}>
      <div style={{display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(160px, 1fr))", gap:36, marginBottom:44}}>
        <div>
          <div style={{display:"flex", alignItems:"center", gap:10, marginBottom:14}}>
            <div style={{width:33, height:33, borderRadius:8, background:`linear-gradient(135deg,${GOLD},#F5CC6A)`, display:"flex", alignItems:"center", justifyContent:"center"}}>
              <span className="ff-d" style={{fontWeight:700, fontSize:"0.85rem", color:"#060E1A"}}>OC</span>
            </div>
            <span style={{fontFamily:"Outfit,sans-serif", fontWeight:600, fontSize:"0.88rem", color:"#E2EBF3"}}>G.Crown</span>
          </div>
          <p style={{fontFamily:"Outfit,sans-serif", fontSize:"0.8rem", color:"#6B7F93", lineHeight:1.7}}>Project Manager & Executive Strategist. Delivering clarity in complexity.</p>
        </div>
        <div>
          <p style={{fontFamily:"Outfit,sans-serif", fontWeight:700, fontSize:"0.72rem", color:"#E2EBF3", letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:14}}>Navigate</p>
          {["about","portfolio","services","testimonials","contact"].map(p => (
            <div key={p} onClick={() => go(p)} style={{fontFamily:"Outfit,sans-serif", fontSize:"0.83rem", color:"#6B7F93", marginBottom:9, cursor:"pointer", textTransform:"capitalize", transition:"color 0.2s"}} onMouseEnter={e=>e.target.style.color=GOLD} onMouseLeave={e=>e.target.style.color="#6B7F93"}>{p}</div>
          ))}
        </div>
        <div>
          <p style={{fontFamily:"Outfit,sans-serif", fontWeight:700, fontSize:"0.72rem", color:"#E2EBF3", letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:14}}>Services</p>
          {["Project Management","Strategic Documentation","Team Leadership","Curriculum Design"].map(s => (
            <div key={s} style={{fontFamily:"Outfit,sans-serif", fontSize:"0.83rem", color:"#6B7F93", marginBottom:9}}>{s}</div>
          ))}
        </div>
        <div>
          <p style={{fontFamily:"Outfit,sans-serif", fontWeight:700, fontSize:"0.72rem", color:"#E2EBF3", letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:14}}>Connect</p>
          {[["LinkedIn","https://linkedin.com/in/gcrown"],["Twitter / X","https://twitter.com/gcrown"],["WhatsApp","https://wa.me/234XXXXXXXXXX"],["Email","mailto:hello@gcrown.pm"]].map(([n,u]) => (
            <a key={n} href={u} target="_blank" rel="noreferrer" style={{display:"block", fontFamily:"Outfit,sans-serif", fontSize:"0.83rem", color:"#6B7F93", marginBottom:9, textDecoration:"none", transition:"color 0.2s"}} onMouseEnter={e=>e.target.style.color=GOLD} onMouseLeave={e=>e.target.style.color="#6B7F93"}>{n}</a>
          ))}
        </div>
      </div>
      <div style={{borderTop:"1px solid rgba(255,255,255,0.04)", paddingTop:22, display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:10}}>
        <p style={{fontFamily:"Outfit,sans-serif", fontSize:"0.75rem", color:"#3D5166"}}>© {new Date().getFullYear()} Olugbenga Crown. All rights reserved.</p>
        <p style={{fontFamily:"Outfit,sans-serif", fontSize:"0.75rem", color:"#3D5166"}}>Built with precision. Delivered with purpose.</p>
      </div>
    </footer>
  );
}

/* ─────────────────── MAIN ─────────────────── */
export default function PortfolioSite() {
  const [page, setPage]       = useState("home");
  const [fading, setFading]   = useState(false);

  useEffect(() => {
    const el = document.createElement("style");
    el.textContent = CSS;
    document.head.appendChild(el);
    return () => { try { document.head.removeChild(el); } catch{} };
  }, []);

  const go = (to) => {
    if (to === page) return;
    setFading(true);
    setTimeout(() => {
      setPage(to);
      setFading(false);
      window.scrollTo({ top:0, behavior:"smooth" });
    }, 180);
  };

  const PAGES = { home:Home, about:About, portfolio:Portfolio, services:Services, testimonials:Testimonials, contact:Contact };
  const Page  = PAGES[page] || Home;

  return (
    <div style={{fontFamily:"Outfit,sans-serif", background:BG, color:"#E2EBF3", minHeight:"100vh"}}>
      <Nav page={page} go={go}/>
      <div style={{opacity:fading?0:1, transform:fading?"translateY(5px)":"translateY(0)", transition:"opacity 0.18s ease, transform 0.18s ease"}}>
        <Page go={go}/>
      </div>
      <Footer go={go}/>
      <Chatbot/>
    </div>
  );
}
export default App;
