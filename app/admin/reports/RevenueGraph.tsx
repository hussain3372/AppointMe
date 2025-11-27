"use client";

import React, { useEffect, useRef } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  BarController,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  BarController,
  Title,
  Tooltip,
  Legend
);

interface UserGrowthChartProps {
  className?: string;
}

const RevenueGraph: React.FC<UserGrowthChartProps> = ({
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

    // Sample data - adjust these values to match your actual data
    const activeUsersData = [8, 15, 30, 12, 10, 25, 28];
    const totalUsersData = [50, 65, 75, 55, 50, 60, 70];

    // Determine bar thickness based on screen size
    const isSmallScreen = window.innerWidth < 768; // md breakpoint
    const barThickness = isSmallScreen ? 20 : 40;

    const data = {
      labels: ["Mon", "Tue", "Wed", "Thurs", "Fri", "Sat", "Sun"],
      datasets: [
        {
          label: "Enterprise",
          data: activeUsersData,
          backgroundColor: "#6366f1",
          borderRadius: 6,
          barThickness: barThickness,
          
        },
        {
          label: "Total Subscriptions",
          data: totalUsersData,
          backgroundColor: "#5666F13D",
          borderRadius: 6,
          barThickness: barThickness,
        },
      ],
    };

    const options: ChartOptions<"bar"> = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend:{
          display : false
        },
        tooltip: {
          enabled: true,
          backgroundColor: "#1f2937",
          padding: 12,
          cornerRadius: 8,
          titleFont: {
            size: 13,
            weight: 600,
          },
          bodyFont: {
            size: 12,
          },
        },
      },
      scales: {
        x: {
          stacked: true,
          grid: { display: false },
          
          border: { display: false },
          ticks: {
            font: {
              size: 12,
              family: "'Inter', sans-serif",
            },
            color: "#6b7280",
          },
        },
        y: {
          stacked: true,
          beginAtZero: true,
          ticks: {
            stepSize: 25,
            callback: function (value) {
              return value + "M";
            },
            font: {
              size: 12,
              family: "'Inter', sans-serif",
            },
            color: "#6b7280",
          },
          grid: {
            color: "#f3f4f6",
            // drawBorder: false,
            display:false,
          },
          border: {
            display: false,
          },
        },
      },
    };

    chartInstance.current = new ChartJS(ctx, {
      type: "bar",
      data: data,
      options: options,
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, []);

  return (
    <div className={`w-full bg-white rounded-lg shadow-sm p-6 ${className}`}>
      <div className="flex flex-col sm:flex-row justify-between items-center mb-5">
        <h2 className="body-1 font-medium text-[#111827]">
          Revenue by subscription plan
        </h2>

        <div className="flex gap-2">
          <button className="flex items-end gap-2 rounded-[100px] px-3 py-1.5 text-[12px] font-normal transition-colors hover:bg-[#F0F0F0] hover:text-[#11224E]">
            Today
          </button>
          <button className="flex items-end gap-2 rounded-[100px] px-3 py-1.5 text-[12px] font-normal transition-colors hover:bg-[#F0F0F0] hover:text-[#11224E]">
            Weekly
          </button>
          <button className="flex items-end gap-2 rounded-[100px] px-3 py-1.5 text-[12px] font-normal transition-colors hover:bg-[#F0F0F0] hover:text-[#11224E]">
            Monthly
          </button>
          <button className="flex items-end gap-2 rounded-[100px] px-3 py-1.5 text-[12px] font-normal transition-colors hover:bg-[#F0F0F0] hover:text-[#11224E]">
            Yearly
          </button>
        </div>
      </div>
      <div className="flex gap-5 items-center mb-5">
        <div className="flex gap-[10px] items-center">
        <div className="h-2 w-2 bg-[#5666F1]  rounded-full"></div>
        <p className="heading-7 font-medium text-[#111827]">Enterprise</p>
        </div>

        <div className="flex gap-[10px] items-center">
        <div className="h-2 w-2 bg-[#5666F129]  rounded-full"></div>
        <p className="heading-7 font-medium text-[#111827]">Total Users</p>
        </div>
      </div>

      <div className="h-55">
        <canvas ref={chartRef}></canvas>
      </div>
    </div>
  );
};

export default RevenueGraph;