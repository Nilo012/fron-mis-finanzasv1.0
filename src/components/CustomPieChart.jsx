import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const CustomPieChart = ({ data, totalAamount, colors }) => {
  return (
    <div className="flex flex-col items-center w-full">
      {/* Contenedor del gráfico */}
      <div className="h-50 w-full relative flex items-center justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              innerRadius={60}
              outerRadius={80}
              paddingAngle={1}
              dataKey="amount"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
        {/* Texto central */}
        <div className="absolute flex flex-col items-center pointer-events-none">
          <span className="text-[10px] text-gray-400">Total</span>
          <span className="text-sm font-bold text-gray-800">{totalAamount}</span>
        </div>
      </div>

      {/* LEYENDA INTEGRADA */}
      <div className="flex flex-wrap justify-center gap-4 mt-2">
        {data.map((item, index) => (
          <div key={item.name} className="flex items-center gap-1.5">
            <span 
              className="w-2.5 h-2.5 rounded-full" 
              style={{ backgroundColor: colors[index % colors.length] }} 
            />
            <span className="text-xs text-gray-600 font-medium">
              {item.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomPieChart;