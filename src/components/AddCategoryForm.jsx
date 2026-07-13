import { useState } from "react";
import Input from "../components/Input";
import EmojiPickerP from "./EmojiPickerP";
import { LoaderCircle } from "lucide-react";
import { useEffect } from "react";

const AddCategoryForm = ({ onAddCategory,initialCategoryData,isEditing }) => {
  const [category, setCategory] = useState({
    name: "",
    type: "ingreso",
    icon: "",
  });
  const [loading, setLoading] = useState(false);

  //editando categoria
  useEffect(()=>{
    if (isEditing && initialCategoryData) {
        setCategory(initialCategoryData)
    }else{
        setCategory({name: "",type: "ingreso", icon:""})
    }

  },[isEditing,initialCategoryData])



  const categoryTypeOptions = [
    { value: "ingreso", label: "Ingreso" },
    { value: "gasto", label: "Gasto" },
  ];
  const handleChange = (key, value) => {
    setCategory({ ...category, [key]: value });
  };

  const handleSubmit = async () => {
    //console.log('button cliked')
    setLoading(true);
    try {
      await onAddCategory(category);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="p-4">
      {/* emoji picker */}
      <EmojiPickerP
        icon={category.icon}
        onSelect={(selectedIcon) => handleChange("icon", selectedIcon)}
      />
      <Input
        value={category.name}
        onChange={({ target }) => handleChange("name", target.value)}
        label="Nombre de Categoría"
        placeholder="Ej.: Salario, Transporte, Otros"
        type="text"
      />
      <Input
        label="Tipo de Categoría"
        value={category.type}
        onChange={({ target }) => handleChange("type", target.value)}
        isSelect={true}
        options={categoryTypeOptions}
      />
      {/* categoria agregada */}
      <div className="flex justify-end mt-6">
        <button
          type="button"
          onClick={handleSubmit}
          disabled={loading}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          {loading ? (
            <>
              <LoaderCircle className="w-4 h-4 animate-spin" />
              {isEditing ? "Actualizando...": "Agregando..."}
            </>
          ) : (
            <>{isEditing ? "Actualizar Categoría": "Agregar Categoría"}</>
          )}
        </button>
      </div>
    </div>
  );
};
export default AddCategoryForm;
