import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, ViewChild } from '@angular/core';
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
export class AddTeacherDialog implements OnInit {
  @Input() isOpen = false;
  @Output() closeDrawer = new EventEmitter<void>();
  @Output() addTeacher = new EventEmitter<void>();

  @ViewChild('timeDropdownWrapper') timeDropdownWrapper!: ElementRef;



  aadharOptions = ['Verified', 'Not Verified', 'Pending'];

  photoFile: File | null = null;
  photoFileName: string = '';
  photoPreview!: null;

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
    role:'teacher',
    contactNumber: '',
    aadharNo: '',
    // specialization: '',
    // experience: '',
    // qulification : '',
    // bio:'',
    photo: null as File | null,
    googleMeetLink: '',
    startTime: '',
    slots: [] as BookedSlot[]
  };

 constructor(
  private elRef: ElementRef,
  private adminServe: AdminService,
  private toastr: ToastrService
) {}

  ngOnInit(): void {
  }

  private setDefaultTime(): void {
    const now = new Date();
    const roundedStart = this.roundToNext15Min(now);
    this.teacher.startTime = this.formatTime12h(roundedStart);
  }

  private roundToNext15Min(date: Date): Date {
    const ms = 1000 * 60 * 15;
    return new Date(Math.ceil(date.getTime() / ms) * ms);
  }

  private formatTime12h(date: Date): string {
    let hours = date.getHours();
    const minutes = date.getMinutes();

    const period = hours < 12 ? 'AM' : 'PM';

    hours = hours % 12;
    if (hours === 0) hours = 12;

    const hh = String(hours).padStart(2, '0');
    const mm = String(minutes).padStart(2, '0');

    return `${hh}:${mm}${period}`;
  }

  private generateTimeSlots(): string[] {
    const slots: string[] = [];

    for (let h = 0; h < 24; h++) {
      const period = h < 12 ? 'AM' : 'PM';

      let hour12 = h % 12;
      if (hour12 === 0) hour12 = 12;

      const hh = String(hour12).padStart(2, '0');

      slots.push(`${hh}:00${period}`);
    }

    return slots;
  }

 toggleTimeDropdown(field: 'start', event: Event): void {
  event.stopPropagation();

  this.activeField = this.activeField === field ? null : field;

  this.manualTimeInput = '';
  this.manualTimeError = '';

  setTimeout(() => {
    const dropdown = document.querySelector('.time-dropdown') as HTMLElement;
    const chip = document.querySelector('.time-chip') as HTMLElement;

    if (dropdown && chip) {
      const chipRect = chip.getBoundingClientRect();
      const dropdownHeight = dropdown.offsetHeight;

      const windowHeight = window.innerHeight;

      const spaceBottom = windowHeight - chipRect.bottom;
      const spaceTop = chipRect.top;

      this.openDropdownUp =
        spaceBottom < dropdownHeight && spaceTop > dropdownHeight;
    }
  }, 50);
}

  selectTime(field: 'start', slot: string): void {
    this.teacher.startTime = slot;
    this.activeField = null;
  }

 capitalizeName(field: 'firstName' | 'lastName'): void {
  if (this.teacher[field]) {
    this.teacher[field] = this.teacher[field]
      .trim()
      .toLowerCase()
      .replace(/\b\w/g, (char: string) => char.toUpperCase());
  }
}

  confirmManualTime(): void {
    this.manualTimeError = '';

    const raw = this.manualTimeInput.trim();
    const match = raw.match(/^(1[0-2]|0?[1-9]):([0-5][0-9])\s*(am|pm)$/i);

    if (!match) {
      this.manualTimeError = 'Enter a valid time, e.g. 09:15AM.';
      return;
    }

    const hh = match[1].padStart(2, '0');
    const mm = match[2];
    const period = match[3].toUpperCase();

    this.teacher.startTime = `${hh}:${mm}${period}`;
    this.manualTimeInput = '';
    this.activeField = null;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    if (!this.elRef.nativeElement.contains(event.target)) {
      this.activeField = null;
    }
  }

  canAddSlot(): boolean {
    return !!this.teacher.startTime;
  }

  addSlot(): void {
    this.slotError = '';

    if (!this.canAddSlot()) {
      this.slotError = 'Select a start time first.';
      return;
    }

    const isDuplicate = this.teacher.slots.some(
      s => s.time === this.teacher.startTime
    );
    if (isDuplicate) {
      this.slotError = 'This time slot has already been added.';
      return;
    }

    this.teacher.slots.push({
    date: new Date().toISOString().split('T')[0],
    time: this.teacher.startTime
  });
  }

  removeSlot(index: number): void {
    this.teacher.slots.splice(index, 1);
  }

  onPhotoSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;

    this.photoFile = file;
    this.photoFileName = file.name;
    this.teacher.photo = file;
  }

  removePhoto(event: Event): void {
    event.stopPropagation();
    this.photoPreview = null;
    this.photoFile = null;
    this.photoFileName = '';
    this.teacher.photo = null;
  }

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
      // specialization: '',
      // experience: '',
      // qulification: '',
      // bio: '',
      photo: null as File | null,
      googleMeetLink: '',
      startTime: '',
      slots: [] as BookedSlot[]
    };
    this.photoFile = null;
    this.photoFileName = '';
    this.slotError = '';
    this.submitError = '';
    this.manualTimeInput = '';
    this.manualTimeError = '';
    this.setDefaultTime();
  }



  onSubmit(form: NgForm): void {
    this.capitalizeName('firstName');
    this.capitalizeName('lastName');

    console.log(this.teacher);
    
    this.submitError = '';

    if (form.invalid) {
      form.control.markAllAsTouched();
      return;
    }

    if (this.teacher.slots.length === 0) {
      this.slotError = 'Add at least one slot before submitting.';
      return;
    }

    this.isSubmitting = true;
      console.log(this.teacher);
    this.adminServe.addTeacher(this.teacher).subscribe({
      next: () => {
  this.isSubmitting = false;

  this.addTeacher.emit();

  this.toastr.success(
    'New teacher added successfully.',"",{
      timeOut: 3000,
      positionClass: 'toast-top-right'
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
    err?.error?.message || 'Failed to add teacher. Please try again.';

  this.toastr.error(
    this.submitError,
  );

  console.error('Add teacher failed:', err);
}
    });
  }
}