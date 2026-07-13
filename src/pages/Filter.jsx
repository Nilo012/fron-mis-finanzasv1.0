import Dashboard from "../components/Dashboard";
import useUser from "../hooks/useUser"
const Filter=()=>{
    useUser();
    return(
        <div>
            <Dashboard activeMenu="Filtrar">
                filter
            </Dashboard>
            
        </div>
    )
}
export default Filter;