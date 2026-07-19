import { WalletCards } from "lucide-react";
import Dashboard from "../components/Dashboard";
import InfoCard from "../components/InfoCard";
import useUser from "../hooks/useUser";
import { addThousandsSeparator } from "../util/utils";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axiosConfig from "../util/axiosConfig";
import { API_ENDPOINTS } from "../util/apiEndpoints";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { Coins } from "lucide-react";
import { Wallet } from "lucide-react";
import RecentTransactions from "../components/RecentTransactions";
import FinanceOverview from "../components/FinanceOverview";
import Transactions from "../components/Transactions";


const Home = () => {
  useUser();

  const navigate = useNavigate();
  const [dashboarData,setDashboarData]=useState(null);
  const [loading,setLoading]= useState(false)

  const fetchDashboarData = async()=>{
    if(loading) return;
    setLoading(true)
    try {
        const response = await axiosConfig.get(API_ENDPOINTS.DASHBOAARD_DATA)
        if (response.status===200) {
            setDashboarData(response.data);
        }
    } catch (error) {
        console.error('error nada mas ', error)
        toast.error('Algo salió mal, intente otra vez.')
    }finally{
        setLoading(false)
    }
  }

  useEffect(()=>{
    fetchDashboarData();
    return ()=>{

    }
  },[])


  return (
    <div>
      <Dashboard activeMenu="Dashboard">
        <div className="my-5 mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/*infoCard cards totalBalance/totalIncome/totalExpense debe coincidir con el back(dashboard) */}
            <InfoCard 
              icon={<WalletCards />}
              label="Balance Total"
              value={addThousandsSeparator(dashboarData?.totalBalance || 0)}
              color="bg-indigo-800"
            />
            <InfoCard
              icon={<Wallet />}
              label="Ingreso Total"
              value={addThousandsSeparator(dashboarData?.totalIncome || 0)}
              color="bg-green-800"
            />
            <InfoCard
              icon={<Coins />}
              label="Gasto Total"
              value={addThousandsSeparator(dashboarData?.totalExpense || 0)}
              color="bg-red-800"
            />

          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            {/* transacciones recientes */}
            <RecentTransactions
            transactions={dashboarData?.recentTransactions}
            onMore={()=>navigate("/filter")}
            />

            {/* resumen de finanzas grafico chart */}
            <FinanceOverview
            totalBalance={dashboarData?.totalBalance || 0}
            totalIncome={dashboarData?.totalIncome || 0}
            totalExpense={dashboarData?.totalExpense || 0}
            />

            {/* transacctions gastos */}
            <Transactions
            transactions={
              dashboarData?.recent5Expense || []
            }
            onMore={()=>navigate("/expense")}
            type="gasto"
            title="Gastos Recientes"
            />

            {/* transacciones ingresos */}
            <Transactions
            transactions={
              dashboarData?.recent5Income || []
            }
            onMore={()=>navigate("/income")}
            type="ingreso"
            title="Ingresos Recientes"
            />
          </div>
        </div>
      </Dashboard>
    </div>
  );
};
export default Home;
