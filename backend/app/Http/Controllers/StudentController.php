<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Student;

class StudentController extends Controller{
    public function index(){
        $students = Student::all()->map(function ($student) {
        return [
            'id' => $student->id,
            'name' => $student->name,
            'subject1_grade' => $student->subject1_grade,
            'subject2_grade' => $student->subject2_grade,
            'subject3_grade' => $student->subject3_grade,
            'subject4_grade' => $student->subject4_grade,
            'subject5_grade' => $student->subject5_grade,
            'attendance_percentage' => $student->attendance_percentage,
            'average_grade' => round($student->calculateAverageGrade(), 2),
        ];
    });
        return response()->json($students);
    }

    public function store(Request $request){
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'subject1_grade' => 'required|numeric|min:0|max:10',
            'subject2_grade' => 'required|numeric|min:0|max:10',
            'subject3_grade' => 'required|numeric|min:0|max:10',
            'subject4_grade' => 'required|numeric|min:0|max:10',
            'subject5_grade' => 'required|numeric|min:0|max:10',
            'attendance_percentage' => 'required|numeric|min:0|max:100',
        ]);

        $student = Student::create($validated);
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
        return Student::where('attendance_percentage', '<', 75)
            ->get()
            ->map(function ($student) {
                return [
                    'id' => $student->id,
                    'name' => $student->name,
                    'attendance_percentage' => $student->attendance_percentage,
                    'average_grade' => round($student->calculateAverageGrade(), 2),
                ];
            })
            ->values();
    }

    public function getStudentsWithLowAttendance(){
        $students = $this->calculateStudentsWithLowAttendance();
        return response()->json($students);
    }

    public function calculateTopPerformingStudents(){
        $classAverage = $this->calculateClassAverageGrade();

        return Student::all()
            ->filter(function ($student) use ($classAverage) {
                return $student->calculateAverageGrade() > $classAverage;
            })
            ->map(function ($student) {
                return [
                    'id' => $student->id,
                    'name' => $student->name,
                    'average_grade' => round($student->calculateAverageGrade(), 2),
                    'top_subject' => $student->getTopSubject(),
                ];
            })
            ->values();
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