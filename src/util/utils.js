export const addThousandsSeparator = (num) => {
  if (num === null || isNaN(num)) return "";
  
  // Utiliza el formato regional estándar (es-PE para Perú)
  return new Intl.NumberFormat('es-PE', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(num);
};


// export const prepareIncomeLineChartData = (transactions) => {
//   // 1. Agrupamos los montos por mes
//   const groupedData = transactions.reduce((acc, curr) => {
//     const date = new Date(curr.date);
//     // Formato: "Mes Año" (ejemplo: "Ene 2026")
//     const monthYear = date.toLocaleString("es-ES", { month: "short", year: "numeric" });
    
//     if (!acc[monthYear]) {
//       acc[monthYear] = 0;
//     }
//     acc[monthYear] += curr.amount;
//     return acc;
//   }, {});

//   // 2. Convertimos el objeto a un array que Recharts entienda: [{name: "Ene 2026", total: 100}, ...]
//   return Object.keys(groupedData).map((key) => ({
//     name: key,
//     total: groupedData[key],
//   }));
// };


export const prepareIncomeLineChartData = (transactions) => {
  const grouped = transactions.reduce((acc, curr) => {
    const date = curr.date; 
    
    if (!acc[date]) {
      acc[date] = {
        date: date,
        totalAmount: 0,
        items: [],
        month: formatDayMonth(date) 
      };
    }
    
    acc[date].totalAmount += curr.amount;
    acc[date].items.push(curr);
    
    return acc;
  }, {});

  //return Object.values(grouped);
  // Convertimos a array y ordenamos por fecha cronológicamente
  return Object.values(grouped).sort((a, b) => {
    return new Date(a.date) - new Date(b.date);
  });
};

// Función corregida y simplificada para español
const formatDayMonth = (dateString) => {
  // Al agregar 'T00:00:00', evitas que JavaScript reste horas por zona horaria
  const date = new Date(dateString + 'T00:00:00');
  
  // Retorna formato latino como "15 jul"
  return date.toLocaleDateString('es-ES', { 
    day: 'numeric', 
    month: 'short' 
  });
};