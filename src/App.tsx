import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Hls from 'hls.js'

gsap.registerPlugin(ScrollTrigger)

const projects = [
  ['Casa Lume', 'Residential, Lisbon', 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=85'],
  ['Noir Residence', 'Residential, Paris', 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=85'],
  ['Villa Aurelia', 'Residential, Mallorca', 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1400&q=85'],
  ['Maison 27', 'Hospitality, Copenhagen', 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=85'],
  ['Studio Sol', 'Commercial, Milan', 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1400&q=85'],
  ['Casa Terra', 'Residential, Barcelona', 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1200&q=85'],
  ['The Gallery', 'Retail, London', 'https://images.unsplash.com/photo-1617104678098-de229db51175?auto=format&fit=crop&w=1400&q=85'],
  ['Atelier 08', 'Commercial, Amsterdam', 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85'],
]

const faqs = [
  ['How long does a project take?', 'Most residential projects take 10–20 weeks depending on scope, approvals, procurement, and the level of bespoke work involved.'],
  ['Do you work remotely?', 'Yes. We work with clients internationally using a considered mix of video consultations, detailed digital presentations, samples, and trusted local partners.'],
  ['Can you work with an existing architect?', 'Absolutely. We regularly collaborate with architects, contractors, lighting designers, and specialist fabricators.'],
  ['Do you source materials and furniture?', 'Yes. Our procurement service covers furniture, lighting, finishes, fabrics, art, and styling pieces from trusted suppliers.'],
  ['Do you handle installation?', 'For full-service projects, we coordinate delivery, installation, styling, snagging, and the final reveal.'],
  ['Can I commission a single room?', 'Yes. Our Essential service is designed for focused rooms and smaller transformations while retaining the same design rigor.'],
  ['What happens after I enquire?', 'We start with a short discovery call, review your space and goals, then propose a tailored scope, fee, and timeline.'],
  ['Are prices fixed?', 'Our package fees are fixed for the agreed scope. Product, shipping, taxes, and third-party costs are clearly itemised before approval.'],
]

function App() {
  const [loading, setLoading] = useState(true)
  const [openFaq, setOpenFaq] = useState<number | null>(0)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 3000)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!videoRef.current) return
    const video = videoRef.current
    
    
    video.play().catch(() => {})
    // hls.js is included and ready for HLS sources if supplied later.
    // This fallback uses MP4 because it is broadly supported and requires no external HLS playlist.
    if (Hls.isSupported()) {
      // Intentionally left available for a future .m3u8 source.
    }
  }, [])

  useEffect(() => {
    if (loading) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.reveal').forEach((el) => {
        gsap.to(el, {
          opacity: 1, y: 0, duration: .9, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 86%', once: true }
        })
      })
      gsap.to('.hero-title', {
        yPercent: 10,
        ease: 'none',
        scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true }
      })
    })
    return () => ctx.revert()
  }, [loading])

  return (
    <>
      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{opacity:1}} exit={{opacity:0}} transition={{duration:.8}}
            className="fixed inset-0 z-[100] grid place-items-center bg-[#0A0A0A]"
          >
            <div className="text-center">
              <div className="font-display italic text-7xl md:text-8xl text-white">AN</div>
              <div className="mt-5 font-mono text-[10px] uppercase tracking-[.45em] text-[#D4AF37]">Atelier Noire</div>
              <div className="mx-auto mt-8 h-px w-32 overflow-hidden bg-white/10">
                <motion.div initial={{x:'-100%'}} animate={{x:'0%'}} transition={{duration:2.5,ease:'easeOut'}} className="h-full bg-[#D4AF37]"/>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grain" />
      <header className="fixed top-0 z-40 w-full">
        <div className="container-wide mt-5 flex items-center justify-between rounded-full border border-white/[.07] bg-black/25 px-5 py-3 backdrop-blur-xl">
          <a href="#" className="font-display text-2xl italic">AN</a>
          <nav className="hidden items-center gap-7 font-mono text-[10px] uppercase tracking-[.2em] text-white/60 md:flex">
            <a href="#work" className="transition hover:text-white">Work</a>
            <a href="#process" className="transition hover:text-white">Process</a>
            <a href="#services" className="transition hover:text-white">Services</a>
            <a href="#faq" className="transition hover:text-white">FAQ</a>
          </nav>
          <a href="#contact" className="rounded-full bg-[#D4AF37] px-4 py-2 font-mono text-[10px] font-medium uppercase tracking-[.15em] text-black">Enquire</a>
        </div>
      </header>

      <main>
        <section className="hero relative flex min-h-[100svh] items-center justify-center overflow-hidden">
  <video
    ref={videoRef}
    muted
    loop
    playsInline
    autoPlay
    preload="auto"
    className="absolute inset-0 h-full w-full object-cover"
  >
    <source
      src="/public/hero-video.mp4"
      type="video/mp4"
    />
  </video>

  <div className="absolute inset-0 bg-black/20" />

  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,transparent_0%,rgba(10,10,10,.3)_50%,#0a0a0a_100%)]" />

  <div
    className="absolute inset-0 opacity-20"
    style={{
      backgroundImage:
        "radial-gradient(circle, rgba(255,255,255,.7) 1px, transparent 1px)",
      backgroundSize: "90px 90px",
    }}
  />

  <div className="hero-title relative z-10 container-wide text-center">
    <p className="font-mono text-[10px] uppercase tracking-[.4em] text-[#D4AF37]">
      Interior Design · 2026
    </p>

    <h1 className="mx-auto mt-7 max-w-5xl text-[clamp(48px,7vw,88px)] leading-[.9] tracking-[-.045em]">
      Spaces that feel
      <br />
      <span className="font-display italic font-normal">
        like they were always meant to be.
      </span>
    </h1>

    <p className="mx-auto mt-8 max-w-xl text-base leading-7 text-white/65">
      Residential &amp; commercial — from brief to bespoke.
    </p>

    <div className="mt-9 flex flex-wrap justify-center gap-3">
      <a
        href="#work"
        className="rounded-full bg-[#D4AF37] px-6 py-3 text-sm font-medium text-black transition hover:scale-[1.02]"
      >
        View our work →
      </a>

      <a
        href="#process"
        className="rounded-full border border-white/15 bg-white/[.03] px-6 py-3 text-sm text-white backdrop-blur-xl transition hover:bg-white/[.07]"
      >
        Our process
      </a>
    </div>
  </div>

  <div className="absolute bottom-8 left-1/2 -translate-x-1/2 font-mono text-[9px] uppercase tracking-[.35em] text-white/35">
    Scroll to explore
  </div>
