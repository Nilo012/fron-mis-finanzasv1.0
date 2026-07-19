

import { addThousandsSeparator } from "../util/utils";
import CustomPieChart from "./CustomPieChart";

const FinanceOverview=({totalBalance, totalIncome, totalExpense})=>{
    const COLORS=["#3730a3","#E11D48","#16A34A"]

    const balanceData=[
        {name:"Balance Total", amount:totalBalance},
        {name:"Gasto Total", amount:totalExpense},
        {name:"Ingreso Total", amount:totalIncome},
    ]

    return(
        <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
            <div className="flex items-center justify-between">
                <h5 className="text-lg">Resumen de tus Finanzas</h5>
            </div>
            <CustomPieChart
            data={balanceData}
            label="Balance Total"
            totalAamount={`S/${addThousandsSeparator(totalBalance)}`}
            colors={COLORS}
            showTextAnchor
            />
        </div>
    )
}
export default FinanceOverview;