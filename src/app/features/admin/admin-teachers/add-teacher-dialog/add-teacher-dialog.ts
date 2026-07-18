import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

interface BookedSlot {
  date: string;
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

  experienceOptions = ['0-1 years', '1-3 years', '3-5 years', '5+ years'];
  aadharOptions = ['Verified', 'Not Verified', 'Pending'];

  photoFile: File | null = null;
  photoFileName: string = '';
  photoPreview!: null;

  activeField: 'start' | null = null;
  timeSlots: string[] = this.generateTimeSlots();

  slotError = '';

  // ============ CALENDAR STATE ============
  isCalendarOpen = false;
  selectedDate: Date = new Date();
  viewYear = this.selectedDate.getFullYear();
  viewMonth = this.selectedDate.getMonth();
  calendarDays: (Date | null)[] = [];
  monthLabel = '';
  weekDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  // ==========================================

  teacher = {
    firstName: '',
    lastName: '',
    experience: '',
    contactNumber: '',
    aadharNumber: '',
    email: '',
    photo: null as File | null,
    bookingDate: '',
    startTime: '',
    slots: [] as BookedSlot[]
  };

  constructor(private elRef: ElementRef) {}

  ngOnInit(): void {
    this.setDefaultDateAndTime();
    this.buildCalendar();
  }

  // ============ AUTO DATE & TIME ============
  private setDefaultDateAndTime(): void {
    const now = new Date();
    this.selectedDate = now;
    this.viewYear = now.getFullYear();
    this.viewMonth = now.getMonth();

    this.teacher.bookingDate = this.formatDisplayDate(now);

    const roundedStart = this.roundToNext15Min(now);
    this.teacher.startTime = this.formatTime12h(roundedStart);
  }

  private formatDisplayDate(date: Date): string {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric'
    });
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
  // ============ END AUTO DATE & TIME ============

  // ============ CALENDAR LOGIC ============
  toggleCalendar(event: Event): void {
    event.stopPropagation();
    this.isCalendarOpen = !this.isCalendarOpen;
    this.activeField = null;
    if (this.isCalendarOpen) {
      this.viewYear = this.selectedDate.getFullYear();
      this.viewMonth = this.selectedDate.getMonth();
      this.buildCalendar();
    }
  }

  private buildCalendar(): void {
    const firstDay = new Date(this.viewYear, this.viewMonth, 1);
    const lastDay = new Date(this.viewYear, this.viewMonth + 1, 0);
    const startOffset = firstDay.getDay(); // 0 = Sunday

    const days: (Date | null)[] = [];
    for (let i = 0; i < startOffset; i++) {
      days.push(null);
    }
    for (let d = 1; d <= lastDay.getDate(); d++) {
      days.push(new Date(this.viewYear, this.viewMonth, d));
    }

    this.calendarDays = days;
    this.monthLabel = firstDay.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  }

  prevMonth(): void {
    this.viewMonth--;
    if (this.viewMonth < 0) {
      this.viewMonth = 11;
      this.viewYear--;
    }
    this.buildCalendar();
  }

  nextMonth(): void {
    this.viewMonth++;
    if (this.viewMonth > 11) {
      this.viewMonth = 0;
      this.viewYear++;
    }
    this.buildCalendar();
  }

  selectDate(day: Date): void {
    this.selectedDate = day;
    this.teacher.bookingDate = this.formatDisplayDate(day);
    this.isCalendarOpen = false;
  }

  isToday(day: Date): boolean {
    const today = new Date();
    return day.toDateString() === today.toDateString();
  }

  isSelected(day: Date): boolean {
    return day.toDateString() === this.selectedDate.toDateString();
  }

  isPast(day: Date): boolean {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return day < today;
  }
  // ============ END CALENDAR LOGIC ============

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
    this.isCalendarOpen = false;
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
      this.isCalendarOpen = false;
    }
  }

  // ============ BOOK SLOTS LIST ============
  canAddSlot(): boolean {
    return !!(this.teacher.bookingDate && this.teacher.startTime);
  }

  addSlot(): void {
    this.slotError = '';

    if (!this.canAddSlot()) {
      this.slotError = 'Select a date and start time first.';
      return;
    }

    const isDuplicate = this.teacher.slots.some(
      s => s.date === this.teacher.bookingDate && s.startTime === this.teacher.startTime
    );
    if (isDuplicate) {
      this.slotError = 'This slot has already been added.';
      return;
    }

    this.teacher.slots.push({
      date: this.teacher.bookingDate,
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
      experience: '',
      contactNumber: '',
      aadharNumber: '',
      email: '',
      photo: null as File | null,
      bookingDate: '',
      startTime: '',
      slots: []
    };
    this.setDefaultDateAndTime();
    this.buildCalendar();
  }

  onSubmit(): void {
    this.addTeacher.emit(this.teacher);
    this.onClose();
  }
}