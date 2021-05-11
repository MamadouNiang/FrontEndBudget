import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {SaisieService} from "../../../../services/saisie.service";
import {AlertComponent} from "ngx-bootstrap/alert/alert.component";

@Component({
  selector: 'app-slidebar-saisie',
  templateUrl: './slidebar-saisie.component.html',
  styleUrls: ['./slidebar-saisie.component.scss']
})
export class SlidebarSaisieComponent implements OnInit {
  entente;
  datas :any;
  rechercheForm: FormGroup;
  validerForm: FormGroup;
  showTable=false;
  alerts: any[] = [{}];
  constructor(private fb: FormBuilder,private service: SaisieService) { }
  initForm() {
    this.rechercheForm = this.fb.group({
      matricule: ["", Validators.required],
    });
  }
  initForm2() {
    this.validerForm = this.fb.group({
      matricule: ["", Validators.required],
      ncdBanque: ["", Validators.required],
      ncdMdr: ["", Validators.required],
      nnumeroCompte: ["", Validators.required],
    });
  }
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
  onSearchMatricule() {
    this.showTable=true;
    const boo=[] ;
    const matricule = this.rechercheForm.get("matricule").value;
    this.service.get(matricule).subscribe(data => {
      boo.push(data);
      this.datas = boo.map((e) => {
        return {
          matricule: e.matricule,
          cdBanque: e.cdBanque,
          cdMdr: e.cdMdr,
          numeroCompte: e.numeroCompte,
        };
      });
    },error => {
      this.add('danger', error.error, 5000);
      this.showTable=false;
      this.datas =null;
      },()=>{
      this.add('success', 'recherche de '+ this.datas[0].matricule +' reussi', 5000);
    });
    // console.log(boo[0]);
  }
  onvaliderFormaliderForm() {
    // const data = [];
    // const matricule = this.rechercheForm.get("matricule").value;
    // const cdBanque = this.datas[0].cdBanque;
    // const ncdBanque = this.validerForm.get("matricule").value;
    // const cdMdr = this.datas[0].cdMdr;
    // const ncdMdr = this.validerForm.get("matricule").value;
    // const numeroCompte = this.rechercheForm.get("matricule").value;
    // const nnumeroCompte = this.validerForm.get("matricule").value;
    // data.push(matricule,cdBanque,ncdBanque,cdMdr,ncdMdr,numeroCompte,nnumeroCompte);
    // console.log(data);
  }
  ngOnInit(): void {
    this.initForm();
    this.initForm2();
  }
  fonctionslide(data){
    this.entente=data;
    return data;
  }
}
