import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

interface Column {
  key: string;
  label: string;
}

interface CustomTableProps {
  columns: Column[];
  rows: any[];
  emptyMessage?: string;
}

export default function CTable({ columns, rows, emptyMessage = "Nenhum dado disponível" }: CustomTableProps) {
  return (
    <TableContainer component={Paper} sx={{ 
      borderRadius: '0.75rem',
      border: '1px solid #e2e8f0',
      overflow: 'hidden',
      width: '100%',
      boxShadow: 'none'
    }}>
      <Table sx={{ minWidth: 650, width: '100%' }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell key={column.key} sx={{ 
                backgroundColor: '#f8fafc',
                fontWeight: 600,
                fontSize: '0.875rem',
                color: '#475569',
                padding: '1rem 1.5rem',
              }}>
                {column.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows && rows.length > 0 ? (
            rows.map((row, index) => (
              <TableRow
                key={row.id || index}
                sx={{ 
                  '&:last-child td, &:last-child th': { border: 0 },
                  '&:hover': {
                    backgroundColor: '#f8fafc80',
                  },
                  transition: 'background-color 0.2s',
                }}
              >
                {columns.map((column) => (
                  <TableCell key={column.key} sx={{
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    color: '#0f172a',
                    padding: '1rem 1.5rem',
                    borderColor: '#f1f5f9',
                  }}>
                    {row[column.key] !== undefined && row[column.key] !== null ? row[column.key] : '-'}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} sx={{
                fontSize: '0.875rem',
                color: '#64748b',
                padding: '1rem 1.5rem',
                textAlign: 'center',
              }}>
                {emptyMessage}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}