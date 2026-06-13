import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { GiLoveHowl, GiRing } from "react-icons/gi";
import { BiDiamond } from "react-icons/bi";
import { TbHeartHandshake, TbFlower, TbCrown, TbStar } from "react-icons/tb";
import { HiCalendar, HiMap, } from "react-icons/hi";
import { FiCopy, FiCheck } from "react-icons/fi";
import { BsInstagram } from "react-icons/bs";

// ─── DATA ─────────────────────────────────────────────────────────────────────
const DATA = {
  groom: { name: "Raphael", fullName: "Raphael Aldino", initial: "R", parents: "Bapak Drs. Agus Prasetyo & Ibu Siti Rahmawati", instagram: "@raphael.aldino" },
  bride: { name: "Seraphina", fullName: "Seraphina Kirana", initial: "S", parents: "Bapak Kirana Wijaya & Ibu dr. Dewi Kusuma", instagram: "@seraphina.laila" },
  akadDate: "Sabtu, 17 Juli 2025",
  akadTime: "08:00 – Selesai",
  resepsiDate: "Sabtu, 14 Juni 2025",
  resepsiTime: "10:00 – Selesai",
  venue: "The Grand Ballroom, Hotel Majapahit",
  address: "Jl. Tunjungan No.65, Surabaya, Jawa Timur",
  mapsUrl: "https://maps.google.com",
  weddingDate: new Date("2026-07-17T08:00:00"),
  bankAccounts: [
    { bank: "Muamalat", name: "Raphael Aldino", number: "0987 6543 21" }
  ],
};

// ─── HOOKS ────────────────────────────────────────────────────────────────────
function useCountdown(target) {
  const calc = () => {
    const d = target - Date.now();
    if (d <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    return { days: Math.floor(d / 86400000), hours: Math.floor((d % 86400000) / 3600000), minutes: Math.floor((d % 3600000) / 60000), seconds: Math.floor((d % 60000) / 1000) };
  };
  const [t, setT] = useState(calc);
  useEffect(() => { const id = setInterval(() => setT(calc()), 1000); return () => clearInterval(id); }, []);
  return t;
}

function useCopied() {
  const [copied, setCopied] = useState(null);
  const copy = (text, id) => { navigator.clipboard.writeText(text).catch(() => { }); setCopied(id); setTimeout(() => setCopied(null), 2000); };
  return [copied, copy];
}

// ─── REVEAL (dengan efek berbeda) ────────────────────────────────────────────
function Reveal({ children, delay = 0, y = 30, className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y, scale: 0.96 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.25, 0.1, 0.2, 1] }}
      className={className} >
      {children}
    </motion.div>
  );
}

// ─── DECORATIVE ELEMENTS (maroon & gold) ──────────────────────────────────────
function MaroonDivider() {
  return (
    <div className="flex items-center justify-center gap-3 my-6">
      <div className="h-px w-12 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
      {/* <TbStar className="text-[#D4AF37] text-sm" /> */}
      <TbCrown className="text-[#D4AF37] text-sm" />
      <div className="h-px w-12 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
    </div>
  );
}

