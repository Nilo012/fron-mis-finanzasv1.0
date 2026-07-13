import toast from "react-hot-toast";
import Dashboard from "../components/Dashboard";
import useUser from "../hooks/useUser";
import { API_ENDPOINTS } from "../util/apiEndpoints";
import axiosConfig from "../util/axiosConfig";
import { data } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import IncomeList from "../components/IncomeList";
import Modal from "../components/Modal";
import { Plus } from "lucide-react";
import AddIncomeForm from "../components/AddIncomeForm";
const Income = () => {
  useUser();

  const [incomeData, setIncomeData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const [OpenAddIncomeModal, setOpenAddIncomeModal] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  });

  //obtener detalle de ingresos de api
  const fetchIncomeDetail = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await axiosConfig.get(API_ENDPOINTS.GET_ALL_INCOMES);
      if (response.status === 200) {
        //console.log("lista de ingreso", response.data);
        setIncomeData(response.data);
      }
    } catch (error) {
      console.error("No se encontro detalles de ingreso", error);
      toast.error(
        error.response?.data?.message ||
          "No no se encontro detalles de ingreso",
      );
    } finally {
      setLoading(false);
    }
  };

  //   obtener categoria de ingresos
  const fetchIncomeCategories =async ()=>{
    try {
        const response = await axiosConfig.get(API_ENDPOINTS.CATEGORY_BY_TYPE("ingreso"));
        if (response.status=== 200) {
            console.log('ingresos por categoria',response.data)
            setCategories(response.data)
        }
    } catch (error) {
        console.log('No se pudo obtener la categoría de los ingresos', error)
        toast.error(error.response?.data?.message || "No se pudo obtener la categoría de los ingresos")
        
    }
  }

  //grabar detalle de ingreso
  const handleAddIncome = async (income)=>{
    const {name,amount,date,icon,categoryId}= income;
    //validar
    if (!name.trim()) {
        toast.error("Ingresa el nombre")
        return
    }
    if (!amount || isNaN(amount) || Number(amount)<=0) {
        toast.error("Ingresa numero mayores a 0")
        return
        
    }
    if (!date) {
        toast.error("Seleccione una fecha")
        return
    }
    const today = new Date().toISOString().split('T')[0];
        if (date > today) {
            toast.error("No puedes registrar una fecha futura")
            return
        }
        if (!categoryId) {
            toast.error("Selecciona una Categoría")
            return
        }
        try {
            const response = await axiosConfig.post(API_ENDPOINTS.ADD_INCOME,{
                name,
                amount: Number(amount),
                date,
                icon,
                categoryId,
            })
            if (response.status===201) {
                setOpenAddIncomeModal(false)
                toast.success("Ingreso agregado")
                fetchIncomeDetail()
                fetchIncomeCategories()
            }
        } catch (error) {
            console.log("Error no se pudo ingresar dato")
            toast.error(error.response?.data?.message || "Error no se pudo ingresar dato")
            
        }
  }


  useEffect(() => {
    fetchIncomeDetail();
    //
    fetchIncomeCategories()
  }, []);
  return (
    <div>
      <Dashboard activeMenu="Ingresos">
        <div className="my-5 mx-auto">
          <div className="grid grid-cols-1 gap-6">
            <div className="">
              {/* descripcion para ingresos */}
              <button
                onClick={() => setOpenAddIncomeModal(true)}
                className="flex items-center gap-2 bg-green-100 text-green-600 px-4 py-2 rounded-lg font-medium hover:bg-green-200 transition-colors"
              >
                <Plus size={15} className="text-lg" />
                Agregar Ingreso
              </button>
            </div>

            <IncomeList
              transactions={incomeData}
              onDelete={(id) => console.log("eliminando ingreso", id)}
            />
            {/* agrgar modal ingresos */}
            <Modal
              isOpen={OpenAddIncomeModal}
              onClose={() => setOpenAddIncomeModal(false)}
              title="Agregar Ingreso"
            >
              {/* income form modal */}
              <AddIncomeForm
              onAddIncome={(income)=>handleAddIncome(income)}
              categories ={categories}
             />
            </Modal>
          </div>
        </div>
      </Dashboard>
    </div>
  );
};
export default Income;
