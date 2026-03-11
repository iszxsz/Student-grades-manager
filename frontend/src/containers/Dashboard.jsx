import { useState, useEffect } from "react";
import { Navbar } from "../components/navbar";
import { SidebarMenu } from "../components/sidebarMenu";
import { Card } from "../components/card";
import { dashboardService } from "../services/api";
import { Box, Typography } from "@mui/material";
import StarIcon from '@mui/icons-material/Star';
import Table from "../components/table";
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import { ButtonContained } from "../components/buttonContained";
import { SimpleBackdrop } from "../components/backdrop";

export function Dashboard() {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

    useEffect(() => {
    dashboardService
      .getDashboardData()
      .then((data) => setDashboardData(data))
      .catch((err) => {
        setError("Erro ao carregar dados do dashboard");
        console.error(err);
      });
  }, []);

    const formattedLowAttendanceStudents = dashboardData?.students_with_low_attendance?.map((student) => ({
      ...student,
      attendance_percentage: `${student.attendance_percentage}%`,
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

  if (!dashboardData) {
    return (
      <div>
        <Navbar />
        <SidebarMenu />
        <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}><SimpleBackdrop /></div>
      </div>
    );
  }

  const columnsTableTopStudents = [
    { key: 'name', label: 'Nome do Aluno'},
    { key: 'average_grade', label: 'Média Geral'},
    { key: 'top_subject', label: 'Matéria em Destaque' }
  ];

  const lowAttendanceStudents = [
    { key: 'name', label: 'Nome do Aluno'},
    { key: 'attendance_percentage', label: 'Frequência %' },
    { key: 'average_grade', label: 'Média Geral' }
  ];
  

return (
  <div>
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <Navbar />
      <Box sx={{ display: 'flex', flex: 1, backgroundColor: '#e2e2e2ff' }}>
        <Box sx={{ width: 240, backgroundColor: '#fff' }}>
          <SidebarMenu />
        </Box>
        <Box sx={{ flex: 1, display: 'flex', justifyContent: 'start', alignItems: 'flex-start', padding: '20px', flexDirection: 'column', margin: '2% 10%' }}>
          <Typography variant="h5" sx={{ marginBottom: '0px', fontFamily: 'Arial, sans-serif' }}>Visão Geral</Typography>
          <Typography variant="h6" sx={{ marginBottom: '8px', fontFamily: 'Arial, sans-serif', color: '#525252ff', fontSize: '12px' }}>Informações gerais sobre a turma</Typography>
          <ButtonContained onClick={() => window.location.href = "/novoAluno" } value="Adicionar Estudante" />

          <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: '16px', width: '100%', justifyContent: 'center', alignItems: 'center'   }}>
            <Card title="Média Geral da Turma" value={dashboardData?.class_average_grade ? dashboardData.class_average_grade.toFixed(2) : "-"} />
            <Card title="Estudantes com Baixa Frequência" value={dashboardData?.students_with_low_attendance?.length > 0 ? dashboardData.students_with_low_attendance.length : "-"} />
            <Card title="Estudantes Acima da Média" value={dashboardData?.top_performing_students?.length > 0 ? dashboardData.top_performing_students.length : "-"} />
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start', marginTop: '40px', justifyContent: 'center', gap: '8px' }}>
            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: '40px', justifyContent: 'center', gap: '8px' }}>
              <StarIcon />
              <Typography variant="h5" sx={{fontFamily: 'Arial, sans-serif' }}>Destaques Acadêmicos (Média {">"} {dashboardData?.class_average_grade ? dashboardData.class_average_grade.toFixed(2) : "-"})</Typography>
            </Box>
            <Table columns={columnsTableTopStudents} rows={dashboardData?.top_performing_students || []} emptyMessage="Nenhum estudante cadastrado"/>
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start', marginTop: '40px', justifyContent: 'center', gap: '8px' }}>
            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: '40px', justifyContent: 'center', gap: '8px' }}>
              <ReportProblemIcon />
              <Typography variant="h5" sx={{fontFamily: 'Arial, sans-serif' }}>Alunos com Baixa Frequência (Frequência {"<"} 75%)</Typography>
            </Box>
            <Table columns={lowAttendanceStudents} rows={formattedLowAttendanceStudents || []} emptyMessage="Nenhum estudante cadastrado"/>
          </Box>
        </Box>
      </Box>
    </Box>
  </div>
);
}