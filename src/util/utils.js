export const addThousandsSeparator = (num) => {
  if (num === null || isNaN(num)) return "";
  
  // Utiliza el formato regional estándar (es-PE para Perú)
  return new Intl.NumberFormat('es-PE', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(num);
};