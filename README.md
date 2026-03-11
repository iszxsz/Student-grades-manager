# Student Grades Manager

A web application designed to help teachers manage student grades and attendance

## Tech Stack

### Frontend
- **React 19.2.0** - UI library
- **Material-UI (MUI) 7.3.9** - UI component library

### Backend
- **Laravel 11.x** - PHP framework
- **SQLite** - Database
- **PHP 8.2+** - Server-side language

## Features

### Dashboard
- **Class Overview**: Display general class statistics
- **Average Grade**: Real-time calculation of class average
- **Academic Highlights**: List of students performing above class average, showing their average grade and top subject
- **Low Attendance Alert**: Identification of students with attendance below 75%
- **Visual Cards**: Quick metrics display 

### Student Management
- **Add New Students**: Form to register students with all grades and attendance
- **Student List**: Complete table showing all students with their information
- **Inline Editing**: Edit student grades and attendance directly in the table with pencil icon
- **Data Validation**: Ensures grades are between 0-10 and all required fields are filled

### Automatic Calculations
- Student average grade (across 5 subjects: Português, Matemática, História, Geografia, Ciências)
- Class average grade
- Top performing students (above class average)
- Students requiring attention (attendance < 75%)
- Identification of each student's best subject


## Assumptions

1. **Grade Scale**: Grades are on a 0-10 scale 
2. **Attendance Threshold**: The 75% attendance threshold is fixed and system-wide
3. **Subject Names**: Generic naming (Subject 1-5) 
4. **Real-time Calculations**: All averages and statistics are calculated on-demand
5. **Single Class**: The system manages one class at a time
6. **No Authentication**: For this version, no user authentication is required
7. **Data Persistence**: SQLite database provides lightweight, file-based storage

## Design Decisions

### Architecture

**Separation of Concerns**: Clear division between frontend (React) and backend (Laravel API)

**RESTful API**: Standard REST endpoints for CRUD operations

### Frontend

**React with Vite**: Modern build tool for faster development

**Material-UI Components**: Pre-built, accessible UI components

### Backend

**Laravel Framework**: Full-featured PHP framework

**SQLite Database**: Lightweight, file-based database

**API Resource Pattern**: Structured JSON responses

### Validation Strategy

**Backend Validation**: Primary validation in Laravel controller
- Grades: 0-10 range, numeric, required
- Attendance: 0-100 range, numeric, required
- Name: Required, string, max 255 characters

**Frontend Conversion**: Data type conversion before submission
- Ensures numeric values are sent as numbers, not strings


## Getting Started

### Prerequisites

- **Node.js** (v18 or higher)
- **PHP** (v8.2 or higher)
- **Composer**
- **SQLite**

### Installation

#### 1. Clone the repository

```bash
git clone https://github.com/iszxsz/Student-grades-manager.git
cd Student-grades-manager
```

#### 2. Backend Setup

```bash
cd backend

# Install PHP dependencies
composer install

# Copy environment file
cp .env.example .env

# Generate application key
php artisan key:generate

# Run database migrations
php artisan migrate

# (Optional) Seed database with sample data
php artisan db:seed

# Start the Laravel development server
php artisan serve
```

The backend will be available at `http://localhost:8000`

#### 3. Frontend Setup

Open a new terminal window:

```bash
cd frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

The frontend will be available at `http://localhost:5173`

### Environment Variables

#### Backend (.env)
```env
APP_NAME=Laravel
APP_ENV=local
APP_DEBUG=true
APP_URL=http://localhost

DB_CONNECTION=sqlite
```

#### Frontend (.env)
```env
VITE_API_URL=http://localhost:8000/api
```

## Usage

### Adding a Student
1. **Access the Dashboard**: Navigate to `http://localhost:5173` to see the overview
2. **Add a Student**: Click "Adicionar Estudante" button
3. **Fill the Form**: 
   - Enter student's full name
   - Input grades for all 5 subjects (0-10)
   - Enter attendance percentage (0-100)
