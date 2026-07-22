import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

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
  @Output() addTeacher = new EventEmitter<any>();

  aadharOptions = ['Verified', 'Not Verified', 'Pending'];

  photoFile: File | null = null;
  photoFileName: string = '';
  photoPreview!: null;

  activeField: 'start' | null = null;
  timeSlots: string[] = this.generateTimeSlots();

  slotError = '';

  teacher = {
    firstName: '',
    lastName: '',
    contactNumber: '',
    aadharNumber: '',
    email: '',
    googlemeetLink: '',
    photo: null as File | null,
    startTime: '',
    slots: [] as BookedSlot[]
  };

  constructor(private elRef: ElementRef) {}

  ngOnInit(): void {
    this.setDefaultTime();
  }

  // ============ AUTO TIME ============
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
    const mm = String(minutes).padStart(2, '0');
    return `${hours}:${mm}${period}`;
  }
  // ============ END AUTO TIME ============

  private generateTimeSlots(): string[] {
    const slots: string[] = [];
    for (let h = 0; h < 24; h++) {
      for (let m = 0; m < 60; m += 15) {
        const period = h < 12 ? 'am' : 'pm';
        let hour12 = h % 12;
        if (hour12 === 0) hour12 = 12;
        const mm = String(m).padStart(2, '0');
        slots.push(`${hour12}:${mm}${period}`);
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

  // ============ BOOK SLOTS LIST ============
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
  // ============ END BOOK SLOTS LIST ============

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
    this.teacher = {
      firstName: '',
      lastName: '',
      contactNumber: '',
      aadharNumber: '',
      email: '',
      googlemeetLink: '',
      photo: null as File | null,
      startTime: '',
      slots: []
    };
    this.setDefaultTime();
  }

  onSubmit(): void {
    this.addTeacher.emit(this.teacher);
    this.onClose();
  }
}