import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import { AlertComponent } from 'ngx-bootstrap/alert/alert.component';
import {Users} from '../../models/users.model';
import {UsersService} from '../../services/users.service';
import {isBoolean} from 'ngx-bootstrap/chronos/utils/type-checks';
import {HttpClient} from "@angular/common/http";
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private auth: AuthService,
    private uhttp: UsersService,
    private http: HttpClient,
    private authService: AuthenticationService
  ) {
  }

  get matricule() {
    return this.register.get('matricule');
  }

  get password() {
    return this.register.get('password');
  }

  typePassword = false;
  errormessage: string;
  // // users: any;
  // v: any;
  alerts: any[] = [{}];
  errorMessage = 'Invalid Credentials';
  successMessage: string;
  invalidLogin = false;
  loginSuccess = false;
  register = this.fb.group({
    matricule: ['', [Validators.required, ], ],
    password: ['', [Validators.required, ], ]
  });
  //
  add(typem: any, msg: any, timem: number): void {
    this.alerts.push({
      type: typem,
      msg: msg + `( ${new Date().toLocaleTimeString()})`,
      timeout: timem
    });
  }

  onClosed(dismissedAlert: AlertComponent): void {
    this.alerts = this.alerts.filter(alert => alert !== dismissedAlert);
  }
  //
  // // message(matricule, password) {
  // //   const boo = [];
  // //   this.uhttp.getAll().subscribe((data) => {
  // //     const users = data.map((e) => {
  // //       return {
  // //         id: e.id,
  // //         matricule: e.matricule,
  // //         password: e.password,
  // //         userAccount: e.userAccount,
  // //       };
  // //     });
  // //     for (const u of users) {
  // //       if (u.matricule === matricule && u.password === password) {
  // //           boo.push(true);
  // //           break;
  // //       }
  // //     }
  // //     boo.push(false);
  // //   });
  // //   alert(boo);
  // //   return boo;
  // // }
  //
  //
  voirPassword() {
    this.typePassword = !this.typePassword;
  }

  ngOnInit(){
  }


  onLogin(data:any){
    console.log(data);
    this.authService.login(data)
      .subscribe(resp=>{
        let jwt =resp.headers.get('Authorization');
        this.authService.saveToken(jwt);
        this.router.navigateByUrl("/De Position");
      },err=>{
        console.log(err)
      })
  }

}
