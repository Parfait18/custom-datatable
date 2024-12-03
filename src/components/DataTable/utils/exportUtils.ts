import { type ExportFormat } from '../types';

export function exportToCSV(data: Record<string, any>[], filename: string): void {
  const headers = Object.keys(data[0]);
  const csvContent = [
    headers.join(','),
    ...data.map(row => headers.map(header => JSON.stringify(row[header])).join(','))
  ].join('\n');
  downloadFile(csvContent, `${filename}.csv`, 'text/csv');
}

export function exportToJSON(data: Record<string, any>[], filename: string): void {
  const jsonContent = JSON.stringify(data, null, 2);
  downloadFile(jsonContent, `${filename}.json`, 'application/json');
}

export function exportToTXT(data: Record<string, any>[], filename: string): void {
  const txtContent = data.map(row => 
    Object.entries(row)
      .map(([key, value]) => `${key}: ${value}`)
      .join('\n')
  ).join('\n\n');
  downloadFile(txtContent, `${filename}.txt`, 'text/plain');
}

export function exportToSQL(data: Record<string, any>[], tableName: string, filename: string): void {
  const headers = Object.keys(data[0]);
  const createTable = `CREATE TABLE ${tableName} (\n${
    headers.map(header => `  ${header} VARCHAR(255)`).join(',\n')
  }\n);\n\n`;
  
  const insertStatements = data.map(row => {
    const values = headers.map(header => 
      typeof row[header] === 'string' ? `'${row[header]}'` : row[header]
    ).join(', ');
    return `INSERT INTO ${tableName} (${headers.join(', ')}) VALUES (${values});`;
  }).join('\n');

  const sqlContent = createTable + insertStatements;
  downloadFile(sqlContent, `${filename}.sql`, 'text/plain');
}

function downloadFile(content: string, filename: string, type: string): void {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}