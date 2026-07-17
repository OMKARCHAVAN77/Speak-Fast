import { Routes } from '@angular/router';
import { Home } from './features/dashboard/home/home';
import { Teachers } from './features/teachers/teachers';
import { CoursesBookTrainer } from './features/courses/courses-book-trainer/courses-book-trainer';
import { GrammerAssignment } from './features/grammer/grammer-assignment/grammer-assignment';
import { Questions } from './features/grammer/questions/questions';
import { RegistrationComponent } from './features/courses/registration/registration';
import { LandingPage } from './features/auth/landing-page/landing-page';
import { Payment } from './features/payment/payment';

export const routes: Routes = [
    { path: '', redirectTo: 'landing-page', pathMatch: 'full' },
    { path: 'home', component: Home },
    { path: 'teachers', component: Teachers },
    { path: 'courses', component: CoursesBookTrainer },
    { path: 'grammer', component: GrammerAssignment },
    { path: 'grammerQuestions', component: Questions },
    { path: 'registration', component: RegistrationComponent},
    { path: 'landingPage', component: LandingPage},
    { path: 'payment', component: Payment}
];
