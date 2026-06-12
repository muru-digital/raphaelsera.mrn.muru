import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { GiLoveHowl, GiRing, GiRose } from "react-icons/gi";
import { BiDiamond, BiMap, BiCalendarHeart, BiHeart } from "react-icons/bi";
import { FaGift, FaHeart, FaRegGem } from "react-icons/fa";
import { TbFlower } from "react-icons/tb";

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

// ─── DECORATIVE COMPONENTS (ORGANIC, RANDOM, HAND-DRAWN STYLE) ────────────────
function ScribbleCircle({ className = "" }) {
  return (
    <svg width="120" height="120" viewBox="0 0 120 120" fill="none" className={`absolute ${className}`}>
      <path
        d="M60 10 C85 12 108 30 110 60 C112 90 85 112 60 110 C30 108 8 85 10 60 C12 35 35 8 60 10Z"
        stroke="#C9A96E"
        strokeWidth="1.5"
        strokeDasharray="4 6"
        fill="none"
        opacity="0.5"
      />
      <path d="M60 20 Q80 25 85 45 Q90 65 75 80 Q60 95 40 85 Q20 75 25 50 Q30 25 60 20Z" stroke="#9E2A2F" strokeWidth="1" fill="none" opacity="0.3" />
    </svg>
  );
}

function RandomGoldBlob({ size = 200, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 200 200" fill="none" className={`absolute ${className}`}>
      <path
        d="M100 20 C130 15 160 40 175 70 C190 100 185 140 160 165 C135 190 90 195 65 175 C40 155 20 120 25 85 C30 50 70 25 100 20Z"
        fill="#C9A96E"
        fillOpacity="0.08"
        stroke="#C9A96E"
        strokeWidth="1"
        strokeDasharray="3 5"
      />
    </svg>
  );
}

function ScatteredGoldDots() {
  const dots = Array.from({ length: 24 }).map((_, i) => ({
    size: 2 + (i % 5),
    top: Math.random() * 100,
    left: Math.random() * 100,
    opacity: 0.2 + Math.random() * 0.4,
  }));
  return (
    <>
      {dots.map((dot, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-[#C9A96E]"
          style={{ width: dot.size, height: dot.size, top: `${dot.top}%`, left: `${dot.left}%`, opacity: dot.opacity }}
        />
      ))}
    </>
  );
}

// ─── REVEAL WITH ROTATION / SCALE VARIATION ───────────────────────────────────
function RevealOrganic({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, rotate: -2 }}
      animate={inView ? { opacity: 1, y: 0, rotate: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.34, 1.2, 0.64, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── COVER (already good, keep as is) ─────────────────────────────────────────
function Cover({ onOpen }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.8 }}
      className="min-h-dvh flex flex-col items-center justify-center relative overflow-hidden px-6 pt-8 pb-6 text-center bg-gradient-to-br from-[#1A0A0C] via-[#2D1115] to-[#4A1A22]"
    >
      <RandomGoldBlob size={400} className="-top-40 -left-40" />
      <RandomGoldBlob size={350} className="-bottom-40 -right-32 rotate-90" />
      <ScribbleCircle className="top-20 right-10" />
      <ScribbleCircle className="bottom-32 left-5 w-24 h-24" />
      <ScatteredGoldDots />

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="z-10 w-full max-w-[450px]"
      >
        <div className="mb-6 inline-block px-5 py-2 border border-[#C9A96E] rounded-full bg-white/5 backdrop-blur-sm">
          <p className="uppercase tracking-[0.3em] text-[10px] text-[#C9A96E]">Undangan Pernikahan</p>
        </div>
        <p className="uppercase mb-6 tracking-[0.2em] text-[11px] text-[#D4BFA5]">— The Wedding of —</p>
        <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.6, duration: 0.7 }}>
          <h1 className="m-0 leading-[1.1] text-[clamp(2.8rem,12vw,4.5rem)] text-white font-light tracking-tight">
            {DATA.groom.name}
          </h1>
          <p className="my-2 text-[1.6rem] text-[#C9A96E] font-serif">&#38;</p>
          <h1 className="m-0 leading-[1.1] text-[clamp(2.8rem,12vw,4.5rem)] text-white font-light tracking-tight">
            {DATA.bride.name}
          </h1>
        </motion.div>
        <motion.div initial={{ width: 0 }} animate={{ width: "auto" }} transition={{ delay: 0.9, duration: 0.6 }} className="my-8 flex justify-center">
          <div className="w-40 h-px bg-gradient-to-r from-transparent via-[#C9A96E] to-transparent" />
        </motion.div>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.0 }} className="mb-6 text-[0.9rem] text-[#D4BFA5]">
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

