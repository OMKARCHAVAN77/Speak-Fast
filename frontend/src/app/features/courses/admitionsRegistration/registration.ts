import { RegistrationValidator } from './../../../core/Validators/regist_validators.validator';
import { QUALIFICATIONS } from './../../../core/Shared-common-list/qualification-list';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { StudentService } from '../../../core/services/student.service';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MAHARASHTRA_DISTRICTS } from '../../../core/Shared-common-list/district-list';
import { OCCUPATIONS } from '../../../core/Shared-common-list/occupations-list';
import { environment } from '../../../../environments/environment';
import { ToastrService } from 'ngx-toastr';




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
  isPasswordHide: boolean = false;


  showPassword = false;
  showConfirmPassword = false;

  registrationForm!: FormGroup;


  constructor(private fb: FormBuilder, private studentServ:StudentService, private http: HttpClient,private toastr: ToastrService) {

  }


  ngOnInit(): void {
      this.formInitialization();
  }

  formInitialization() {
      this.registrationForm = this.fb.group({
        firstName: ['elon',[Validators.required,RegistrationValidator.noSpaceValidator]],
        lastName: ['musk',[Validators.required,RegistrationValidator.noSpaceValidator]],
        contactNumber: ['8796054576',[Validators.required ,RegistrationValidator.noSpaceValidator, RegistrationValidator.mobileNumber, RegistrationValidator.numberOnly]],
        email: ['elon@gmail.com',[Validators.required,RegistrationValidator.noSpaceValidator,RegistrationValidator.isEmailCorrect]],
        password: ['Asdf@1234',[Validators.required,RegistrationValidator.password]],
        confirmPassword: ['Asdf@1234',Validators.required],
        district: ['kolhapur',Validators.required],
        qualification: ['iti',Validators.required],
        occupation: ['others',Validators.required]

      },
  {
    validators: RegistrationValidator.passwordChecking
  });
  }



    togglePassword(){
      this.isPasswordHide=!this.isPasswordHide;
    }

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

      this.studentServ.addStudentApi(this.registrationForm.value).subscribe({
        next:(data:any)=>{
          console.log(data.massage)
          this.toastr.success(
            'User registered successfully!',
            'Success'
          );
          this.registrationForm.reset();
        },error:(err:any)=>{
            alert("Success Messeage")
          console.log(err)

            this.toastr.error(
              'Registration failed!',
              'Error'
            );
        }
      })

      // alert('Registration Successful');
      console.log(this.registrationForm.value);

    } else {

      this.registrationForm.markAllAsTouched();

    }

  }


  get password() {
  return this.registrationForm.get('password');
}

get passwordValue(): string {
  return this.password?.value || '';
}

hasMinLength(): boolean {
  return this.passwordValue.length >= 8;
}

hasUppercase(): boolean {
  return /^[A-Z]/.test(this.passwordValue); // First letter uppercase
}

hasLowercase(): boolean {
  return /[a-z]/.test(this.passwordValue);
}

hasNumber(): boolean {
  return /\d/.test(this.passwordValue);
}

hasSpecialChar(): boolean {
  return /[@$!%*?&#^()_\-+=]/.test(this.passwordValue);
}


isPasswordValid(): boolean {
  return (
    this.hasMinLength() &&
    this.hasUppercase() &&
    this.hasLowercase() &&
    this.hasNumber() &&
    this.hasSpecialChar()
  );
}
}