function BackgroundPattern() {
  return (
    <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
      <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 20% 40%, #D4AF37 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
      <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(45deg, #D4AF37 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
    </div>
  );
}

function MaroonGlow({ className = "" }) {
  return <div className={`absolute rounded-full bg-[#D4AF37] blur-[120px] opacity-10 ${className}`} />;
}

// ─── COVER (luxury maroon) ────────────────────────────────────────────────────
function Cover({ onOpen }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.7 }}
      className="min-h-dvh flex flex-col items-center justify-center relative overflow-hidden px-6 text-center bg-gradient-to-br from-[#3A0B12] via-[#5E1A2B] to-[#2D0710]"
    >
      <MaroonGlow className="top-1/4 left-1/4 w-64 h-64" />
      <MaroonGlow className="bottom-1/3 right-1/4 w-80 h-80" />
      <BackgroundPattern />
      <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 100 100\'%3E%3Cpath d=\'M20 20 L80 20 L80 80 L20 80 Z\' fill=\'none\' stroke=\'%23D4AF37\' stroke-width=\'0.8\' /%3E%3C/svg%3E")', backgroundSize: '60px 60px' }} />

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 1, ease: [0.2, 0.9, 0.4, 1] }}
        className="relative z-10 max-w-[500px]">

        {/* <div className="mb-6">
          <div className="flex justify-center gap-3">
            <div className="w-8 h-px bg-[#D4AF37]" />
            <TbCrown className="text-[#D4AF37] text-2xl" />
            <div className="w-8 h-px bg-[#D4AF37]" />
          </div>
        </div> */}

        <p className="text-xs tracking-[0.3em] text-[#D4AF37] uppercase mb-7">Wedding Invitation</p>

        <h1 className="text-4xl md:text-6xl font-primary tracking-wide text-white">{DATA.groom.name}</h1>

        <div className="mt-8 mb-3 text-[#D4AF37] text-2xl flex items-center justify-center gap-4">
          <span className="text-sm sm:text-lg font-primary tracking-wider">&</span>
        </div>

        <h1 className="text-4xl md:text-6xl font-primary tracking-wide text-white">{DATA.bride.name}</h1>

        <div className="text-4xl md:text-6xl tracking-wider text-white font-primary">
          <MaroonDivider />
        </div>

        <div className="flex flex-col items-center gap-3">

          <p className="text-sm sm:text-xl lg:text-sm text-[#E0C8A8] tracking-wide mb-3">Kepada Yth</p>
          <p className="text-white text-base font-light tracking-wide border-b border-[#D4AF37]/50 inline-block pb-1 px-6 mb-20 lg:mb-6">Hartono</p>
        </div>

        <motion.button
          whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(212, 175, 55, 0.5)" }}
          whileTap={{ scale: 0.97 }}
          onClick={onOpen}
          className="px-10 py-3 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#B8962A] text-[#3A0B12] text-sm sm:text-xl lg:text-sm w-full font-semibold hover:from-[#C9A93E] hover:to-[#D4AF37] transition-all duration-500 shadow-lg">
          Buka Undangan
        </motion.button>
      </motion.div>
    </motion.div>
  );
}

// ─── HERO SECTION (maroon dengan garis emas) ──────────────────────────────────
function HeroSection() {
  return (
    <section className="relative py-16 px-6 text-center overflow-hidden  bg-gradient-to-br from-[#3A0B12] via-[#5E1A2B] to-[#2D0710]">

      <MaroonGlow className="top-20 left-1/4 w-96 h-96" />

      <BackgroundPattern />

      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />

      <div className="relative z-10 max-w-3xl mx-auto">

        <Reveal>

          {/* <div className="flex justify-center gap-2 mb-5">
            {[...Array(3)].map((_, i) => <div key={i} className="w-6 h-px bg-[#D4AF37]" />)}
          </div>
           
          <div className="inline-block border border-[#D4AF37]/60 rounded-full px-6 py-2 text-[#D4AF37] text-xs tracking-wider bg-white/5 backdrop-blur-sm">
            #RaphaelSeraphinaWedding
          </div>*/}
          <p className="text-xs text-[#D4AF37] mb-1 inline-blockrounded-lg px-6 tracking-wider">RaphaelSeraphina</p>

          <p className="text-xs tracking-[0.3em] text-[#D4AF37] uppercase  mb-7">Wedding Invitation</p>

          <div className="flex flex-col items-center justify-center gap-2 sm:gap-5 mb-4 sm:mb-2">
            <h1 className="text-4xl md:text-6xl font-primary tracking-wide text-white">{DATA.groom.name}</h1>

            {/* <div className="my-5 text-[#D4AF37] text-xl flex justify-center gap-3 items-center">
            <span className="w-10 h-px bg-[#D4AF37]" /> ✦ <span className="w-10 h-px bg-[#D4AF37]" />
          </div> */}

            <span className="text-[#D4AF37] text-sm sm:text-2xl font-primary mt-4 mb-3 tracking-wider">&</span>

            <h1 className="text-4xl md:text-6xl font-primary tracking-wide text-white">{DATA.bride.name}</h1>
          </div>

          <p className="text-[#E0C8A8] text-sm tracking-wide mt-1 sm:mt-9 lg:mt-9">{DATA.akadDate}</p>

          <div className="mt-12 mb-24 sm:mt-14 lg:mt-8 lg:mb-8">
            <MaroonDivider />
          </div>

        </Reveal>
      </div>
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
    </section>
  );
}

