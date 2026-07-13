import { Plus } from "lucide-react";
import Dashboard from "../components/Dashboard";
import useUser from "../hooks/useUser";
import CategoryList from "../components/CategoryList";
import { useState } from "react";
import axiosConfig from "../util/axiosConfig";
import { API_ENDPOINTS } from "../util/apiEndpoints";
import toast from "react-hot-toast";
import { useEffect } from "react";
import Modal from "../components/Modal";
import AddCategoryForm from "../components/AddCategoryForm";

const Category = () => {
  useUser();

  const [loading, setLoading] = useState(false);
  const [categoryData, setCategoryData] = useState([]);
  const [openAddCategoryModal, setOpenAddCategoryModal] = useState(false);
  const [openEditCategoryModal, setOpenEditCategoryModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const fetchCantegoryDetails = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await axiosConfig.get(API_ENDPOINTS.GET_ALL_CATEGORIES);
      if (response.status === 200) {
        setCategoryData(response.data);
        console.log("categories", response.data);
      }
    } catch (error) {
      console.error("Por favor intente otra vez.", error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCantegoryDetails();
  }, []);

  const handleAddCategory = async (category) => {
    //console.log('Categoría Agregada', category)
    const { name, type, icon } = category;
    if (!name.trim()) {
      toast.error("ingresa el Nombre de Categoría");
      return;
    }
    //VERIFICAR SI LA CATEGORIA YA EXISTE
    const isDuplicate = categoryData.some((category) => {
      return category.name.toLowerCase() === name.trim().toLowerCase();
    });
    if (isDuplicate) {
      toast.error("Nombre de Categoría ya existe");
      return;
    }

    try {
      const response = await axiosConfig.post(API_ENDPOINTS.ADD_CATEGORY, {
        name,
        type,
        icon,
      });
      if (response.status === 201) {
        toast.success("Categoría Agregada");
        setOpenAddCategoryModal(false);
        fetchCantegoryDetails();
      }
    } catch (error) {
      console.error("Error al agregar categoría", error);
      isDuplicate();
    }
  };

  //editar categoria
  const handleEditCategory = (categoryToEdit) => {
    //console.log("Editando categoria", categoryToEdit);
    setSelectedCategory(categoryToEdit)
    setOpenEditCategoryModal(true)
  };

  const handleUpdateCategory =async(updateCategory)=>{
    //console.log("Actualizando categoría",updateCategory);
    const {id,name,type,icon}=updateCategory;
    if (!name.trim()) {
      toast.error("Registra el nombre de categoría")
      return;
    }
    if (!id) {
      toast.error("id el nombre de categoría")
      return;
    }
    try {
      await axiosConfig.put(API_ENDPOINTS.UPDATE_CATEGORY(id),{name,type,icon})
      setOpenEditCategoryModal(false)
      setSelectedCategory(null)
      toast.success("Se actualizo la categoría con éxito")
      fetchCantegoryDetails()
    } catch (error) {
      console.log("Error ala actualizar categoría.", error.response?.data?.message || error.message)
     toast.error( error.response?.data?.message || "No se pudo actualizar")
    }
  }

  return (
    <div>
      <Dashboard activeMenu="Categoria">
        <div className="my-5 mx-auto">
          {/* botoon para agregar categoria-- add-btn flex items-center gap-1 */}
          <div className="flex justify-between items-center mb-5">
            <h2 className="text-2xl font-semibold">Categorias</h2>
            <button
              onClick={() => setOpenAddCategoryModal(true)}
              className="flex items-center gap-2 bg-green-100 text-green-600 px-4 py-2 rounded-lg font-medium hover:bg-green-200 transition-colors"
            >
              <Plus size={15} />
              Agregar Categoría
            </button>
          </div>

          {/* listar categoria */}
          <CategoryList
            categories={categoryData}
            onEditCategory={handleEditCategory}
          />

          {/*agregar modal categoria */}
          <Modal
            isOpen={openAddCategoryModal}
            onClose={() => setOpenAddCategoryModal(false)}
            title="Agregar Categoría"
          >
            {/* form modal */}
            <AddCategoryForm onAddCategory={handleAddCategory} />
          </Modal>


          {/* Atualizar modal categoria */}
          <Modal
          onClose={()=>{
            setOpenEditCategoryModal(false)
            setSelectedCategory(null)
          }}
          isOpen={openEditCategoryModal}
          title={"Actualizar Categoría"}
          >
            <AddCategoryForm 
            initialCategoryData={selectedCategory}
            onAddCategory={handleUpdateCategory}
            isEditing={true}
            />
          </Modal>
        </div>
      </Dashboard>
    </div>
  );
};
export default Category;
