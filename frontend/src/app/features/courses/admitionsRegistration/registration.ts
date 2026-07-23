import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
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
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { environment } from '../../../../environments/environments';


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
    ReactiveFormsModule,MatFormFieldModule,
MatInputModule,
MatIconModule,
MatSelectModule,
MatDatepickerModule,
MatNativeDateModule,
],
  templateUrl: './registration.html',
  styleUrl: './registration.css'
})
export class RegistrationComponent implements OnInit {



  // registrationForm: FormGroup;

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
  registrationForm!: FormGroup;

constructor(private fb: FormBuilder, private studentServ:StudentService, private http: HttpClient) {



  }


  ngOnInit(): void {
      this.formInitialization();
  }
  formInitialization() {
      this.registrationForm = this.fb.group({
        firstName: ['swai'],
        lastName: ['shettvy'],
        contactNumber: ['9223165720'],
        email: ['saishetety.ux@gmail.com'],
        password: ['Saisheqtty@123'],
        confirmPassword: ['Saiswhetty@123'],
        district: ['kolhapeur'],
        qualification: ['wwBtech'],
        occupation: ['Studeent']

      });
  }

  onSubmit() {
    console.log("form value is ",this.registrationForm.valid);
    if (this.registrationForm.valid) {


      this.http.post (`${environment.apiUrl}/students/register`,this.registrationForm.value).subscribe({
        next:(data:any)=>{
          console.log(data.massage)
          alert('sucessfully registered');
          this.registrationForm.reset();
        },error:(err:any)=>{
            alert("Success Messeage")
          console.log(err)
                    alert('fail registertion');
        }
      })

      // alert('Registration Successful');
      console.log(this.registrationForm.value);

    } else {

      this.registrationForm.markAllAsTouched();

    }

  }

  

}
//   ngOnInit(): void {

//     this.initializeForm();


//   }

//   initializeForm():void{
//       this.registrationForm = this.fb.group({
//         firstName: ['sai'],
//         lastName: ['shetty'],
//         contactNumber: ['9423165720'],
//         email: ['saishetty.ux@gmail.com'],
//         password: ['Saishetty@123'],
//         confirmPassword: ['Saishetty@123'],
//         district: ['kolhapur'],
//         qualification: ['Btech'],
//         occupation: ['Student']

//       });
//   }

//   onSubmit():void{
//         console.log("value is ",this.registrationForm.value);
//         this.http.post(`http://${environment.apiUrl}/students/register`,this.registrationForm.value)
//          .subscribe({
//             next: (response) => {
//               console.log(response);
//               alert('Student registered successfully!');
//             },
//             error: (err) => {
//               console.error(err);
//               alert('Registration failed!');
//             }
//           });

//   }
// }
