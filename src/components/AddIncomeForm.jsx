import { Categories } from "emoji-picker-react";
import Input from "../components/Input";
import { useState } from "react";
import EmojiPickerP from "../components/EmojiPickerP";

const AddIncomeForm = ({ onAddIncome, categories }) => {
  const [income, setIncome] = useState({
    name: "",
    amount: "",
    date: "",
    icon: "",
    categoryId: "",
  });
  const [loading,setLoading]=useState(false)
  const categoryOptions = categories.map((category) => ({
    value: category.id,
    label: category.name,
  }));

  const handleChange = (key, value) => {
    setIncome({ ...income, [key]: value });
  };
  return (
    <div>
      <EmojiPickerP
        icon={income.icon}
        onSelect={(selectedIcon) => handleChange("icon", selectedIcon)}
      />

      <Input
        value={income.name}
        onChange={({ target }) => handleChange("name", target.value)}
        label="Ingreso"
        placeholder="Ej. Salario,Bonificacíon"
        type="text"
      />

      <Input
        label="Categoría"
        value={income.categoryId}
        onChange={({ target }) => handleChange("categoryId", target.value)}
        isSelect={true}
        options={categoryOptions}
      />

      <Input
        value={income.amount}
        onChange={({ target }) => handleChange("amount", target.value)}
        label="Cantidad/Monto(S/)"
        placeholder="Ej. 500, 100.75"
        type="number"
      />

      <Input
        value={income.date}
        onChange={({ target }) => handleChange("date", target.value)}
        label="Fecha"
        placeholder=""
        type="date"
      />
      <div className="flex justify-end mt-6">
        <button
        //   type="button"
           onClick={()=>onAddIncome(income)}
        //   disabled={loading}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          {/* {loading ? (
            <>
              <LoaderCircle className="w-4 h-4 animate-spin" />
              {isEditing ? "Actualizando...": "Agregando..."}
            </>
          ) : (
            <>{isEditing ? "Actualizar Categoría": "Agregar Categoría"}</>
          )} */}
          Agregar Ingreso
        </button>
      </div>
    </div>
  );
};
export default AddIncomeForm;
