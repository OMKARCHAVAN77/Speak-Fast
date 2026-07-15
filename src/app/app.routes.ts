import { Routes } from '@angular/router';
import { Home } from './features/dashboard/home/home';
import { Teachers } from './features/teachers/teachers';
import { CoursesBookTrainer } from './features/courses/courses-book-trainer/courses-book-trainer';
import { GrammerAssignment } from './features/grammer/grammer-assignment/grammer-assignment';
import { Questions } from './features/grammer/questions/questions';
import { RegistrationComponent } from './features/courses/registration/registration';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: Home },
    { path: 'teachers', component: Teachers },
    { path: 'courses', component: CoursesBookTrainer },
    { path: 'grammer', component: GrammerAssignment },
    { path: 'grammerQuestions', component: Questions },
    { path: 'registration', component: RegistrationComponent},
];
