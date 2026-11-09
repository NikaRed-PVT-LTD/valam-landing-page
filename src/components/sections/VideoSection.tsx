import { useRef, useState } from "react";
import { PhoneFrame, Reveal, Section } from "@/components/ui";
import { home } from "@/lib/content";

const mmss = (t: number) => `${Math.floor(t / 60)}:${String(Math.floor(t % 60)).padStart(2, "0")}`;

/** Silent looping tour that plays on its own. No player UI is shown. */
export function VideoSection({ bare }: { bare?: boolean }) {
  const v = home.video;
  const ref = useRef<HTMLVideoElement>(null);
  const [time, setTime] = useState(0);

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
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
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
