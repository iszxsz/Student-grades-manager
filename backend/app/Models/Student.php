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
}
