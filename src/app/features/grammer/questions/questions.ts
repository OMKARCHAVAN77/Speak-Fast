import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface QuizQuestion {
  category: string;
  text: string;
  options: string[];
}

@Component({
  selector: 'app-quiz-question',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './questions.html',
  styleUrls: ['./questions.css']
})
export class Questions {
 questions: QuizQuestion[] = [
    { category: 'Present Simple', text: 'She ____ to the market every Sunday.', options: ['Go', 'Goes', 'Going', 'Gone'] },
    { category: 'Present Simple', text: 'They ____ football on weekends.', options: ['Play', 'Plays', 'Playing', 'Played'] },
    { category: 'Past Simple', text: 'He ____ to Paris last summer.', options: ['travel', 'travels', 'traveled', 'traveling'] },
    { category: 'Past Simple', text: 'We ____ the movie yesterday.', options: ['watch', 'watches', 'watched', 'watching'] },
    { category: 'Present Continuous', text: 'Look! It ____ outside.', options: ['rain', 'rains', 'is raining', 'rained'] },
    { category: 'Future Simple', text: 'I think it ____ tomorrow.', options: ['will rain', 'rains', 'rained', 'is raining'] },
    { category: 'Articles', text: '____ sun rises in the east.', options: ['A', 'An', 'The', '(no article)'] },
    { category: 'Prepositions', text: 'The book is ____ the table.', options: ['on', 'in', 'at', 'by'] },
    { category: 'Modals', text: 'You ____ wear a seatbelt while driving.', options: ['must', 'can', 'might', 'would'] },
    { category: 'Conditionals', text: 'If it rains, I ____ stay home.', options: ['will', 'would', 'am', 'was'] }
  ];
 
  currentIndex = 0;
  answers: (number | null)[] = new Array(this.questions.length).fill(null);
 
  get currentQuestion(): QuizQuestion {
    return this.questions[this.currentIndex];
  }
 
  get totalQuestions(): number {
    return this.questions.length;
  }
 
  get answeredCount(): number {
    return this.answers.filter(a => a !== null).length;
  }
 
  get progressPercent(): number {
    return ((this.currentIndex + 1) / this.totalQuestions) * 100;
  }
 
  get isLastQuestion(): boolean {
    return this.currentIndex === this.totalQuestions - 1;
  }
 
  get selectedOption(): number | null {
    return this.answers[this.currentIndex];
  }
 
  selectOption(optionIndex: number): void {
    // Just records the answer for the current question.
    // Moving to the next question only happens when the Next/Done button is clicked.
    this.answers[this.currentIndex] = optionIndex;
  }
 
  goPrevious(): void {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    }
  }
 
  goNextOrFinish(): void {
    if (this.isLastQuestion) {
      this.onFinish();
    } else {
      this.currentIndex++;
    }
  }
 
  onFinish(): void {
    // Hook up test submission / results navigation here
    console.log('Test finished. Answers:', this.answers);
  }
}






