import { type FormEvent, useState } from "react";
import { Button, Icon, Reveal, Section } from "@/components/ui";
import { home, site } from "@/lib/content";

export function DownloadCta() {
  const d = home.download;
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "busy" | "ok" | "err">("idle");

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setState("err"); return; }
    setState("busy");
    try {
      if (d.endpoint) {
        const r = await fetch(d.endpoint, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email }) });
        if (!r.ok) throw new Error("request failed");
      } else {
        window.location.href = `mailto:${site.supportEmail}?subject=${encodeURIComponent("Valam launch list")}&body=${encodeURIComponent(`Please add ${email} to the Valam launch list.`)}`;
      }
      setState("ok");
      setEmail("");
    } catch {
      setState("err");
    }
  };

  return (
    <Section id={d.id} tone="dark">
      <Reveal className="cta-box">
        <h2>{d.title}</h2>
        <p>{d.body}</p>
        <form className="form" onSubmit={submit} noValidate>
          <label htmlFor="launch-email" className="sr-only" style={{ position: "absolute", left: -9999 }}>{d.formLabel}</label>
          <input id="launch-email" className="input" type="email" inputMode="email" autoComplete="email" placeholder={d.placeholder} value={email} onChange={(e) => setEmail(e.target.value)} aria-describedby="launch-msg" />
          <Button type="submit" disabled={state === "busy"}>{d.button}</Button>
        </form>
        <div id="launch-msg" role="status" className={`form-msg ${state === "ok" ? "form-msg--ok" : state === "err" ? "form-msg--err" : ""}`}>
          {state === "ok" ? d.success : state === "err" ? d.error : ""}
        </div>
        <p style={{ fontSize: 13 }}>{d.consent}</p>
        <div className="stores"><span>{d.storesLabel}</span>
          {([["android", site.stores.android], ["apple", site.stores.ios]] as const).map(([icon, s]) =>
            s.available && s.href ? (
              <a key={icon} className="store store--live" href={s.href} target="_blank" rel="noopener">
                <Icon name={icon} size={18} />{s.label}
              </a>
            ) : (
              <span key={icon} className="store store--soon"><Icon name={icon} size={18} />{s.label} <small>(coming soon)</small></span>
            )
          )}
        </div>
      </Reveal>
    </Section>
  );
}
