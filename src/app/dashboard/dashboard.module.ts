import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { TopbarComponent } from '../components/topbar/topbar.component';
import { FooterComponent } from '../components/footer/footer.component';
import { SidebarComponent } from '../components/sidebar/sidebar.component';




@NgModule({
  declarations: [
    DashboardComponent,
    TopbarComponent,
    FooterComponent,
    SidebarComponent,
    
    
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule
  ],
  providers: []
})
export class DashboardModule { }
