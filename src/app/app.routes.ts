import { adminRoutes } from './features/admin/admin-route.routes';
import { Children } from './../../node_modules/path-scurry/dist/commonjs/index.d';
import { Admin } from './features/admin/admin';
import { Routes } from '@angular/router';
import { Home } from './features/dashboard/home/home';
import { Teachers } from './features/teachers/teachers';
import { CoursesBookTrainer } from './features/courses/courses-book-trainer/courses-book-trainer';
import { GrammerAssignment } from './features/grammer/grammer-assignment/grammer-assignment';
import { Questions } from './features/grammer/questions/questions';
import { RegistrationComponent } from './features/courses/admitionsRegistration/registration';
import { LandingPage } from './features/auth/landing-page/landing-page';
import { Login } from './features/auth/login/login';
import { StudentAchievement } from './features/students/student-achievement/student-achievement';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'home', component: Home },
    { path: 'admin', component: Admin, children: adminRoutes },
    { path: 'teachers', component: Teachers },
    { path: 'courses', component: CoursesBookTrainer },
    { path: 'grammer', component: GrammerAssignment },
    { path: 'grammerQuestions', component: Questions },
    { path: 'registration', component: RegistrationComponent},
    { path: 'landing-page', component: LandingPage},
    { path: 'student-achievement', component: StudentAchievement },
    {path: 'login', component: Login}
];
