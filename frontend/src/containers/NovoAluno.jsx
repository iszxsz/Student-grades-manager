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
import { SuccessAlert } from "../components/successAlert";
import { ErrorAlert } from "../components/errorAlert";

export function NovoAluno() {

  const [studentsData, setStudentsData] = useState(null);
  const [loading, setLoading] = useState(true);
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
};

const handleSave = async () => {
  try {
    // Converter valores numéricos antes de enviar
    const dataToSend = {
      name: formData.name,
      subject1_grade: parseFloat(formData.subject1_grade) || 0,
      subject2_grade: parseFloat(formData.subject2_grade) || 0,
      subject3_grade: parseFloat(formData.subject3_grade) || 0,
      subject4_grade: parseFloat(formData.subject4_grade) || 0,
      subject5_grade: parseFloat(formData.subject5_grade) || 0,
      attendance_percentage: parseFloat(formData.attendance_percentage) || 0,
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
    SuccessAlert('Estudante adicionado com sucesso!');
  } catch (err) {
    console.error('Erro completo:', err);
    ErrorAlert('Erro ao adicionar estudante: ' + err.message);
  }
};

return (
  <div>
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh', backgroundColor: '#f5f5f5ff' }}>
      <Navbar />
      <Box sx={{ display: 'flex', flex: 1 }}>
        <Box sx={{ width: 240, backgroundColor: '#fff'}}>
          <SidebarMenu />
        </Box>
        <Box sx={{display:'flex', flexDirection:'column'}}>
          <Box sx={{ flex: 1, display: 'flex', justifyContent: 'start', alignItems: 'flex-start', padding: '1% 10%', flexDirection: 'column', width: '100%', }}>
            <Typography variant="h5" sx={{ marginBottom: '0px', fontFamily: 'Arial, sans-serif' }}>Adicionar novo estudante</Typography>
            <Typography variant="h6" sx={{ marginBottom: '8px', fontFamily: 'Arial, sans-serif', color: '#525252ff', fontSize: '12px' }}>Adicione um novo estudante à turma</Typography>
            
            <Box sx={{ display: 'flex', flexDirection: 'column', flexWrap: 'wrap', gap: '16px', width: '100%', justifyContent: 'start', alignItems: 'start', border: '1px solid #bebebeff', backgroundColor: '#fff', padding: '20px', borderRadius: '8px' }}>
              <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '8px' }}>
                <PersonIcon sx={{ fontSize: 30, color: '#00162cff' }} />
                <Typography variant="h6" sx={{ fontFamily: 'Arial, sans-serif', color: '#00162cff', fontSize: '18px', fontWeight: 'bold' }}>Informações do Estudante</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column', justifyContent: 'flex-start'}}>
                <Typography variant="body1" sx={{  marginLeft: '8px', fontFamily: 'Arial, sans-serif', color: '#525252ff', fontSize: '14px'}}>Nome Completo</Typography>
                <BasicTextFields label="Nome Completo" variant="outlined" sx={{ width: '100%' }} value={formData.name} onChange={(e) => handleInputChange('name', e.target.value)} />
              </Box>
              
              <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '8px', flexWrap: 'wrap'}}>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column', justifyContent: 'flex-start'}}>
                  <Typography variant="body1" sx={{  marginLeft: '8px', fontFamily: 'Arial, sans-serif', color: '#525252ff', fontSize: '14px'}}>Nota Matéria 1</Typography>
                  <BasicTextFields label="Nota Matéria 1" variant="outlined" value={formData.subject1_grade} onChange={(e) => handleInputChange('subject1_grade', e.target.value)} />
                </Box>
                
                <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column', justifyContent: 'flex-start'}}>
                  <Typography variant="body1" sx={{  marginLeft: '8px', fontFamily: 'Arial, sans-serif', color: '#525252ff', fontSize: '14px'}}>Nota Matéria 2</Typography>
                  <BasicTextFields label="Nota Matéria 2" variant="outlined" value={formData.subject2_grade} onChange={(e) => handleInputChange('subject2_grade', e.target.value)} />
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column', justifyContent: 'flex-start'}}>
                  <Typography variant="body1" sx={{  marginLeft: '8px', fontFamily: 'Arial, sans-serif', color: '#525252ff', fontSize: '14px'}}>Nota Matéria 3</Typography>
                  <BasicTextFields label="Nota Matéria 3" variant="outlined" value={formData.subject3_grade} onChange={(e) => handleInputChange('subject3_grade', e.target.value)} />
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column', justifyContent: 'flex-start'}}>
                  <Typography variant="body1" sx={{  marginLeft: '8px', fontFamily: 'Arial, sans-serif', color: '#525252ff', fontSize: '14px'}}>Nota Matéria 4</Typography>
                  <BasicTextFields label="Nota Matéria 4" variant="outlined" value={formData.subject4_grade} onChange={(e) => handleInputChange('subject4_grade', e.target.value)} />
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column', justifyContent: 'flex-start'}}>
                  <Typography variant="body1" sx={{  marginLeft: '8px', fontFamily: 'Arial, sans-serif', color: '#525252ff', fontSize: '14px'}}>Nota Matéria 5</Typography>
                  <BasicTextFields label="Nota Matéria 5" variant="outlined" value={formData.subject5_grade} onChange={(e) => handleInputChange('subject5_grade', e.target.value)} />
                </Box>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column', justifyContent: 'flex-start'}}>
                <Typography variant="body1" sx={{  marginLeft: '8px', fontFamily: 'Arial, sans-serif', color: '#525252ff', fontSize: '14px'}}>Frequência Geral (%)</Typography>
                <BasicTextFields type="number" label="Frequência Geral (%)" variant="outlined" value={formData.attendance_percentage} onChange={(e) => handleInputChange('attendance_percentage', e.target.value)} />
              </Box>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent:'end', width: '100%' }}>
            <ButtonContained value="Salvar Estudante" onClick={handleSave} />
          </Box>
        </Box>
      </Box>
    </Box>
  </div>
);
}