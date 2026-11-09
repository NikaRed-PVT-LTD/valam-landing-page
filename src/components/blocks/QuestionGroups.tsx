import { Reveal } from "@/components/ui";

export function QuestionGroups({ groups }: { groups: { title: string; items: string[] }[] }) {
  return (
    <div className="grid grid--2">
      {groups.map((g, i) => (
        <Reveal key={g.title} delay={(i % 2) * 0.1}>
          <div className="card">
            <h3>{g.title}</h3>
            <ul className="qs">{g.items.map((q) => <li key={q}>{q}</li>)}</ul>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
