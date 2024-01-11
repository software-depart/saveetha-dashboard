import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './pages/user/user.component';

const routes: Routes = [
  {
    path: 'user',
    loadChildren: () => import('./pages/user/user.module').then(m => m.UserModule)
  },
{
  path:'',
  redirectTo:'user',
  pathMatch:'full'
},
  {
    path: 'categories',
    loadChildren: () => import('./pages/category/category.module').then(m => m.CategoryModule)
  },

  {
    path: 'subcategories',
    loadChildren: () => import('./pages/sub-category/sub-category.module').then(m => m.SubCategoryModule)
  },

  {
    path: 'restaurent',
    loadChildren: () => import('./pages/restaurent/restaurent.module').then(m => m.RestaurentModule)
  },

  {
    path: 'student',
    loadChildren: () => import('./pages/student/student.module').then(m => m.StudentModule)
  },

  {
    path: 'all-items',
    loadChildren: () => import('./pages/item/item.module').then(m => m.ItemModule)
  },

  {
    path: 'menu',
    loadChildren: () => import('./pages/menu/menu.module').then(m => m.MenuModule)
  },

  {
    path: 'all-orders',
    loadChildren: () => import('./pages/order/order.module').then(m => m.OrderModule)
  },

  {
    path: 'all-payments',
    loadChildren: () => import('./pages/payment/payment.module').then(m => m.PaymentModule)
  },
  {
    path: 'report',
    loadChildren: () => import('./pages/report/report.module').then(m => m.ReportModule)
  },
  {
    path: 'foodcourts',
    loadChildren: () => import('./pages/food-court/food-court.module').then(m => m.FoodCourtModule)
  },

  {
    path: 'all-campuses',
    loadChildren: () => import('./pages/campus/campus.module').then(m => m.CampusModule)
  },
  {
    path: 'user-approved',
    loadChildren: () => import('./pages/user-approved/user-approved.module').then(m => m.UserApprovedModule)
  },
  {
    path: 'chart',
    loadChildren: () => import('./pages/chart/chart.module').then(m => m.ChartModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
