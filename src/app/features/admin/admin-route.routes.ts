import { AdminTeachers } from './admin-teachers/admin-teachers';
import { AdminUpcomingBatches } from './admin-upcoming-batches/admin-upcoming-batches';
import { AdminAllStudents } from './admin-allstudents/admin-allstudents';
import { AdminRecentEnrollments } from './admin-recent-enrollments/admin-recent-enrollments';

import { Routes } from '@angular/router';

export const adminRoutes: Routes = [
  {
    path: 'recentEnrollments',
    component: AdminRecentEnrollments
  },
  {
    path: 'AllStudents',
    component: AdminAllStudents
  },
  {
    path: 'upcomingBatches',
    component: AdminUpcomingBatches
  },
  {
    path: 'adminTeachers',
    component: AdminTeachers
  }
];

