import { LayoutGrid } from "lucide-react";
import { Pencil } from "lucide-react";

const CategoryList = ({ categories, onEditCategory }) => {
  return (
    <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-lg font-semibold">Categorias Registradas</h4>
      </div>

      {/* category list */}
      {categories.length === 0 ? (
        <p className="text-gray-500">No hay categoria creadas, cree una!</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {categories.map((category) => (
            <div
              key={category.id}
              className="group relative flex items-center gap-4 rounded-lg hover:bg-gray-200/60"
            >
              {/* icon/emoji/displey */}
              <div className="w-12 h-12 flex items-center justify-center text-xl text-gray-800 bg-gray-100 rounded-full">
                {category.icon ? (
                  <span className="text-2xl">
                    <img
                      src={category.icon}
                      alt={category.name}
                      className="h-5 w-5"
                    />
                  </span>
                ) : (
                  <LayoutGrid className="text-indigo-800" size={24} />
                )}
              </div>

              {/* category detalis */}
              <div className="flex-1 flex items-center justify-between">
                {/* category name and type */}
                <div>
                  <p className="text-sm text-gray-950 font-semibold mt-1 capitalize">
                    {category.name}
                  </p>
                  <p className="text-sm text-gray-400 mt-1 capitalize">
                    {category.type}
                  </p>
                </div>

                {/* action button */}
                <div className="flex items-center gap-2">
                  <button 
                  onClick={()=>onEditCategory(category)}
                  className="p-2 text-gray-400 hover:text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                    <Pencil size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default CategoryList;
