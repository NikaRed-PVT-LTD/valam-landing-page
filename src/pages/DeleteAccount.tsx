import { type FormEvent, useState } from "react";
import { PageHero } from "@/components/layout/PageHero";
import { Button, Reveal } from "@/components/ui";
import { deleteAccount as d, site } from "@/lib/content";

export default function DeleteAccount() {
  const [id, setId] = useState("");
  const [reason, setReason] = useState("");
  const [ok, setOk] = useState(false);
  const [err, setErr] = useState<{ id?: string; ok?: string }>({});

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const next: typeof err = {};
    if (id.trim().length < 5) next.id = d.form.errors.email;
    if (!ok) next.ok = d.form.errors.confirm;
    setErr(next);
    if (Object.keys(next).length) return;
    const body = `Please delete my Valam account and cloud data.\n\nAccount: ${id.trim()}\nReason: ${reason.trim() || "Not given"}\n\nI understand this is permanent.`;
    window.location.href = `mailto:${site.privacyEmail}?subject=${encodeURIComponent(d.form.subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <>
      <PageHero title={d.title} intro={d.intro} crumbs={[{ label: "Home", href: "/" }, { label: d.title }]} />
      <section className="section" style={{ paddingTop: 32 }}>
        <div className="container prose">
          <div className="warn" role="note"><strong>Important:</strong> {d.warning}</div>
          {d.options.map((o) => (
            <Reveal key={o.id}>
              <h2 id={o.id}>{o.title}</h2>
              <p><span className="tag">{o.audience}</span></p>
              <p>{o.body}</p>
              <ol className="step-list">{o.steps.map((s) => <li key={s}><span>{s}</span></li>)}</ol>
            </Reveal>
          ))}
          <div className="grid grid--2" style={{ marginTop: 40 }}>
            <div className="card"><h3>{d.deleted.title}</h3><ul style={{ margin: "12px 0 0" }}>{d.deleted.items.map((i) => <li key={i}>{i}</li>)}</ul></div>
            <div className="card"><h3>{d.kept.title}</h3><ul style={{ margin: "12px 0 0" }}>{d.kept.items.map((i) => <li key={i}>{i}</li>)}</ul></div>
          </div>
          <h2 id="request">{d.form.title}</h2>
          <form onSubmit={submit} noValidate>
            <div className="field">
              <label htmlFor="del-id">{d.form.emailLabel}</label>
              <input id="del-id" className="input input--light" value={id} onChange={(e) => setId(e.target.value)} placeholder={d.form.emailPlaceholder} autoComplete="email" aria-invalid={!!err.id} aria-describedby={err.id ? "del-id-err" : undefined} />
              {err.id && <span className="err" id="del-id-err">{err.id}</span>}
            </div>
            <div className="field">
              <label htmlFor="del-reason">{d.form.reasonLabel}</label>
              <textarea id="del-reason" className="input input--light" style={{ minHeight: 100, padding: 14 }} value={reason} onChange={(e) => setReason(e.target.value)} placeholder={d.form.reasonPlaceholder} />
            </div>
            <label className="check"><input type="checkbox" checked={ok} onChange={(e) => setOk(e.target.checked)} /><span>{d.form.confirmLabel}</span></label>
            {err.ok && <p className="err">{err.ok}</p>}
            <Button type="submit">{d.form.button}</Button>
            <p style={{ fontSize: 14, marginTop: 14, color: "var(--ink-soft)" }}>{d.form.help}</p>
          </form>
          <p>{d.contactNote}</p>
        </div>
      </section>
    </>
  );
}
