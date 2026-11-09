import type { SVGProps } from "react";

const paths: Record<string, string> = {
  shield: "M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3zm-3 9l2 2 4-4",
  spark: "M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3zm7 12l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8L19 15z",
  wallet: "M3 7a2 2 0 012-2h12v3M3 7v11a2 2 0 002 2h14a1 1 0 001-1v-9a1 1 0 00-1-1H5a2 2 0 01-2-2zm13 7h2",
  card: "M3 6h18v12H3zM3 10h18M7 15h4",
  loan: "M12 3v18M16 7.5c0-1.4-1.8-2.5-4-2.5s-4 1.1-4 2.5S9.800 10 12 10s4 1.100 4 2.500-1.800 2.500-4 2.500-4-1.100-4-2.500",
  people: "M9 11a3.500 3.500 0 100-7 3.500 3.500 0 000 7zm-6 9a6 6 0 0112 0M17 11a3 3 0 100-6M21 20a5 5 0 00-4-4.900",
  target: "M12 21a9 9 0 100-18 9 9 0 000 18zm0-5a4 4 0 100-8 4 4 0 000 8zm0-3a1 1 0 100-2 1 1 0 000 2z",
  chart: "M4 20V4M4 20h16M8 15l3-4 3 2 5-6",
  calendar: "M5 5h14a1 1 0 011 1v13a1 1 0 01-1 1H5a1 1 0 01-1-1V6a1 1 0 011-1zM4 10h16M8 3v4M16 3v4",
  import: "M12 3v12m0 0l-4-4m4 4l4-4M4 19h16",
  lock: "M6 11h12v9H6zM8 11V8a4 4 0 018 0v3M12 15v2",
  database: "M12 8c4.400 0 8-1.300 8-3s-3.600-3-8-3-8 1.300-8 3 3.600 3 8 3zM4 5v14c0 1.700 3.600 3 8 3s8-1.300 8-3V5M4 12c0 1.700 3.600 3 8 3s8-1.300 8-3",
  key: "M14 10a4 4 0 11-3.900 4.800L3 21v-3l2-2h2v-2h2l1.200-1.200A4 4 0 0114 10zm2 1h.01",
  backup: "M7 18a4 4 0 01-.5-8A5.500 5.500 0 0117 8.500 4.500 4.500 0 0117 18H7zm5-2v-6m0 0l-2.500 2.500M12 10l2.500 2.500",
  eye: "M2 12s3.500-7 10-7 10 7 10 7-3.500 7-10 7S2 12 2 12zm10 3a3 3 0 100-6 3 3 0 000 6z",
  student: "M2 9l10-5 10 5-10 5L2 9zm5 3v4c0 1 2.200 2.500 5 2.500s5-1.500 5-2.500v-4",
  family: "M7 8a2.500 2.500 0 100-5 2.500 2.500 0 000 5zm10 0a2.500 2.500 0 100-5 2.500 2.500 0 000 5zM3 20v-5a4 4 0 018 0v5M13 20v-5a4 4 0 018 0v5",
  freelance: "M4 7h16v12H4zM9 7V5a1 1 0 011-1h4a1 1 0 011 1v2M4 13h16",
  debt: "M4 4v16h16M8 9l4 4 3-3 4 4M19 14v-3h-3",
  check: "M5 12.500l4.500 4.500L19 7.500",
  x: "M6 6l12 12M18 6L6 18",
  plus: "M12 5v14M5 12h14",
  arrow: "M5 12h14m-6-6l6 6-6 6",
  menu: "M4 7h16M4 12h16M4 17h16",
  play: "M8 5v14l11-7z",
  pause: "M8 5v14M16 5v14",
  mail: "M3 6h18v12H3zM3 7l9 7 9-7",
  clock: "M12 21a9 9 0 100-18 9 9 0 000 18zm0-14v5l3 2",
  apple: "M16 3c0 1.500-1 3-2.700 3.300C13 4.500 14.200 3 16 3zM12 8c1.200-.8 3-.8 4.200.4-2.300 1.400-2 4.600.3 5.600-.6 1.800-1.800 4-3.500 4-1 0-1.200-.6-2.500-.6s-1.600.6-2.500.6C6.200 18 4 14 4 11c0-2.700 1.700-4 3.500-4 1.300 0 2.300.8 3 .8.600 0 .8-.6 1.500-.8z",
  android: "M6 10h12v8a1 1 0 01-1 1H7a1 1 0 01-1-1v-8zM8 5l1.500 2.500M16 5l-1.500 2.500M6 10a6 6 0 0112 0M9.500 8h.01M14.500 8h.01",
};

export type IconName = keyof typeof paths | (string & {});

type Props = SVGProps<SVGSVGElement> & { name: IconName; size?: number };

export function Icon({ name, size = 22, ...rest }: Props) {
  const d = paths[name] ?? paths.spark;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false" {...rest}>
      <path d={d} />
    </svg>
  );
}
