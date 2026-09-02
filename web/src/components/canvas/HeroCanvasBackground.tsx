"use client";

import React, { useRef, useEffect } from "react";

export type HeroCanvasVariant = "streamlines" | "isolines" | "digital-twin";

interface HeroCanvasBackgroundProps {
  variant: HeroCanvasVariant;
  fallbackSrc: string;
  fallbackClassName?: string;
  loopSeconds?: number;
  accent?: string;
  opacity?: number;
}

export const HeroCanvasBackground: React.FC<HeroCanvasBackgroundProps> = ({
  variant,
  fallbackSrc,
  fallbackClassName = "object-cover object-center",
  loopSeconds = 12,
  accent = "#E05A10",
  opacity = 0.85,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isVisibleRef = useRef(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const W = 1440;
    const H = 620;

    // Set canvas internal resolution (2x for Retina sharpness)
    canvas.width = W * 2;
    canvas.height = H * 2;

    // Helper math & noise functions
    const rng = (seed: number) => {
      let s = seed;
      return () => (s = (s * 1103515245 + 12345) & 0x7fffffff) / 0x7fffffff;
    };

    const vnoise = (x: number, y: number, seed: number) => {
      const hh = (a: number, b: number) => {
        const n = Math.sin(a * 127.1 + b * 311.7 + seed * 47.3) * 43758.5453;
        return n - Math.floor(n);
      };
      const xi = Math.floor(x);
      const yi = Math.floor(y);
      const xf = x - xi;
      const yf = y - yi;
      const u = xf * xf * (3 - 2 * xf);
      const v = yf * yf * (3 - 2 * yf);
      return (
        (hh(xi, yi) * (1 - u) + hh(xi + 1, yi) * u) * (1 - v) +
        (hh(xi, yi + 1) * (1 - u) + hh(xi + 1, yi + 1) * u) * v
      );
    };

    const fbm = (x: number, y: number, seed: number) => {
      let v = 0;
      let a = 0.5;
      let f = 1;
      for (let i = 0; i < 4; i++) {
        v += a * vnoise(x * f, y * f, seed + i * 11);
        a *= 0.5;
        f *= 2;
      }
      return v;
    };

    const rgba = (hex: string, a: number) => {
      const cleanHex = hex.replace("#", "");
      const n = parseInt(cleanHex, 16);
      return `rgba(${n >> 16},${(n >> 8) & 255},${n & 255},${a})`;
    };

    const vignette = (c: CanvasRenderingContext2D, inner: number) => {
      const g = c.createRadialGradient(W / 2, H / 2, H * inner, W / 2, H / 2, H * 1.05);
      g.addColorStop(0, "rgba(11,12,14,0)");
      g.addColorStop(1, "rgba(11,12,14,1)");
      c.fillStyle = g;
      c.fillRect(0, 0, W, H);
    };

    const clearPane = () => {
      ctx.setTransform(canvas.width / W, 0, 0, canvas.height / H, 0, 0);
      ctx.fillStyle = "#0B0C0E";
      ctx.fillRect(0, 0, W, H);
      ctx.font = '11px "JetBrains Mono", monospace';
    };

    // -------------------------------------------------------------
    // VARIANT 1: Digital Twin (L1) Data Structures
    // -------------------------------------------------------------
    interface TwinPt {
      x: number;
      y: number;
      w: number;
    }
    let twinPts: TwinPt[] = [];
    let twinPairs: [number, number, number][] = [];
    let twinStops: [number, number][] = [];

    if (variant === "digital-twin") {
      const r = rng(20260812);
      const centers: [number, number][] = [];
      for (let c = 0; c < 54; c++) {
        const cx = 60 + r() * (W - 120);
        const cy = 40 + r() * (H - 80);
        centers.push([cx, cy]);
        const n = 8 + ((r() * 18) | 0);
        for (let i = 0; i < n; i++) {
          const a = r() * 6.283;
          const rad = Math.pow(r(), 0.6) * (24 + r() * 40);
          twinPts.push({
            x: cx + Math.cos(a) * rad,
            y: cy + Math.sin(a) * rad * 0.8,
            w: r() * 6.283,
          });
        }
      }

      for (let i = 0; i < twinPts.length; i++) {
        for (let j = i + 1; j < Math.min(twinPts.length, i + 24); j++) {
          const d = Math.hypot(twinPts[j].x - twinPts[i].x, twinPts[j].y - twinPts[i].y);
          if (d < 56) twinPairs.push([i, j, d]);
        }
      }

      const inner = centers.filter(
        (c) => c[0] > 200 && c[0] < W - 150 && c[1] > 100 && c[1] < H - 100
      );
      const spread: [number, number][] = [];
      for (let minD = 380; minD >= 120 && spread.length < 5; minD -= 40) {
        spread.length = 0;
        for (const c of inner) {
          if (spread.every((s) => Math.hypot(s[0] - c[0], s[1] - c[1]) > minD)) spread.push(c);
          if (spread.length === 5) break;
        }
      }
      while (spread.length < 5 && inner.length) spread.push(inner[spread.length % inner.length]);
      twinStops = spread.slice(0, 5);
    }

    const drawTwin = (ph: number) => {
      clearPane();
      const th = ph * 6.283;
      const S = twinStops;
      const n = S.length;
      if (!n) return;
      const seg = ph * n;
      const k = Math.floor(seg);
      const u = seg - k;
      const from = S[k % n];
      const to = S[(k + 1) % n];
      const travel = 0.45;
      const moving = u < travel;
      const e = moving ? (t => t * t * (3 - 2 * t))(u / travel) : 1;
      const dwell = moving ? 0 : (u - travel) / (1 - travel);
      const sx = from[0] + (to[0] - from[0]) * e;
      const sy = from[1] + (to[1] - from[1]) * e;
      const reach = 80 * (moving ? 0.72 : 1 + 0.1 * Math.sin(dwell * 12.566));
      const drift = 7;

      const P = twinPts.map((p) => {
        const s1 = th + p.w;
        const s2 = th + p.x * 0.006 + p.y * 0.004;
        const x = p.x + drift * Math.sin(s1) + drift * 0.8 * Math.sin(s2);
        const y = p.y + drift * 0.7 * Math.cos(s1) + drift * 0.6 * Math.cos(s2 * 1.0 + 1.1);
        return { x, y, g: Math.max(0, 1 - Math.hypot(x - sx, y - sy) / reach) };
      });

      const linkR = 48 + 7 * Math.sin(th);
      ctx.lineWidth = 0.6;
      for (const [i, j] of twinPairs) {
        const a = P[i];
        const b = P[j];
        const d = Math.hypot(b.x - a.x, b.y - a.y);
        if (d > linkR) continue;
        const g = Math.max(a.g, b.g);
        ctx.strokeStyle =
          g > 0.02
            ? rgba(accent, 0.06 + 0.6 * g * g)
            : `rgba(150,156,166,${0.045 + 0.08 * (1 - d / linkR)})`;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }

      for (const p of P) {
        ctx.fillStyle = p.g > 0.02 ? rgba(accent, 0.35 + 0.65 * p.g) : "rgba(190,195,203,.42)";
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.g > 0.3 ? 1.5 + p.g : 1.1, 0, 6.3);
        ctx.fill();
      }

      const halo = ctx.createRadialGradient(sx, sy, 0, sx, sy, reach);
      halo.addColorStop(0, rgba(accent, 0.12));
      halo.addColorStop(1, rgba(accent, 0));
      ctx.fillStyle = halo;
      ctx.fillRect(0, 0, W, H);
      vignette(ctx, 0.36);

      const R = reach * 0.86;
      ctx.strokeStyle = rgba(accent, moving ? 0.3 : 0.6);
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(sx, sy, R, 0, 6.3);
      ctx.stroke();

      const br = R + 9;
      ctx.strokeStyle = rgba(accent, moving ? 0.25 : 0.75);
      ctx.lineWidth = 1.4;
      for (const [dx, dy] of [
        [-1, -1],
        [1, -1],
        [-1, 1],
        [1, 1],
      ]) {
        ctx.beginPath();
        ctx.moveTo(sx + dx * br, sy + dy * br - dy * 9);
        ctx.lineTo(sx + dx * br, sy + dy * br);
        ctx.lineTo(sx + dx * br - dx * 9, sy + dy * br);
        ctx.stroke();
      }

      if (moving) {
        ctx.strokeStyle = rgba(accent, 0.22);
        ctx.setLineDash([5, 7]);
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(from[0], from[1]);
        ctx.lineTo(to[0], to[1]);
        ctx.stroke();
        ctx.setLineDash([]);
      } else {
        for (const p of [0, 0.5]) {
          const t = (dwell + p) % 1;
          ctx.strokeStyle = rgba(accent, 0.45 * (1 - t));
          ctx.lineWidth = 1.2;
          ctx.beginPath();
          ctx.arc(sx, sy, R * (0.2 + 1.5 * t), 0, 6.3);
          ctx.stroke();
        }
        const sweep = -1.571 + dwell * 6.283;
        ctx.strokeStyle = rgba(accent, 0.5);
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(sx, sy);
        ctx.lineTo(sx + Math.cos(sweep) * R, sy + Math.sin(sweep) * R);
        ctx.stroke();

        ctx.fillStyle = rgba(accent, 0.85);
        ctx.fillText("ANALYSING  SUB-" + (100 + (k % n) * 7), sx + br + 12, sy - br + 12);
        ctx.fillStyle = "#6B6F76";
        ctx.fillText(Math.round(dwell * 100) + "%", sx + br + 12, sy - br + 30);
      }

      ctx.fillStyle = "#4A4E55";
      ctx.fillText(
        "fragment: 3.2 × 10⁶ nodes · sweep " + ((k % n) + 1) + "/" + n,
        28,
        H - 20
      );
    };

    // -------------------------------------------------------------
    // VARIANT 2: Isoline Field (L2) Data Structures
    // -------------------------------------------------------------
    const step = 6;
    const cols = Math.ceil(W / step);
    const rows = Math.ceil(H / step);
    let isoField: Float32Array | null = null;

    if (variant === "isolines") {
      isoField = new Float32Array((cols + 1) * (rows + 1));
      for (let j = 0; j <= rows; j++) {
        for (let i = 0; i <= cols; i++) {
          isoField[j * (cols + 1) + i] = fbm((i * step) / W * 3.1, (j * step) / H * 1.9, 9);
        }
      }
    }

    const drawIso = (ph: number) => {
      clearPane();
      if (!isoField) return;
      const levels = 20;
      const th = ph * 6.283;
      const at = (i: number, j: number) => isoField![j * (cols + 1) + i];

      for (let l = 0; l < levels; l++) {
        const t = ((l + ph) % levels) / levels;
        const hot = Math.abs(t - 0.55) < 0.03;
        ctx.strokeStyle = hot
          ? rgba(accent, 0.85)
          : `rgba(186,192,201,${0.09 + 0.15 * (1 - Math.abs(t - 0.5) * 2)})`;
        ctx.lineWidth = hot ? 1.6 : 0.7;
        ctx.beginPath();
        for (let j = 0; j < rows; j++) {
          for (let i = 0; i < cols; i++) {
            const a = at(i, j);
            const b = at(i + 1, j);
            const c = at(i + 1, j + 1);
            const d = at(i, j + 1);
            const x0 = i * step;
            const y0 = j * step;
            const sg: [number, number][] = [];
            if ((a < t) !== (b < t)) sg.push([x0 + (step * (t - a)) / (b - a), y0]);
            if ((b < t) !== (c < t)) sg.push([x0 + step, y0 + (step * (t - b)) / (c - b)]);
            if ((c < t) !== (d < t)) sg.push([x0 + step * (1 - (t - d) / (c - d)), y0 + step]);
            if ((d < t) !== (a < t)) sg.push([x0, y0 + (step * (t - a)) / (d - a)]);
            if (sg.length >= 2) {
              ctx.moveTo(sg[0][0], sg[0][1]);
              ctx.lineTo(sg[1][0], sg[1][1]);
            }
          }
        }
        ctx.stroke();
      }

      const sx = W / 2 + W * 0.3 * Math.cos(th);
      const sy = H / 2 + H * 0.24 * Math.sin(2 * th);
      const halo = ctx.createRadialGradient(sx, sy, 0, sx, sy, 260);
      halo.addColorStop(0, rgba(accent, 0.07));
      halo.addColorStop(1, rgba(accent, 0));
      ctx.fillStyle = halo;
      ctx.fillRect(0, 0, W, H);
      vignette(ctx, 0.36);
      ctx.fillStyle = "#4A4E55";
      ctx.fillText("scalar field · " + levels + " isolines", 28, H - 20);
    };

    // -------------------------------------------------------------
    // VARIANT 3: Streamlines (L3) Data Structures
    // -------------------------------------------------------------
    interface StreamPath {
      pts: [number, number][];
      off: number;
    }
    const cometPaths: StreamPath[] = [];

    if (variant === "streamlines") {
      const r2 = rng(7717);
      for (let p = 0; p < 620; p++) {
        let x = r2() * W;
        let y = r2() * H;
        const pts: [number, number][] = [[x, y]];
        for (let k = 0; k < 54; k++) {
          const a = fbm((x / W) * 2.1, (y / H) * 1.5, 12) * Math.PI * 3;
          x += Math.cos(a) * 5;
          y += Math.sin(a) * 5;
          if (x < -20 || x > W + 20 || y < -20 || y > H + 20) break;
          pts.push([x, y]);
        }
        if (pts.length > 14) cometPaths.push({ pts, off: r2() });
      }
    }

    const drawComet = (ph: number) => {
      clearPane();
      ctx.lineWidth = 0.6;
      ctx.strokeStyle = "rgba(186,192,201,.11)";
      ctx.beginPath();
      for (const p of cometPaths) {
        p.pts.forEach((q, i) => (i ? ctx.lineTo(q[0], q[1]) : ctx.moveTo(q[0], q[1])));
      }
      ctx.stroke();

      const tail = 9;
      for (const p of cometPaths) {
        const n = p.pts.length;
        const head = ((ph + p.off) % 1) * (n - 1);
        for (let k = 0; k < tail; k++) {
          const i = Math.floor(head) - k;
          if (i < 1) continue;
          const a = (1 - k / tail) * 0.75;
          ctx.strokeStyle = rgba(accent, a * 0.9);
          ctx.lineWidth = 1.5 * (1 - k / tail) + 0.4;
          ctx.beginPath();
          ctx.moveTo(p.pts[i - 1][0], p.pts[i - 1][1]);
          ctx.lineTo(p.pts[i][0], p.pts[i][1]);
          ctx.stroke();
        }
      }
      vignette(ctx, 0.3);
      ctx.fillStyle = "#4A4E55";
      ctx.fillText("vector field · " + cometPaths.length + " streamlines", 28, H - 20);
    };

    // -------------------------------------------------------------
    // Animation Loop with Visibility & Reduced Motion Checks
    // -------------------------------------------------------------
    let rafId: number;
    const t0 = performance.now();
    const dur = Math.max(3, loopSeconds);

    const renderFrame = (ph: number) => {
      if (variant === "digital-twin") drawTwin(ph);
      else if (variant === "isolines") drawIso(ph);
      else if (variant === "streamlines") drawComet(ph);
    };

    // If user prefers reduced motion, render one static frame at ph = 0.5
    if (prefersReducedMotion) {
      renderFrame(0.5);
      return;
    }

    const loop = () => {
      if (!isVisibleRef.current) return;
      const ph = (((performance.now() - t0) / 1000 / dur) % 1);
      renderFrame(ph);
      rafId = requestAnimationFrame(loop);
    };

    // IntersectionObserver to pause loop when scrolled out of view
    const observer = new IntersectionObserver(
      ([entry]) => {
        const wasVisible = isVisibleRef.current;
        isVisibleRef.current = entry.isIntersecting;
        if (!wasVisible && entry.isIntersecting) {
          rafId = requestAnimationFrame(loop);
        }
      },
      { threshold: 0.05 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    rafId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafId);
      observer.disconnect();
    };
  }, [variant, loopSeconds, accent]);

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none select-none">
      {/* Fallback Static Image */}
      <img
        src={fallbackSrc}
        alt=""
        aria-hidden="true"
        className={`absolute inset-0 h-full w-full ${fallbackClassName} transition-opacity duration-700`}
        style={{ opacity: opacity * 0.7 }}
      />

      {/* Dynamic 2D Canvas Layer — Active on desktop / laptop screens */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="hidden lg:block absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
        style={{ opacity }}
      />

      {/* Standardized Gradient Vignette */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0B0C0E] via-[#0B0C0E]/50 to-[#0B0C0E]/15" />
    </div>
  );
};
