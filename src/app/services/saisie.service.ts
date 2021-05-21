import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {  SERVER_URL_BE, SERVER_URL_FE } from '../../environments/environment';
import {Users} from '../models/users.model';
@Injectable({
  providedIn: 'root'
})
export class SaisieService {

  constructor(private http: HttpClient, ) { }
  // recherche matricule changement de compte
  get(matricule: any): Observable<any> {
    return this.http.get(SERVER_URL_BE+ 'TDPADMIN/unPers/' + matricule).pipe();
  }

  // recherche posiiton changement de posiiton
  getAllPosition(): Observable<any> {
    return this.http.get(SERVER_URL_BE+ 'SaveMvm/allPosition/').pipe();
  }
  getAllTraces(): Observable<any> {
    return this.http.get(SERVER_URL_BE+ 'TraceMvm/allMvmTrace/').pipe();
  }
  // => les codes Mdr par bqnaue
  getAllMdr(cdBanque:any): Observable<any>{
   return  this.http.get('http://localhost:8084/t_ref_cd_banques/'+cdBanque+'/cdMdr').pipe();
  }
  getOneMdr(cdMdr: string): Observable<any> {
    return this.http.get(SERVER_URL_BE+ 'TDMdr/one/' + cdMdr).pipe();
  }

  // => code banque
  getAllBanque(): Observable<any>{
    return  this.http.get('http://localhost:8084/t_ref_cd_banques').pipe();
  }
  getOneBanque(cdMdr: string): Observable<any> {
    return this.http.get(SERVER_URL_BE+ 'TDMdr/one/' + cdMdr).pipe();
  }

  // => CRUD Mouvent
  saveMVT(data:any): Observable<any>{
    const headers = new HttpHeaders()
      .append(
        'Content-Type',
        'application/json'
      );
    const body=JSON.parse(JSON.stringify(data));
    return  this.http.post(SERVER_URL_BE+'SaveMvm/save/',body,{headers}).pipe();
  }
  getAllMVT(): Observable<any> {
    return this.http.get(SERVER_URL_BE+ 'SaveMvm/allMvm').pipe();
  }

  saveMvm(data:any): Observable<any>{
    const body=JSON.parse(JSON.stringify(data));
    return  this.http.post(SERVER_URL_BE+'SaveMvm/save',body).pipe();
  }

  saveMvmR(data:any,matricule:any): Observable<any>{
    const body=JSON.parse(JSON.stringify(data));
    return  this.http.put(SERVER_URL_BE+'SaveMvm/updateR/'+matricule,body).pipe();
  }

  // Mise a jour de MVT vers AdminPersonelle
  UpdateMtoA(data:any,matricule:any){
    const body=JSON.parse(JSON.stringify(data));
    // console.log(data);
    return  this.http.put(SERVER_URL_BE+'TDPADMIN/updatePersM/'+matricule,body).pipe();
  }


  //EcheancierCRUD
  getAllMvmEcheancier(): Observable<any> {
    return this.http.get(SERVER_URL_BE+ 'Echeancier/allEcheancier');
  }

  saveEcheanciers(data:any): Observable<any>{
    const body=JSON.parse(JSON.stringify(data));
    return  this.http.post(SERVER_URL_BE+'Echeancier/save/',body);
  }

  getAllTypeEcheancier(): Observable<any> {
    return this.http.get(SERVER_URL_BE+ 'TypeEcheancier/all');
  }
  getOneTypeEcheancier(type: string): Observable<any> {
    return this.http.get(SERVER_URL_BE+ 'TypeEcheancier/unePartie/' + type).pipe();
  }

  getAllByMatriculeEcheancier(matricule): Observable<any> {
    return this.http.get(SERVER_URL_BE+ 'donneeEcheancier/allByQuery/'+matricule).pipe();
  }
}
