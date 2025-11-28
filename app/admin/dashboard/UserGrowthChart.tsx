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
//           label: "Total Subscriptions",
//           data: totalUsersData,
//           backgroundColor: "#5666F129",
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
//     <div className={`  overflow-hidden w-full bg-white rounded-lg shadow-sm p-6 ${className}`}>
//       <div className="flex flex-col sm:flex-row justify-between items-center mb-5">
//         <h2 className="body-1 font-medium text-[#111827]">
//          User growth overview
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
//         <p className="heading-7 font-medium text-[#111827]">Active Users</p>
//         </div>

//         <div className="flex gap-[10px] items-center">
//         <div className="h-2 w-2 bg-[#5666F129]  rounded-full"></div>
//         <p className="heading-7 font-medium text-[#111827]">Total Users</p>
//         </div>
//       </div>
//       <div className="h-77">
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

   

    activeUsersData.forEach((value)=>{
      if (value > 999) {
        return value + "k"
      }
    })

    // Determine bar thickness based on screen size
    const isSmallScreen = window.innerWidth < 968; // md breakpoint
    const barThickness = isSmallScreen ? 25 : 68;
    const gapSize = 4; // 8px gap between sections

    const data = {
      labels: ["Mon", "Tue", "Wed", "Thurs", "Fri", "Sat", "Sun"],
      datasets: [
        {
          label: "Active Users",
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

    

    // Custom plugin to add gap between stacked bars
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
          
          // Bottom bar (dark blue) positions
          const bottomBarBottom = bar.base;
          const bottomBarTop = bar.y;
          const bottomBarHeight = bottomBarBottom - bottomBarTop;
          const newBottomBarTop = bottomBarTop + gapSize / 2;
          
          // Top bar (light blue) positions  
          const topBarTop = bar1.y;
          const topBarBottom = bar1.base;
          const topBarHeight = topBarBottom - topBarTop;
          const newTopBarBottom = topBarBottom - gapSize / 2;
          
          // Draw bottom section (dark blue) with gap
          ctx.fillStyle = "#5666F17A";
          ctx.beginPath();
          ctx.moveTo(x - width / 2 + radius, newBottomBarTop);
          ctx.lineTo(x + width / 2 - radius, newBottomBarTop);
          ctx.arcTo(x + width / 2, newBottomBarTop, x + width / 2, newBottomBarTop + radius, radius);
          ctx.lineTo(x + width / 2, bottomBarBottom - radius);
          ctx.arcTo(x + width / 2, bottomBarBottom, x + width / 2 - radius, bottomBarBottom, radius);
          ctx.lineTo(x - width / 2 + radius, bottomBarBottom);
          ctx.arcTo(x - width / 2, bottomBarBottom, x - width / 2, bottomBarBottom - radius, radius);
          ctx.lineTo(x - width / 2, newBottomBarTop + radius);
          ctx.arcTo(x - width / 2, newBottomBarTop, x - width / 2 + radius, newBottomBarTop, radius);
          ctx.fill();
          
          // Draw top section (light blue) with gap
          ctx.fillStyle = "#5666F129";
          ctx.beginPath();
          ctx.moveTo(x - width / 2 + radius, topBarTop);
          ctx.lineTo(x + width / 2 - radius, topBarTop);
          ctx.arcTo(x + width / 2, topBarTop, x + width / 2, topBarTop + radius, radius);
          ctx.lineTo(x + width / 2, newTopBarBottom - radius);
          ctx.arcTo(x + width / 2, newTopBarBottom, x + width / 2 - radius, newTopBarBottom, radius);
          ctx.lineTo(x - width / 2 + radius, newTopBarBottom);
          ctx.arcTo(x - width / 2, newTopBarBottom, x - width / 2, newTopBarBottom - radius, radius);
          ctx.lineTo(x - width / 2, topBarTop + radius);
          ctx.arcTo(x - width / 2, topBarTop, x - width / 2 + radius, topBarTop, radius);
          ctx.fill();
        });
        
        return false; // Prevent default bar rendering
      }
    };

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
    <div className={`  overflow-hidden w-full bg-white rounded-lg shadow-sm p-6 ${className}`}>
      <div className="flex flex-col sm:flex-row justify-between items-center mb-5">
        <h2 className="body-1 font-medium text-[#111827]">
         User growth overview
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
        <div className="h-2 w-2 bg-[#aeb6f8]  rounded-full"></div>
        <p className="heading-7 font-medium text-[#111827]">Active Users</p>
        </div>

        <div className="flex gap-[10px] items-center">
        <div className="h-2 w-2 bg-[#5666F129]  rounded-full"></div>
        <p className="heading-7 font-medium text-[#111827]">Total Users</p>
        </div>
      </div>
      <div className="h-77">
        <canvas ref={chartRef}></canvas>
      </div>
    </div>
  );
};

export default RevenueGraph;