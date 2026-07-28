import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { TeacherService } from '../../../../core/services/teacher.service';
import { AdminService } from '../../../../core/services/admin.service';

interface BookedSlot {
  startTime: string;
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

  aadharOptions = ['Verified', 'Not Verified', 'Pending'];

  photoFile: File | null = null;
  photoFileName: string = '';
  photoPreview!: null;

  activeField: 'start' | null = null;
  timeSlots: string[] = this.generateTimeSlots();

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
    specialization: '',
    experience: '',
    qulification : '',
    bio:'',
    photo: null as File | null,
    googleMeetLink: '',
    startTime: '',
    slots: [] as BookedSlot[]
  };

  constructor(
    private elRef: ElementRef,
    private adminServe: AdminService
  ) {}

  ngOnInit(): void {
    this.setDefaultTime();
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

    const period = hours < 12 ? 'am' : 'pm';

    hours = hours % 12;
    if (hours === 0) hours = 12;

    const hh = String(hours).padStart(2, '0');
    const mm = String(minutes).padStart(2, '0');

    return `${hh}:${mm}${period}`;
  }

  private generateTimeSlots(): string[] {
    const slots: string[] = [];

    for (let h = 0; h < 24; h++) {
      for (let m = 0; m < 60; m += 15) {
        const period = h < 12 ? 'am' : 'pm';

        let hour12 = h % 12;
        if (hour12 === 0) hour12 = 12;

        const hh = String(hour12).padStart(2, '0');
        const mm = String(m).padStart(2, '0');

        slots.push(`${hh}:${mm}${period}`);
      }
    }

    return slots;
  }

  toggleTimeDropdown(field: 'start', event: Event): void {
    event.stopPropagation();
    this.activeField = this.activeField === field ? null : field;
  }

  selectTime(field: 'start', slot: string): void {
    this.teacher.startTime = slot;
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
      s => s.startTime === this.teacher.startTime
    );
    if (isDuplicate) {
      this.slotError = 'This time slot has already been added.';
      return;
    }

    this.teacher.slots.push({
      startTime: this.teacher.startTime
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
      specialization: '',
      experience: '',
      qulification: '',
      bio: '',
      photo: null as File | null,
      googleMeetLink: '',
      startTime: '',
      slots: [] as BookedSlot[]
    };
    this.photoFile = null;
    this.photoFileName = '';
    this.slotError = '';
    this.submitError = '';
    this.setDefaultTime();
  }

  onSubmit(form: NgForm): void {
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

    this.adminServe.addTeacher(this.teacher).subscribe({
      next: () => {
        this.isSubmitting = false;
        this.addTeacher.emit();
        this.resetForm();
        this.onClose();
      },
      error: (err: any) => {
        this.isSubmitting = false;
        this.submitError = err?.error?.message || 'Failed to add teacher. Please try again.';
        console.error('Add teacher failed:', err);
      }
    });
  }
}