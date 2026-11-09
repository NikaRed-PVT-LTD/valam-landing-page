import { Icon } from "@/components/ui";

const isYes = (v: string) => v === "Yes";
const isNo = (v: string) => v === "No";

export function DataTable({ columns, rows, caption }: { columns: string[]; rows: string[][]; caption: string }) {
  return (
    <div className="table-wrap">
      <table className="table">
        <caption className="sr-only">{caption}</caption>
        <thead><tr>{columns.map((c, i) => <th key={i} scope="col">{c}</th>)}</tr></thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r[0]}>
              {r.map((c, i) => (
                i === 0 ? <th key={i} scope="row">{c}</th> : (
                  <td key={i}>
                    {isYes(c) ? <><Icon name="check" size={18} className="yes" /><span className="sr-only">Yes</span></> : isNo(c) ? <><Icon name="x" size={18} className="no" /><span className="sr-only">No</span></> : c}
                  </td>
                )
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
