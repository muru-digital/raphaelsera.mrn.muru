import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { GiLoveHowl, GiRing } from "react-icons/gi";
import { BiDiamond, BiMap, BiCalendarHeart } from "react-icons/bi";
import { FaGift, FaHeart } from "react-icons/fa";

// ─── DATA ─────────────────────────────────────────────────────────────────────
const DATA = {
  groom: {
    name: "Ardian",
    fullName: "Ardian Mahendra Putra",
    initial: "A",
    parents: "Bapak Ir. H. Mahendra & Ibu Hj. Ratna Dewi",
    instagram: "@ardian.mp",
  },
  bride: {
    name: "Maharani",
    fullName: "Maharani Kirana Dewi",
    initial: "M",
    parents: "Bapak H. Kirana & Ibu dr. Dewi Lestari",
    instagram: "@maharanikd",
  },
  akadDate: "Sabtu, 20 September 2025",
  akadTime: "09:00 – 10:30 WIB",
  resepsiDate: "Sabtu, 20 September 2025",
  resepsiTime: "11:00 – 16:00 WIB",
  venue: "The Grand Ballroom, Hotel Mulia Senayan",
  address: "Jl. Asia Afrika No. 8, Senayan, Jakarta Pusat",
  mapsUrl: "https://maps.google.com",
  weddingDate: new Date("2025-09-20T09:00:00"),
  bankAccounts: [
    { bank: "BCA", name: "Ardian Mahendra P.", number: "1234 5678 90" },
    { bank: "Mandiri", name: "Maharani Kirana D.", number: "0987 6543 21" },
  ],
};

