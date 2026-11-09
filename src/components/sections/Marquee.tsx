const words = ["Accounts", "Credit cards", "Loans and EMIs", "Goals", "Budgets", "Friends and family", "Chit funds", "Investments", "Reminders", "Net worth", "Mathi coach", "Privacy mode"];

export function Marquee() {
  const list = [...words, ...words];
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee__track">{list.map((w, i) => <span key={i}>{w}</span>)}</div>
    </div>
  );
}
