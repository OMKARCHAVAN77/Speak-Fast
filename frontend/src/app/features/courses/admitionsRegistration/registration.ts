import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators
} from '@angular/forms';
import { StudentService } from '../../../core/services/student.service';


function passwordMatchValidator(group: AbstractControl): ValidationErrors | null {
  const password = group.get('password')?.value;
  const confirmPassword = group.get('confirmPassword')?.value;
  const confirmControl = group.get('confirmPassword');

  if (!confirmControl) {
    return null;
  }

  if (password && confirmPassword && password !== confirmPassword) {
    confirmControl.setErrors({ ...confirmControl.errors, mismatch: true });
    return { mismatch: true };
  }

  
  if (confirmControl.hasError('mismatch')) {
    const { mismatch, ...rest } = confirmControl.errors ?? {};
    confirmControl.setErrors(Object.keys(rest).length ? rest : null);
  }

  return null;
}


function optionInListValidator(options: string[]) {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (!value) {
      return null; // let Validators.required handle the empty case
    }
    return options.includes(value) ? null : { notInList: true };
  };
}

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
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

  // NEW: controls whether password fields render as plain text or masked
  showPassword = false;
  showConfirmPassword = false;

  // NEW: searchable dropdown state for District and Qualification
  showDistrictDropdown = false;
  showQualificationDropdown = false;
  filteredDistricts: string[] = this.districts;
  filteredQualifications: string[] = this.qualifications;

  constructor(private fb: FormBuilder, private studentServ:StudentService) {

    this.registrationForm = this.fb.group({

      firstName: [
        '',
        [
          Validators.required,
          Validators.minLength(3)
        ]
      ],

      lastName: [
        '',
        [
          Validators.required,
          Validators.minLength(3)
        ]
      ],

      contactNumber: [
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
        [Validators.required, optionInListValidator(this.districts)]
      ],

      qualification: [
        '',
        [Validators.required, optionInListValidator(this.qualifications)]
      ],

      occupation: [
        '',
        Validators.required
      ]

    }, { validators: passwordMatchValidator });

  }

  get f() {
    return this.registrationForm.controls;
  }

  // NEW: toggle handlers for the eye icons
  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  // NEW: District searchable dropdown handlers
  onDistrictFocus(): void {
    this.filteredDistricts = this.districts;
    this.showDistrictDropdown = true;
  }

  onDistrictInput(): void {
    const value = (this.f['district'].value || '').toLowerCase();
    this.filteredDistricts = this.districts.filter((d) =>
      d.toLowerCase().includes(value)
    );
    this.showDistrictDropdown = true;
  }

  selectDistrict(district: string): void {
    this.registrationForm.get('district')?.setValue(district);
    this.showDistrictDropdown = false;
  }

  onDistrictBlur(): void {
    // small delay so a click on a list item (mousedown) registers
    // before the list closes
    setTimeout(() => (this.showDistrictDropdown = false), 150);
  }

  // NEW: Qualification searchable dropdown handlers
  onQualificationFocus(): void {
    this.filteredQualifications = this.qualifications;
    this.showQualificationDropdown = true;
  }

  onQualificationInput(): void {
    const value = (this.f['qualification'].value || '').toLowerCase();
    this.filteredQualifications = this.qualifications.filter((q) =>
      q.toLowerCase().includes(value)
    );
    this.showQualificationDropdown = true;
  }

  selectQualification(qualification: string): void {
    this.registrationForm.get('qualification')?.setValue(qualification);
    this.showQualificationDropdown = false;
  }

  onQualificationBlur(): void {
    setTimeout(() => (this.showQualificationDropdown = false), 150);
  }

  onSubmit() {

    if (this.registrationForm.valid) {

      this.studentServ.addStudentApi(this.registrationForm.value).subscribe({
        next:(data:any)=>{
          console.log(data)
          this.registrationForm.reset();
        },error:(err:any)=>{
          console.log(err)
        }
      })
      
      // alert('Registration Successful');
      console.log(this.registrationForm.value);

    } else {

      this.registrationForm.markAllAsTouched();

    }

  }

  back() {
    history.back();
  }

}