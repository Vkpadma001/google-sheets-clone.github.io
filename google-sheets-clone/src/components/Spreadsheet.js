import React, { useState, useEffect } from 'react';
import ReactDataGrid from 'react-data-grid';
import { sum, average, max, min, count } from '../utils/mathFunctions';
import { trim, upper, lower, removeDuplicates, findAndReplace } from '../utils/dataQualityFunctions';

const columns = [
  { key: 'A', name: 'A', editable: true },
  { key: 'B', name: 'B', editable: true },
  { key: 'C', name: 'C', editable: true },
];

const initialRows = [
  { A: '1', B: '2', C: '3' },
  { A: '4', B: '5', C: '6' },
];

const Spreadsheet = () => {
  const [rows, setRows] = useState(initialRows);

  // Load data from the backend on component mount
  useEffect(() => {
    fetch('http://localhost:5000/load')
      .then((response) => response.json())
      .then((data) => setRows(data));
  }, []);

  // Save data to the backend
  const saveData = () => {
    fetch('http://localhost:5000/save', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(rows),
    })
      .then((response) => response.text())
      .then((message) => alert(message));
  };

  // Handle cell value changes
  const onRowsChange = (updatedRows) => {
    setRows(updatedRows);
  };

  return (
    <div>
      <ReactDataGrid
        columns={columns}
        rows={rows}
        onRowsChange={onRowsChange}
      />
      <button onClick={saveData}>Save Spreadsheet</button>
    </div>
  );
};

export default Spreadsheet;