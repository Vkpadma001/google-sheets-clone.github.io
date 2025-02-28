export const sum = (range) => {
    return range.reduce((acc, cell) => acc + parseFloat(cell.value || 0), 0);
  };
  
  export const average = (range) => {
    const total = sum(range);
    return total / range.length;
  };
  
  export const max = (range) => {
    return Math.max(...range.map(cell => parseFloat(cell.value || 0)));
  };
  
  export const min = (range) => {
    return Math.min(...range.map(cell => parseFloat(cell.value || 0)));
  };
  
  export const count = (range) => {
    return range.filter(cell => !isNaN(cell.value)).length;
  };