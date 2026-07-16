import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { addThousandsSeparator } from "../util/utils";

// 1. Componente del Tooltip con el estilo que buscabas
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;

    return (
      <div className="bg-white p-4 border border-gray-100 rounded-xl shadow-lg">
        <p className="text-sm font-bold text-gray-800 mb-2">{data.month}</p>

        <div className="border-t border-gray-100 pt-2 mb-2">
          <p className="text-xs text-gray-500">Total:</p>
          {/* Usamos la misma función que en tu lista */}
          <p className="text-md font-bold text-green-500">
            +S/ {addThousandsSeparator(data.totalAmount)}
          </p>
        </div>

        <div className="border-t border-gray-100 pt-2">
          <p className="text-[10px] uppercase text-gray-400 font-bold mb-1">
            Details:
          </p>
          {data.items.map((item, index) => (
            <div key={index} className="flex justify-between gap-6">
              <span className="text-xs text-gray-600">
                {item.categoryName || "Sin categoría"}:
              </span>
              {/* Usamos la misma función aquí también */}
              <span className="text-xs font-bold text-gray-800">
                +S/ {addThousandsSeparator(item.amount)}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return null;
};

const CustomLineChart = ({ data }) => {
  return (
    <div style={{ width: "100%", height: 300 }}>
      <ResponsiveContainer>
        <AreaChart
          data={data}
          margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#4f46e5" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
            stroke="#f3f4f6"
          />
          <XAxis
            dataKey="month"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: "#9ca3af" }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: "#9ca3af" }}
          />
          {/* 2. Conectamos el Tooltip personalizado aquí */}
          <Tooltip
            content={<CustomTooltip />}
            cursor={{ stroke: "#4f46e5", strokeWidth: 1 }}
          />
          <Area
            type="monotone"
            dataKey="totalAmount"
            stroke="#4f46e5"
            strokeWidth={3}
            fillOpacity={1}
            fill="url(#colorTotal)"
            // Agregamos esto para eliminar el borde negro de selección
            style={{ outline: 'none' }}
            // Aumentamos el tamaño de los puntos para que sea más fácil tocar en móvil
            dot={{
              r: 4,
              fill: "#4f46e5",
              strokeWidth: 2,
              stroke: "#fff",
              outline: "none",
            }}
            activeDot={{ r: 6, outline: "none" }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomLineChart;
