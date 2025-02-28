export const trim = (cell) => {
    cell.value = cell.value.trim();
  };
  
  export const upper = (cell) => {
    cell.value = cell.value.toUpperCase();
  };
  
  export const lower = (cell) => {
    cell.value = cell.value.toLowerCase();
  };
  
  export const removeDuplicates = (range) => {
    const uniqueRows = [];
    const seen = new Set();
    range.forEach(row => {
      const key = JSON.stringify(row);
      if (!seen.has(key)) {
        seen.add(key);
        uniqueRows.push(row);
      }
    });
    return uniqueRows;
  };
  
  export const findAndReplace = (range, find, replace) => {
    range.forEach(cell => {
      cell.value = cell.value.replace(find, replace);
    });
  };