// ─── HERO SECTION (organic, asimetris, bentuk unik) ──────────────────────────
function HeroSection() {
  return (
    <section className="relative overflow-hidden px-5 py-28 bg-[#FEFAF5]">
      <RandomGoldBlob size={280} className="-top-32 -left-32 opacity-30" />
      <ScribbleCircle className="bottom-10 right-5 w-32 h-32" />
      <div className="absolute top-1/4 right-0 w-40 h-40 rounded-full border-2 border-dashed border-[#C9A96E] opacity-20" />

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <RevealOrganic>
          <div className="inline-block px-4 py-1 rounded-full bg-[#9E2A2F] bg-opacity-10 border border-[#C9A96E]">
            <p className="text-[11px] tracking-[0.3em] text-[#9E2A2F] font-semibold">— The Wedding of —</p>
          </div>
        </RevealOrganic>

        <RevealOrganic delay={0.1} className="mt-8">
          <h1 className="text-6xl md:text-7xl font-serif text-[#2D1115] tracking-tight">{DATA.groom.name}</h1>
          <div className="flex justify-center my-3">
            <div className="w-12 h-px bg-[#C9A96E] rotate-12" />
            <BiHeart className="text-3xl text-[#C9A96E] mx-3" />
            <div className="w-12 h-px bg-[#C9A96E] -rotate-12" />
          </div>
          <h1 className="text-6xl md:text-7xl font-serif text-[#2D1115] tracking-tight">{DATA.bride.name}</h1>
        </RevealOrganic>

        <RevealOrganic delay={0.2} className="mt-10">
          <div className="w-24 h-24 rounded-full border border-[#C9A96E] mx-auto flex items-center justify-center bg-white shadow-sm">
            <FaRegGem className="text-3xl text-[#C9A96E]" />
          </div>
          <p className="mt-6 text-[#5A4A42] italic">"Dua hati menyatu dalam satu cinta"</p>
          <p className="text-sm text-[#9E2A2F] mt-2">{DATA.akadDate}</p>
        </RevealOrganic>
      </div>
    </section>
  );
}

// ─── COUPLE SECTION (asimetris, overlap, bentuk beda) ─────────────────────────
function PersonCard({ person, role, delay = 0, isLeft = true }) {
  return (
    <RevealOrganic delay={delay} className={`relative ${isLeft ? "md:-mr-8 z-10" : "md:-ml-8"}`}>
      <div className="relative p-8 bg-white rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 border-l-8 border-t-8 border-[#C9A96E] border-opacity-60">
        <div className="absolute -top-6 -right-4 w-16 h-16 rounded-full bg-[#9E2A2F] flex items-center justify-center shadow-lg rotate-12">
          <GiRose className="text-white text-2xl" />
        </div>
        <div className="w-32 h-32 mx-auto rounded-2xl rotate-45 bg-gradient-to-br from-[#9E2A2F] to-[#C9A96E] flex items-center justify-center shadow-md mb-6">
          <span className="-rotate-45 text-5xl text-white font-light">{person.initial}</span>
        </div>
        <p className="text-center text-[10px] tracking-[0.3em] text-[#C9A96E] font-semibold mb-2">{role}</p>
        <h3 className="text-center text-3xl font-serif text-[#2D1115]">{person.name}</h3>
        <p className="text-center text-xs text-[#9E2A2F] mb-4">{person.fullName.split(" ").slice(1).join(" ")}</p>
        <div className="w-12 h-px bg-[#C9A96E] mx-auto my-4" />
        <p className="text-center text-sm text-[#5A4A42] leading-relaxed">
          Putra/Putri dari<br />
          <span className="font-medium text-[#2D1115]">{person.parents}</span>
        </p>
        <p className="text-center italic text-xs text-[#C9A96E] mt-3">{person.instagram}</p>
      </div>
    </RevealOrganic>
  );
}

