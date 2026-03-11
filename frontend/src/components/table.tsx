import React, { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import TextField from '@mui/material/TextField';

interface Column {
  key: string;
  label: string;
  editable?: boolean;
}

interface CustomTableProps {
  columns: Column[];
  rows: any[];
  emptyMessage?: string;
  onEdit?: (id: number, data: any) => void;
  editableFields?: string[];
}

export default function CTable({ 
  columns, 
  rows, 
  emptyMessage = "Nenhum dado disponível",
  onEdit,
  editableFields = []
}: CustomTableProps) {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editedData, setEditedData] = useState<any>({});

  const handleEdit = (row: any) => {
    setEditingId(row.id);
    setEditedData({ ...row });
  };

  const handleSave = () => {
    if (editingId && onEdit) {
      // Convert string values to numbers for numeric fields
      const processedData = { ...editedData };
      editableFields.forEach(field => {
        if (processedData[field] !== undefined) {
          processedData[field] = parseFloat(processedData[field]) || 0;
        }
      });
      onEdit(editingId, processedData);
    }
    setEditingId(null);
    setEditedData({});
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditedData({});
  };

  const handleChange = (field: string, value: any) => {
    setEditedData((prev: any) => ({
      ...prev,
      [field]: parseFloat(value) || 0
    }));
  };

  const isEditable = editableFields.length > 0;
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
            {isEditable && (
              <TableCell sx={{ 
                backgroundColor: '#f8fafc',
                fontWeight: 600,
                fontSize: '0.875rem',
                color: '#475569',
                padding: '1rem 1.5rem',
              }}>
                Ações
              </TableCell>
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows && rows.length > 0 ? (
            rows.map((row, index) => {
              const isEditing = editingId === row.id;
              const currentData = isEditing ? editedData : row;
              
              return (
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
                      {isEditing && editableFields.includes(column.key) ? (
                        <TextField
                          size="small"
                          type="number"
                          value={currentData[column.key] || ''}
                          onChange={(e) => handleChange(column.key, e.target.value)}
                          sx={{ width: '100px' }}
                        />
                      ) : (
                        (() => {
                          const value = currentData[column.key];
                          if (value === undefined || value === null) return '-';
                          
                          // Special formatting for attendance_percentage
                          if (column.key === 'attendance_percentage') {
                            return (
                              <span style={{ color: value < 75 ? 'red' : 'inherit' }}>
                                {value}%
                              </span>
                            );
                          }
                          
                          return value;
                        })()
                      )}
                    </TableCell>
                  ))}
                  {isEditable && (
                    <TableCell sx={{
                      fontSize: '0.875rem',
                      padding: '1rem 1.5rem',
                      borderColor: '#f1f5f9',
                    }}>
                      {isEditing ? (
                        <>
                          <IconButton 
                            size="small" 
                            color="success" 
                            onClick={handleSave}
                            sx={{ mr: 1 }}
                          >
                            <CheckIcon fontSize="small" />
                          </IconButton>
                          <IconButton 
                            size="small" 
                            color="error" 
                            onClick={handleCancel}
                          >
                            <CloseIcon fontSize="small" />
                          </IconButton>
                        </>
                      ) : (
                        <IconButton 
                          size="small" 
                          color="primary" 
                          onClick={() => handleEdit(row)}
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                      )}
                    </TableCell>
                  )}
                </TableRow>
              );
            })
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