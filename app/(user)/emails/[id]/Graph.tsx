"use client";
import React, { useEffect, useRef } from "react";
import {
  Chart,
  LineController,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
Chart.register(
  LineController,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

type TimePeriod = "today" | "weekly" | "monthly" | "yearly";

interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string | ((context: any) => CanvasGradient | null);
    borderColor: string;
    borderWidth: number;
    fill: boolean;
    tension: number;
    pointRadius: number;
    pointHoverRadius: number;
    pointBackgroundColor?: string;
    pointBorderColor?: string;
    pointBorderWidth?: number;
  }[];
}

const CampaignPerformance = () => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);
  const [timePeriod, setTimePeriod] = React.useState<TimePeriod>("monthly");
  const [isAnimating, setIsAnimating] = React.useState(false);

  // Sample data for different time periods
  const getChartData = (period: TimePeriod): ChartData => {
    const baseData = {
      monthly: {
        labels: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
        data: [320, 600, 420, 820, 720, 620, 680, 600, 560, 340, 520, 400],
      },
      weekly: {
        labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        data: [120, 180, 150, 220, 190, 90, 110],
      },
      today: {
        labels: ["00:00", "04:00", "08:00", "12:00", "16:00", "20:00", "23:59"],
        data: [50, 80, 120, 180, 150, 100, 60],
      },
      yearly: {
        labels: ["2020", "2021", "2022", "2023", "2024"],
        data: [1200, 1800, 2200, 2800, 3200],
      },
    };

    const periodData = baseData[period];

    return {
      labels: periodData.labels,
      datasets: [
        {
          label: "Campaign",
          data: periodData.data,
          backgroundColor: (context: any) => {
            const chart = context.chart;
            const { ctx, chartArea } = chart;
            if (!chartArea) {
              return null;
            }
            const gradient = ctx.createLinearGradient(
              0,
              chartArea.top,
              0,
              chartArea.bottom
            );
            gradient.addColorStop(0, "rgba(211, 55, 213, 1)");
            gradient.addColorStop(0.5, "rgba(211, 55, 213, 1)");
            gradient.addColorStop(1, "rgba(255, 255, 255, 0)");
            return gradient;
          },
          borderColor: "rgba(211, 55, 213, 1)",
          borderWidth: 2.5,
          fill: true,
          tension: 0.1,
          pointRadius: 0,
          pointHoverRadius: 8,
          pointBackgroundColor: "#ffffff",
          pointBorderColor: "rgba(211, 55, 213, 1)",
          pointBorderWidth: 2,
        },
      ],
    };
  };

  const getTooltipData = (period: TimePeriod) => {
    const tooltips = {
      today: ["25 sent", "15 Opened", "8 Replies"],
      weekly: ["180 sent", "120 Opened", "45 Replies"],
      monthly: ["640 sent", "420 Opened", "180 Replies"],
      yearly: ["3200 sent", "2200 Opened", "850 Replies"],
    };
    return tooltips[period];
  };

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext("2d");

      if (!ctx) {
        console.error("Could not get canvas context");
        return;
      }

      // Destroy existing chart if it exists
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      const data = getChartData(timePeriod);
      const tooltipData = getTooltipData(timePeriod);

      // Add animation state
      setIsAnimating(true);

      const config = {
        type: "line" as const,
        data: data,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          animation: {
            duration: 1000,
            easing: "easeOutQuart",
          },
          transitions: {
            active: {
              animation: {
                duration: 300,
                easing: "easeOutQuart",
              },
            },
          },
          interaction: {
            mode: "index" as const,
            intersect: false,
          },
          plugins: {
            legend: {
              display: false,
            },
            tooltip: {
              enabled: true,
              backgroundColor: "white",
              titleColor: "#000",
              bodyColor: "#666",
              borderColor: "#e5e7eb",
              borderWidth: 1,
              padding: 16,
              displayColors: false,
              caretSize: 0,
              bodyFont: {
                size: 12,
                weight: "400" as const,
              },
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
              callbacks: {
                title: () => "",
                label: () => "",
                afterBody: () => tooltipData,
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
              x: {
                ticks: {
                  color: "#414652",
                  padding: 10,
                  font: {
                    size: 12, // Tailwind text-sm
                    weight: "500", // Tailwind font-medium
                  },
                },
              },
            },
            y: {
              min: 0,
              max: Math.max(...data.datasets[0].data) * 1.2,
              ticks: {
                count: 5,
                color: "#70747D",
                padding: 10,
                font: {
                  size: 12, // Tailwind text-sm
                  weight: "500", 
                  
                },
              },
              grid: { display: false, drawBorder: false },
              border: { display: false },
            },
          },
        },
      };

      // Fixed chart creation
      chartInstance.current = new Chart(ctx, config as any);

      // Reset animation state after completion
      setTimeout(() => {
        setIsAnimating(false);
      }, 1000);
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [timePeriod]);

  const handleTimePeriodChange = (period: TimePeriod) => {
    setTimePeriod(period);
  };

  const timePeriodButtons = [
    { key: "today" as TimePeriod, label: "Today" },
    { key: "weekly" as TimePeriod, label: "Weekly" },
    { key: "monthly" as TimePeriod, label: "Monthly" },
    { key: "yearly" as TimePeriod, label: "Yearly" },
  ];

  return (
    <div className="w-full bg-[white] border border-[#ECEDEE] px-5 pt-5 pb-[15px] rounded-lg">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-5">
        <h1 className="font-medium text-[#111827] heading-4">
          Email performance
        </h1>
        <div className="flex gap-3 rounded-lg p-1">
          {timePeriodButtons.map((button) => (
            <button
              key={button.key}
              onClick={() => handleTimePeriodChange(button.key)}
              className={`cursor-pointer font-regular heading-7 rounded transition-all duration-300 transform ${
                timePeriod === button.key
                  ? "text-[#11224E] py-[6px] px-3 bg-[#F0F0F0] rounded-full scale-105 shadow-sm"
                  : "text-[#A0A3A9]  hover:scale-105"
              } ${isAnimating ? "transition-none" : ""}`}
            >
              {button.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-5 mb-5 heading-7 font-normal">
        <span className="text-[#11224E] border-l border-[#11224E] pl-2 rounded-xs leading-4 transition-all duration-300 hover:pl-3">
          Open
        </span>
        <span className="text-[#11224E] border-l border-[#0CD767] pl-2 rounded-xs leading-4 transition-all duration-300 hover:pl-3">
          Clicks
        </span>
        <span className="text-[#11224E] border-l border-[#F87B1B] pl-2 rounded-xs leading-4 transition-all duration-300 hover:pl-3">
          Replies
        </span>
      </div>

      <div
        className={`w-full h-38 transition-opacity duration-500 ${
          isAnimating ? "opacity-80" : "opacity-100"
        }`}
      >
        <canvas ref={chartRef}></canvas>
      </div>
    </div>
  );
};

export default CampaignPerformance;
