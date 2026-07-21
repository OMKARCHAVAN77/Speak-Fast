import { PasswordChanged } from './features/auth/forgot-password/password-changed/password-changed';
import { ConfirmPassword } from './features/auth/forgot-password/confirm-password/confirm-password';
import { ResetPassword } from './features/auth/forgot-password/reset-password/reset-password';
import { Path } from './../../../backend/node_modules/path-to-regexp/dist/index.d';
import { ForgotPassword } from './features/auth/forgot-password/forgot-password';
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
import { LinkSent } from './features/auth/forgot-password/link-sent/link-sent';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'home', component: Home },
    { path: 'admin', component: Admin, children: adminRoutes },
    { path: 'teachers', component: Teachers },
    { path: 'registration', component: RegistrationComponent},
    { path: 'forgotPassword', component: ForgotPassword,
      children:[
          {path:'',redirectTo:'resetpassword',pathMatch:'full'},
          {path: 'resetpassword', component:ResetPassword},
          {path: 'sentLink', component: LinkSent},
          {path: 'confirmPassword', component: ConfirmPassword},
          {path: 'passwordChanged', component: PasswordChanged}

      ]

  },
    { path: 'landing-page', component: LandingPage},
    { path: 'student-achievement', component: StudentAchievement },
    { path: 'login', component: Login},
    { path : 'courses', component : CourseRecommendation},
    { path : 'payment', component : Payment}
];
