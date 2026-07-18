import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink
],
  templateUrl: './registration.html',
  styleUrl: './registration.css'
})
export class RegistrationComponent {

  registrationForm: FormGroup;

  districts = [
    'Pune',
    'Mumbai',
    'Kolhapur',
    'Sangli',
    'Satara',
    'Nashik',
    'Nagpur',
    'Solapur'
  ];

  qualifications = [
    '10th',
    '12th',
    'Diploma',
    'Graduate',
    'Post Graduate',
    'Other'
  ];

  occupations = [
    'Student',
    'Business',
    'Employee',
    'Self Employed',
    'Housewife',
    'Other'
  ];

  constructor(private fb: FormBuilder) {

    this.registrationForm = this.fb.group({

      firstname: [
        '',
        [
          Validators.required,
          Validators.minLength(3)
        ]
      ],

      lastname: [
        '',
        [
          Validators.required,
          Validators.minLength(3)
        ]
      ],

      mobile: [
        '',
        [
          Validators.required,
          Validators.pattern('^[6-9][0-9]{9}$')
        ]
      ],

      email: [
        '',
        [
          Validators.required,
          Validators.email
        ]
      ],
      
      password:[
        '',
        [
          Validators.required

        ]
      ],
      confirmPassword:[
        '',
        [
          Validators.required

        ]
      ],

      // dob: [
      //   '',
      //   Validators.required
      // ],

      district: [
        '',
        Validators.required
      ],

      qualification: [
        '',
        Validators.required
      ],

      occupation: [
        '',
        Validators.required
      ]

    });

  }

  get f() {
    return this.registrationForm.controls;
  }

  onSubmit() {

    if (this.registrationForm.valid) {

      console.log(this.registrationForm.value);

      alert('Registration Successful');

    } else {

      this.registrationForm.markAllAsTouched();

    }

  }

  back() {
    history.back();
  }

}