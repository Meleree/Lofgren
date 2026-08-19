import { useEffect, useState } from "react";
import {
  FaEnvelope,
  FaInstagram,
  FaTimes,
  FaChevronLeft,
  FaChevronRight,
  FaBars,
} from "react-icons/fa";
import { artistData } from "./data/artist";
import { youtubeToEmbed } from "./utils/links";

const soundcloudTracks = [
  {
    title: "LØFGREN — Kobold Podcast #50",
    url: "https://soundcloud.com/koboldtechno/lofgren-kobold-podcast-50",
  },
  {
    title: "Archive 002 — LØFGREN (Abasis Techno)",
    url: "https://soundcloud.com/abasis-techno/archive-002-lofgren",
  },
  {
    title: "DQ Podcast LØFGREN #038",
    url: "https://soundcloud.com/dq-estudio/dq-podcast-lofgren-038",
  },
  {
    title: "Coral",
    url: "https://soundcloud.com/camila-julieta-lofgren/coral",
  },
  {
    title: "003 Magnetica",
    url: "https://soundcloud.com/camila-julieta-lofgren/003-magnetica",
  },
];

const youtubeProfile = {
  name: "LØFGREN",
  url: "https://youtube.com/@lofgren.colission?si=d5r8lSIfqjpUgAky",
  avatar:
    "https://yt3.googleusercontent.com/nNDLwd9mgMgFWJxBqIrU3zVBGycSxXGyPmKEIFtlqyd1XIo2tGD0xLeza_WvzoeBdtuf_6n-jw=s160-c-k-c0x00ffffff-no-rj",
};

const soundcloudProfile = {
  name: "LØFGREN",
  url: "https://soundcloud.com/camila-julieta-lofgren",
  avatar:
    "https://i1.sndcdn.com/avatars-HRWlG2AMrN917NIV-fVG9QA-t500x500.jpg",
};

const crews = [
  {
    name: "COLISSION TECHNO",
    instagram: "https://www.instagram.com/colission.techno?igsh=YjVjY2c4ZmI3ZGU5",
    handle: "@colission.techno",
    logo: artistData.logos.colission,
  },
  {
    name: "ARTECHNO",
    instagram: "https://www.instagram.com/artechno.bsas?igsh=aWlldnhhanM4azRo",
    handle: "@artechno.bsas",
    logo: artistData.logos.artechno,
  },
];

const navLinks = [
  { label: "Inicio", href: "#inicio" },
  { label: "Biografía", href: "#biografia" },
  { label: "YouTube", href: "#youtube" },
  { label: "SoundCloud", href: "#soundcloud" },
  { label: "Imágenes", href: "#imagenes" },
  { label: "Contacto", href: "#contacto" },
];

function soundcloudEmbedUrl(trackUrl) {
  return `https://w.soundcloud.com/player/?url=${encodeURIComponent(
    trackUrl
  )}&color=%23ff5500&auto_play=false&hide_related=false&show_comments=false&show_user=true&show_reposts=false&show_teaser=true&visual=false`;
}

