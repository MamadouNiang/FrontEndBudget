import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import {catchError, map, retry} from 'rxjs/operators';
import {Users} from '../models/users.model';
import { environment, SERVER_URL_BE, SERVER_URL_FE } from '../../environments/environment';
import {Router} from '@angular/router';
import {UsersService} from './users.service';
import {AlertComponent} from 'ngx-bootstrap/alert/alert.component';
import {add} from 'ngx-bootstrap/chronos';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // BASE_PATH: 'http://localhost:8080'
  USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser';

  public matricule: any;
  public password: any;
  constructor(private http: HttpClient, private route: Router , private uhttp: UsersService) {
    }
  login(matricule: string, password: string)  {
  }
  getUsers(){
      this.uhttp.getAll().subscribe((data) => {
        const  user = data.map((e) => {
          return {
            id: e.id,
            matricule: e.matricule,
            password: e.password,
            userAccount: e.userAccount,
          };
        });
      });
  }
}