4. **Save**: Click "Salvar Estudante"
5. **Success**: A notification will confirm the student was added

### Editing a Student
1. **Navigate to Students List**: Click "Alunos" in the sidebar
2. **Click Edit Icon**: Click the pencil icon on any student row
3. **Modify Values**: Edit grades and attendance directly in the table
4. **Save Changes**: Click the check icon to save, or X to cancel
5. **Confirmation**: A success message appears and data refreshes automatically

### Viewing Results
- Dashboard automatically updates with new statistics
- Check "Destaques Acadêmicos" for top performers
- Review "Alunos com Baixa Frequência" for students needing attention
- Attendance below 75% is highlighted in red

## Assumptions

1. **Grade Scale**: Grades are on a 0-10 scale 
2. **Attendance Threshold**: The 75% attendance threshold is fixed and system-wide
3. **Subject Names**: Generic naming (Subject 1-5) 
4. **Real-time Calculations**: All averages and statistics are calculated on-demand
5. **Single Class**: The system manages one class at a time
6. **No Authentication**: For this version, no user authentication is required
7. **Data Persistence**: SQLite database provides lightweight, file-based storage

## Design Decisions

### Architecture

**Separation of Concerns**: Clear division between frontend (React) and backend (Laravel API)

**RESTful API**: Standard REST endpoints for CRUD operations

### Frontend

**React with Vite**: Modern build tool for faster development

**Material-UI Components**: Pre-built, accessible UI components

**Context API**: Global state management for snackbar notifications across the application

**Inline Table Editing**: Enhanced user experience by allowing direct editing without navigation to separate forms

### Backend

**Laravel Framework**: Full-featured PHP framework

**SQLite Database**: Lightweight, file-based database

**API Resource Pattern**: Structured JSON responses

### Validation Strategy

**Backend Validation**: Primary validation in Laravel controller
- Grades: 0-10 range, numeric, required
- Attendance: 0-100 range, numeric, required
- Name: Required, string, max 255 characters

**Frontend Conversion**: Data type conversion before submission
- Ensures numeric values are sent as numbers, not strings

## API Documentation

### Base URL
```
http://localhost:8000/api
```

### Endpoints

#### Dashboard
**GET** `/dashboard`
```json
Response:
{
  "class_average_grade": 75.5,
  "class_average_per_subject": {
    "subject1_average": 80,
    "subject2_average": 75,
    "subject3_average": 78,
    "subject4_average": 72,
    "subject5_average": 70
  },
  "students_with_low_attendance": [...],
  "top_performing_students": [...]
}
```

#### Students

**GET** `/students` - List all students

**GET** `/students/{id}` - Get specific student

**POST** `/students` - Create new student
```json
Request:
{
  "name": "John Doe",
  "subject1_grade": 85,
  "subject2_grade": 90,
  "subject3_grade": 78,
  "subject4_grade": 92,
  "subject5_grade": 88,
  "attendance_percentage": 95
}
```

**PUT** `/students/{id}` - Update student

**DELETE** `/students/{id}` - Delete student

#### Statistics

**GET** `/class-average-grade` - Get class average

**GET** `/class-average-grades` - Get average per subject

**GET** `/students-with-low-attendance` - Get students with attendance < 75%

**GET** `/top-performing-students` - Get students above class average

## Key Features Implementation

### Automatic Calculations

All calculations are performed server-side in the `Student` model and `StudentController`:
- `calculateAverageGrade()`: Computes student's average across 5 subjects
- `getTopSubject()`: Identifies the subject with the highest grade
- Controller methods aggregate data for dashboard statistics

### Inline Table Editing

The table component supports direct editing:
- Click pencil icon to enter edit mode for a specific row
- TextField inputs replace static values for editable fields
- Cancel button discards changes, check button saves to backend


### Dynamic Dashboard

The dashboard automatically refreshes data using React hooks:
- `useEffect` fetches data on component mount
- State management keeps UI in sync with backend
- Loading states provide user feedback
- Real-time updates after any data modification

