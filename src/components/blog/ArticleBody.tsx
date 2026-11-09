import type { Block } from "@/lib/content";

export function ArticleBody({ blocks }: { blocks: Block[] }) {
  return (
    <>
      {blocks.map((b, i) => {
        switch (b.type) {
          case "h2": return <h2 key={i}>{b.text}</h2>;
          case "p": return <p key={i}>{b.text}</p>;
          case "ul": return <ul key={i}>{b.items?.map((it) => <li key={it}>{it}</li>)}</ul>;
          case "callout": return <div className="callout" key={i}><b>{b.title}</b><p>{b.text}</p></div>;
          default: return null;
        }
      })}
    </>
  );
}
