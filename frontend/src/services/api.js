import { API_BASE_URL } from '../config/api';

const fetchAPI = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('API Error Details:', errorData);
      throw new Error(`HTTP error! status: ${response.status} - ${JSON.stringify(errorData)}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};


export const studentService = {

  getAll: () => fetchAPI('/students'),
  getById: (id) => fetchAPI(`/students/${id}`),

  create: (studentData) => fetchAPI('/students', {
    method: 'POST',
    body: JSON.stringify(studentData),
  }),

  update: (id, studentData) => fetchAPI(`/students/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(studentData),
  }),

  delete: (id) => fetchAPI(`/students/${id}`, {
    method: 'DELETE',
  }),
};

export const dashboardService = {
  getDashboardData: () => fetchAPI('/dashboard'),
  getClassAverageGrade: () => fetchAPI('/class-average-grade'),
  getClassAverageGrades: () => fetchAPI('/class-average-grades'),
  getStudentsWithLowAttendance: () => fetchAPI('/students-with-low-attendance'),
  getTopPerformingStudents: () => fetchAPI('/top-performing-students'),
};
