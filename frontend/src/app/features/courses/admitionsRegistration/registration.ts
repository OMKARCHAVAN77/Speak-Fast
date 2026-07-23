import { QUALIFICATIONS } from './../../../core/Shared-common-list/qualification-list';
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
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { Observable } from 'rxjs/internal/Observable';
import { MAHARASHTRA_DISTRICTS } from '../../../core/Shared-common-list/district-list';
import { OCCUPATIONS } from '../../../core/Shared-common-list/occupations-list';


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


// function optionInListValidator(options: string[]) {
//   return (control: AbstractControl): ValidationErrors | null => {
//     const value = control.value;
//     if (!value) {
//       return null; // let Validators.required handle the empty case
//     }
//     return options.includes(value) ? null : { notInList: true };
//   };
// }

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

    MatAutocompleteModule
],
  templateUrl: './registration.html',
  styleUrl: './registration.css'
})
export class RegistrationComponent implements OnInit {



  // registrationForm: FormGroup;

 districts = MAHARASHTRA_DISTRICTS;


searchDistrict = '';
filteredDistricts: string[] = [];
showDistrictDropdown = false;

  qualifications = QUALIFICATIONS;
  filteredQualifications: string[] = [];
  showQualificationDropdown = false;
  // searchQualification='';

  occupations = OCCUPATIONS;
  filteredOccupations: string[] = [];
  showOccupationDropdown = false;


  // NEW: controls whether password fields render as plain text or masked
  showPassword = false;
  showConfirmPassword = false;

  // NEW: searchable dropdown state for District and Qualification
  // showDistrictDropdown = false;

  // filteredDistricts: string[] = this.districts;

  registrationForm!: FormGroup;


  constructor(private fb: FormBuilder, private studentServ:StudentService, private http: HttpClient) {



  }


  ngOnInit(): void {
      this.formInitialization();



  }

  formInitialization() {
      this.registrationForm = this.fb.group({
        firstName: [''],
        lastName: [''],
        contactNumber: [''],
        email: [''],
        password: ['Abc@1234'],
        confirmPassword: ['Abc@1234'],
        district: [null],
        qualification: [null],
        occupation: ['']

      });
  }


    // filterDistricts() {
    //   const search =
    //     this.registrationForm.get('district')?.value?.toLowerCase() || '';

    //   this.filteredDistricts = this.districts.filter(district =>
    //     district.toLowerCase().includes(search)
    //   );
    // }

    // selectDistrict(district: string) {
    //   this.registrationForm.patchValue({
    //     district: district
    //   });

    //   this.filteredDistricts = [];
    // }

    filterDistricts() {
    const search =
      this.registrationForm.get('district')?.value?.toLowerCase() || '';

    this.filteredDistricts = this.districts.filter(d =>
      d.toLowerCase().includes(search)
    );

    this.showDistrictDropdown = true;
  }

  showAllDistricts() {
    this.filteredDistricts = [...this.districts];
    this.showDistrictDropdown = true;
  }

  toggleDistrictDropdown() {
    this.showDistrictDropdown = !this.showDistrictDropdown;

    if (this.showDistrictDropdown) {
      this.filteredDistricts = [...this.districts];
    }
  }

  selectDistrict(district: string) {
    this.registrationForm.patchValue({
      district
    });

    this.showDistrictDropdown = false;
  }


  //   filterQualifications() {
  // const search =
  //   this.registrationForm.get('qualification')?.value?.toLowerCase() || '';

  //   this.filteredQualifications = this.qualifications.filter(qualification =>
  //     qualification.toLowerCase().includes(search)
  //   );
  // }

  // selectQualification(qualification: string) {
  //   this.registrationForm.patchValue({
  //     qualification: qualification
  //   });

  //   this.filteredQualifications = [];
  // }



filterQualifications() {
  const search =
    this.registrationForm.get('qualification')?.value?.toLowerCase() || '';

    this.filteredQualifications = this.qualifications.filter(q =>
      q.toLowerCase().includes(search)
    );

    this.showQualificationDropdown = true;
  }

  showAllQualifications() {
    this.filteredQualifications = [...this.qualifications];
    this.showQualificationDropdown = true;
  }

  toggleQualificationDropdown() {
    this.showQualificationDropdown = !this.showQualificationDropdown;

    if (this.showQualificationDropdown) {
      this.filteredQualifications = [...this.qualifications];
    }
  }

  selectQualification(qualification: string) {
    this.registrationForm.patchValue({
      qualification
    });

    this.showQualificationDropdown = false;
  }

  // filterOccupations() {
  // const search =
  //   this.registrationForm.get('occupation')?.value?.toLowerCase() || '';

  //   this.filteredOccupations = this.occupations.filter(occupation =>
  //     occupation.toLowerCase().includes(search)
  //   );
  // }

  // selectOccupation(occupation: string) {
  //   this.registrationForm.patchValue({
  //     occupation: occupation
  //   });

  //   this.filteredOccupations = [];
  // }

  filterOccupations() {
  const search =
    this.registrationForm.get('occupation')?.value?.toLowerCase() || '';

  this.filteredOccupations = this.occupations.filter(o =>
    o.toLowerCase().includes(search)
  );

  this.showOccupationDropdown = true;
}

showAllOccupations() {
  this.filteredOccupations = [...this.occupations];
  this.showOccupationDropdown = true;
}

toggleOccupationDropdown() {
  this.showOccupationDropdown = !this.showOccupationDropdown;

  if (this.showOccupationDropdown) {
    this.filteredOccupations = [...this.occupations];
  }
}

selectOccupation(occupation: string) {
  this.registrationForm.patchValue({
    occupation: occupation
  });

  this.showOccupationDropdown = false;
}
  onSubmit() {
    console.log("form value is ",this.registrationForm.valid);
    if (this.registrationForm.valid) {


      this.http.post ('http://localhost:5000/api/students/register',this.registrationForm.value).subscribe({
        next:(data:any)=>{
          console.log(data.massage)
          alert('sucessfully registered');
          this.registrationForm.reset();
        },error:(err:any)=>{
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

