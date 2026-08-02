import { RouterLink } from '@angular/router';
import { OCCUPATIONS, QUALIFICATIONS,  } from '../../../core/Shared-common-list/registration-dummy-data';
import { RegistrationValidator } from './../../../core/Validators/regist_validators.validator';
import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, signal, viewChild, AfterViewInit } from '@angular/core';
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
import { MAHARASHTRA_DISTRICTS } from '../../../core/Shared-common-list/registration-dummy-data';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import {   ViewChild } from '@angular/core';

// interface formData{
//           firstName: '',
//           lastName: '',
//           contactNumber: '',
//           email:'',
//           password: '',

//           district: '',
//           qualification: '',
//           occupation:''

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
    RouterLink,
    MatAutocompleteModule
],
  templateUrl: './registration.html',
  styleUrl: './registration.css'
})
export class RegistrationComponent implements OnInit,AfterViewInit {


  districts = MAHARASHTRA_DISTRICTS;
  searchDistrict = '';
  filteredDistricts: string[] = [];
  showDistrictDropdown = false;

  qualifications = QUALIFICATIONS
  filteredQualifications: string[] = [];
  showQualificationDropdown = false;
  // searchQualification='';

  occupations = OCCUPATIONS;
  filteredOccupations: string[] = [];
  showOccupationDropdown = false;
  // isPasswordHide: boolean = false;

  // payLoadFormData!:formData;

  // showPassword = false;
  // showConfirmPassword = false;

  registrationForm!: FormGroup;


  @ViewChild('firstNameInp') firstNameInp!: ElementRef<HTMLInputElement>;

  isLoaderOn= signal<boolean>(false);
  constructor(private fb: FormBuilder, private studentServ:StudentService, private http: HttpClient,private toastr: ToastrService,private route: Router) {

  }


  ngOnInit(): void {
      this.formInitialization();
      this.setFirstLetterUpper();
  }

  setFirstLetterUpper():void{
    const controls = ['firstName', 'lastName'];

    controls.forEach(control => {
      this.registrationForm.get(control)?.valueChanges.subscribe(value => {
        if (!value) return;

        const formatted =
          value.charAt(0).toUpperCase() + value.slice(1);

        this.registrationForm.get(control)?.setValue(formatted, {
          emitEvent: false
        });
      });
     });
  }

  ngAfterViewInit(): void {
      this.firstNameInp.nativeElement.focus();
  }

    formInitialization() {
        this.registrationForm = this.fb.group({
          firstName: ['',[Validators.required,RegistrationValidator.noSpaceValidator]],
          lastName: ['',[Validators.required,RegistrationValidator.noSpaceValidator]],
          contactNumber: ['',[Validators.required ,RegistrationValidator.noSpaceValidator, RegistrationValidator.mobileNumber, RegistrationValidator.numberOnly]],
          email: ['',[Validators.required,RegistrationValidator.noSpaceValidator,RegistrationValidator.isEmailCorrect], [RegistrationValidator]],
          // password: ['',[Validators.required,RegistrationValidator.password]],
          // confirmPassword: ['',Validators.required],
          district: ['',Validators.required],
          qualification: ['',Validators.required],
          occupation: ['',Validators.required]

        },
    {
      // validators: RegistrationValidator.passwordChecking
    });
    }



    // togglePassword(){
    //   this.isPasswordHide=!this.isPasswordHide;
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
    const { ...payload } = this.registrationForm.value;
    //  this.payLoadFormData={...this.registrationForm.value};
    // console.log("Obervable value ------- ",this.studentServ.getCourseName(),"second ",this.studentServ.getCoursePrice());
    let val=this.registrationForm.value;

    const payLoadMain = {
        ...payload,
        teacherId: this.studentServ.getTeacherId()  ,
        slotId: this.studentServ.getSlotId(),
        courseName:this.studentServ.getCourseName(),
        coursePrice:this.studentServ.getCoursePrice()
      }
     console.log("main palyload ",payLoadMain);

    if(this.registrationForm.valid){
      this.isLoaderOn.set(true);


        this.studentServ.addStudentApi(payLoadMain).subscribe({
          next:(data:any)=>{
            console.log(data.massage)
            this.isLoaderOn.set(false);
            this.toastr.success(
              'User registered successfully!',
              'Success'
            );
            this.registrationForm.reset();
            this.route.navigate(['payment']);
          },error:(err:any)=>{

            this.isLoaderOn.set(false);
            console.log(err)

              this.toastr.error(
                'Registration failed!',
                'Error'
              );
          }
        })




    } else {
      this.registrationForm.markAllAsTouched();

    }

  }


  // get password() {
  //   return this.registrationForm.get('password');
  // }

  // get passwordValue(): string {
  //   return this.password?.value || '';
  // }

  // hasMinLength(): boolean {
  //   return this.passwordValue.length >= 8;
  // }

  // hasUppercase(): boolean {
  //   return /^[A-Z]/.test(this.passwordValue); // First letter uppercase
  // }

  // hasLowercase(): boolean {
  //   return /[a-z]/.test(this.passwordValue);
  // }

  // hasNumber(): boolean {
  //   return /\d/.test(this.passwordValue);
  // }

  // hasSpecialChar(): boolean {
  //   return /[@$!%*?&#^()_\-+=]/.test(this.passwordValue);
  // }


  // isPasswordValid(): boolean {
  //   return (
  //     this.hasMinLength() &&
  //     this.hasUppercase() &&
  //     this.hasLowercase() &&
  //     this.hasNumber() &&
  //     this.hasSpecialChar()
  //   );
  // }
}