// ─── COUNTDOWN ────────────────────────────────────────────────────────────────
function useCountdown(target) {
  const calc = () => {
    const d = target - Date.now();
    if (d <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    return {
      days: Math.floor(d / 86400000),
      hours: Math.floor((d % 86400000) / 3600000),
      minutes: Math.floor((d % 3600000) / 60000),
      seconds: Math.floor((d % 60000) / 1000),
    };
  };
  const [t, setT] = useState(calc);
  useEffect(() => {
    const id = setInterval(() => setT(calc()), 1000);
    return () => clearInterval(id);
  }, []);
  return t;
}

function useCopied() {
  const [copied, setCopied] = useState(null);
  const copy = (text, id) => {
    navigator.clipboard.writeText(text).catch(() => {});
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };
  return [copied, copy];
}

// ─── DECORATIVE COMPONENTS ────────────────────────────────────────────────────
function MaroonDivider({ width = 220 }) {
  return (
    <svg width={width} height={20} viewBox={`0 0 ${width} 20`} fill="none" className="block mx-auto">
      <line x1="0" y1="10" x2={width * 0.37} y2="10" stroke="#9E2A2F" strokeWidth="0.8" />
      <circle cx={width * 0.42} cy="10" r="2.2" fill="#C9A96E" opacity="0.6" />
      <path d={`M${width * 0.47} 10 L${width * 0.5} 5 L${width * 0.53} 10 L${width * 0.5} 15 Z`} fill="#9E2A2F" />
      <circle cx={width * 0.58} cy="10" r="2.2" fill="#C9A96E" opacity="0.6" />
      <line x1={width * 0.63} y1="10" x2={width} y2="10" stroke="#9E2A2F" strokeWidth="0.8" />
    </svg>
  );
}

function DiamondOrnament({ className = "" }) {
  return (
    <div className={`absolute opacity-10 ${className}`}>
      <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
        <path d="M40 5 L75 40 L40 75 L5 40 Z" stroke="#9E2A2F" strokeWidth="1.5" fill="none" />
        <path d="M40 20 L60 40 L40 60 L20 40 Z" stroke="#9E2A2F" strokeWidth="1" fill="none" />
        <circle cx="40" cy="40" r="8" fill="#C9A96E" fillOpacity="0.4" />
      </svg>
    </div>
  );
}

function FloralMaroon({ size = 300, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 300 300" fill="none" className={`absolute ${className}`}>
      <circle cx="150" cy="150" r="120" stroke="#6B1D2B" strokeWidth="1.2" strokeDasharray="6 6" fill="none" />
      <circle cx="150" cy="150" r="90" stroke="#9E2A2F" strokeWidth="0.8" strokeDasharray="4 8" fill="none" />
      <path d="M150 30 C150 30 130 100 150 160 C170 220 230 210 230 150" stroke="#C9A96E" strokeWidth="1" fill="none" opacity="0.6" />
      <path d="M150 270 C150 270 130 200 150 140 C170 80 230 90 230 150" stroke="#C9A96E" strokeWidth="1" fill="none" opacity="0.6" />
    </svg>
  );
}

function GoldDust() {
  const spots = Array.from({ length: 12 }).map((_, i) => ({
    size: 3 + (i % 4),
    top: Math.random() * 100,
    left: Math.random() * 100,
  }));
  return (
    <>
      {spots.map((spot, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-[#C9A96E] opacity-30"
          style={{ width: spot.size, height: spot.size, top: `${spot.top}%`, left: `${spot.left}%` }}
        />
      ))}
    </>
  );
}

// ─── REVEAL ANIMATION ─────────────────────────────────────────────────────────
function Reveal({ children, delay = 0, y = 28, className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── COVER ────────────────────────────────────────────────────────────────────
function Cover({ onOpen }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.8 }}
      className="min-h-dvh flex flex-col items-center justify-center relative overflow-hidden px-6 pt-8 pb-6 text-center bg-gradient-to-br from-[#1A0A0C] via-[#2D1115] to-[#4A1A22]"
    >
      <FloralMaroon size={400} className="-top-32 -left-40" />
      <FloralMaroon size={350} className="-bottom-40 -right-32 rotate-90" />
      <GoldDust />

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="z-10 w-full max-w-[450px]"
      >
        <div className="mb-3 inline-block  backdrop-blur-sm">
          <p className="uppercase tracking-[0.3em] text-[10px] text-[#C9A96E]">Undangan Pernikahan</p>
        </div>

        <p className="uppercase mb-3 tracking-[0.2em] text-[11px] text-[#D4BFA5]">— The Wedding of —</p>

        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.7 }}
        >
          <h1 className="m-0 leading-[1.1] text-[clamp(2.8rem,12vw,4.5rem)] text-white font-light tracking-tight">
            {DATA.groom.name}
          </h1>
          <p className="my-2 text-[1.6rem] text-[#C9A96E] font-serif">&#38;</p>
          <h1 className="m-0 leading-[1.1] text-[clamp(2.8rem,12vw,4.5rem)] text-white font-light tracking-tight">
            {DATA.bride.name}
          </h1>
        </motion.div>

        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "auto" }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="my-8 flex justify-center"
        >
          <MaroonDivider width={180} />
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0 }}
          className="mb-6 text-[0.9rem] text-[#D4BFA5]"
        >
          Kepada Yth. <span className="text-white font-medium">Keluarga & Teman</span>
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          whileHover={{ scale: 1.05, backgroundColor: "#C9A96E", color: "#1A0A0C", borderColor: "#C9A96E" }}
          whileTap={{ scale: 0.98 }}
          onClick={onOpen}
          className="bg-transparent uppercase cursor-pointer rounded-full px-12 py-3.5 tracking-[0.3em] transition-all duration-300 border-2 border-[#C9A96E] text-[0.7rem] text-[#C9A96E] hover:shadow-xl"
        >
          Buka Undangan
        </motion.button>
      </motion.div>
    </motion.div>
  );
}

