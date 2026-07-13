import Dashboard from "../components/Dashboard";
import useUser from "../hooks/useUser"
const Expense=()=>{
    useUser();
    return(
        <div>
            <Dashboard activeMenu="Gastos">
                expense
            </Dashboard>
            
        </div>
    )
}
export default Expense;