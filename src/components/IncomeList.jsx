import { Download,Mail } from "lucide-react";
import TransactionInfoCard from "./TransactionInfoCard";
import moment from "moment/moment";

const IncomeList = ({ transactions,onDelete }) => {
  return (
    <div className="card p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
        <div className="flex items-center justify-between">
            <h5 className="text-lg font-semibold">Lista de Ingresos</h5>
            <div className="flex items-center justify-end gap-2">
                <button className="flex items-center gap-2 px-3 py-1.5 border border-gray-300 rounded-md text-sm hover:bg-gray-50">
                    <Mail size={15} className="text-indigo-500"/>Email
                </button>
                <button className="flex items-center gap-2 px-3 py-1.5 border border-gray-300 rounded-md text-sm hover:bg-gray-50">
                    <Download size={15} className="text-indigo-500"/>Descargar
                </button>
            </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2">
            {/* mostrar ingresos */}
            {transactions?.map((income)=>(
                <TransactionInfoCard
                key={income.id}
                title={income.name}
                icon={income.icon}
                date={moment(income.date).format('Do MMM YYYY')}
                amount={income.amount}
                type="ingreso"
                onDelete={()=>onDelete(income.id)}
                />
            ))}

        </div>
      
    </div>
  );
};
export default IncomeList;
