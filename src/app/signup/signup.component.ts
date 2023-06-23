import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SessionService } from '../services/session.service';
import { FormGroup } from '@angular/forms';
import { MyapiService } from '../services/myapi.service';
import { SigninComponent } from '../signin/signin.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls:['./signup.component.css']
})
export class SignupComponent {
  myForm: FormGroup;
  hidep = true;
  hidec = true;
  submitted = false; // Flag to track form submission
  currentDate !: Date;

  UserDetails:any[]=[];
  ngOnInit(){
  }




  fnameFormControl = new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*')]);
  lnameFormControl = new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*')]);
  mobileFormControl = new FormControl('', [Validators.required, Validators.pattern('^\\d{10}$')]);
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  passwordFormControl = new FormControl('', Validators.required);
  confirmFormControl = new FormControl('', Validators.required);
  


  constructor(private _api: MyapiService, 
    private router:Router, 
    private sessionService:SessionService,
    private diaglogRef:MatDialogRef<SignupComponent>,

    private signinDialog:MatDialog) {
 
    this.myForm = new FormGroup({
      fname: this.fnameFormControl,
      lname: this.lnameFormControl,
      mobile: this.mobileFormControl,
      email: this.emailFormControl,
      password:this.passwordFormControl,
      confirm: this.confirmFormControl
    });
    this.currentDate = new Date();
  }
 

  submitForm() {
    this.submitted = true; // Set submitted flag to true
    if (this.isFormValid() ) {
      const userData = {
        first_name: this.fnameFormControl.value,
        last_name: this.lnameFormControl.value,
        email: this.emailFormControl.value,
        mobile: this.mobileFormControl.value,
        password:this.passwordFormControl.value,
      };

      this._api.UserSignUp(userData).subscribe(()=>{
          this.signInDialog();
      });
    } else {
      // Display error or validation messages
      console.log('Form validation failed!');
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

  signInDialog(){
    this.diaglogRef.close();
    this.signinDialog.open(SigninComponent)
  }

}
