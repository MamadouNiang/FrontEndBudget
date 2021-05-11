import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChargemetService {
  public pourcentage:any;
  private count = 0;
  private spinner$ = new BehaviorSubject<string>('');
  private spinner2$ = new BehaviorSubject<number>(0);

  constructor() { }

  getSpinnerObserver(): Observable<string> {
    return this.spinner$.asObservable();
  }
  getSpinnerObserver2(): Observable<number> {
    return this.spinner2$.asObservable();
  }

  requestStarted() {
    if (++this.count === 1) {
      this.spinner$.next('start');
    }
  }
  requestStarted2(valeur:any,taille:any){
    this.pourcentage = (valeur*100)/taille;
    console.log(this.pourcentage);
    this.spinner2$.next( this.pourcentage);
  }

  requestEnded() {
    if (this.count === 0 || --this.count === 0) {
      this.spinner$.next('stop');
    }
  }

  resetSpinner() {
    this.count = 0;
    this.spinner$.next('stop');
  }

}
