import React, { useState } from 'react';
import { DataGrid } from 'react-data-grid';
import 'react-data-grid/lib/styles.css';

const columns = [
  { key: 'A', name: 'A', editable: true },
  { key: 'B', name: 'B', editable: true },
  { key: 'C', name: 'C', editable: true },
];

const initialRows = [
  { id: 0, A: '', B: '', C: '' },
  { id: 1, A: '', B: '', C: '' },
  { id: 2, A: '', B: '', C: '' },
];

const sum = (range) => range.reduce((acc, val) => acc + (Number(val) || 0), 0);
const average = (range) => sum(range) / range.length;
const max = (range) => Math.max(...range);
const min = (range) => Math.min(...range);
const count = (range) => range.filter((val) => !isNaN(val)).length;

const trim = (text) => (typeof text === 'string' ? text.trim() : text);
const upper = (text) => (typeof text === 'string' ? text.toUpperCase() : text);
const lower = (text) => (typeof text === 'string' ? text.toLowerCase() : text);
const findAndReplace = (text, find, replace) =>
  typeof text === 'string' ? text.replace(new RegExp(find, 'g'), replace) : text;

const Spreadsheet = () => {
  const [rows, setRows] = useState(initialRows);
  const [formula, setFormula] = useState('');
  const [dataQualityFunc, setDataQualityFunc] = useState('');
  const [findText, setFindText] = useState('');
  const [replaceText, setReplaceText] = useState('');

  const handleRowChange = (updatedRows) => {
    setRows(updatedRows);
  };

  const handleFormulaSubmit = () => {
    if (!formula) return alert('Please enter a formula.');
    const match = formula.match(/(SUM|AVERAGE|MAX|MIN|COUNT)\((\d+):(\d+)\)/i);
    if (!match) return alert('Invalid formula format. Use FUNCTION(start:end)');

    const [, func, start, end] = match;
    const startRow = parseInt(start, 10);
    const endRow = parseInt(end, 10);
    if (isNaN(startRow) || isNaN(endRow)) return alert('Invalid row numbers.');

    const selectedRows = rows.slice(startRow - 1, endRow);
    const values = selectedRows.flatMap((row) => Object.values(row).map(Number));

    let result;
    switch (func.toUpperCase()) {
      case 'SUM':
        result = sum(values);
        break;
      case 'AVERAGE':
        result = average(values);
        break;
      case 'MAX':
        result = max(values);
        break;
      case 'MIN':
        result = min(values);
        break;
      case 'COUNT':
        result = count(values);
        break;
      default:
        result = 'Invalid function';
        break;
    }
    alert(`Result: ${result}`);
  };

  const handleDataQualitySubmit = () => {
    if (!dataQualityFunc) return alert('Please select a data quality function.');

    const updatedRows = rows.map((row) => {
      const newRow = { ...row };
      Object.keys(newRow).forEach((key) => {
        if (dataQualityFunc === 'FIND AND REPLACE' && findText) {
          newRow[key] = findAndReplace(newRow[key], findText, replaceText || '');
        } else {
          switch (dataQualityFunc) {
            case 'TRIM':
              newRow[key] = trim(newRow[key]);
              break;
            case 'UPPER':
              newRow[key] = upper(newRow[key]);
              break;
            case 'LOWER':
              newRow[key] = lower(newRow[key]);
              break;
            default:
              break;
          }
        }
      });
      return newRow;
    });
    setRows(updatedRows);
  };

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Enter formula (e.g., SUM(1:3))"
          value={formula}
          onChange={(e) => setFormula(e.target.value)}
        />
        <button onClick={handleFormulaSubmit}>Apply Formula</button>
      </div>
      <div>
        <select onChange={(e) => setDataQualityFunc(e.target.value)}>
          <option value="">Select data quality function</option>
          <option value="TRIM">TRIM</option>
          <option value="UPPER">UPPER</option>
          <option value="LOWER">LOWER</option>
          <option value="FIND AND REPLACE">FIND AND REPLACE</option>
        </select>
        {dataQualityFunc === 'FIND AND REPLACE' && (
          <>
            <input
              type="text"
              placeholder="Find"
              value={findText}
              onChange={(e) => setFindText(e.target.value)}
            />
            <input
              type="text"
              placeholder="Replace"
              value={replaceText}
              onChange={(e) => setReplaceText(e.target.value)}
            />
          </>
        )}
        <button onClick={handleDataQualitySubmit}>Apply Data Quality</button>
      </div>
      <DataGrid
        columns={columns}
        rows={rows}
        onRowsChange={handleRowChange}
      />
    </div>
  );
};

export default Spreadsheet;