function CoupleSection() {
  return (
    <section className="relative py-28 px-6 bg-[#F4ECE2] overflow-hidden">
      <RandomGoldBlob size={300} className="top-1/2 -right-48" />
      <ScribbleCircle className="top-10 left-10 w-40 h-40" />
      <div className="absolute bottom-20 left-0 w-32 h-32 rounded-full border-2 border-[#C9A96E] border-dotted opacity-30" />

      <div className="relative z-10 max-w-6xl mx-auto">
        <RevealOrganic>
          <div className="text-center mb-16">
            <h2 className="text-5xl font-serif text-[#2D1115] mb-3">The Wedding of</h2>
            <div className="flex justify-center gap-2 items-center">
              <div className="w-16 h-px bg-[#C9A96E]" />
              <TbFlower className="text-[#C9A96E]" />
              <div className="w-16 h-px bg-[#C9A96E]" />
            </div>
            <p className="text-xs tracking-[0.3em] text-[#9E2A2F] mt-4">Kami mengundang Anda untuk hadir</p>
          </div>
        </RevealOrganic>

        <div className="flex flex-col md:flex-row justify-center items-stretch gap-6 md:gap-0">
          <PersonCard person={DATA.groom} role="Mempelai Pria" delay={0} isLeft={true} />
          <PersonCard person={DATA.bride} role="Mempelai Wanita" delay={0.15} isLeft={false} />
        </div>
      </div>
    </section>
  );
}

// ─── SAVE THE DATE (countdown dengan gaya berbeda) ────────────────────────────
function CountUnit({ value, label }) {
  return (
    <div className="text-center">
      <motion.div
        key={value}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300 }}
        className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-[#2D1115] flex items-center justify-center shadow-lg"
      >
        <p className="text-3xl md:text-4xl font-light text-white">{String(value).padStart(2, "0")}</p>
      </motion.div>
      <p className="uppercase text-[9px] tracking-[0.2em] text-[#9E2A2F] mt-2">{label}</p>
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
    <section className="relative py-28 px-6 bg-white overflow-hidden">
      <RandomGoldBlob size={250} className="-top-32 -left-32" />
      <div className="absolute bottom-0 right-0 w-64 h-64 border-4 border-[#C9A96E] border-double rounded-full opacity-10" />

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <RevealOrganic>
          <BiCalendarHeart className="text-6xl text-[#C9A96E] mx-auto mb-4" />
          <h2 className="text-5xl font-serif text-[#2D1115] mb-2">Save The Date</h2>
          <p className="text-[#5A4A42] italic mb-8">Simpan tanggal bahagia ini di hati Anda</p>
          <div className="w-24 h-px bg-[#C9A96E] mx-auto mb-8" />
        </RevealOrganic>

        <RevealOrganic delay={0.1}>
          <div className="flex flex-wrap justify-center gap-6 md:gap-10 my-12">
            <CountUnit value={t.days} label="Hari" />
            <CountUnit value={t.hours} label="Jam" />
            <CountUnit value={t.minutes} label="Menit" />
            <CountUnit value={t.seconds} label="Detik" />
          </div>
        </RevealOrganic>

        <RevealOrganic delay={0.2}>
          <motion.button
            whileHover={{ scale: 1.03, backgroundColor: "#C9A96E", color: "#1A0A0C" }}
            whileTap={{ scale: 0.97 }}
            onClick={addCal}
            className="bg-[#9E2A2F] text-white rounded-full px-10 py-3 text-sm tracking-wide hover:shadow-lg transition-all"
          >
            Simpan di Kalender
          </motion.button>
        </RevealOrganic>
      </div>
    </section>
  );
}

