"use client";

import React, { useEffect, useRef, useState } from "react";
import FilterDropdown from "@/app/shared/FilterDropdown";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  LineController,
  Filler,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  LineController,
  Filler,
  Title,
  Tooltip,
  Legend
);

interface RevenueOverviewChartProps {
  className?: string;
}

const RevenueOverviewChart: React.FC<RevenueOverviewChartProps> = ({
  className = "",
}) => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<ChartJS | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    const ctx = chartRef.current.getContext("2d");
    if (!ctx) return;

    // Destroy existing chart instance
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    // Sample revenue data - adjust these values to match your actual data
    const revenueData = [
      15, 18, 22, 19, 25, 28, 24, 30, 35, 32, 38, 42, 39, 45, 48, 44, 42, 38,
      35, 32, 28, 25, 22, 20,
    ];

    const labels = [
      "12 am",
      "1 am",
      "2 am",
      "3 am",
      "4 am",
      "5 am",
      "6 am",
      "7 am",
      "8 am",
      "9 am",
      "10 am",
      "11 am",
      "12 pm",
      "1 pm",
      "2 pm",
      "3 pm",
      "4 pm",
      "5 pm",
      "6 pm",
      "7 pm",
      "8 pm",
      "9 pm",
      "10 pm",
      "11 pm",
    ];

    // Create gradient for the area fill
    const gradient = ctx.createLinearGradient(0, 0, 0, 300);
    gradient.addColorStop(0, "rgba(217, 119, 85, 0.6)");
    gradient.addColorStop(0.5, "rgba(217, 119, 85, 0.3)");
    gradient.addColorStop(1, "rgba(217, 119, 85, 0.05)");

    const data = {
      labels: labels,
      datasets: [
        {
          label: "Revenue",
          data: revenueData,
          borderColor: "#d97755",
          backgroundColor: gradient,
          borderWidth: 2,
          fill: true,
          tension: 0.4,
          pointRadius: 0,
          pointHoverRadius: 6,
          pointHoverBackgroundColor: "#d97755",
          pointHoverBorderColor: "#fff",
          pointHoverBorderWidth: 2,
        },
      ],
    };

    const options: ChartOptions<"line"> = {
      responsive: true,
      maintainAspectRatio: false,
      interaction: {
        intersect: false,
        mode: "index",
      },
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          enabled: true,
          backgroundColor: "#FFFFFF14",
          padding: 8,
          cornerRadius: 8,
          displayColors: false,
          titleFont: {
            size: 11,
            weight: 300,
          },
          bodyFont: {
            size: 14,
            weight: 600,
          },
          callbacks: {
            title: function (context) {
              return context[0].label;
            },
            label: function (context) {
              return "$" + context.parsed.y + " USD";
            },
          },
        },
      },
      scales: {
        x: {
          grid: {
            display: false,
          },
          border: {
            display: false,
          },
          ticks: {
            maxRotation: 0,
            autoSkip: true,
            maxTicksLimit: 8,
            font: {
              size: 11,
              family: "'Inter', sans-serif",
            },
            color: "rgba(255, 255, 255, 0.6)",
          },
        },
        y: {
          display: false,
          beginAtZero: true,
        },
      },
    };

    chartInstance.current = new ChartJS(ctx, {
      type: "line",
      data: data,
      options: options,
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, []);
  const [filter, setFilter] = useState<string | null>("Today");

  return (
    <div className={`w-full bg-[#11224E] h-full rounded-lg p-5 ${className}`}>
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-[20px] font-medium leading-6 text-white">
            Revenue overview
          </h1>
        </div>
        <FilterDropdown
          label="Select Range"
          options={["Today", "Yesterday"]}
          value={filter}
          onChange={(v) => setFilter(v)}
          buttonClassName="bg-[#FFFFFF1F] rounded-[100px] text-[#FFF] "
        />
      </div>
      <div className="mt-6">
        <h2 className="body-5 font-medium text-[#FFFFFF99] mb-1">
          Revenue overview
        </h2>
        <p className="heading-3 font-medium text-white">$32,000,000 USD</p>
      </div>
      <div className="h-64">
        <canvas ref={chartRef}></canvas>
      </div>
    </div>
  );
};

export default RevenueOverviewChart;
