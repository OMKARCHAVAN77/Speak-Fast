import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { AdminService } from '../../../../core/services/admin.service';
import { ToastrService } from 'ngx-toastr';

interface BookedSlot {
  date: string;
  time: string;
}

@Component({
  selector: 'app-add-teacher-dialog',
  imports: [CommonModule, FormsModule, MatIconModule],
  templateUrl: './add-teacher-dialog.html',
  styleUrls: ['./add-teacher-dialog.css'],
})
export class AddTeacherDialog implements OnInit, OnChanges, AfterViewInit {

  @Input() teacherData: any = null;
  isEditMode = false;

  @Input() isOpen = false;

  @Output() closeDrawer = new EventEmitter<void>();
  @Output() addTeacher = new EventEmitter<void>();

  @ViewChild('timeDropdownWrapper')
  timeDropdownWrapper!: ElementRef;

  @ViewChild('firstNameInput')
  firstNameInput!: ElementRef<HTMLInputElement>;

  aadharOptions = ['Verified', 'Not Verified', 'Pending'];

  photoFile: File | null = null;
  photoFileName: string = '';
  photoPreviewUrl: string | null = null;   // 🔹 NEW
  isDragOver = false;

  activeField: 'start' | null = null;
  openDropdownUp = false;

  timeSlots: string[] = this.generateTimeSlots();

  manualTimeInput = '';
  manualTimeError = '';

  slotError = '';

  isSubmitting = false;
  submitError = '';