</section>

        <section id="work" className="section-pad">
          <div className="container-wide">
            <div className="reveal mb-14 flex flex-col justify-between gap-5 md:flex-row md:items-end">
              <div><p className="font-mono text-[10px] uppercase tracking-[.4em] text-[#D4AF37]">Selected work</p><h2 className="mt-4 text-[clamp(36px,5vw,64px)] leading-none tracking-[-.04em]">Spaces with a point<br/>of view.</h2></div>
              <p className="max-w-sm text-sm leading-6 text-white/50">Quiet materials, considered proportions, and rooms designed around how life is actually lived.</p>
            </div>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-12">
              {projects.map(([name, meta, img], i) => (
                <motion.article
                  key={name} whileHover={{y:-6}} transition={{type:'spring',stiffness:300,damping:25}}
                  className={`reveal group overflow-hidden rounded-2xl border ${i===0?'border-[#D4AF37]/60':'border-white/[.07]'} bg-white/[.03] md:col-span-${[8,4,4,8,7,5,5,7][i]}`}
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img src={img} alt={name} loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.045]" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />
                    {i===0 && <span className="absolute left-4 top-4 rounded-full bg-[#D4AF37] px-3 py-1 font-mono text-[9px] uppercase tracking-[.2em] text-black">Featured</span>}
                  </div>
                  <div className="flex items-center justify-between p-5">
                    <div><h3 className="text-xl">{name}</h3><p className="mt-1 font-mono text-[10px] uppercase tracking-[.15em] text-white/40">{meta}</p></div>
                    <span className="grid h-9 w-9 place-items-center rounded-full border border-white/10 text-white/50 transition group-hover:border-[#D4AF37]/50 group-hover:text-[#D4AF37]">↗</span>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section id="process" className="section-pad border-y border-white/[.05] bg-white/[.015]">
          <div className="container-wide">
            <div className="reveal mb-20"><p className="font-mono text-[10px] uppercase tracking-[.4em] text-[#D4AF37]">How we work</p><h2 className="mt-4 max-w-3xl text-[clamp(36px,5vw,64px)] leading-[.98] tracking-[-.04em]">From first sketch<br/><span className="font-display italic">to final detail.</span></h2></div>
            <div className="space-y-20 md:space-y-28">
              {[
                ['01','CONSULTATION','Understand your vision, space, and lifestyle.','https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?auto=format&fit=crop&w=1200&q=85'],
                ['02','DESIGN & MOODBOARD','Curate materials, colours, and furniture.','https://images.unsplash.com/photo-1615529328331-f8917597711f?auto=format&fit=crop&w=1200&q=85'],
                ['03','DELIVERY & STYLING','Execute, install, and style the final space.','https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=85']
              ].map(([num,title,body,img],i)=>(
                <div key={num} className={`reveal grid items-center gap-10 md:grid-cols-12 ${i%2?'':'md:[&>*:first-child]:col-start-2'}`}>
                  <div className={`md:col-span-5 ${i%2?'md:order-2':''}`}><p className="font-mono text-xs tracking-[.3em] text-[#D4AF37]">{num}</p><h3 className="mt-4 text-[clamp(28px,3vw,42px)] tracking-[-.03em]">{title}</h3><p className="mt-5 max-w-md text-base leading-7 text-white/55">{body}</p></div>
                  <div className={`overflow-hidden rounded-2xl border border-white/[.07] md:col-span-5 ${i%2?'md:order-1':''}`}><img src={img} alt="" loading="lazy" className="aspect-[4/3] w-full object-cover"/></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section-pad">
          <div className="container-wide">
            <div className="reveal grid gap-12 md:grid-cols-12">
              <div className="md:col-span-5"><p className="font-mono text-[10px] uppercase tracking-[.4em] text-[#D4AF37]">Social proof</p><h2 className="mt-4 text-[clamp(36px,5vw,60px)] leading-none tracking-[-.04em]">Rooms people<br/><span className="font-display italic">remember.</span></h2></div>
              <div className="md:col-span-7"><blockquote className="border-l border-[#D4AF37]/60 pl-6 text-[clamp(24px,3vw,34px)] leading-tight">“They found the exact balance between restraint and warmth. The finished home feels completely ours.”<footer className="mt-6 font-mono text-[10px] uppercase tracking-[.2em] text-white/35">— Sofia &amp; Daniel, Lisbon</footer></blockquote></div>
            </div>
            <div className="mt-20 grid gap-4 sm:grid-cols-3">
              {['“Quietly exceptional.”','“Every detail considered.”','“A home, not a showroom.”'].map((q,i)=><div key={q} className="reveal rounded-2xl border border-white/[.07] bg-white/[.025] p-7"><p className="font-display text-2xl italic">{q}</p><p className="mt-6 font-mono text-[9px] uppercase tracking-[.2em] text-white/35">{['Architectural Digest','The Modern Edit','Dezeen Homes'][i]}</p></div>)}
            </div>
          </div>
        </section>

        <section id="services" className="section-pad border-y border-white/[.05]">
          <div className="container-wide">
            <div className="reveal text-center"><p className="font-mono text-[10px] uppercase tracking-[.4em] text-[#D4AF37]">Services &amp; pricing</p><h2 className="mx-auto mt-4 max-w-2xl text-[clamp(36px,5vw,60px)] leading-none tracking-[-.04em]">Choose your level<br/><span className="font-display italic">of detail.</span></h2></div>
            <div className="mt-16 grid gap-5 lg:grid-cols-3">
              {[
                ['01','Essential','€2,500',['One room concept','Layout + colour direction','Curated furniture list','1 revision']],
                ['02','Premium','€5,500',['Up to 3 rooms','Full moodboards + FF&E','Supplier & material sourcing','3 revisions']],
                ['03','Bespoke','€12,500+',['Whole-home design','Custom joinery & detailing','Procurement + installation','White-glove styling']]
              ].map(([num,name,price,features],i)=>(
                <motion.div whileHover={{y:-5}} key={String(name)} className={`reveal rounded-2xl border p-7 ${i===1?'border-[#D4AF37]/70 bg-[#D4AF37]/[.055] gold-glow':'border-white/[.07] bg-white/[.025]'}`}>
                  <div className="flex justify-between font-mono text-[9px] tracking-[.25em] text-[#D4AF37]"><span>{num}</span>{i===1&&<span>MOST POPULAR</span>}</div>
                  <h3 className="mt-12 text-2xl">{name}</h3><p className="mt-3 font-display text-4xl italic">{price}</p>
                  <ul className="mt-8 space-y-4 border-t border-white/[.07] pt-7">{(features as string[]).map(f=><li key={f} className="flex gap-3 text-sm text-white/60"><span className="text-[#D4AF37]">✓</span>{f}</li>)}</ul>
                  <a href="#contact" className="mt-9 block rounded-full border border-white/10 px-5 py-3 text-center text-sm transition hover:border-[#D4AF37]/60">Choose {name} →</a>
                </motion.div>
              ))}
            </div>
            <p className="reveal mt-6 text-center font-mono text-[9px] uppercase tracking-[.2em] text-white/30">All prices one-shot, no hidden fees</p>
          </div>
        </section>

        <section id="faq" className="section-pad">
          <div className="container-wide grid gap-14 md:grid-cols-12">
            <div className="reveal md:col-span-4"><p className="font-mono text-[10px] uppercase tracking-[.4em] text-[#D4AF37]">FAQ</p><h2 className="mt-4 text-[clamp(36px,5vw,60px)] leading-none tracking-[-.04em]">Before we<br/><span className="font-display italic">begin.</span></h2></div>
            <div className="md:col-span-8">
              {faqs.map(([q,a],i)=>(
                <div key={q} className={`reveal border-b border-white/[.07] ${openFaq===i?'border-l-2 border-l-[#D4AF37] pl-5':''}`}>
                  <button aria-expanded={openFaq===i} onClick={()=>setOpenFaq(openFaq===i?null:i)} className="flex w-full items-center justify-between gap-5 py-6 text-left text-lg font-medium">
                    <span>{q}</span><span className="text-2xl font-light text-white/40">{openFaq===i?'−':'+'}</span>
                  </button>
                  <AnimatePresence initial={false}>{openFaq===i&&<motion.div initial={{height:0,opacity:0}} animate={{height:'auto',opacity:1}} exit={{height:0,opacity:0}} transition={{duration:.3,ease:'easeOut'}} className="overflow-hidden"><p className="max-w-2xl pb-6 text-base leading-7 text-white/55">{a}</p></motion.div>}</AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="relative overflow-hidden border-t border-white/[.05] py-32 md:py-44">
          <div className="absolute inset-x-0 bottom-0 h-72 bg-[radial-gradient(ellipse_at_50%_100%,rgba(212,175,55,.16),transparent_65%)]" />
          <div className="relative container-wide text-center">
            <p className="reveal font-mono text-[10px] uppercase tracking-[.4em] text-[#D4AF37]">Start a conversation</p>
            <h2 className="reveal mx-auto mt-6 max-w-5xl text-[clamp(42px,7vw,82px)] leading-[.9] tracking-[-.05em]">Ready to reimagine your space?<br/><span className="font-display italic font-normal">Or still browsing for inspiration?</span></h2>
            <a href="mailto:studio@ateliernoire.example" className="reveal mt-10 inline-block rounded-full bg-[#D4AF37] px-7 py-4 text-sm font-medium text-black transition hover:scale-[1.02]">Start your project →</a>
          </div>
        </section>

        <div className="marquee overflow-hidden border-y border-white/[.06] py-4 font-mono text-[10px] uppercase tracking-[.3em] text-white/35">
          <div className="marquee-track flex"><span className="px-5">Timeless design · Crafted with care · </span><span className="px-5">Timeless design · Crafted with care · </span><span className="px-5">Timeless design · Crafted with care · </span><span className="px-5">Timeless design · Crafted with care · </span></div>
        </div>
      </main>

      <footer className="py-14">
        <div className="container-wide grid gap-10 border-b border-white/[.06] pb-12 md:grid-cols-3">
          <div><div className="font-display text-5xl italic">AN</div><p className="mt-4 max-w-xs text-sm leading-6 text-white/40">Interior architecture and design for considered living.</p></div>
          <div><p className="font-mono text-[9px] uppercase tracking-[.25em] text-[#D4AF37]">Studio</p><p className="mt-4 text-sm text-white/55">Lisbon · Paris · Worldwide</p><p className="mt-2 text-sm text-white/55">Mon–Fri · 09:00–18:00</p></div>
          <div><p className="font-mono text-[9px] uppercase tracking-[.25em] text-[#D4AF37]">Contact</p><a href="mailto:studio@ateliernoire.example" className="mt-4 block text-sm text-white/55 hover:text-white">studio@ateliernoire.example</a><a href="#" className="mt-2 block text-sm text-white/55 hover:text-white">Instagram ↗</a></div>
        </div>
        <div className="container-wide flex flex-col justify-between gap-3 pt-7 font-mono text-[9px] uppercase tracking-[.18em] text-white/25 md:flex-row"><span>© 2026 Atelier Noire</span><span>Designed for timeless spaces</span></div>
      </footer>
    </>
  )
}

export default App