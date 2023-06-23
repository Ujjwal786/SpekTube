import { Component } from '@angular/core';
import { AdminSigninComponent } from '../admin-signin/admin-signin.component';
import { MatDialog } from '@angular/material/dialog';
import { SessionService } from 'src/app/services/session.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent {
  
  constructor(private dialog: MatDialog, private session: SessionService, private router: Router) {
    const sessionData = this.session.getSessionData();
   
    if (!sessionData) {
      
        this.router.navigate(['/home']); 
        this.dialog.open(AdminSigninComponent,{
          width:'200px;'
        });
      
    }
  
    
  
  }


}
