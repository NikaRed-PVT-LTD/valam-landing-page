import { useEffect, useRef, useState } from "react";
import { PhoneFrame, Reveal, Section } from "@/components/ui";
import { home } from "@/lib/content";

const mmss = (t: number) => `${Math.floor(t / 60)}:${String(Math.floor(t % 60)).padStart(2, "0")}`;

/** Silent looping tour that plays only while on screen. No player UI is shown. */
export function VideoSection({ bare }: { bare?: boolean }) {
  const v = home.video;
  const ref = useRef<HTMLVideoElement>(null);
  const [time, setTime] = useState(0);

  // Play only while the video is on screen (and the tab is visible); pause otherwise.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let inView = false;
    const sync = () => {
      if (inView && !document.hidden) void el.play().catch(() => {});
      else el.pause();
    };
    const io = new IntersectionObserver(([e]) => { inView = e.isIntersecting; sync(); }, { threshold: 0.35 });
    io.observe(el);
    document.addEventListener("visibilitychange", sync);
    return () => { io.disconnect(); document.removeEventListener("visibilitychange", sync); };
  }, []);

  let active = 0;
  v.chapters.forEach((c, i) => { if (time >= c.time) active = i; });

  const seekTo = (t: number) => {
    const el = ref.current;
    if (!el) return;
    el.currentTime = t;
    void el.play();
  };

  return (
    <Section id={v.id} tone="dark" eyebrow={v.eyebrow} title={v.title} subtitle={v.subtitle} bare={bare}>
      <div className="video-wrap">
        <Reveal>
          <PhoneFrame>
            <video
              ref={ref}
              src={v.src}
              poster={v.poster}
              muted
              loop
              playsInline
              preload="metadata"
              disablePictureInPicture
              disableRemotePlayback
              controlsList="nodownload noplaybackrate nofullscreen noremoteplayback"
              aria-label={v.captions}
              onTimeUpdate={(e) => setTime(e.currentTarget.currentTime)}
              style={{ objectFit: "cover", background: "#000", pointerEvents: "none" }}
            />
          </PhoneFrame>
        </Reveal>
        <Reveal delay={0.15}>
          <h3 style={{ fontSize: 24 }}>What you will see</h3>
          <div className="chapters">
            {v.chapters.map((c, i) => (
              <button key={c.label} className={`chapter ${i === active ? "is-active" : ""}`} onClick={() => seekTo(c.time)}>
                <time>{mmss(c.time)}</time>{c.label}
              </button>
            ))}
          </div>
          <p style={{ marginTop: 20, fontSize: 14 }}>{v.captions}</p>
        </Reveal>
      </div>
    </Section>
  );
}