// ─── HERO SECTION ─────────────────────────────────────────────────────────────
function HeroSection() {
  return (
    <section className="relative overflow-hidden px-6 pt-24 pb-16 text-center bg-gradient-to-b from-[#F5EFE6] to-white">
      <FloralMaroon size={280} className="-top-40 -left-40 opacity-30" />
      <DiamondOrnament className="top-20 right-10" />
      <GoldDust />

      <div className="relative z-10 max-w-[500px] mx-auto">
        <Reveal>
          <p className="uppercase mb-6 tracking-[0.3em] text-[10px] text-[#9E2A2F] font-semibold">— The Wedding of —</p>
          <div className="inline-block p-6 rounded-full border border-[#C9A96E] shadow-lg bg-white/50 backdrop-blur-sm">
            <FaHeart className="text-5xl text-[#9E2A2F]" />
          </div>
        </Reveal>

        <Reveal delay={0.15} className="mt-8">
          <h1 className="m-0 leading-[1.15] text-[clamp(2.5rem,10vw,4rem)] text-[#2D1115] font-light">
            {DATA.groom.name}
          </h1>
          <p className="my-2 text-[1.5rem] text-[#C9A96E] font-serif">&#38;</p>
          <h1 className="m-0 leading-[1.15] text-[clamp(2.5rem,10vw,4rem)] text-[#2D1115] font-light">
            {DATA.bride.name}
          </h1>
        </Reveal>

        <Reveal delay={0.25} className="mt-8">
          <MaroonDivider width={160} />
          <p className="mt-6 text-[0.95rem] text-[#5A4A42]">Kami mengundang Anda untuk berbagi kebahagiaan</p>
          <p className="text-[1rem] font-semibold text-[#9E2A2F] mt-1">{DATA.akadDate}</p>
        </Reveal>
      </div>
    </section>
  );
}

