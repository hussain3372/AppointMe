// "use client";

// import React, { useEffect, useRef } from "react";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   BarController,
//   Title,
//   Tooltip,
//   Legend,
//   ChartOptions,
// } from "chart.js";

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   BarController,
//   Title,
//   Tooltip,
//   Legend
// );

// interface UserGrowthChartProps {
//   className?: string;
// }

// const RevenueGraph: React.FC<UserGrowthChartProps> = ({
//   className = "",
// }) => {
//   const chartRef = useRef<HTMLCanvasElement>(null);
//   const chartInstance = useRef<ChartJS | null>(null);

//   useEffect(() => {
//     if (!chartRef.current) return;

//     const ctx = chartRef.current.getContext("2d");
//     if (!ctx) return;

//     // Destroy existing chart instance
//     if (chartInstance.current) {
//       chartInstance.current.destroy();
//     }

//     // Sample data - adjust these values to match your actual data
//     const activeUsersData = [8, 15, 30, 12, 10, 25, 28];
//     const totalUsersData = [50, 65, 75, 55, 50, 60, 70];

//     // Determine bar thickness based on screen size
//     const isSmallScreen = window.innerWidth < 768; // md breakpoint
//     const barThickness = isSmallScreen ? 20 : 40;

//     const data = {
//       labels: ["Mon", "Tue", "Wed", "Thurs", "Fri", "Sat", "Sun"],
//       datasets: [
//         {
//           label: "Enterprise",
//           data: activeUsersData,
//           backgroundColor: "#6366f1",
//           borderRadius: 6,
//           barThickness: barThickness,
          
//         },
//         {
//           label: "Total Users",
//           data: totalUsersData,
//           backgroundColor: "#5666F13D",
//           borderRadius: 6,
//           barThickness: barThickness,
//         },
//       ],
//     };

//     const options: ChartOptions<"bar"> = {
//       responsive: true,
//       maintainAspectRatio: false,
//       plugins: {
//         legend:{
//           display : false
//         },
//         tooltip: {
//           enabled: true,
//           backgroundColor: "#1f2937",
//           padding: 12,
//           cornerRadius: 8,
//           titleFont: {
//             size: 13,
//             weight: 600,
//           },
//           bodyFont: {
//             size: 12,
//           },
//         },
//       },
//       scales: {
//         x: {
//           stacked: true,
//           grid: { display: false },
          
//           border: { display: false },
//           ticks: {
//             font: {
//               size: 12,
//               family: "'Inter', sans-serif",
//             },
//             color: "#6b7280",
//           },
//         },
//         y: {
//           stacked: true,
//           beginAtZero: true,
//           ticks: {
//             stepSize: 25,
//             callback: function (value) {
//               return value + "M";
//             },
//             font: {
//               size: 12,
//               family: "'Inter', sans-serif",
//             },
//             color: "#6b7280",
//           },
//           grid: {
//             color: "#f3f4f6",
//             // drawBorder: false,
//             display:false,
//           },
//           border: {
//             display: false,
//           },
//         },
//       },
//     };

//     chartInstance.current = new ChartJS(ctx, {
//       type: "bar",
//       data: data,
//       options: options,
//     });

//     return () => {
//       if (chartInstance.current) {
//         chartInstance.current.destroy();
//       }
//     };
//   }, []);

//   return (
//     <div className={`w-full bg-white rounded-lg shadow-sm p-6 ${className}`}>
//       <div className="flex flex-col sm:flex-row justify-between items-center mb-5">
//         <h2 className="body-1 font-medium text-[#111827]">
//           Revenue by subscription plan
//         </h2>

//         <div className="flex gap-2">
//           <button className="flex items-end gap-2 rounded-[100px] px-3 py-1.5 text-[12px] font-normal transition-colors hover:bg-[#F0F0F0] hover:text-[#11224E]">
//             Today
//           </button>
//           <button className="flex items-end gap-2 rounded-[100px] px-3 py-1.5 text-[12px] font-normal transition-colors hover:bg-[#F0F0F0] hover:text-[#11224E]">
//             Weekly
//           </button>
//           <button className="flex items-end gap-2 rounded-[100px] px-3 py-1.5 text-[12px] font-normal transition-colors hover:bg-[#F0F0F0] hover:text-[#11224E]">
//             Monthly
//           </button>
//           <button className="flex items-end gap-2 rounded-[100px] px-3 py-1.5 text-[12px] font-normal transition-colors hover:bg-[#F0F0F0] hover:text-[#11224E]">
//             Yearly
//           </button>
//         </div>
//       </div>
//       <div className="flex gap-5 items-center mb-5">
//         <div className="flex gap-[10px] items-center">
//         <div className="h-2 w-2 bg-[#5666F1]  rounded-full"></div>
//         <p className="heading-7 font-medium text-[#111827]">Enterprise</p>
//         </div>

//         <div className="flex gap-[10px] items-center">
//         <div className="h-2 w-2 bg-[#5666F129]  rounded-full"></div>
//         <p className="heading-7 font-medium text-[#111827]">Total Users</p>
//         </div>
//       </div>

