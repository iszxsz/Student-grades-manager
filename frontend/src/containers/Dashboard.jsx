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
      <Box sx={{ display: 'flex', flex: 1, backgroundColor: '#f6f7f8' }}>
        <Box sx={{ backgroundColor: '#fff' }}>
          <SidebarMenu />
        </Box>
        <Box sx={{ flex: 1, display: 'flex', justifyContent: 'start', alignItems: 'flex-start', padding: '2rem', flexDirection: 'column' }}>
          <Box sx={{ marginBottom: '1rem' }}>
            <Typography variant="h1" sx={{ marginBottom: '0.5rem', letterSpacing: '-0.025em', color: '#0f172a' }}>
              Visão Geral
            </Typography>
            <Typography sx={{ color: '#64748b', fontSize: '1rem' }}>
              Informações importantes sobre a turma.
            </Typography>
          </Box>

          <ButtonContained onClick={() => window.location.href = "/novoAluno" } value="Adicionar Estudante" />

          <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: '1.5rem', width: '100%', justifyContent: 'center', alignItems: 'stretch', marginBottom: '2.5rem' }}>
            <Card title="Média Geral da Turma" value={dashboardData?.class_average_grade ? dashboardData.class_average_grade.toFixed(2) : "-"} />
            <Card title="Estudantes com Baixa Frequência" value={dashboardData?.students_with_low_attendance?.length > 0 ? dashboardData.students_with_low_attendance.length : "-"} />
            <Card title="Estudantes Acima da Média" value={dashboardData?.top_performing_students?.length > 0 ? dashboardData.top_performing_students.length : "-"} />
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start', marginBottom: '3rem', width: '100%' }}>
            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: '1rem', gap: '0.5rem' }}>
              <StarIcon sx={{ color: '#1a355b' }} />
              <Typography variant="h3" sx={{ fontSize: '1.25rem', fontWeight: 700, color: '#0f172a' }}>
                Destaques Acadêmicos (Média {">"} {dashboardData?.class_average_grade ? dashboardData.class_average_grade.toFixed(2) : "-"})
              </Typography>
            </Box>
            <Table columns={columnsTableTopStudents} rows={dashboardData?.top_performing_students || []} emptyMessage="Nenhum estudante cadastrado"/>
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start', width: '100%' }}>
            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: '1rem', gap: '0.5rem' }}>
              <ReportProblemIcon sx={{ color: '#dc2626' }} />
              <Typography variant="h3" sx={{ fontSize: '1.25rem', fontWeight: 700, color: '#0f172a' }}>
                Alunos com Baixa Frequência (Frequência {"<"} 75%)
              </Typography>
            </Box>
            <Table columns={lowAttendanceStudents} rows={formattedLowAttendanceStudents || []} emptyMessage="Nenhum estudante cadastrado"/>
          </Box>
        </Box>
      </Box>
    </Box>
  </div>
);
}