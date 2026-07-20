import { Admin } from './features/admin/admin';
import { Routes } from '@angular/router';
import { Home } from './features/dashboard/home/home';
import { Teachers } from './features/teachers/teachers';
import { RegistrationComponent } from './features/courses/admitionsRegistration/registration';
import { LandingPage } from './features/auth/landing-page/landing-page';
import { Login } from './features/auth/login/login';
import { StudentAchievement } from './features/students/student-achievement/student-achievement';
import { CourseRecommendation } from './features/courses/course-recommendation/course-recommendation';
import { Payment } from './features/payment/payment';
import { adminRoutes } from './features/admin/admin-route.routes';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'home', component: Home },
    { path: 'admin', component: Admin, children: adminRoutes },
    { path: 'teachers', component: Teachers },
    { path: 'registration', component: RegistrationComponent},
    { path: 'landing-page', component: LandingPage},
    { path: 'student-achievement', component: StudentAchievement },
    { path: 'login', component: Login},
    { path : 'courses', component : CourseRecommendation},
    { path : 'payment', component : Payment},
    
];
