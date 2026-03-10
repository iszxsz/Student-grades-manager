<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\StudentController;

Route::apiResource('students', StudentController::class);
Route::get('dashboard', [StudentController::class, 'dashboard']);
Route::get('class-average-grades', [StudentController::class, 'classAverageGradesPerSubject']);
Route::get('class-average-grade', [StudentController::class, 'getClassAverageGrade']);
Route::get('students-with-low-attendance', [StudentController::class, 'getStudentsWithLowAttendance']);
Route::get('top-performing-students', [StudentController::class, 'getTopPerformingStudents']);
