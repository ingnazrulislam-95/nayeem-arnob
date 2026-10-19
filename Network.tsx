import { useEffect, useRef } from "react";

type P = { x: number; y: number; vx: number; vy: number };

export default function Network() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const c = ref.current!;
    const x = c.getContext("2d")!;
    const calm = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let pts: P[] = [], W = 0, H = 0, raf = 0;

    const size = () => {
      W = c.width = c.offsetWidth;
      H = c.height = c.offsetHeight;
      pts = Array.from({ length: Math.round((W * H) / 26000) }, () => ({
        x: Math.random() * W, y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.25, vy: (Math.random() - 0.5) * 0.25,
      }));
    };
    const draw = () => {
      x.clearRect(0, 0, W, H);
      x.fillStyle = "#38D6E8";
      pts.forEach((p, i) => {
        if (!calm) {
          p.x += p.vx; p.y += p.vy;
          if (p.x < 0 || p.x > W) p.vx *= -1;
          if (p.y < 0 || p.y > H) p.vy *= -1;
        }
        x.fillRect(p.x - 1, p.y - 1, 2, 2);
        for (let j = i + 1; j < pts.length; j++) {
          const d = Math.hypot(p.x - pts[j].x, p.y - pts[j].y);
          if (d < 130) {
            x.strokeStyle = `rgba(56,214,232,${0.22 * (1 - d / 130)})`;
            x.beginPath(); x.moveTo(p.x, p.y); x.lineTo(pts[j].x, pts[j].y); x.stroke();
          }
        }
      });
      if (!calm) raf = requestAnimationFrame(draw);
    };
    const onResize = () => { size(); if (calm) draw(); };

    size(); draw();
    addEventListener("resize", onResize);
    return () => { cancelAnimationFrame(raf); removeEventListener("resize", onResize); };
  }, []);

  return <canvas id="net" ref={ref} aria-hidden="true" />;
}
