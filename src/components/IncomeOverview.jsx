import { useEffect } from "react";
import { useState } from "react";
import { prepareIncomeLineChartData } from "../util/utils";
import CustomLineChart from "../components/CustomLineChart";
import { Plus } from "lucide-react";

const IncomeOverview = ({ transactions, onAddIncome }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const result = prepareIncomeLineChartData(transactions);
    console.log(result);
    setChartData(result);

    return () => {};
  }, [transactions]);

  return (
    <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-ms">Resumen de Ingresos</h4>
          <p className="text-xs text-gray-400 mt-1">
            Resumen de ganancias a lo largo del tiempo y analiza las tendencias
            de tus ingresos.
          </p>
        </div>

        <button
          onClick={onAddIncome}
          className="flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2  rounded-lg font-medium hover:bg-green-200 transition-colors"
        >
          <Plus size={15} className="text-lg" />
          Agregar Ingreso
        </button>
      </div>
      <div className="mt-10">
        {/* crar grafico con line char */}
        <CustomLineChart data={chartData} />
      </div>
    </div>
  );
};
export default IncomeOverview;
