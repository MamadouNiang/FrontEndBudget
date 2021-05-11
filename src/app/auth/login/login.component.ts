import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import { AlertComponent } from 'ngx-bootstrap/alert/alert.component';
import {Users} from '../../models/users.model';
import {UsersService} from '../../services/users.service';
import {isBoolean} from 'ngx-bootstrap/chronos/utils/type-checks';

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
  // users: any;
  v: any;
  alerts: any[] = [{}];
  errorMessage = 'Invalid Credentials';
  successMessage: string;
  invalidLogin = false;
  loginSuccess = false;
  register = this.fb.group({
    matricule: ['', [Validators.required, ], ],
    password: ['', [Validators.required, ], ]
  });

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

  message(matricule, password) {
    const boo = [];
    this.uhttp.getAll().subscribe((data) => {
      const users = data.map((e) => {
        return {
          id: e.id,
          matricule: e.matricule,
          password: e.password,
          userAccount: e.userAccount,
        };
      });
      for (const u of users) {
        if (u.matricule === matricule && u.password === password) {
            boo.push(true);
            break;
        }
      }
      boo.push(false);
    });
    alert(boo);
    return boo;
  }

  onSubmit() {
    const matricule = this.register.get('matricule').value;
    const password = this.register.get('password').value;
    // const res = this.message(matricule, password);
    // console.log(res);
    // console.log(Array.isArray(res));
    // console.log(res.length);
    // console.log(JSON.stringify(res));
    // console.log(JSON.parse(JSON.stringify(res)));
    const boo = []  ;
    let user ;
    this.uhttp.getAll().subscribe(
      (data) => {
      const users = data.map((e) => {
        return {
          id: e.id,
          matricule: e.matricule,
          password: e.password,
          userAccount: e.userAccount,
        };
      });
      for (const u of users) {
        if (u.matricule === matricule && u.password === password) {
          if (u.userAccount){
            boo.push(1);
            user = u.matricule;
            break;
          }else{
            boo.push(3);
          }
          break;
        }
      }
      boo.push(2);
    },
        err => {
          this.add('danger', err, 5000);
        },
      () => {
        if (boo[0] === 1){
          this.add('success', 'Bienvenue ' + user, 5000);
          const sto = sessionStorage.setItem('token', user);
          this.router.navigateByUrl('/dashbord');
        }else if (boo[0] === 3){
          this.add('warning', 'Compte non activer veillez attendre la Validation ...', 5000);
        }else if (boo[0] === 2) {
          this.add('danger', 'Erreur d\' authentification veillez recommencer...', 5000);
        }
      }
    );
  }

  voirPassword() {
    this.typePassword = !this.typePassword;
  }

  ngOnInit(){
  }



}
