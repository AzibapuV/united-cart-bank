"use client";
import { useEffect, useRef } from "react";
import { Chart, LineController, LineElement, PointElement, LinearScale, CategoryScale, Filler, Tooltip } from "chart.js";
Chart.register(LineController, LineElement, PointElement, LinearScale, CategoryScale, Filler, Tooltip);

export default function SpendingChart({ labels, values }: { labels: string[]; values: number[] }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chartRef = useRef<Chart | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    const isDark = document.documentElement.classList.contains("dark");
    const lineColor = "#2E5EFF";
    const gridColor = isDark ? "rgba(255,255,255,0.06)" : "rgba(10,22,40,0.06)";
    const textColor = isDark ? "#94A3B8" : "#64748B";
    chartRef.current?.destroy();
    chartRef.current = new Chart(canvasRef.current, {
      type: "line",
      data: { labels, datasets: [{ data: values, borderColor: lineColor, backgroundColor: "rgba(46,94,255,0.08)", fill: true, tension: 0.35, pointRadius: 3, pointBackgroundColor: lineColor }] },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          x: { grid: { display: false }, ticks: { color: textColor, font: { size: 11 } } },
          y: { grid: { color: gridColor }, ticks: { color: textColor, font: { size: 11 }, callback: (value) => `$${value}` } }
        }
      }
    });
    return () => { chartRef.current?.destroy(); };
  }, [labels, values]);

  return <div className="h-56"><canvas ref={canvasRef} /></div>;
}
