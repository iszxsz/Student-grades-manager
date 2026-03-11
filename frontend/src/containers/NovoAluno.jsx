import { useState, useEffect, use } from "react";
import { Navbar } from "../components/navbar";
import { SidebarMenu } from "../components/sidebarMenu";
import { studentService } from "../services/api";
import { Box, Typography } from "@mui/material";
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import { ButtonContained } from "../components/buttonContained";
import PersonIcon from '@mui/icons-material/Person';
import BasicTextFields from "../components/basicTextFields";
import { SimpleBackdrop } from "../components/backdrop";
import { useSnackbar } from "../contexts/SnackbarContext";

export function NovoAluno() {

  const { showSuccess, showError } = useSnackbar();
  const [studentsData, setStudentsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    subject1_grade: '',
    subject2_grade: '',
    subject3_grade: '',
    subject4_grade: '',
    subject5_grade: '',
    attendance_percentage: ''
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    studentService
      .getAll()
      .then((data) => setStudentsData(data))
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div><SimpleBackdrop /></div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

const handleInputChange = (field, value) => {
  setFormData(prev => ({
    ...prev,
    [field]: value
  }));

  if (errors[field]) {
    setErrors(prev => ({
      ...prev,
      [field]: ''
    }));
  }
};

const validateForm = () => {
  const newErrors = {};

  if (!formData.name || formData.name.trim() === '') {
    newErrors.name = 'Nome é obrigatório';
  }

  const gradeFields = ['subject1_grade', 'subject2_grade', 'subject3_grade', 'subject4_grade', 'subject5_grade'];
  gradeFields.forEach(field => {
    const value = formData[field];
    if (!value || value === '') {
      newErrors[field] = 'Nota é obrigatória';
    } else {
      const numValue = parseFloat(value);
      if (isNaN(numValue) || numValue < 0 || numValue > 10) {
        newErrors[field] = 'Nota deve ser entre 0 e 10';
      }
    }
  });

  if (!formData.attendance_percentage || formData.attendance_percentage === '') {
    newErrors.attendance_percentage = 'Frequência é obrigatória';
  } else {
    const numValue = parseFloat(formData.attendance_percentage);
    if (isNaN(numValue) || numValue < 0 || numValue > 100) {
      newErrors.attendance_percentage = 'Frequência deve ser entre 0 e 100';
    }
  }

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};

const handleSave = async () => {
  if (!validateForm()) {
    showError('Por favor, preencha os campos corretamente.');
    return;
  }

  setSaving(true);
  try {
    const dataToSend = {
      name: formData.name,
      subject1_grade: parseFloat(formData.subject1_grade),
      subject2_grade: parseFloat(formData.subject2_grade),
      subject3_grade: parseFloat(formData.subject3_grade),
      subject4_grade: parseFloat(formData.subject4_grade),
      subject5_grade: parseFloat(formData.subject5_grade),
      attendance_percentage: parseFloat(formData.attendance_percentage),
    };

    await studentService.create(dataToSend);
    setFormData({
      name: '',
      subject1_grade: '',
      subject2_grade: '',
      subject3_grade: '',
      subject4_grade: '',
      subject5_grade: '',
      attendance_percentage: ''
    });
    setErrors({});
    showSuccess('Estudante adicionado com sucesso!');
  } catch (err) {
    console.error('Erro completo:', err);
    showError('Erro ao adicionar estudante: ' + err.message);
  } finally {
    setSaving(false);
  }
};

return (
  <div>
    {saving && <SimpleBackdrop />}
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh', backgroundColor: '#f6f7f8' }}>
      <Navbar />
      <Box sx={{ display: 'flex', flex: 1 }}>
        <Box sx={{ backgroundColor: '#fff'}}>
          <SidebarMenu />
        </Box>
        <Box sx={{display:'flex', flexDirection:'column', width: '100%'}}>
          <Box sx={{ flex: 1, display: 'flex', justifyContent: 'start', alignItems: 'flex-start', padding: '2rem', flexDirection: 'column', width: '100%' }}>
            <Box sx={{ marginBottom: '1rem' }}>
              <Typography variant="h1" sx={{ marginBottom: '0.5rem', letterSpacing: '-0.025em', color: '#0f172a' }}>
                Adicionar novo estudante
              </Typography>
              <Typography sx={{ color: '#64748b', fontSize: '1.125rem' }}>
                Adicione um novo estudante à turma
              </Typography>
            </Box>
            
            <Box sx={{ 
              display: 'flex', 
              flexDirection: 'column', 
              flexWrap: 'wrap', 
              gap: '1.5rem', 
              width: '100%', 
              maxWidth: '800px',
              justifyContent: 'start', 
              alignItems: 'start', 
              border: '1px solid #e2e8f0', 
              backgroundColor: '#fff', 
              padding: '1.5rem', 
              borderRadius: '0.75rem',
            }}>
              <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '0.5rem' }}>
                <PersonIcon sx={{ fontSize: 28, color: '#1a355b' }} />
                <Typography variant="h5" sx={{ color: '#0f172a', fontSize: '1.125rem', fontWeight: 700 }}>Informações do Estudante</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column', justifyContent: 'flex-start', width: '100%' }}>
                <Typography variant="body1" sx={{ marginLeft: '8px', color: '#475569', fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.5rem' }}>Nome Completo</Typography>
                <BasicTextFields variant="outlined" fullWidth value={formData.name} onChange={(e) => handleInputChange('name', e.target.value)} error={!!errors.name} helperText={errors.name} />
              </Box>
              
              <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '1rem', flexWrap: 'wrap'}}>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column', justifyContent: 'flex-start'}}>
                  <Typography variant="body1" sx={{ marginLeft: '8px', color: '#475569', fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.5rem' }}>Português</Typography>
                  <BasicTextFields type="number" variant="outlined" value={formData.subject1_grade} onChange={(e) => handleInputChange('subject1_grade', e.target.value)} error={!!errors.subject1_grade} helperText={errors.subject1_grade} min={0} max={10} />
                </Box>
                
                <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column', justifyContent: 'flex-start'}}>
                  <Typography variant="body1" sx={{ marginLeft: '8px', color: '#475569', fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.5rem' }}>Matemática</Typography>
                  <BasicTextFields type="number" variant="outlined" value={formData.subject2_grade} onChange={(e) => handleInputChange('subject2_grade', e.target.value)} error={!!errors.subject2_grade} helperText={errors.subject2_grade} min={0} max={10} />
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column', justifyContent: 'flex-start'}}>
                  <Typography variant="body1" sx={{ marginLeft: '8px', color: '#475569', fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.5rem' }}>História</Typography>
                  <BasicTextFields type="number" variant="outlined" value={formData.subject3_grade} onChange={(e) => handleInputChange('subject3_grade', e.target.value)} error={!!errors.subject3_grade} helperText={errors.subject3_grade} min={0} max={10} />
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column', justifyContent: 'flex-start'}}>
                  <Typography variant="body1" sx={{ marginLeft: '8px', color: '#475569', fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.5rem' }}>Geografia</Typography>
                  <BasicTextFields type="number" variant="outlined" value={formData.subject4_grade} onChange={(e) => handleInputChange('subject4_grade', e.target.value)} error={!!errors.subject4_grade} helperText={errors.subject4_grade} min={0} max={10} />
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column', justifyContent: 'flex-start'}}>
                  <Typography variant="body1" sx={{ marginLeft: '8px', color: '#475569', fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.5rem' }}>Ciências</Typography>
                  <BasicTextFields type="number" variant="outlined" value={formData.subject5_grade} onChange={(e) => handleInputChange('subject5_grade', e.target.value)} error={!!errors.subject5_grade} helperText={errors.subject5_grade} min={0} max={10} />
                </Box>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column', justifyContent: 'flex-start'}}>
                <Typography variant="body1" sx={{ marginLeft: '8px', color: '#475569', fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.5rem' }}>Frequência Geral (%)</Typography>
                <BasicTextFields type="number" variant="outlined" value={formData.attendance_percentage} onChange={(e) => handleInputChange('attendance_percentage', e.target.value)} error={!!errors.attendance_percentage} helperText={errors.attendance_percentage} min={0} max={100} />
              </Box>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent:'end', width: '100%', maxWidth: '800px' }}>
              <ButtonContained value="Salvar Estudante" onClick={handleSave} disabled={saving} />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  </div>
);
}