

const formatCentsToEuros = (centsAmount) => {
    if(isNaN(centsAmount)){
        return centsAmount;
    }

    const eurosAmount = centsAmount / 100; // Convert cents to euros
    const formatter = new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR'
    });
    // console.log('formatted to', formatter.format(eurosAmount).replace('€', ''))
    return formatter.format(eurosAmount).replace('€', ''); // Remove the euro symbol
}

const convertToCurrency = (euroFormattedAmount) => {
    const numericValue = parseFloat(euroFormattedAmount.replace(/[^\d.,-]/g, '').replace(',', '.'));
    return numericValue;
}
  
export default {formatCentsToEuros, convertToCurrency};