export default function App() {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const hasLightbox = selectedIndex !== null;
  const currentImage = hasLightbox ? artistData.images[selectedIndex] : null;

  const goPrev = () => {
    setSelectedIndex((prev) =>
      prev === null ? 0 : (prev - 1 + artistData.images.length) % artistData.images.length
    );
  };

  const goNext = () => {
    setSelectedIndex((prev) =>
      prev === null ? 0 : (prev + 1) % artistData.images.length
    );
  };

  useEffect(() => {
    const onKeyDown = (e) => {
      if (hasLightbox) {
        if (e.key === "Escape") setSelectedIndex(null);
        if (e.key === "ArrowLeft") goPrev();
        if (e.key === "ArrowRight") goNext();
      }
      if (menuOpen && e.key === "Escape") setMenuOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [hasLightbox, menuOpen]);

  useEffect(() => {
    if (menuOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => (document.body.style.overflow = "");
  }, [menuOpen]);

  return (
    <main className="bg-black text-white scroll-smooth text-center">
      {/* NAVBAR */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-black/80 backdrop-blur border-b border-zinc-800">
        <nav className="max-w-6xl mx-auto px-4 md:px-8 h-14 flex items-center justify-between">
          <a href="#inicio" className="font-black tracking-wider text-sm md:text-base uppercase">
            LØFGREN
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-2 text-sm uppercase">
            {navLinks.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="px-3 py-1.5 rounded-lg border border-zinc-700 hover:border-white transition"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 border border-zinc-700 rounded-lg"
            onClick={() => setMenuOpen(true)}
            aria-label="Abrir menú"
          >
            <FaBars />
          </button>
        </nav>
      </header>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 md:hidden">
          <div className="h-14 px-4 flex items-center justify-between border-b border-zinc-800">
            <span className="font-black uppercase tracking-wider">Menú</span>
            <button
              onClick={() => setMenuOpen(false)}
              className="p-2 border border-zinc-700 rounded-lg"
              aria-label="Cerrar menú"
            >
              <FaTimes />
            </button>
          </div>

          <div className="p-4 flex flex-col gap-3">
            {navLinks.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="px-4 py-3 rounded-xl border border-zinc-700 hover:border-white transition uppercase"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      )}

      {/* HERO */}
      <section id="inicio" className="border-b border-zinc-800 pt-14 scroll-mt-20">
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-8">
          <h1 className="text-4xl sm:text-5xl md:text-8xl font-black tracking-tight uppercase">
            {artistData.name}
          </h1>
          <p className="mt-3 text-xs sm:text-sm md:text-base uppercase tracking-[0.12em] md:tracking-[0.15em] text-zinc-300">
            DJ y productora · Buenos Aires, Argentina
          </p>
        </div>

        <img
          src={artistData.images[0]}
          alt={artistData.name}
          className="w-full h-[38vh] sm:h-[45vh] md:h-[70vh] object-cover"
        />
      </section>

      {/* BIOGRAFIA */}
      <section id="biografia" className="border-b border-zinc-800 scroll-mt-20">
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-10 md:py-16">
          <h2 className="text-3xl md:text-5xl font-black uppercase mb-6">Biografía</h2>

          <div className="grid md:grid-cols-2 gap-8 items-start">
            <div className="mx-auto w-full max-w-2xl">
              <p className="whitespace-pre-line leading-relaxed text-zinc-200 text-sm sm:text-base">
                {artistData.bio}
              </p>

              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {crews.map((crew) => (
                  <div
                    key={crew.name}
                    className="bg-zinc-900 border border-zinc-700 rounded-xl p-4 hover:border-white transition"
                  >
                    <a href={crew.instagram} target="_blank" rel="noreferrer" className="block">
                      <img
                        src={crew.logo}
                        alt={crew.name}
                        className="h-24 sm:h-28 md:h-32 w-full object-contain mb-3"
                      />
                    </a>

                    <a
                      href={crew.instagram}
                      target="_blank"
                      rel="noreferrer"
                      className="block text-center text-sm md:text-base font-semibold tracking-wide hover:text-zinc-200 transition"
                    >
                      {crew.name}
                    </a>

                    <a
                      href={crew.instagram}
                      target="_blank"
                      rel="noreferrer"
                      className="block mt-1 text-center text-xs md:text-sm text-zinc-400 hover:text-zinc-300 transition break-all"
                    >
                      {crew.handle}
                    </a>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-xl overflow-hidden border border-zinc-700 mx-auto w-full max-w-xl">
              <img
                src={artistData.images[1]}
                alt="LØFGREN"
                className="w-full h-full min-h-[260px] sm:min-h-[320px] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* YOUTUBE */}
      <section id="youtube" className="border-b border-zinc-800 scroll-mt-20">
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-10 md:py-16">
          <h2 className="text-3xl md:text-5xl font-black uppercase mb-8">YouTube</h2>

          <div className="mb-8 flex justify-center">
            <a
              href={youtubeProfile.url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex flex-col items-center gap-3 group"
            >
              <img
                src={youtubeProfile.avatar}
                alt="Foto de perfil de YouTube de LØFGREN"
                className="w-24 h-24 sm:w-28 sm:h-28 md:w-36 md:h-36 rounded-full object-cover border border-zinc-700 group-hover:border-white transition"
              />
              <span className="text-lg md:text-xl font-bold tracking-wide group-hover:text-zinc-200 transition">
                {youtubeProfile.name}
              </span>
            </a>
          </div>

          <h3 className="text-2xl md:text-3xl font-black uppercase mt-10 mb-6">Videosets</h3>
          <div className="space-y-6 max-w-4xl mx-auto">
            {artistData.videos.map((video, i) => (
              <div key={i} className="rounded-xl overflow-hidden border border-zinc-700 bg-zinc-950">
                <div className="aspect-video">
                  <iframe
                    src={youtubeToEmbed(video)}
                    title={`Videoset ${i + 1}`}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SOUNDCLOUD */}
      <section id="soundcloud" className="border-b border-zinc-800 scroll-mt-20">
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-10 md:py-16">
          <h2 className="text-3xl md:text-5xl font-black uppercase mb-8">SoundCloud</h2>

          <div className="mb-8 flex justify-center">
            <a
              href={soundcloudProfile.url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex flex-col items-center gap-3 group"
            >
              <img
                src={soundcloudProfile.avatar}
                alt="Foto de perfil de SoundCloud de LØFGREN"
                className="w-24 h-24 sm:w-28 sm:h-28 md:w-36 md:h-36 rounded-full object-cover border border-zinc-700 group-hover:border-white transition"
              />
              <span className="text-lg md:text-xl font-bold tracking-wide group-hover:text-zinc-200 transition">
                {soundcloudProfile.name}
              </span>
            </a>
          </div>

          <div className="space-y-5 max-w-4xl mx-auto">
            {soundcloudTracks.map((track, i) => (
              <div key={i} className="rounded-xl overflow-hidden border border-zinc-700 bg-zinc-900/40 p-3">
                <p className="text-sm md:text-base text-zinc-200 mb-3">{track.title}</p>
                <iframe
                  title={`SoundCloud ${i + 1}`}
                  width="100%"
                  height="120"
                  scrolling="no"
                  frameBorder="no"
                  allow="autoplay"
                  src={soundcloudEmbedUrl(track.url)}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* IMAGENES */}
      <section id="imagenes" className="border-b border-zinc-800 scroll-mt-20">
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-10 md:py-16">
          <h2 className="text-3xl md:text-5xl font-black uppercase mb-8">Imágenes</h2>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
            {artistData.images.map((img, i) => (
              <button
                key={i}
                onClick={() => setSelectedIndex(i)}
                className="group rounded-xl overflow-hidden border border-zinc-700 focus:outline-none"
              >
                <img
                  src={img}
                  alt={`LØFGREN ${i + 1}`}
                  className="w-full h-36 sm:h-44 md:h-64 object-cover group-hover:scale-[1.03] transition"
                />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACTO */}
      <section id="contacto" className="scroll-mt-20">
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-10 md:py-16">
          <h2 className="text-3xl md:text-5xl font-black uppercase mb-8">Contacto</h2>

          <div className="flex flex-col sm:flex-row sm:flex-wrap justify-center gap-4">
            <a
              href="mailto:lofgrencamilajulieta@gmail.com"
              className="px-5 py-3 rounded-xl bg-zinc-900 border border-zinc-700 hover:border-white transition inline-flex items-center justify-center gap-2 break-all"
            >
              <FaEnvelope /> lofgrencamilajulieta@gmail.com
            </a>

            <a
              href="https://www.instagram.com/camilofgren?igsh=MXV3NG0yM3JqZnVkaQ=="
              target="_blank"
              rel="noreferrer"
              className="px-5 py-3 rounded-xl bg-zinc-900 border border-zinc-700 hover:border-white transition inline-flex items-center justify-center gap-2"
            >
              <FaInstagram /> @camilofgren
            </a>
          </div>
        </div>
      </section>

      {/* LIGHTBOX CON FLECHAS */}
      {hasLightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-3 md:p-4"
          onClick={() => setSelectedIndex(null)}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedIndex(null);
            }}
            className="absolute top-3 right-3 md:top-4 md:right-4 text-white text-xl md:text-2xl"
            aria-label="Cerrar"
          >
            <FaTimes />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              goPrev();
            }}
            className="absolute left-2 md:left-8 text-white text-xl md:text-3xl bg-zinc-900/70 hover:bg-zinc-800 rounded-full p-2 md:p-3"
            aria-label="Imagen anterior"
          >
            <FaChevronLeft />
          </button>

          <img
            src={currentImage}
            alt="Imagen ampliada"
            className="max-w-[95vw] max-h-[85vh] md:max-h-[90vh] object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />

          <button
            onClick={(e) => {
              e.stopPropagation();
              goNext();
            }}
            className="absolute right-2 md:right-8 text-white text-xl md:text-3xl bg-zinc-900/70 hover:bg-zinc-800 rounded-full p-2 md:p-3"
            aria-label="Imagen siguiente"
          >
            <FaChevronRight />
          </button>

          <div className="absolute bottom-3 md:bottom-4 text-xs md:text-sm text-zinc-300">
            {selectedIndex + 1} / {artistData.images.length}
          </div>
        </div>
      )}
    </main>
  );
}