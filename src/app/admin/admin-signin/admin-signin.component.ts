import { Component } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { UserCookiesService } from 'src/app/services/user-cookies.service';
import { MyapiService } from 'src/app/services/myapi.service';
import { SessionService } from 'src/app/services/session.service';


@Component({
  selector: 'app-admin-signin',
  templateUrl: './admin-signin.component.html',
  styleUrls: ['./admin-signin.component.css']
})
export class AdminSigninComponent {
 
  myForm !: FormGroup;
  usersDetails : any[]= [];
  hidepsd=true;
  submitted=false;
  invalid=false;
  
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  passwordFormControl = new FormControl('', Validators.required);

  constructor(private _api: MyapiService, 
    private session:SessionService,
    private router: Router,
    private diaglogRef:MatDialogRef<AdminSigninComponent>,
    private userCookie:UserCookiesService)
  {
      this.myForm = new FormGroup({
        email: this.emailFormControl,
        password: this.passwordFormControl
      });
  }



  
  submitForm() {
    this.submitted = true;
  
    if (this.isFormValid()) {
    
      const userData = {
        Email: this.emailFormControl.value || "",
        Password: this.passwordFormControl.value,
      };

      this._api.UserLogin(userData).subscribe(
        (response) => {
          
          this.session.setSessionData(response.id, response.first_Name+" "+ response.last_Name,'https://img.freepik.com/free-icon/user_318-563642.jpg'); 
          this.diaglogRef.close();
        },
        (error) => {
          alert("Login failed");
        }
      );
     
    }
  }
  


  isFormValid(): boolean {
    const isValid = this.myForm.valid; // Check if the form is valid

    if (!isValid) {
      // Mark all form controls as touched to display validation errors
      Object.keys(this.myForm.controls).forEach(key => {
        this.myForm.controls[key].markAsTouched();
      });
    }

    return isValid;
  }
 

}
