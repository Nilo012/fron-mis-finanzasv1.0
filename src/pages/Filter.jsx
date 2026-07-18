import { Search } from "lucide-react";
import Dashboard from "../components/Dashboard";
import useUser from "../hooks/useUser";
import { useState,useEffect } from "react";
import axiosConfig from "../util/axiosConfig";
import { API_ENDPOINTS } from "../util/apiEndpoints";
import TransactionInfoCard from "../components/TransactionInfoCard";
import toast from "react-hot-toast";
import moment from "moment";
import { LoaderCircle } from "lucide-react";
const Filter = () => {
  useUser();

  const [type, setType] = useState("ingreso"); //por defecto mi tipo en base de datos
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [keyword, setKeyword] = useState("");
  const [sortField, setSortField] = useState("date");
  const [sortOrder, setSortOrder] = useState("asc");
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setTransactions([]); // Limpia la lista cada vez que el 'type' cambia
  }, [type]);

  const handleSearch = async (e) => {
    e.preventDefault(); // Evita que la página se recargue al hacer clic en el botón.
    console.log(type, startDate, endDate, sortField, sortOrder, keyword);
    setLoading(true);
    try {
      const response = await axiosConfig.post(API_ENDPOINTS.APPLY_FILTERS, {
        type,
        startDate,
        endDate,
        keyword,
        sortField,
        sortOrder,
      });
      console.log("transactions:", response.data);
      setTransactions(response.data);
    } catch (error) {
      console.error("Error al obtener las transacciones:", error);
      toast.error(
        error.message || "Error al obtener las transacciones, intente otra vez",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Dashboard activeMenu="Filtrar">
        <div className="my-5 mx-auto">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">Filtrar operaciones</h2>
          </div>
          <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
            <div className="flex items-center justify-between bm-4 mb-4">
              <h5 className="text-lg font-semibold">Seleccionar el filtro</h5>
            </div>
            <form className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-6 gap-4">
              {/* tipo */}
              <div>
                <label
                  htmlFor="type"
                  className="block text-sm font-medium mb-1"
                >
                  Tipo
                </label>
                <select
                  value={type}
                  name=""
                  id="type"
                  className="w-full bg-transparent outline-none border border-gray-300 rounded-md py-2 px-3 text-gray-700 leading focus:outline-none focus:border-blue-500"
                  onChange={(e) => setType(e.target.value)}
                >
                  {/* ingreso/gastos data ingresada con estos nombres fijos */}
                  <option value="ingreso">Ingreso</option>
                  <option value="gasto">Gasto</option>
                </select>
              </div>

              {/* fecha de inicio */}
              <div>
                <label
                  htmlFor="startdate"
                  className="block text-sm font-medium mb-1"
                >
                  Fecha Inicio
                </label>
                <input
                  value={startDate}
                  type="date"
                  id="startdate"
                  className="w-full bg-transparent outline-none border border-gray-300 rounded-md py-2 px-3 text-gray-700 leading focus:outline-none focus:border-blue-500"
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>

              {/* fecha fin */}
              <div>
                <label
                  htmlFor="enddate"
                  className="block text-sm font-medium mb-1"
                >
                  Fecha Fin
                </label>
                <input
                  value={endDate}
                  type="date"
                  id="enddate"
                  className="w-full bg-transparent outline-none border border-gray-300 rounded-md py-2 px-3 text-gray-700 leading focus:outline-none focus:border-blue-500"
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>

              {/* ordenar data */}
              <div>
                <label
                  htmlFor="sortfield"
                  className="block text-sm font-medium mb-1"
                >
                  Ordenar por
                </label>
                <select
                  value={sortField}
                  name=""
                  id="sortfield"
                  className="w-full bg-transparent outline-none border border-gray-300 rounded-md py-2 px-3 text-gray-700 leading focus:outline-none focus:border-blue-500"
                  onChange={(e) => setSortField(e.target.value)}
                >
                  <option value="date">Date</option>
                  <option value="amount">Cantidad</option>
                  <option value="category">Categoría</option>
                </select>
              </div>

              {/* orden de data asc desc */}
              <div>
                <label
                  htmlFor="sortorder"
                  className="block text-sm font-medium mb-1"
                >
                  Orden
                </label>
                <select
                  value={sortOrder}
                  name=""
                  id="sortorder"
                  className="w-full bg-transparent outline-none border border-gray-300 rounded-md py-2 px-3 text-gray-700 leading focus:outline-none focus:border-blue-500"
                  onChange={(e) => setSortOrder(e.target.value)}
                >
                  <option value="asc">Ascendente</option>
                  <option value="desc">Descendente</option>
                </select>
              </div>

              {/* buscar */}
              <div className="sm:col-span-1 md:col-span-1 flex items-end">
                <div className="w-full">
                  <label
                    htmlFor="keyword"
                    className="block text-sm font-medium mb-1"
                  >
                    Buscar
                  </label>
                  <input
                    value={keyword}
                    id="keyword"
                    type="text"
                    placeholder="burcar..."
                    className="w-full bg-transparent outline-none border border-gray-300 rounded-md py-2 px-3 text-gray-700 leading focus:outline-none focus:border-blue-500"
                    onChange={(e) => setKeyword(e.target.value)}
                  />
                </div>
                <button
                  type="button"
                  onClick={handleSearch}
                  className="ml-2 mb-1 p-2 bg-indigo-700 hover:bg-indigo-900 text-white rounded flex items-center justify-center cursor-pointer"
                >
                  {loading ? (
                    <LoaderCircle className="animate-spin" size={20} />
                  ) : (
                    <Search size={20} />
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* resultados de filtros */}
          <div className="p-4 mt-4 bg-white border border-gray-200 rounded-lg shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h5 className="text-lg font-semibold">Resultados</h5>
            </div>
            {transactions.length === 0 && !loading ? (
              <p className="text-2xs text-gray-400 mt-1">
                Selecciona los criterios y haz clic en buscar para ver tus
                operaciones.
              </p>
            ) : (
              ""
            )}
            {transactions.map((transaction) => (
              <TransactionInfoCard
                key={transaction.id}
                title={transaction.name}
                icon={transaction.icon}
                date={moment(transaction.date).format("DD MMM YYYY")}
                amount={transaction.amount}
                type={type}
                hideDeleteBtn
              />
            ))}
          </div>
        </div>
      </Dashboard>
    </div>
  );
};
export default Filter;