// ─── COUPLE SECTION ───────────────────────────────────────────────────────────
function PersonCard({ person, role, delay = 0 }) {
  return (
    <Reveal delay={delay} className="flex-1 min-w-[260px] max-w-[340px]">
      <div className="group relative rounded-2xl py-10 px-6 text-center bg-white shadow-xl hover:shadow-2xl transition-all duration-500 border border-[#E2D4C8]">
        <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-12 h-12 bg-[#C9A96E] rounded-full flex items-center justify-center shadow-lg">
          <BiDiamond className="text-white text-xl" />
        </div>
        <div className="w-28 h-28 rounded-full mx-auto mb-6 flex items-center justify-center bg-gradient-to-br from-[#9E2A2F] to-[#6B1D2B] shadow-md">
          <span className="text-4xl text-white font-light">{person.initial}</span>
        </div>
        <p className="uppercase mb-2 tracking-[0.25em] text-[9px] text-[#C9A96E] font-semibold">{role}</p>
        <h3 className="mb-1 text-2xl text-[#2D1115]">{person.name}</h3>
        <p className="mb-4 text-xs tracking-wide text-[#9E2A2F]">{person.fullName.split(" ").slice(1).join(" ")}</p>
        <MaroonDivider width={70} />
        <p className="leading-relaxed mt-4 text-sm text-[#6B5A52]">
          Putra/Putri dari<br />
          <span className="text-[#2D1115] font-medium">{person.parents}</span>
        </p>
        <p className="italic mt-3 text-xs text-[#C9A96E]">{person.instagram}</p>
      </div>
    </Reveal>
  );
}

function CoupleSection() {
  return (
    <section className="py-20 px-6 bg-[#F5EFE6]">
      <Reveal>
        <h2 className="text-center mb-3 text-4xl text-[#2D1115] font-light">The Wedding of</h2>
        <p className="uppercase text-center mb-10 text-[10px] tracking-[0.4em] text-[#9E2A2F] font-medium">
          the pleasure of your company is requested
        </p>
      </Reveal>
      <div className="flex flex-wrap gap-8 justify-center max-w-[800px] mx-auto items-stretch">
        <PersonCard person={DATA.groom} role="Mempelai Pria" delay={0} />
        <PersonCard person={DATA.bride} role="Mempelai Wanita" delay={0.2} />
      </div>
    </section>
  );
}

// ─── SAVE THE DATE SECTION ────────────────────────────────────────────────────
function CountUnit({ value, label }) {
  return (
    <div className="text-center min-w-[65px]">
      <motion.p
        key={value}
        initial={{ opacity: 0.4, y: -5 }}
        animate={{ opacity: 1, y: 0 }}
        className="m-0 text-4xl font-light text-[#2D1115]"
      >
        {String(value).padStart(2, "0")}
      </motion.p>
      <p className="uppercase mt-1 text-[10px] tracking-[0.2em] text-[#9E2A2F]">{label}</p>
    </div>
  );
}

function SaveTheDateSection() {
  const t = useCountdown(DATA.weddingDate);
  const addCal = () => {
    const s = DATA.weddingDate.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
    const e = new Date(DATA.weddingDate.getTime() + 9 * 3600000).toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
    window.open(
      `https://calendar.google.com/calendar/render?action=TEMPLATE&text=Pernikahan+${DATA.groom.name}+%26+${DATA.bride.name}&dates=${s}/${e}&location=${encodeURIComponent(DATA.address)}`,
      "_blank"
    );
  };

  return (
    <section className="py-20 px-8 text-center bg-white">
      <Reveal>
        <div className="max-w-2xl mx-auto">
          <BiCalendarHeart className="text-5xl text-[#C9A96E] mx-auto mb-4" />
          <h2 className="mb-2 text-4xl text-[#2D1115] font-light">Save The Date</h2>
          <p className="mb-3 text-[#6B5A52]">{DATA.akadDate}</p>
          <MaroonDivider width={160} />
          <div className="flex gap-3 justify-center items-start my-10">
            <CountUnit value={t.days} label="Hari" />
            <span className="pt-1 text-3xl text-[#C9A96E]">:</span>
            <CountUnit value={t.hours} label="Jam" />
            <span className="pt-1 text-3xl text-[#C9A96E]">:</span>
            <CountUnit value={t.minutes} label="Menit" />
            <span className="pt-1 text-3xl text-[#C9A96E]">:</span>
            <CountUnit value={t.seconds} label="Detik" />
          </div>
          <motion.button
            whileHover={{ scale: 1.03, backgroundColor: "#9E2A2F", borderColor: "#9E2A2F", color: "white" }}
            whileTap={{ scale: 0.97 }}
            onClick={addCal}
            className="bg-transparent uppercase cursor-pointer rounded-full px-8 py-3 tracking-[0.25em] transition-all duration-300 border-2 border-[#9E2A2F] text-[0.7rem] text-[#9E2A2F]"
          >
            Tambahkan ke Kalender
          </motion.button>
        </div>
      </Reveal>
    </section>
  );
}

// ─── WEDDING DAY SECTION ──────────────────────────────────────────────────────
function EventCard({ icon, title, date, time, delay = 0 }) {
  return (
    <Reveal delay={delay} className="flex-1 min-w-[240px] max-w-[320px]">
      <div className="rounded-2xl py-10 px-6 text-center bg-[#FDF9F5] shadow-md hover:shadow-xl transition-all duration-300 border border-[#E2D4C8]">
        <div className="text-4xl text-[#C9A96E] mb-4">{icon}</div>
        <h3 className="text-2xl text-[#2D1115] mb-2">{title}</h3>
        <MaroonDivider width={100} />
        <p className="mt-4 text-[#6B5A52]">{date}</p>
        <p className="text-sm text-[#9E2A2F] tracking-wide">{time}</p>
      </div>
    </Reveal>
  );
}

function WeddingDaySection() {
  return (
    <section className="py-20 px-6 bg-[#F5EFE6]">
      <Reveal>
        <h2 className="text-center mb-2 text-4xl text-[#2D1115] font-light">It's Wedding Day</h2>
        <p className="italic text-center mb-6 text-[#6B5A52]">Cinta sejati adalah janji yang dirayakan bersama</p>
        <MaroonDivider width={200} />
      </Reveal>
      <div className="flex flex-wrap gap-6 justify-center max-w-[750px] mx-auto mt-12">
        <EventCard icon={<GiRing />} title="Akad Nikah" date={DATA.akadDate} time={DATA.akadTime} delay={0} />
        <EventCard  title="Resepsi" date={DATA.resepsiDate} time={DATA.resepsiTime} delay={0.15} />
      </div>
      <Reveal delay={0.3} className="mt-14 text-center">
        <div className="inline-block rounded-2xl py-8 px-8 max-w-[420px] w-full bg-white shadow-lg border border-[#E2D4C8]">
          <BiMap className="text-2xl text-[#C9A96E] mx-auto mb-3" />
          <p className="uppercase mb-2 text-[9px] tracking-[0.25em] text-[#9E2A2F] font-semibold">Lokasi Acara</p>
          <h4 className="mb-2 text-xl text-[#2D1115]">{DATA.venue}</h4>
          <p className="mb-5 text-sm text-[#6B5A52]">{DATA.address}</p>
          <a
            href={DATA.mapsUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-block rounded-full px-8 py-2.5 no-underline tracking-[0.2em] border-2 border-[#9E2A2F] text-[0.7rem] text-[#9E2A2F] hover:bg-[#9E2A2F] hover:text-white transition-all"
          >
            Buka Lokasi
          </a>
        </div>
      </Reveal>
    </section>
  );
}

// ─── RSVP SECTION ─────────────────────────────────────────────────────────────
const inputClass = "w-full outline-none box-border mb-4 rounded-xl block py-3 px-4 border bg-[#FDF9F5] border-[#E2D4C8] text-[#2C2C2A] text-base focus:border-[#C9A96E] transition-colors duration-200";

function RSVPSection() {
  const [name, setName] = useState("");
  const [attend, setAttend] = useState("");
  const [guests, setGuests] = useState("1");
  const [done, setDone] = useState(false);

  return (
    <section className="py-20 px-8 bg-white">
      <Reveal>
        <h2 className="text-center mb-6 text-4xl text-[#2D1115] font-light">Konfirmasi Kehadiran</h2>
        <MaroonDivider width={160} />
        <p className="text-center mt-4 text-[#6B5A52]">Doa restu Anda adalah hadiah terindah</p>
      </Reveal>
      <div className="max-w-[450px] mx-auto mt-10">
        <AnimatePresence mode="wait">
          {done ? (
            <motion.div
              key="done"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12 bg-[#FDF9F5] rounded-2xl"
            >
              <FaHeart className="text-5xl text-[#C9A96E] mx-auto mb-4" />
              <p className="text-2xl text-[#2D1115]">Terima Kasih, {name}!</p>
              <p className="text-[#6B5A52]">Kehadiran Anda sangat berarti bagi kami.</p>
            </motion.div>
          ) : (
            <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <input className={inputClass} placeholder="Nama Lengkap Anda" value={name} onChange={(e) => setName(e.target.value)} />
              <select className={`${inputClass} appearance-none`} value={attend} onChange={(e) => setAttend(e.target.value)}>
                <option value="" disabled>Konfirmasi Kehadiran</option>
                <option value="hadir">✓ Saya akan hadir</option>
                <option value="tidak">✕ Tidak dapat hadir</option>
              </select>
              {attend === "hadir" && (
                <select className={`${inputClass} appearance-none`} value={guests} onChange={(e) => setGuests(e.target.value)}>
                  {[1, 2, 3, 4, 5].map((n) => (
                    <option key={n} value={n}>
                      {n} orang
                    </option>
                  ))}
                </select>
              )}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  if (name && attend) setDone(true);
                }}
                className="w-full border-none cursor-pointer uppercase rounded-xl mt-2 py-3.5 tracking-[0.2em] bg-[#9E2A2F] text-white text-[0.7rem] hover:bg-[#6B1D2B] transition-colors"
              >
                Kirim Konfirmasi
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

// ─── GIFT SECTION ─────────────────────────────────────────────────────────────
function GiftSection() {
  const [copied, copy] = useCopied();
  return (
    <section className="py-20 px-8 text-center bg-[#F5EFE6]">
      <Reveal>
        <FaGift className="text-5xl text-[#C9A96E] mx-auto mb-4" />
        <h2 className="mb-3 text-4xl text-[#2D1115] font-light">Wedding Gift</h2>
        <p className="italic mb-6 text-[#6B5A52]">Doa restu Anda adalah hadiah terbaik bagi kami.</p>
        <MaroonDivider width={140} />
      </Reveal>
      <div className="max-w-[460px] mx-auto mt-10 space-y-4">
        {DATA.bankAccounts.map((acc, i) => (
          <Reveal key={i} delay={i * 0.1}>
            <div className="rounded-2xl p-5 flex items-center justify-between gap-3 bg-white shadow-md border border-[#E2D4C8]">
              <div className="text-left">
                <p className="mb-1 text-xs tracking-wide text-[#9E2A2F] font-semibold">{acc.bank}</p>
                <p className="mb-0.5 text-lg font-medium text-[#2D1115]">{acc.number}</p>
                <p className="text-sm text-[#6B5A52]">{acc.name}</p>
              </div>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => copy(acc.number.replace(/\s/g, ""), i)}
                className={`rounded-full px-5 py-2 cursor-pointer whitespace-nowrap transition-all duration-200 border text-[0.65rem] tracking-wider ${
                  copied === i
                    ? "bg-[#9E2A2F] text-white border-[#9E2A2F]"
                    : "bg-transparent text-[#9E2A2F] border-[#9E2A2F] hover:bg-[#9E2A2F] hover:text-white"
                }`}
              >
                {copied === i ? "Tersalin ✓" : "Salin"}
              </motion.button>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

// ─── WISHES SECTION ───────────────────────────────────────────────────────────
const initialWishes = [
  { name: "Andi Wijaya", attend: "Hadir", message: "Selamat menempuh hidup baru! Semoga langgeng dan penuh berkah." },
  { name: "Sari Dewi", attend: "Hadir", message: "Bahagia selalu untuk Ardian & Maharani. Barakallah!" },
  { name: "Budi Santoso", attend: "Tidak dapat hadir", message: "Maaf tidak bisa hadir, doa terbaik untuk kalian." },
];

function WishesSection() {
  const [wishes, setWishes] = useState(initialWishes);
  const [form, setForm] = useState({ name: "", message: "" });
  const [flash, setFlash] = useState(false);

  const submit = () => {
    if (!form.name || !form.message) return;
    setWishes((p) => [{ name: form.name, attend: "—", message: form.message }, ...p]);
    setForm({ name: "", message: "" });
    setFlash(true);
    setTimeout(() => setFlash(false), 2000);
  };

  return (
    <section className="py-20 px-8 bg-white">
      <Reveal>
        <h2 className="text-center mb-6 text-4xl text-[#2D1115] font-light">Ucapan &amp; Harapan</h2>
        <MaroonDivider width={160} />
      </Reveal>
      <div className="max-w-[500px] mx-auto mt-10">
        <input
          className={inputClass}
          placeholder="Nama Anda"
          value={form.name}
          onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
        />
        <textarea
          className={`${inputClass} min-h-[100px] resize-y`}
          placeholder="Tulis ucapan untuk mempelai..."
          value={form.message}
          onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
        />
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={submit}
          className={`w-full border-none cursor-pointer uppercase rounded-xl mb-10 py-3.5 tracking-[0.2em] transition-colors duration-300 text-white text-[0.7rem] ${
            flash ? "bg-[#C9A96E]" : "bg-[#9E2A2F] hover:bg-[#6B1D2B]"
          }`}
        >
          {flash ? "Ucapan Terkirim ✓" : "Kirim Ucapan"}
        </motion.button>
        <div className="space-y-4">
          <AnimatePresence>
            {wishes.map((w, i) => (
              <motion.div
                key={`${w.name}-${i}`}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="rounded-2xl p-5 bg-[#FDF9F5] border border-[#E2D4C8]"
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="font-medium text-[#2D1115]">{w.name}</p>
                    <p className="text-xs text-[#C9A96E]">{w.attend}</p>
                  </div>
                  <BiDiamond className="text-[#C9A96E] text-sm" />
                </div>
                <p className="italic text-[#6B5A52] text-sm leading-relaxed">"{w.message}"</p>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

// ─── FOOTER ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="pt-16 pb-10 px-8 text-center bg-[#2D1115]">
      <MaroonDivider width={120} />
      <p className="mt-6 mb-2 text-3xl text-white font-light tracking-wide">{DATA.groom.name} &amp; {DATA.bride.name}</p>
      <p className="uppercase mb-8 text-[0.65rem] tracking-[0.25em] text-[#C9A96E]">{DATA.akadDate}</p>
      <MaroonDivider width={80} />
      <p className="italic mt-6 text-sm text-[#B8A99A]">
        Powered by <span className="text-[#C9A96E] font-medium">MuRu</span>
      </p>
    </footer>
  );
}

// ─── ROOT COMPONENT ───────────────────────────────────────────────────────────
export default function MrnInvitation() {
  const [opened, setOpened] = useState(false);
  return (
    <div className="min-h-dvh overflow-x-hidden bg-[#F5EFE6]">
      <AnimatePresence mode="wait">
        
        {!opened ? (
          <Cover key="cover" onOpen={() => setOpened(true)} />
        ) : (
          <motion.div key="main" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7 }}>
            <HeroSection />
            <CoupleSection />
            <SaveTheDateSection />
            <WeddingDaySection />
            <RSVPSection />
            <GiftSection />
            <WishesSection />
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}