import { ArrowRight } from "lucide-react";
import TransactionInfoCard from "./TransactionInfoCard";
import moment from "moment/moment";

const Transactions = ({ transactions, onMore, type, title }) => {


//     // --- DEBUGGING ---
//   console.log(`Debug para ${title}:`, { 
//     typeProp: type, 
//     dataLength: transactions?.length, 
//     firstItem: transactions?.[0] 
//   });
  // -----------------
  
  // Verificación de seguridad
  if (!transactions || transactions.length === 0) {
    return (
      <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
        <h5 className="text-lg">{title}</h5>
        <p className="text-gray-400 text-sm mt-4">No hay transacciones recientes.</p>
      </div>
    );
  }
  return (
    <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
      <div className="flex items-center justify-between">
        <h5 className="text-lg">{title}</h5>
        <button
          className="flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2  rounded-lg font-medium hover:bg-green-200 transition-colors"
          onClick={onMore}
        >
          Ver Más
          <ArrowRight className="text-xl" size={15} />
        </button>
      </div>
      <div className="mt-6">
        {transactions?.slice(0,5)?.map(item=>(
            
            <TransactionInfoCard
            key={item.id}
            title={item.name}
            icon={item.icon}
            date={moment(item.date).format("DD MMM YYYY")}
            amount={item.amount}
            type={type}
            hideDeleteBtn
            />
        ))}
      </div>
    </div>
  );
};
export default Transactions;
