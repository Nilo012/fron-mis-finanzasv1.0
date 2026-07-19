import { ArrowRight } from "lucide-react";
import TransactionInfoCard from "../components/TransactionInfoCard";
import moment from "moment/moment";

const RecentTransactions = ({ transactions, onMore }) => {
  return (
    <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
      <div className="flex items-center justify-between">
        <h4 className="text-lg">Transacciones Recientes</h4>

        <button
          className="flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2  rounded-lg font-medium hover:bg-green-200 transition-colors"
          onClick={onMore}
        >
          Ver Más
          <ArrowRight className="text-xl" size={15} />
        </button>
      </div>

      <div className="mt-6">
        {transactions?.slice(0, 5)?.map((item) => {
          console.log("Transacción:", item.name, "Tipo:", item.type); // <--- AÑADE ESTO
          return (
            <TransactionInfoCard
              key={item.id}
              title={item.name}
              icon={item.icon}
              date={moment(item.date).format("DD MMM YYYY")}
              amount={item.amount}
              type={item.type} // ¿Es este 'item.type' realmente "ingreso" o "gasto"?
              hideDeleteBtn
            />
          );
        })}
      </div>
    </div>
  );
};
export default RecentTransactions;
