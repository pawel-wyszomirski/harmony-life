export function downloadCSV(data: any[], filename: string) {
  // Add BOM for proper UTF-8 encoding in Excel
  const BOM = '\uFEFF';
  
  // Get headers from the first object
  const headers = Object.keys(data[0]);
  
  // Create CSV rows
  const csvRows = [
    headers.join(','), // Header row
    ...data.map(row => 
      headers.map(header => {
        const cell = row[header]?.toString() ?? '';
        // Escape quotes and wrap in quotes if contains comma or newline
        return cell.includes(',') || cell.includes('\n') || cell.includes('"')
          ? `"${cell.replace(/"/g, '""')}"`
          : cell;
      }).join(',')
    )
  ];
  
  // Create blob and download
  const csvContent = BOM + csvRows.join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
}