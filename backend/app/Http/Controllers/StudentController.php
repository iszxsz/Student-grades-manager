<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Student;

class StudentController extends Controller{
    public function index(){
        
        return response()->json(Student::all());
    }

    public function store(Request $request){
        $student = Student::create($request->all());
        return response()->json($student, 201);
    }

    public function show($id){
        $student = Student::findOrFail($id);
        return response()->json($student);
    }

    public function update(Request $request, $id){
        $student = Student::findOrFail($id);
        $student->update($request->all());
        return response()->json($student);
    }

    public function destroy($id){
        Student::destroy($id);
        return response()->json(null, 204);
    }

    public function classAverageGradesPerSubject(){
        return [
            'subject1_average' => Student::avg('subject1_grade'),
            'subject2_average' => Student::avg('subject2_grade'),
            'subject3_average' => Student::avg('subject3_grade'),
            'subject4_average' => Student::avg('subject4_grade'),
            'subject5_average' => Student::avg('subject5_grade'),
        ];
    }

    public function calculateClassAverageGrade(){
        $students = Student::all();
        $totalAverage =$students->map(function($student){
            return $student->calculateAverageGrade();
        });
        return $totalAverage->avg();
    }

    public function calculateStudentsWithLowAttendance(){
        $students = Student::where('attendance_percentage', '<', 75)->get();
        return $students;
    }

    public function getStudentsWithLowAttendance(){
        $students = $this->calculateStudentsWithLowAttendance();
        return response()->json($students);
    }

    public function calculateTopPerformingStudents(){
       $classAverage = $this->calculateClassAverageGrade();
        $students = Student::all();
        return $students->filter(function($student) use ($classAverage){
            return $student->calculateAverageGrade() > $classAverage;
        })->values();
    }

    public function getTopPerformingStudents(){
        return response()->json($this->calculateTopPerformingStudents());
    }

    public function dashboard(){
        return response()->json([
            'class_average_grade' => $this->calculateClassAverageGrade(),
            'class_average_per_subject' => $this->classAverageGradesPerSubject(),
            'students_with_low_attendance' => $this->calculateStudentsWithLowAttendance(),
            'top_performing_students' => $this->calculateTopPerformingStudents()
        ]);
    }

}