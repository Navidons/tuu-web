import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import type { UserOptions } from 'jspdf-autotable';

interface ExportData {
  performance: any[];
  issues: any[];
  trends: any[];
  metrics: any;
}

export const exportReports = async (format: 'csv' | 'excel' | 'pdf' = 'excel') => {
  try {
    // Fetch all report data
    const [performanceRes, issuesRes, trendsRes, metricsRes] = await Promise.all([
      fetch('/api/reports/performance'),
      fetch('/api/reports/issues'),
      fetch('/api/reports/trends'),
      fetch('/api/reports/metrics')
    ]);

    const [performance, issues, trends, metrics] = await Promise.all([
      performanceRes.json(),
      issuesRes.json(),
      trendsRes.json(),
      metricsRes.json()
    ]);

    const data: ExportData = {
      performance: performance.data || [],
      issues: issues.data || [],
      trends: trends.data || [],
      metrics: metrics.data || {}
    };

    const timestamp = new Date().toISOString().split('T')[0];
    const filename = `UEDCL_Reports_${timestamp}`;

    switch (format) {
      case 'csv':
        exportToCSV(data, filename);
        break;
      case 'excel':
        exportToExcel(data, filename);
        break;
      case 'pdf':
        exportToPDF(data, filename);
        break;
    }
  } catch (error) {
    console.error('Error exporting reports:', error);
    throw new Error('Failed to export reports');
  }
};

const exportToCSV = (data: ExportData, filename: string) => {
  // Performance Data
  const performanceCSV = convertToCSV(data.performance);
  downloadFile(performanceCSV, `${filename}_performance.csv`, 'text/csv');

  // Issues Data
  const issuesCSV = convertToCSV(data.issues);
  downloadFile(issuesCSV, `${filename}_issues.csv`, 'text/csv');

  // Trends Data
  const trendsCSV = convertToCSV(data.trends);
  downloadFile(trendsCSV, `${filename}_trends.csv`, 'text/csv');

  // Metrics Data
  const metricsCSV = convertToCSV([data.metrics]);
  downloadFile(metricsCSV, `${filename}_metrics.csv`, 'text/csv');
};

const exportToExcel = (data: ExportData, filename: string) => {
  const wb = XLSX.utils.book_new();

  // Performance Sheet
  const performanceWS = XLSX.utils.json_to_sheet(data.performance);
  XLSX.utils.book_append_sheet(wb, performanceWS, 'Performance');

  // Issues Sheet
  const issuesWS = XLSX.utils.json_to_sheet(data.issues);
  XLSX.utils.book_append_sheet(wb, issuesWS, 'Issues');

  // Trends Sheet
  const trendsWS = XLSX.utils.json_to_sheet(data.trends);
  XLSX.utils.book_append_sheet(wb, trendsWS, 'Trends');

  // Metrics Sheet
  const metricsWS = XLSX.utils.json_to_sheet([data.metrics]);
  XLSX.utils.book_append_sheet(wb, metricsWS, 'Metrics');

  // Save the file
  XLSX.writeFile(wb, `${filename}.xlsx`);
};

const exportToPDF = (data: ExportData, filename: string) => {
  const doc = new jsPDF();

  // Performance Table
  doc.text('Maintenance Performance', 14, 15);
  autoTable(doc, {
    startY: 20,
    head: [['Month', 'Completed', 'Pending', 'Efficiency']],
    body: data.performance.map(row => [
      row.month,
      row.completed,
      row.pending,
      `${row.efficiency}%`
    ]),
    theme: 'grid',
    styles: { fontSize: 10 },
    headStyles: { fillColor: [41, 128, 185] }
  });

  // Issues Table
  doc.addPage();
  doc.text('Transformer Issues', 14, 15);
  autoTable(doc, {
    startY: 20,
    head: [['Issue Type', 'Count', 'Percentage']],
    body: data.issues.map(row => [
      row.issue_type,
      row.count,
      `${row.percentage}%`
    ]),
    theme: 'grid',
    styles: { fontSize: 10 },
    headStyles: { fillColor: [41, 128, 185] }
  });

  // Trends Table
  doc.addPage();
  doc.text('Maintenance Trends', 14, 15);
  autoTable(doc, {
    startY: 20,
    head: [['Month', 'Total Tasks', 'Completed', 'Pending', 'Efficiency']],
    body: data.trends.map(row => [
      row.month,
      row.total_tasks,
      row.completed_tasks,
      row.pending_tasks,
      `${row.efficiency}%`
    ]),
    theme: 'grid',
    styles: { fontSize: 10 },
    headStyles: { fillColor: [41, 128, 185] }
  });

  // Metrics Summary
  doc.addPage();
  doc.text('Key Performance Indicators', 14, 15);
  autoTable(doc, {
    startY: 20,
    head: [['Metric', 'Value']],
    body: Object.entries(data.metrics).map(([key, value]) => [
      key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
      typeof value === 'number' ? value.toString() : value
    ]),
    theme: 'grid',
    styles: { fontSize: 10 },
    headStyles: { fillColor: [41, 128, 185] }
  });

  // Save the PDF
  doc.save(`${filename}.pdf`);
};

const convertToCSV = (data: any[]): string => {
  if (!data.length) return '';
  
  const headers = Object.keys(data[0]);
  const rows = data.map(row => 
    headers.map(header => {
      const value = row[header];
      return typeof value === 'string' ? `"${value}"` : value;
    }).join(',')
  );
  
  return [headers.join(','), ...rows].join('\n');
};

const downloadFile = (content: string, filename: string, type: string) => {
  const blob = new Blob([content], { type });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
}; 