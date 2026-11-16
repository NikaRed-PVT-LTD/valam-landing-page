import { Button, Container, Reveal } from "@/components/ui";

export function CtaBand({ title = "Ready to try Valam?", body = "Get Valam free on Google Play. On iPhone? Join the launch list and we will email you the day it lands.", label = "Get the app", href = "/#download" }: { title?: string; body?: string; label?: string; href?: string }) {
  return (
    <section className="section section--dark" aria-label="Get Valam">
      <Container>
        <Reveal className="cta-box">
          <h2>{title}</h2>
          <p>{body}</p>
          <p><Button href={href} arrow>{label}</Button></p>
        </Reveal>
      </Container>
    </section>
  );
}
