<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Student extends Model
{
    protected $fillable = [
        'name',
        'subject1_grade',
        'subject2_grade',
        'subject3_grade',
        'subject4_grade',
        'subject5_grade',
        'attendance_percentage',
    ];

    public function calculateAverageGrade(){
        return ($this->subject1_grade + $this->subject2_grade + $this->subject3_grade + $this->subject4_grade + $this->subject5_grade) / 5;
    }

    public function getTopSubject(){
        $grades = [
            'Materia 1' => $this->subject1_grade ?? 0,
            'Materia 2' => $this->subject2_grade ?? 0,
            'Materia 3' => $this->subject3_grade ?? 0,
            'Materia 4' => $this->subject4_grade ?? 0,
            'Materia 5' => $this->subject5_grade ?? 0,
        ];
        $maxGrade = max($grades);
        $topSubjects = array_keys($grades, $maxGrade);
        return $topSubjects[0] ?? null;
    }
}
