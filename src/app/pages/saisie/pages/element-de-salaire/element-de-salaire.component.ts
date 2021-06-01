import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {SaisieService} from "../../../../services/saisie.service";
import { DatePicker } from '@syncfusion/ej2-calendars';
import {DatePipe} from "@angular/common";
import {AlertComponent} from "ngx-bootstrap/alert/alert.component";
import {timer} from "rxjs";

@Component({
  selector: 'app-element-de-salaire',
  templateUrl: './element-de-salaire.component.html',
  styleUrls: ['./element-de-salaire.component.scss'],
  providers:[DatePipe],
})
export class ElementDeSalaireComponent implements OnInit {
  selectedEtab?:String;
  tabCodeServices =[];
  month: number = new Date().getMonth();
  day: number = new Date().getDay();
  matricule:any;
  fullYear: number = new Date().getFullYear();
  selected = [];
  rechercheForm: FormGroup;
  validerForm: FormGroup;
  tabAddEcheancier= [];
  tabMvmEcheancier= [];
  listePartie = [];
  myDate:any = new Date();
  TabCodePoste=[];
  TabKeyPartie:any;
  TabValuePartie:any;
  showTable = false;
  alerts: any[] = [{}];

  constructor(
    private fb: FormBuilder,
    private service: SaisieService,
    private datePipe: DatePipe,
  ) {

    this.myDate = this.datePipe.transform(this.myDate, 'dd/MM/yyyy');

  }
  datepickerObject: DatePicker = new DatePicker({
// Sets the min.
    min: new Date(this.fullYear, this.month , this.day),
//Sets the max.
//     max: new Date(this.fullYear, this.month, 15),
// Sets the value.
    value: new Date(this.fullYear, this.month , this.day)
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

  ngOnInit(): void {
    this.initForm();
    this.initForm2();
    this.getAllPartie();
    this.getAllrefService();

  }
  initForm() {
    this.rechercheForm = this.fb.group({
      matricule: ["", Validators.required],
    });

  }
  initForm2() {
    this.validerForm = this.fb.group({
      codeService:["", Validators.required],
      partie: ["", Validators.required],
      matricule: [''],
      codePost: ["", Validators.required],
      montant: ["", Validators.required],
      dateMvm: [this.myDate, Validators.required],
      dateFin: ["", Validators.required],
    });
  }
  getAllrefService(){
    this.service.getAllrefService().subscribe((data)=>{
      for (const datum of data) {
        this.tabCodeServices.push(datum)
      }
    },error => console.log(error))
  }
getAllMvmByMat(){
  this.service.getMvmByMat(this.matricule).subscribe(data=>{
    for (const datum of data) {
      console.log(datum);
      this.tabMvmEcheancier.push(datum);
    }
  },error =>
    this.add('danger', error.error.text, 5000));

  }
  getMvmByMatCdService(){
    const codeService = this.validerForm.get('codeService').value;
    console.log(this.matricule+','+codeService);
    this.service.getMvmByMatCdService(this.matricule+','+codeService).subscribe(data=>{
      for (const datum of data) {
        console.log(datum);
        this.tabMvmEcheancier.push(datum);
      }
    },error =>
      this.add('danger', error.error.text, 5000));
  }

  subs2:any;
  ngOnDestroy2(){
    console.log(this.subs2)
    if(this.subs2 != undefined){
      this.subs2.unsubscribe();
    }
  }
  subs3:any;
  ngOnDestroy3(){
    console.log(this.subs3)
    if(this.subs3 != undefined){
      this.subs3.unsubscribe();
    }
  }
  deleteElemMvm(id:any){
    this.subs2 = timer(0,100).subscribe(n=>{
      if(n>0){
        this.tabMvmEcheancier = [];
        this.getAllMvmByMat();
        this.initForm2();
        this.ngOnDestroy2();
        console.log("fin : " +n)
      }else{
        this.service.deleteById(id).subscribe(data=>{
          console.log(data);
        },error => console.log(error.error.text));
      }
    });

  }
  onvaliderFormaliderForm(){
    this.tabMvmEcheancier = []
    this.validerForm.patchValue({matricule:this.matricule});
    this.validerForm.patchValue({dateMvm:null});
    this.subs2 = timer(0,100).subscribe(n=>{
      if(n>0){
        this.getMvmByMatCdService();
        this.initForm2();
        this.ngOnDestroy2();
        console.log("fin : " +n)
      }else{
        this.service.saveEcheanciers(this.validerForm.value).subscribe(data=>{
          console.log(data);
        },error => console.log(error.error.text));
      }


    });

  }

  onSearchMatricule() {
    this.tabAddEcheancier=[]
    this.tabMvmEcheancier = []
    this.showTable=true;
    this.matricule = this.rechercheForm.get("matricule").value;
    const matricule = this.rechercheForm.get("matricule").value;
   this.service.getAllByMatriculeEcheancier(matricule).subscribe(data=>{
     for (const datum of data) {
       this.tabAddEcheancier.push(datum)
     }
     this.add('success', 'recherche de ' + matricule + ' reussi a : ', 1000);
   },error => {
     this.add('danger', error.error.text, 5000);
     this.showTable = false;
   });
   this.getAllMvmByMat();
  }

  getAllPartie(){
    const boo = [];
    this.service.getAllTypeEcheancier().subscribe(data=>{
      for (const datum of data) {
        this.listePartie.push(datum.partie);
        // console.log(datum.partie)
      }
    },error => console.log(error))
  }

  getElemPartie(partie){
    const boo = [];
    this.TabCodePoste=[]
    // console.log(partie);
  this.service.getOneTypeEcheancier(partie).subscribe(data=>{
    boo.push(data)
    this.TabCodePoste.push(boo.map((e) => {
      return {
        brut: e.brut,
        its: e.its,
        cnss: e.cnss,
        cnam: e.cnam,
        pension: e.pension,
        partPension : e.partPension,
        partCnam:e.partCnam,
        partCnss:e.partCnss,
      };}));
    this.TabKeyPartie   = (Object.keys(this.TabCodePoste[0][0]));
    this.TabValuePartie = (Object.values(this.TabCodePoste[0][0]));

  },error => console.log(error));

  }
}
