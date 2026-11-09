import { motion, useReducedMotion } from "framer-motion";

export function Blobs() {
  const reduce = useReducedMotion();
  const drift = (x: number, y: number, dur: number) => (reduce ? {} : { animate: { x: [0, x, 0], y: [0, y, 0] }, transition: { duration: dur, repeat: Infinity, ease: "easeInOut" as const } });
  return (
    <div aria-hidden="true">
      <motion.div className="blob" style={{ width: 460, height: 460, background: "#16c172", top: -140, right: -80 }} {...drift(-60, 50, 14)} />
      <motion.div className="blob" style={{ width: 380, height: 380, background: "#b6f35a", bottom: -160, left: -100, opacity: 0.3 }} {...drift(70, -40, 18)} />
      <motion.div className="blob" style={{ width: 280, height: 280, background: "#2dd4bf", top: "30%", left: "38%", opacity: 0.25 }} {...drift(40, 60, 16)} />
    </div>
  );
}