// ─── COUPLE SECTION (kartu maroon dengan aksen emas) ──────────────────────────
function PersonCard({ person, role, delay = 0 }) {
  return (
    <Reveal delay={delay} className="flex-1 min-w-[260px] max-w-[320px]">

      <div className="relative p-8 text-center bg-gradient-to-br from-[#4A1525] to-[#2D0710] rounded-3xl border border-[#D4AF37]/40 shadow-2xl overflow-hidden">

        <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-[#D4AF37] blur-[60px] opacity-20" />
        <div className="absolute -bottom-10 -left-10 w-32 h-32 rounded-full bg-[#D4AF37] blur-[60px] opacity-20" />

        <div className="relative z-10 ">
          <div className="w-28 h-28 rounded-full mx-auto mb-6 flex items-center justify-center border-2 border-[#D4AF37] bg-[#5E1A2B] shadow-lg">
            <span className="text-4xl font-primary text-[#D4AF37]">{person.initial}</span>
          </div>
          <p className="uppercase mb-3 tracking-[0.3em] text-[10px] text-[#D4AF37]">{role}</p>
          <h3 className="text-3xl font-primary text-white">{person.fullName.split(" ")[0]}</h3>
          <p className="text-xs text-[#E0C8A8] mt-1">{person.fullName.split(" ").slice(1).join(" ")}</p>
          <div className="w-12 h-px bg-[#D4AF37] mx-auto my-4" />
          <p className="text-sm text-[#E0C8A8] leading-relaxed">
            {role === " " ? "Putra" : "Putri"} dari<br />
            <span className="text-white">{person.parents.split(" & ")[0]}<br />&amp; {person.parents.split(" & ")[1]}</span>
          </p>
          <p className="text-xs text-[#D4AF37] mt-4 flex items-center justify-center gap-1"><BsInstagram />{person.instagram}</p>
        </div>

      </div>

    </Reveal>
  );
}

function CoupleSection() {
  return (
    <section className="py-16 px-6 bg-gradient-to-br from-[#2D0710] to-[#3A0B12] relative">
      <BackgroundPattern />

      <Reveal>
        <h2 className="text-center text-[32px] lg:text-4xl mb-4 font-primary text-white">The Wedding Of</h2>
        <p className="text-center text-sm text-white italic max-w-md mx-auto">The pleasure of your company is requeste</p>

        <div className="mt-12 mb-24 sm:mt-14 lg:mt-8 lg:mb-8">
          <MaroonDivider />
        </div>
      </Reveal>

      <div className="flex flex-wrap justify-center gap-8 max-w-4xl mx-auto mt-16">
        <PersonCard person={DATA.groom} role=" " delay={0} />
        <PersonCard person={DATA.bride} role=" " delay={0.2} />
      </div>
    </section>
  );
}

// ─── SAVE THE DATE (countdown dengan progress bar) ───────────────────────────
function CountUnit({ value, label }) {
  return (
    <div className="text-center">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
      <div className="relative">
        <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-[#3A0B12] border border-[#D4AF37]/60 flex items-center justify-center shadow-lg">
          <span className="text-3xl md:text-4xl font-light text-[#D4AF37]">{String(value).padStart(2, "0")}</span>
        </div>
      </div>
      <p className="text-xs text-[#D4AF37] mt-3">{label}</p>
    </div>
  );
}

function SaveTheDateSection() {
  const t = useCountdown(DATA.weddingDate);
  
  const addCal = () => {
    const s = DATA.weddingDate.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
    const e = new Date(DATA.weddingDate.getTime() + 9 * 3600000).toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
    window.open(`https://calendar.google.com/calendar/render?action=TEMPLATE&text=Pernikahan+${DATA.groom.name}+%26+${DATA.bride.name}&dates=${s}/${e}&location=${encodeURIComponent(DATA.address)}`, "_blank");
  };

  return (
    <section className="py-16 px-6 text-center bg-[#3A0B12] relative">
      <MaroonGlow className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96" />
      <Reveal>
        <h2 className="lg:text-4xl mb-4 font-primary text-white">Save The Date</h2>

        <div className="mt-12 mb-24 sm:mt-14 lg:mt-8 lg:mb-8">
          <MaroonDivider />
        </div>

        {/* <p className="text-[#5E1A2B] text-sm tracking-wide">{DATA.akadDate}</p> */}
        <div className="flex flex-wrap justify-center gap-6 md:gap-10 mt-12">
          <CountUnit value={t.days} label="Hari" />
          <CountUnit value={t.hours} label="Jam" />
          <CountUnit value={t.minutes} label="Menit" />
          <CountUnit value={t.seconds} label="Detik" />
        </div>
        <motion.button
          whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(212, 175, 55, 0.5)" }}
          whileTap={{ scale: 0.98 }}
          onClick={addCal}
          className="mt-12 px-8 py-3 bg-gradient-to-r from-[#D4AF37] to-[#B8962A] text-[#3A0B12] text-xs sm:text-sm font-semibold rounded-full shadow-lg">
          {/* <HiCalendar className="inline mr-2" />  */} Tambahkan Ke Kalender
        </motion.button>
      </Reveal>
    </section>
  );
}

// ─── WEDDING DAY SECTION (kartu diagonal) ─────────────────────────────────────
function EventCard({ icon, title, date, time, delay = 0 }) {
  return (
    <Reveal delay={delay} className="group">
      <div className="relative w-72  p-8 bg-white rounded-2xl shadow-xl border-l-8 border-[#D4AF37] overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
        <div className="absolute -top-6 -right-6 w-24 h-24 bg-[#D4AF37] rounded-full blur-2xl opacity-10 group-hover:opacity-20 transition" />

        <div className="relative z-10">
          <div className="text-4xl text-[#D4AF37] mb-4">{icon}</div>
          <h3 className="text-2xl font-primary text-[#3A0B12]">{title}</h3>
          <div className="w-10 h-px bg-[#D4AF37] my-3" />

          <p className="text-sm text-[#D4AF37]">{time}</p>
        </div>

      </div>
    </Reveal>
  );
}

function WeddingDaySection() {
  return (
    <section className="py-16 px-6 bg-gradient-to-br from-[#2D0710] to-[#3A0B12] relative">
      <BackgroundPattern />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />

      <Reveal>
        <h2 className="text-[32px] lg:text-4xl mb-4 font-primary text-white text-center">It's Wedding Day</h2>
        <p className="text-center text-sm text-[#9A9A9A] italic">True love stands by each other's side on<br />good days and stands closer on bad days</p>

        <div className="mt-12 mb-24 sm:mt-14 lg:mt-8 lg:mb-8">
          <MaroonDivider />
        </div>

        <p className="text-center text-2xl mb-20 text-[#E0C8A8]">{DATA.akadDate}</p>
      </Reveal>

      <div className="flex flex-wrap justify-center gap-8 max-w-3xl mx-auto mt-12">
        <EventCard icon={<GiRing />} title="Akad Nikah" date={DATA.akadDate} time={DATA.akadTime} delay={0} />
        <EventCard icon={<img src="mrn.png" alt="" className="w-7" />} title="Resepsi" date={DATA.resepsiTime} time={DATA.resepsiTime} delay={0.15} />
      </div>

      <Reveal delay={0.3} className="mt-16 text-center max-w-md mx-auto">
        <div className="bg-white/5 backdrop-blur-sm border border-[#D4AF37]/40 rounded-2xl p-6">
          <HiMap className="text-3xl text-[#D4AF37] mx-auto mb-2" />

          <h4 className="text-xl font-light text-white">{DATA.venue}</h4>
          <p className="text-xs text-[#E0C8A8] mt-2">{DATA.address}</p>
          <a href={DATA.mapsUrl} target="_blank" rel="noreferrer" className="inline-block mt-4 px-6 py-2 text-sm border border-[#D4AF37] text-[#D4AF37] bg-transparent hover:bg-[#D4AF37] hover:text-[#3A0B12] transition-all rounded-full">
            Lihat Peta
          </a>
        </div>
      </Reveal>
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
    </section>
  );
}

// ─── RSVP (form dengan border bawah emas) ─────────────────────────────────────
const inputClass = "w-full px-5 py-3 rounded-xl bg-white border-b-2 border-[#D4AF37] focus:border-[#B8962A] outline-none text-[#3A0B12] text-sm transition-all placeholder:text-[#9A8E80]";

function RSVPSection() {
  const [name, setName] = useState("");
  const [attend, setAttend] = useState("");
  const [guests, setGuests] = useState("1");
  const [done, setDone] = useState(false);
  return (
    <section className="py-28 px-6 bg-[#FDF8F5] relative">
      <BackgroundPattern />
      <Reveal>
        <h2 className="text-[32px] lg:text-4xl font-light text-[#3A0B12] text-center">Konfirmasi Kehadiran</h2>
        <MaroonDivider />
      </Reveal>
      <div className="max-w-md mx-auto mt-10">
        <AnimatePresence mode="wait">
          {done ? (
            <motion.div key="done" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center p-8 bg-white rounded-2xl shadow-lg border border-[#D4AF37]/30">
              <TbHeartHandshake className="text-5xl text-[#D4AF37] mx-auto mb-4" />
              <p className="text-2xl font-light text-[#3A0B12]">Terima Kasih, {name}!</p>
              <p className="text-sm text-[#5E1A2B]">Kehadiran Anda adalah kebahagiaan bagi kami.</p>
            </motion.div>
          ) : (
            <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <input className={inputClass} placeholder="Nama Lengkap" value={name} onChange={e => setName(e.target.value)} />
              <select className={`${inputClass} mt-5 appearance-none`} value={attend} onChange={e => setAttend(e.target.value)}>
                <option value="" disabled>Konfirmasi Kehadiran</option>
                <option value="hadir">Saya akan hadir</option>
                <option value="tidak">Tidak dapat hadir</option>
              </select>
              {attend === "hadir" && (
                <select className={`${inputClass} mt-5 appearance-none`} value={guests} onChange={e => setGuests(e.target.value)}>
                  {[1, 2, 3, 4, 5].map(n => <option key={n} value={n}>{n} orang</option>)}
                </select>
              )}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => { if (name && attend) setDone(true); }}
                className="w-full mt-8 py-3 bg-gradient-to-r from-[#D4AF37] to-[#B8962A] text-[#3A0B12] text-xs tracking-[0.2em] uppercase font-semibold rounded-full shadow-lg">
                Kirim Konfirmasi
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

// ─── GIFT (kartu bank dengan aksen maroon) ────────────────────────────────────
function GiftSection() {
  const [copied, copy] = useCopied();
  return (
    <section className="py-16 px-6 bg-[#3A0B12] relative">
      <BackgroundPattern />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
      <Reveal>
        <h2 className="text-[32px] lg:text-4xl font-primary text-white text-center mb-4">Wedding Gift</h2>
        <p className="text-center text-sm text-[#E0C8A8] max-w-md mx-auto italic">Tanpa mengurangi rasa hormat, apabila Bapak/Ibu/Saudara/i<br className="hidden sm:block" />
          berkeinginan memberikan tanda kasih, kami persilahkan<br className="hidden sm:block" />
          untuk menyampiakannya melalui nomor rekening berikut</p>

        <div className="mt-12 mb-24 sm:mt-14 lg:mt-8 lg:mb-8">
          <MaroonDivider />
        </div>

      </Reveal>

      <div className="max-w-md mx-auto mt-10 space-y-5">

        {DATA.bankAccounts.map((acc, i) => (
          <Reveal key={i} delay={i * 0.1}>

            <div className="flex items-center justify-between gap-3 p-5 bg-white/10 rounded-2xl shadow-md border-l-4 border-l-[#D4AF37]">

              <div>
                <p className="text-xs text-[#D4AF37]">{acc.bank}</p>
                <p className="font-serif text-lg lg:text-xl text-white mt-1 tracking-wider">{acc.number}</p>
                <p className="text-xs text-[#E0C8A8] mt-1">{acc.name}</p>
              </div>

              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => copy(acc.number.replace(/\s/g, ""), i)}
                className={`px-4 py-2 text-[10px] tracking-wide flex items-center gap-1 rounded-full transition-all ${copied === i ? "bg-[#D4AF37] text-[#3A0B12]" : "border border-[#D4AF37] text-[#D4AF37] bg-transparent"}`}>
                {copied === i ? <FiCheck size={12} /> : <FiCopy size={12} />} {copied === i ? "Tersalin" : "Salin"}
              </motion.button>

            </div>

          </Reveal>
        ))}

      </div>

      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
    </section>
  );
}

// ─── WISHES (komentar dengan border maroon) ───────────────────────────────────
const INIT_WISHES = [
  { name: "Ahmad Farhan", attend: "Hadir", message: "Semoga menjadi keluarga sakinah, mawaddah, warahmah. Barakallah!" },
  { name: "Rini Kartika", attend: "Hadir", message: "Selamat menempuh hidup baru! Semoga selalu bahagia dan penuh berkah." },
  { name: "Budi Santoso", attend: "Tidak dapat hadir", message: "Maaf tidak bisa hadir, doa terbaik untuk kalian berdua." },
];

function WishesSection() {
  const [wishes, setWishes] = useState(INIT_WISHES);
  const [form, setForm] = useState({ name: "", message: "" });
  const [sent, setSent] = useState(false);
  const submit = () => {
    if (!form.name || !form.message) return;
    setWishes(p => [{ name: form.name, attend: "—", message: form.message }, ...p]);
    setForm({ name: "", message: "" });
    setSent(true);
    setTimeout(() => setSent(false), 2000);
  };
  return (
    <section className="py-16 px-6 bg-[#FDF8F5] relative">
      <BackgroundPattern />

      <Reveal>
        <h2 className="text-[32px] lg:text-4xl font-light text-[#3A0B12] text-center">Ucapan &amp; Doa</h2>
        <MaroonDivider />
      </Reveal>

      <div className="max-w-lg mx-auto">
        <input className={inputClass} placeholder="Nama Anda" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
        <textarea className={`${inputClass} mt-5 min-h-[100px]`} placeholder="Tulis ucapan atau doa untuk mempelai..." value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} />

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={submit}
          className={`w-full mt-6 py-3 text-[11px] tracking-[0.2em] uppercase rounded-full transition-all duration-400 ${sent ? "bg-[#D4AF37] text-[#3A0B12]" : "bg-gradient-to-r from-[#D4AF37] to-[#B8962A] text-[#3A0B12]"}`}>
          {sent ? "Ucapan Terkirim ✓" : "Kirim Ucapan"}
        </motion.button>

        <div className="mt-12 space-y-5">
          <AnimatePresence>

            {wishes.map((w, i) => (

              <motion.div key={`${w.name}-${i}`} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="p-5 bg-white rounded-2xl shadow-md border-l-4 border-l-[#D4AF37]">

                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm font-medium text-[#3A0B12]">{w.name}</p>
                    <p className="text-[9px] text-[#D4AF37] uppercase tracking-wide">{w.attend}</p>
                  </div>
                  <TbFlower className="text-[#D4AF37] text-lg" />
                </div>
                <p className="text-sm text-[#5E1A2B] italic mt-3 leading-relaxed">"{w.message}"</p>

              </motion.div>

            ))}

          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

// ─── FOOTER (dengan Powered by MuRu) ─────────────────────────────────────────
function Footer() {
  return (
    <footer className="pt-16 pb-11 px-6 text-center bg-gradient-to-br from-[#2D0710] to-[#3A0B12] relative">
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 20% 40%, #D4AF37 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
      <div className="relative z-10">
        {/* <TbCrown className="text-4xl text-[#D4AF37] mx-auto mb-4" />
        <div className="w-16 h-px bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto mb-4" /> */}

        <div className="mb-24 lg:mb-16">
          <MaroonDivider />
        </div>

        <p className="text-white text-3xl font-primary mb-3">{DATA.groom.name} &amp; {DATA.bride.name}</p>
        <p className="text-[#D4AF37] text-xs mt-1">{DATA.akadDate}</p>
        <div className="w-12 h-px bg-[#D4AF37]/50 mx-auto mt-10 mb-4" />
        {/* <p className="text-[#E0C8A8] text-[10px]">Undangan Pernikahan Digital | Maroon Elegance</p> */}
        <p className="text-[#E0C8A8] text-xs mt-3">Powered by </p>
        <p className="text-[#D4AF37] text-sm">MuRu</p>
      </div>
    </footer>
  );
}

// ─── ROOT ─────────────────────────────────────────────────────────────────────
export default function MrnLuxury() {
  const [opened, setOpened] = useState(false);
  return (
    <div className="min-h-dvh overflow-x-hidden bg-[#FDF8F5]">
      <AnimatePresence mode="wait">
        {!opened ? (
          <Cover key="cover" onOpen={() => setOpened(true)} />
        ) : (
          <motion.div key="main" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
            <HeroSection />
            <CoupleSection />
            <SaveTheDateSection />
            <WeddingDaySection />
            {/* <RSVPSection /> */}
            <GiftSection />
            {/* <WishesSection /> */}
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}