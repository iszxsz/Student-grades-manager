import { useState, useEffect } from "react";
import { Navbar } from "../components/navbar";
import { SidebarMenu } from "../components/sidebarMenu";
import { Card } from "../components/card";
import { dashboardService, studentService } from "../services/api";
import { Box, Typography } from "@mui/material";
import StarIcon from '@mui/icons-material/Star';
import Table from "../components/table";
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import { ButtonContained } from "../components/buttonContained";
import { SimpleBackdrop } from "../components/backdrop";
import { useSnackbar } from "../contexts/SnackbarContext";

export function Alunos() {
  const { showSuccess, showError } = useSnackbar();
  const [dashboardData, setDashboardData] = useState(null);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadData = () => {
    Promise.all([
      dashboardService.getDashboardData(),
      studentService.getAll()
    ])
      .then(([dashData, studentsData]) => {
        setDashboardData(dashData);
        setStudents(studentsData);
        setError(null);
      })
      .catch((err) => {
        setError("Erro ao carregar dados");
        console.error(err);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleEditStudent = async (id, editedData) => {
    try {
      setLoading(true);
      await studentService.update(id, editedData);
      showSuccess('Estudante atualizado com sucesso!');
      loadData();
    } catch (err) {
      setLoading(false);
      showError('Erro ao atualizar estudante. Tente novamente.');
      console.error('Error updating student:', err);
    }
  };

  const formattedStudents = students.map((student) => ({
    ...student,
  }));


  if (error) {
    return (
      <div>
        <Navbar />
        <SidebarMenu />
        <div style={{ padding: "20px", color: "red" }}>{error}</div>
      </div>
    );
  }

const columnsStudents = [
    { key: 'id', label: 'ID'},
    { key: 'name', label: 'Nome do Aluno'},
    { key: 'subject1_grade', label: 'Português'},
    { key: 'subject2_grade', label: 'Matemática'},
    { key: 'subject3_grade', label: 'História'},
    { key: 'subject4_grade', label: 'Geografia'},
    { key: 'subject5_grade', label: 'Ciências'},
    { key: 'average_grade', label: 'Média Geral'},
    { key: 'attendance_percentage', label: 'Frequência %' }
];

const editableFields = [
  'subject1_grade',
  'subject2_grade', 
  'subject3_grade',
  'subject4_grade',
  'subject5_grade',
  'attendance_percentage'
];

return (
  <div>
    { loading && <SimpleBackdrop /> }
    
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <Navbar />
      <Box sx={{ display: 'flex', flex: 1, backgroundColor: '#f6f7f8' }}>
        <Box sx={{ backgroundColor: '#fff'}}>
          <SidebarMenu />
        </Box>
        <Box sx={{ flex: 1, display: 'flex', justifyContent: 'start', alignItems: 'flex-start', padding: '2rem', flexDirection: 'column' }}>
          <Box sx={{ marginBottom: '1rem' }}>
            <Typography variant="h1" sx={{ marginBottom: '0.5rem', letterSpacing: '-0.025em', color: '#0f172a' }}>
              Visão Geral de Estudantes
            </Typography>
            <Typography sx={{ color: '#64748b', fontSize: '1.125rem' }}>
              Lista de estudantes da turma
            </Typography>
          </Box>

          <ButtonContained onClick={() => window.location.href = "/novoAluno" } value="Adicionar Estudante" />

          <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: '1.5rem', width: '100%', justifyContent: 'center', alignItems: 'stretch', marginBottom: '2.5rem' }}>
            <Card title="Média Geral da Turma" value={dashboardData?.class_average_grade ? dashboardData.class_average_grade.toFixed(2) : "-"} />
            <Card title="Estudantes com Baixa Frequência" value={dashboardData?.students_with_low_attendance?.length > 0 ? dashboardData.students_with_low_attendance.length : "-"} />
            <Card title="Quantidade de Estudantes" value={students?.length > 0 ? students.length : "-"} />
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start', width: '100%' }}>
            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: '1rem', gap: '0.5rem' }}>
              <Typography variant="h3" sx={{ fontSize: '1.25rem', fontWeight: 700, color: '#0f172a' }}>
                Listagem de Estudantes
              </Typography>
            </Box>
            <Table 
              columns={columnsStudents} 
              rows={formattedStudents || []} 
              emptyMessage="Nenhum estudante cadastrado"
              onEdit={handleEditStudent}
              editableFields={editableFields}
            />
            
          </Box>

        </Box>
      </Box>
    </Box>
  </div>
);
}