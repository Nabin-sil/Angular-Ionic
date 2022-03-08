import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AuthConstants } from 'src/app/config/auth-constants';
import { AccountService } from 'src/app/services/account.service';
import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from 'src/app/services/storage.service';
import { ToastService } from 'src/app/services/toast.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})

// export class RegisterPage implements OnInit {
//   postData = {
//     id:'',
//     firstName: '',
//     lastName: '',
//     username: '',
//     email: '',
//     password: '',
//     token: ''

//   };

//   constructor(
//     private authService: AuthService,
//     private toastService: ToastService,
//     private storageService: StorageService,
//     private router: Router
//   ) {}

//   ngOnInit() {}

//   validateInputs() {
//     let firstName = this.postData.firstName.trim();
//     let lastName = this.postData.lastName.trim();
//     let username = this.postData.username.trim();
//     let password = this.postData.password.trim();
//     let email = this.postData.email.trim();
//     return (
//       this.postData.firstName &&
//       this.postData.lastName &&
//       this.postData.username &&
//       this.postData.password &&
//       this.postData.email &&
//       email.length > 0 &&
//       username.length > 0 &&
//       firstName.length > 0 &&
//       lastName.length > 0 &&
//       email.length > 0 &&
//       password.length > 0
//     );
//   }

//   signupAction() {
//     if (this.validateInputs()) {
//       this.authService.signup(this.postData).subscribe(
//         (res: any) => {
//           if (res.userData) {
//             // Storing the User data.
//             this.storageService
//               .store(AuthConstants.AUTH, res.userData)
//               .then(res => {
//                 this.router.navigate(['home']);
//               });
//           } else {
//             this.toastService.presentToast(
//               'Data alreay exists, please enter new details.'
//             );
//           }
//         },
//         (error: any) => {
//           this.toastService.presentToast('Network Issue.');
//         }
//       );
//     } else {
//       this.toastService.presentToast(
//         'Please enter name, email, username or password.'
//       );
//     }
//   }
// }


  export class RegisterPage implements OnInit{
    form: FormGroup;
    loading = false;
    submitted = false;
    public showPassword: boolean;
    public showPasswordOnPress: boolean;
  
    constructor(
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
    private toastService: ToastService,
      private accountService: AccountService,  
      ) {}
  
    ngOnInit() {
      this.form = this.formBuilder.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        username: ['', Validators.required],
        email: new FormControl('', [
          Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ]),
  
        password: new FormControl('', [
          Validators.required,
          Validators.minLength(6),
        ]),
      });
    }
  
    // convenience getter for easy access to form fields
    get f() {
      return this.form.controls;
    }
  
    onSubmit() {
      this.submitted = true;
    
      // stop here if form is invalid
      if (this.form.invalid) {
        return;
      }
  
      this.loading = true;
      this.accountService
        .register(this.form.value)
        .pipe(first())
        .subscribe({
          next: () => {
           this.toastService.presentToast('Sucess.');
            this.router.navigate(['../login'], { relativeTo: this.route });
          },
          error: (error) => {
           this.toastService.presentToast('Error');
            this.loading = false;
          },
        });
    }
  
  }
  