// ─── WEDDING DAY (kartu dengan bentuk dan posisi tidak simetris) ──────────────
function EventCard({ icon, title, date, time, delay = 0, isRight = false }) {
  return (
    <RevealOrganic delay={delay}>
      <div className={`relative group ${isRight ? "md:translate-x-6" : "md:-translate-x-6"}`}>
        <div className="absolute -inset-1 bg-gradient-to-r from-[#C9A96E] to-[#9E2A2F] rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-500" />
        <div className="relative p-8 bg-white rounded-3xl shadow-xl">
          <div className="text-5xl text-[#C9A96E] mb-4">{icon}</div>
          <h3 className="text-2xl font-serif text-[#2D1115] mb-1">{title}</h3>
          <div className="w-12 h-0.5 bg-[#9E2A2F] my-3" />
          <p className="text-sm text-[#5A4A42]">{date}</p>
          <p className="text-xs text-[#C9A96E] tracking-wide mt-1">{time}</p>
        </div>
      </div>
    </RevealOrganic>
  );
}

function WeddingDaySection() {
  return (
    <section className="relative py-28 px-6 bg-[#FEFAF5] overflow-hidden">
      <ScatteredGoldDots />
      <ScribbleCircle className="top-20 right-10 w-48 h-48" />
      <RandomGoldBlob size={350} className="bottom-0 -left-40" />

      <div className="relative z-10 max-w-5xl mx-auto">
        <RevealOrganic>
          <div className="text-center mb-16">
            <h2 className="text-5xl font-serif text-[#2D1115] mb-3">It's Wedding Day</h2>
            <div className="flex justify-center gap-3 items-center">
              <GiRing className="text-[#C9A96E]" />
              <span className="text-sm italic text-[#5A4A42]">Cinta sejati dirayakan bersama</span>
              <GiLoveHowl className="text-[#C9A96E]" />
            </div>
          </div>
        </RevealOrganic>

        <div className="flex flex-col md:flex-row justify-center gap-12 md:gap-20 items-stretch">
          <EventCard icon={<GiRing />} title="Akad Nikah" date={DATA.akadDate} time={DATA.akadTime} delay={0} isRight={false} />
          <EventCard  title="Resepsi" date={DATA.resepsiDate} time={DATA.resepsiTime} delay={0.15} isRight={true} />
        </div>

        <RevealOrganic delay={0.25} className="mt-20">
          <div className="relative max-w-md mx-auto p-8 rounded-2xl bg-white shadow-xl border-l-4 border-[#C9A96E]">
            <BiMap className="absolute -top-5 -right-5 text-4xl text-[#C9A96E] bg-white rounded-full p-1 shadow" />
            <p className="text-[10px] tracking-[0.3em] text-[#9E2A2F] mb-2">LOKASI ACARA</p>
            <h4 className="text-xl font-serif text-[#2D1115] mb-2">{DATA.venue}</h4>
            <p className="text-sm text-[#5A4A42] mb-5">{DATA.address}</p>
            <a
              href={DATA.mapsUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-block border border-[#9E2A2F] rounded-full px-6 py-2 text-xs text-[#9E2A2F] hover:bg-[#9E2A2F] hover:text-white transition"
            >
              Buka Lokasi
            </a>
          </div>
        </RevealOrganic>
      </div>
    </section>
  );
}

// ─── RSVP (lebih playful, dengan efek kartu) ──────────────────────────────────
const inputClass = "w-full outline-none mb-4 rounded-xl py-3 px-4 bg-[#FEFAF5] border border-[#E2D4C8] text-[#2C2C2A] text-base focus:border-[#C9A96E] transition-all";

function RSVPSection() {
  const [name, setName] = useState("");
  const [attend, setAttend] = useState("");
  const [guests, setGuests] = useState("1");
  const [done, setDone] = useState(false);

  return (
    <section className="relative py-28 px-6 bg-white overflow-hidden">
      <RandomGoldBlob size={220} className="-top-20 -right-20" />
      <div className="absolute bottom-10 left-5 w-28 h-28 rounded-full border-2 border-dotted border-[#C9A96E] opacity-30" />

      <div className="relative z-10 max-w-md mx-auto">
        <RevealOrganic>
          <div className="text-center mb-10">
            <FaHeart className="text-4xl text-[#C9A96E] mx-auto mb-3" />
            <h2 className="text-4xl font-serif text-[#2D1115]">Konfirmasi Kehadiran</h2>
            <div className="w-16 h-px bg-[#C9A96E] mx-auto my-4" />
            <p className="text-sm text-[#5A4A42]">Kehadiran Anda sangat berarti</p>
          </div>
        </RevealOrganic>

        <AnimatePresence mode="wait">
          {done ? (
            <motion.div
              key="done"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12 bg-[#FEFAF5] rounded-3xl shadow-lg"
            >
              <div className="w-20 h-20 rounded-full bg-[#9E2A2F] mx-auto flex items-center justify-center mb-4">
                <BiHeart className="text-white text-3xl" />
              </div>
              <p className="text-2xl font-serif text-[#2D1115]">Terima Kasih, {name}!</p>
              <p className="text-[#5A4A42] mt-2">Doa terbaik untuk perjalanan kami</p>
            </motion.div>
          ) : (
            <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <input className={inputClass} placeholder="Nama Lengkap" value={name} onChange={(e) => setName(e.target.value)} />
              <select className={`${inputClass} appearance-none`} value={attend} onChange={(e) => setAttend(e.target.value)}>
                <option value="" disabled>Konfirmasi Kehadiran</option>
                <option value="hadir">✓ Akan hadir</option>
                <option value="tidak">✕ Tidak hadir</option>
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
                className="w-full rounded-xl py-3 bg-[#9E2A2F] text-white text-sm uppercase tracking-wide hover:bg-[#6B1D2B] transition"
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

// ─── GIFT (bank account dengan desain kartu unik) ─────────────────────────────
function GiftSection() {
  const [copied, copy] = useCopied();
  return (
    <section className="relative py-28 px-6 bg-[#F4ECE2] overflow-hidden">
      <ScribbleCircle className="bottom-10 left-10 w-36 h-36" />
      <RandomGoldBlob size={260} className="top-1/2 -right-32" />
      <div className="absolute top-20 right-20 w-32 h-32 rotate-45 border border-[#C9A96E] opacity-20" />

      <div className="relative z-10 max-w-2xl mx-auto">
        <RevealOrganic>
          <div className="text-center mb-12">
            <FaGift className="text-5xl text-[#C9A96E] mx-auto mb-3" />
            <h2 className="text-4xl font-serif text-[#2D1115]">Wedding Gift</h2>
            <p className="italic text-[#5A4A42] mt-2">Doa restu adalah hadiah terindah</p>
            <div className="w-20 h-px bg-[#C9A96E] mx-auto my-4" />
          </div>
        </RevealOrganic>

        <div className="space-y-5">
          {DATA.bankAccounts.map((acc, i) => (
            <RevealOrganic key={i} delay={i * 0.1}>
              <div className="group relative p-5 bg-white rounded-2xl shadow-md hover:shadow-xl transition-all flex items-center justify-between gap-4 border-r-4 border-[#C9A96E]">
                <div>
                  <p className="text-xs text-[#9E2A2F] font-semibold tracking-wide">{acc.bank}</p>
                  <p className="text-lg font-mono text-[#2D1115]">{acc.number}</p>
                  <p className="text-sm text-[#5A4A42]">{acc.name}</p>
                </div>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => copy(acc.number.replace(/\s/g, ""), i)}
                  className={`rounded-full px-4 py-1.5 text-xs border transition ${
                    copied === i
                      ? "bg-[#9E2A2F] text-white border-[#9E2A2F]"
                      : "border-[#C9A96E] text-[#C9A96E] hover:bg-[#C9A96E] hover:text-white"
                  }`}
                >
                  {copied === i ? "Tersalin" : "Salin"}
                </motion.button>
              </div>
            </RevealOrganic>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── WISHES (ucapan dengan desain berbeda) ────────────────────────────────────
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
    <section className="relative py-28 px-6 bg-white overflow-hidden">
      <RandomGoldBlob size={200} className="-top-24 -left-24" />
      <div className="absolute bottom-0 right-0 w-48 h-48 border-4 border-[#C9A96E] border-double rounded-full opacity-10" />

      <div className="relative z-10 max-w-lg mx-auto">
        <RevealOrganic>
          <div className="text-center mb-12">
            <TbFlower className="text-4xl text-[#C9A96E] mx-auto mb-2" />
            <h2 className="text-4xl font-serif text-[#2D1115]">Ucapan & Harapan</h2>
            <div className="w-12 h-px bg-[#9E2A2F] mx-auto my-4" />
          </div>
        </RevealOrganic>

        <RevealOrganic delay={0.05}>
          <div className="bg-[#FEFAF5] p-6 rounded-3xl shadow-inner">
            <input className={inputClass} placeholder="Nama Anda" value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} />
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
              className={`w-full rounded-xl py-3 text-sm uppercase tracking-wide transition-colors ${
                flash ? "bg-[#C9A96E] text-white" : "bg-[#9E2A2F] text-white hover:bg-[#6B1D2B]"
              }`}
            >
              {flash ? "Terkirim ✓" : "Kirim Ucapan"}
            </motion.button>
          </div>
        </RevealOrganic>

        <div className="mt-12 space-y-4">
          <AnimatePresence>
            {wishes.map((w, i) => (
              <motion.div
                key={`${w.name}-${i}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="relative p-5 bg-white rounded-2xl shadow-md border-l-4 border-[#C9A96E]"
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="font-semibold text-[#2D1115]">{w.name}</p>
                    <p className="text-[10px] text-[#C9A96E]">{w.attend}</p>
                  </div>
                  <BiDiamond className="text-[#C9A96E] text-xs" />
                </div>
                <p className="text-[#5A4A42] text-sm italic leading-relaxed">"{w.message}"</p>
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
    <footer className="relative pt-20 pb-12 px-6 text-center bg-gradient-to-br from-[#2D1115] to-[#1A0A0C] overflow-hidden">
      <RandomGoldBlob size={300} className="top-0 left-0 opacity-20" />
      <div className="relative z-10">
        <div className="w-16 h-px bg-[#C9A96E] mx-auto mb-8" />
        <p className="text-3xl font-serif text-white mb-2">{DATA.groom.name} &amp; {DATA.bride.name}</p>
        <p className="text-[11px] tracking-[0.3em] text-[#C9A96E] uppercase">{DATA.akadDate}</p>
        <div className="w-10 h-px bg-[#C9A96E] mx-auto my-6" />
        <p className="text-xs text-[#B8A99A] italic">Powered by <span className="text-[#C9A96E] not-italic">MuRu</span></p>
      </div>
    </footer>
  );
}

// ─── ROOT ─────────────────────────────────────────────────────────────────────
export default function MrnInvitation2() {
  const [opened, setOpened] = useState(false);
  return (
    <div className="min-h-dvh overflow-x-hidden bg-[#FEFAF5]">
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