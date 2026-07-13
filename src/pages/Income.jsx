import Dashboard from "../components/Dashboard";
import useUser from "../hooks/useUser"
const Income =()=>{
    useUser();
    return (
        <div>
            <Dashboard activeMenu="Ingresos">
                income
            </Dashboard>
            
        </div>
    )
}
export default Income;