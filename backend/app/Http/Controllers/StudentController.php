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
}