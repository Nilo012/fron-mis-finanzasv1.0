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
import { Plus, TriangleAlert } from "lucide-react";
import AddIncomeForm from "../components/AddIncomeForm";
import DeleteAlert from "../components/DeleteAlert";
import IncomeOverview from "../components/IncomeOverview";
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
  const fetchIncomeCategories = async () => {
    try {
      const response = await axiosConfig.get(
        API_ENDPOINTS.CATEGORY_BY_TYPE("ingreso"),
      );
      if (response.status === 200) {
        console.log("ingresos por categoria", response.data);
        setCategories(response.data);
      }
    } catch (error) {
      console.log("No se pudo obtener la categoría de los ingresos", error);
      toast.error(
        error.response?.data?.message ||
          "No se pudo obtener la categoría de los ingresos",
      );
    }
  };

  //grabar detalle de ingreso
  const handleAddIncome = async (income) => {
    const { name, amount, date, icon, categoryId } = income;
    //validar
    if (!name.trim()) {
      toast.error("Ingresa el nombre");
      return;
    }
    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      toast.error("Ingresa numero mayores a 0");
      return;
    }
    if (!date) {
      toast.error("Seleccione una fecha");
      return;
    }
    const today = new Date().toISOString().split("T")[0];
    if (date > today) {
      toast.error("No puedes registrar una fecha futura");
      return;
    }
    if (!categoryId) {
      toast.error("Selecciona una Categoría");
      return;
    }
    try {
      const response = await axiosConfig.post(API_ENDPOINTS.ADD_INCOME, {
        name,
        amount: Number(amount),
        date,
        icon,
        categoryId,
      });
      if (response.status === 201) {
        setOpenAddIncomeModal(false);
        toast.success("Ingreso agregado");
        fetchIncomeDetail();
        fetchIncomeCategories();
      }
    } catch (error) {
      console.log("Error no se pudo ingresar dato");
      toast.error(
        error.response?.data?.message || "Error no se pudo ingresar dato",
      );
    }
  };

  // elimnar detalle de ingreso
  const deleteIncome = async (id) => {
    try {
      await axiosConfig.delete(API_ENDPOINTS.DELETE_INCOME(id));
      setOpenDeleteAlert({ show: false, data: null });
      toast.success("Ingreso eliminado con exito");
      fetchIncomeDetail();
    } catch (error) {
      console.log("Error al elimminar ingreso", error);
      toast.error(error.response?.data?.message || "failedddd");
    }
  };

  useEffect(() => {
    fetchIncomeDetail();
    //
    fetchIncomeCategories();
  }, []);
  return (
    <div>
      <Dashboard activeMenu="Ingresos">
        <div className="my-5 mx-auto">
          <div className="grid grid-cols-1 gap-6">

            <div className="">
              {/* Resumen de ingresos con gráfico de línea (line char) */}
              
              <IncomeOverview transactions={incomeData} onAddIncome={()=> setOpenAddIncomeModal(true)}/>
            </div>

            <IncomeList
              transactions={incomeData}
              // onDelete={(id) => console.log("eliminando ingreso", id)}
              onDelete={(id) => setOpenDeleteAlert({ show: true, data: id })}
            />
            {/* agrgar modal ingresos */}
            <Modal
              isOpen={OpenAddIncomeModal}
              onClose={() => setOpenAddIncomeModal(false)}
              title="Agregar Ingreso"
            >
              {/* income form modal */}
              <AddIncomeForm
                onAddIncome={(income) => handleAddIncome(income)}
                categories={categories}
              />
            </Modal>

            {/* delete form modal */}
            <Modal
              isOpen={openDeleteAlert.show}
              onClose={() => setOpenDeleteAlert({ show: false, data: null })}
              title="Eliminar Ingreso"
            >
              <div className="flex items-start gap-4">
                {/* Icono con fondo suave */}
                <div className="`flex-shrink-0` p-3 bg-red-100 rounded-full">
                  <TriangleAlert className="w-6 h-6 text-red-600" />
                </div>

                {/* Contenido */}
                <div className="flex-1 pt-1">
                  <DeleteAlert
                    content="Esta acción es irreversible. ¿Estás seguro que deseas eliminar este ingreso de forma permanente?"
                    onDelete={() => deleteIncome(openDeleteAlert.data)}
                  />
                </div>
              </div>
            </Modal>
          </div>
        </div>
      </Dashboard>
    </div>
  );
};
export default Income;