  teacher = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    role: 'teacher',
    contactNumber: '',
    aadharNo: '',
    photo: null as File | null,
    googleMeetLink: '',
    startTime: '',
    slots: [] as BookedSlot[],
  };

  constructor(
    private elRef: ElementRef,
    private adminServe: AdminService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}

  onBrowseClick(event: Event): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['teacherData']) {
      if (this.teacherData) {
        this.isEditMode = true;

        console.log(
          'Received teacherData for editing:',
          this.teacherData
        );

        this.patchTeacherData(this.teacherData);
      } else {
        this.isEditMode = false;
        this.resetForm();
      }
    }
  }

  private patchTeacherData(teacher: any): void {
    this.teacher = {
      firstName: teacher.userId?.firstName || '',
      lastName: teacher.userId?.lastName || '',
      email: teacher.userId?.email || '',
      password: teacher.userId?.password || '',
      role: teacher.userId?.role || 'teacher',
      contactNumber: teacher.contactNumber || '',
      aadharNo: teacher.aadharNo || '',
      photo: teacher.photo || null,
      googleMeetLink: teacher.googleMeetLink || '',
      startTime: teacher.startTime || '',
      slots: teacher.slots ? [...teacher.slots] : [],
    };

    // 🔹 NEW: existing photo असेल तर तिचा preview दाखवा
    if (teacher.photo) {
      this.photoPreviewUrl = teacher.photo;
      this.photoFileName = teacher.photo.split('/').pop() || 'Uploaded photo';
    } else {
      this.photoPreviewUrl = null;
      this.photoFileName = '';
    }
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.firstNameInput?.nativeElement.focus();
    }, 0);
  }

  // =========================================================
  // NUMBER VALIDATION
  // =========================================================

  /**
   * Keyboard वरून फक्त numbers allow करतो.
   */
  allowOnlyNumbers(event: KeyboardEvent): void {

    const allowedKeys = [
      'Backspace',
      'Delete',
      'Tab',
      'ArrowLeft',
      'ArrowRight',
      'Home',
      'End'
    ];

    if (allowedKeys.includes(event.key)) {
      return;
    }

    if (!/^[0-9]$/.test(event.key)) {
      event.preventDefault();
    }
  }

  /**
   * Paste केल्यावरसुद्धा फक्त numbers ठेवतो.
   *
   * Contact Number -> maximum 10 digits
   * Aadhar Number  -> maximum 12 digits
   */
  onNumberInput(
    event: Event,
    field: 'contactNumber' | 'aadharNo'
  ): void {

    const input = event.target as HTMLInputElement;

    const numbersOnly = input.value.replace(/\D/g, '');

    if (field === 'contactNumber') {

      this.teacher.contactNumber = numbersOnly.slice(0, 10);

    } else {

      this.teacher.aadharNo = numbersOnly.slice(0, 12);
    }
  }

  // =========================================================
  // TIME
  // =========================================================

  private setDefaultTime(): void {
    const now = new Date();

    const roundedStart = this.roundToNext15Min(now);

    this.teacher.startTime =
      this.formatTime12h(roundedStart);
  }

  private roundToNext15Min(date: Date): Date {
    const ms = 1000 * 60 * 15;

    return new Date(
      Math.ceil(date.getTime() / ms) * ms
    );
  }

  private formatTime12h(date: Date): string {

    let hours = date.getHours();

    const minutes = date.getMinutes();

    const period = hours < 12 ? 'AM' : 'PM';

    hours = hours % 12;

    if (hours === 0) {
      hours = 12;
    }

    const hh = String(hours).padStart(2, '0');

    const mm = String(minutes).padStart(2, '0');

    return `${hh}:${mm}${period}`;
  }

  private generateTimeSlots(): string[] {

    const slots: string[] = [];

    for (let h = 0; h < 24; h++) {

      const period = h < 12 ? 'AM' : 'PM';

      let hour12 = h % 12;

      if (hour12 === 0) {
        hour12 = 12;
      }

      const hh = String(hour12).padStart(2, '0');

      slots.push(`${hh}:00${period}`);
    }

    return slots;
  }

  toggleTimeDropdown(
    field: 'start',
    event: Event
  ): void {

    event.stopPropagation();

    this.activeField =
      this.activeField === field
        ? null
        : field;

    this.manualTimeInput = '';
    this.manualTimeError = '';

    setTimeout(() => {

      const dropdown =
        document.querySelector(
          '.time-dropdown'
        ) as HTMLElement;

      const chip =
        document.querySelector(
          '.time-chip'
        ) as HTMLElement;

      if (dropdown && chip) {

        const chipRect =
          chip.getBoundingClientRect();

        const dropdownHeight =
          dropdown.offsetHeight;

        const windowHeight =
          window.innerHeight;

        const spaceBottom =
          windowHeight - chipRect.bottom;

        const spaceTop =
          chipRect.top;

        this.openDropdownUp =
          spaceBottom < dropdownHeight &&
          spaceTop > dropdownHeight;
      }

    }, 50);
  }

  selectTime(
    field: 'start',
    slot: string
  ): void {

    this.teacher.startTime = slot;

    this.activeField = null;
  }

  capitalizeName(
    field: 'firstName' | 'lastName'
  ): void {

    if (this.teacher[field]) {

      this.teacher[field] =
        this.teacher[field]
          .trim()
          .toLowerCase()
          .replace(
            /\b\w/g,
            (char: string) =>
              char.toUpperCase()
          );
    }
  }

  confirmManualTime(): void {

    this.manualTimeError = '';

    const raw =
      this.manualTimeInput.trim();

    const match =
      raw.match(
        /^(1[0-2]|0?[1-9]):([0-5][0-9])\s*(am|pm)$/i
      );

    if (!match) {

      this.manualTimeError =
        'Enter a valid time, e.g. 09:15AM.';

      return;
    }

    const hh =
      match[1].padStart(2, '0');

    const mm = match[2];

    const period =
      match[3].toUpperCase();

    this.teacher.startTime =
      `${hh}:${mm}${period}`;

    this.manualTimeInput = '';

    this.activeField = null;
  }

  @HostListener(
    'document:click',
    ['$event']
  )
  onDocumentClick(event: Event): void {

    if (
      !this.elRef.nativeElement.contains(
        event.target
      )
    ) {
      this.activeField = null;
    }
  }

  // =========================================================
  // SLOTS
  // =========================================================

  canAddSlot(): boolean {
    return !!this.teacher.startTime;
  }

  addSlot(): void {

    this.slotError = '';

    if (!this.canAddSlot()) {

      this.slotError =
        'Select a start time first.';

      return;
    }

    const isDuplicate =
      this.teacher.slots.some(
        s =>
          s.time ===
          this.teacher.startTime
      );

    if (isDuplicate) {

      this.slotError =
        'This time slot has already been added.';

      return;
    }

    this.teacher.slots.push({
      date:
        new Date()
          .toISOString()
          .split('T')[0],

      time:
        this.teacher.startTime
    });

    this.teacher.startTime = '';

    this.activeField = null;

    this.openDropdownUp = false;
  }

  removeSlot(index: number): void {
    this.teacher.slots.splice(index, 1);
  }

  // =========================================================
  // PHOTO
  // =========================================================

  onPhotoSelected(event: Event): void {

    const input =
      event.target as HTMLInputElement;

    const file =
      input.files?.[0];

    if (!file) {
      return;
    }

    this.setPhoto(file);
  }

  onDragOver(event: DragEvent): void {

    event.preventDefault();
    event.stopPropagation();

    this.isDragOver = true;
  }

  onDragLeave(event: DragEvent): void {

    event.preventDefault();
    event.stopPropagation();

    this.isDragOver = false;
  }

  onDrop(event: DragEvent): void {

    event.preventDefault();
    event.stopPropagation();

    this.isDragOver = false;

    const file =
      event.dataTransfer?.files?.[0];

    if (
      file &&
      file.type.startsWith('image/')
    ) {
      this.setPhoto(file);
    }
  }

  private setPhoto(file: File): void {

    this.photoFile = file;

    this.photoFileName = file.name;

    this.teacher.photo = file;

       // 🔹 NEW: नवीन file चा local preview तयार करा
    const reader = new FileReader();
    reader.onload = () => {
      this.photoPreviewUrl = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  removePhoto(event: Event): void {

    event.stopPropagation();

    this.photoFile = null;

    this.photoFileName = '';

    this.photoPreviewUrl = null;   // 🔹 NEW

    this.teacher.photo = null;
  }

  // =========================================================
  // CLOSE / RESET
  // =========================================================

  onClose(): void {
    this.closeDrawer.emit();
  }

  onBackdropClick(): void {
    this.onClose();
  }

  onDelete(): void {
    this.resetForm();
  }

  private resetForm(): void {

    this.teacher = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      role: 'teacher',
      contactNumber: '',
      aadharNo: '',
      photo: null as File | null,
      googleMeetLink: '',
      startTime: '',
      slots: [] as BookedSlot[]
    };

    this.photoFile = null;

    this.photoFileName = '';

    this.photoPreviewUrl = null;   // 🔹 NEW

    this.slotError = '';

    this.submitError = '';

    this.manualTimeInput = '';

    this.manualTimeError = '';

    this.isSubmitting = false;
  }

  // =========================================================
  // SUBMIT
  // =========================================================

  onSubmit(form: NgForm): void {

    this.capitalizeName('firstName');

    this.capitalizeName('lastName');

    console.log(this.teacher);

    this.submitError = '';

    // Form validation
    if (form.invalid) {

      form.control.markAllAsTouched();

      return;
    }

    // Extra mobile validation
    if (
      !/^[6-9][0-9]{9}$/.test(
        this.teacher.contactNumber
      )
    ) {

      this.submitError =
        'Please enter a valid 10-digit mobile number.';

      this.toastr.error(
        this.submitError
      );

      return;
    }

    // Extra Aadhaar validation
    if (
      !/^[0-9]{12}$/.test(
        this.teacher.aadharNo
      )
    ) {

      this.submitError =
        'Please enter a valid 12-digit Aadhar number.';

      this.toastr.error(
        this.submitError
      );

      return;
    }

    // Slot validation
    if (this.teacher.slots.length === 0) {

      this.slotError =
        'Add at least one slot before submitting.';

      return;
    }

    this.isSubmitting = true;

    console.log(this.teacher);

    const apiCall$ =
      this.isEditMode && this.teacherData
        ? this.adminServe.updateTeacher(
            this.teacherData._id,
            this.teacher
          )
        : this.adminServe.addTeacher(
            this.teacher
          );

    apiCall$.subscribe({

      next: () => {

        this.isSubmitting = false;

        this.addTeacher.emit();

        this.toastr.success(
          this.isEditMode
            ? 'Teacher updated successfully.'
            : 'New teacher added successfully.',
          '',
          {
            timeOut: 3000,
            positionClass:
              'toast-bottom-center'
          }
        );

        this.resetForm();

        setTimeout(() => {
          this.onClose();
        }, 3000);
      },

      error: (err: any) => {

        this.isSubmitting = false;

        this.submitError =
          err?.error?.message ||
          'Failed to add teacher. Please try again.';

        this.toastr.error(
          this.submitError
        );

        console.error(
          'Add teacher failed:',
          err
        );
      }
    });
  }
}