//       <div className="h-55">
//         <canvas ref={chartRef}></canvas>
//       </div>
//     </div>
//   );
// };

// export default RevenueGraph;


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
    const isSmallScreen = window.innerWidth < 968; // md breakpoint
    const barThickness = isSmallScreen ? 25 : 60;
    const gapSize = 4; // 4px gap between sections

    const data = {
      labels: ["Mon", "Tue", "Wed", "Thurs", "Fri", "Sat", "Sun"],
      datasets: [
        {
          label: "Enterprise",
          data: activeUsersData,
          backgroundColor: "#5666F17A",
          borderRadius: 0,
          barThickness: barThickness,
          stack: 'stack0',
        },
        {
          label: "Total Users",
          data: totalUsersData,
          backgroundColor: "#5666F129",
          borderRadius: 0,
          barThickness: barThickness,
          stack: 'stack0',
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
              return value;
            },
            font: {
              size: 12,
              family: "'Inter', sans-serif",
            },
            color: "#6b7280",
          },
          grid: {
            color: "#f3f4f6",
            display:false,
          },
          border: {
            display: false,
          },
        },
      },
    };

    // Custom plugin to add gap between all three sections
   // Custom plugin to add 4px gap between all three sections
const gapPlugin = {
  id: 'gapPlugin',
  beforeDatasetsDraw(chart: any) {
    const { ctx } = chart;
    const meta0 = chart.getDatasetMeta(0); // Bottom (dark blue)
    const meta1 = chart.getDatasetMeta(1); // Top (light blue)
    
    meta0.data.forEach((bar: any, index: number) => {
      const bar1 = meta1.data[index];
      
      const x = bar.x;
      const width = bar.width;
      const radius = 8;
      const gap = 4; // 4px gap
      
      // Get original positions
      const bottomBottom = bar.base;
      const bottomTop = bar.y;
      const topBottom = bar1.base;
      const topTop = bar1.y;
      
      // Split top section height into two equal parts
      const topHeight = topBottom - topTop;
      const partHeight = (topHeight - gap) / 2; // Subtract one gap for the space between the two top parts
      
      // Calculate positions with 4px gaps
      const section1Bottom = bottomBottom; // Bottom section bottom
      const section1Top = bottomTop + gap / 2; // 4px gap from bottom
      
      const section2Bottom = topBottom - gap / 2; // 4px gap from bottom section
      const section2Top = section2Bottom - partHeight; // First part of top section
      
      const section3Bottom = section2Top - gap; // 4px gap from middle section
      const section3Top = section3Bottom - partHeight; // Second part of top section
      
      // Draw bottom section (dark blue)
      ctx.fillStyle = "#5666F199";
      drawRoundedRect(ctx, x, width, section1Top, section1Bottom, radius);
      
      // Draw middle section (medium blue)
      ctx.fillStyle = "#5666F13D";
      drawRoundedRect(ctx, x, width, section2Top, section2Bottom, radius);
      
      // Draw top section (light blue)
      ctx.fillStyle = "#5666F114";
      drawRoundedRect(ctx, x, width, section3Top, section3Bottom, radius);
    });
    
    return false;
  }
};

// Helper function to draw rounded rectangles
function drawRoundedRect(ctx: any, x: number, width: number, top: number, bottom: number, radius: number) {
  const barWidth = width;
  const left = x - barWidth / 2;
  const right = x + barWidth / 2;
  const height = bottom - top;
  
  ctx.beginPath();
  ctx.moveTo(left + radius, top);
  ctx.lineTo(right - radius, top);
  ctx.arcTo(right, top, right, top + radius, radius);
  ctx.lineTo(right, bottom - radius);
  ctx.arcTo(right, bottom, right - radius, bottom, radius);
  ctx.lineTo(left + radius, bottom);
  ctx.arcTo(left, bottom, left, bottom - radius, radius);
  ctx.lineTo(left, top + radius);
  ctx.arcTo(left, top, left + radius, top, radius);
  ctx.fill();
}

    chartInstance.current = new ChartJS(ctx, {
      type: "bar",
      data: data,
      options: options,
      plugins: [gapPlugin],
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, []);

  return (
    <div className={`w-full bg-white rounded-lg shadow-sm ${className}`}>
      {/* Split top section into two parts with different backgrounds */}
      <div className=" p-5">
        <div className="flex flex-col sm:flex-row justify-between items-center">
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
      </div>

      <div className="bg-white p-5">
        <div className="flex gap-5 items-center mb-5">
          <div className="flex gap-[10px] items-center">
            <div className="h-2 w-2 bg-[#5666F199] rounded-full"></div>
            <p className="heading-7 font-medium text-[#111827]">Enterprise</p>
          </div>

          <div className="flex gap-[10px] items-center">
            <div className="h-2 w-2 bg-[#5666F140] rounded-full"></div>
            <p className="heading-7 font-medium text-[#111827]">Total Users</p>
          </div>

         
        </div>

        <div className="h-55">
          <canvas ref={chartRef}></canvas>
        </div>
      </div>
    </div>
  );
};

export default RevenueGraph;