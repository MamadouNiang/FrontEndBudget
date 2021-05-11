import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SaisieService} from '../../../../services/saisie.service';
import {HttpClient} from '@angular/common/http';
import {AlertComponent} from 'ngx-bootstrap/alert/alert.component';
import { DatePipe } from '@angular/common';
import {Router} from '@angular/router';
import {$} from 'protractor';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
@Component({
  selector: 'app-positions',
  templateUrl: './positions.component.html',
  styleUrls: ['./positions.component.scss'],
  providers:[DatePipe],
})
export class PositionsComponent implements OnInit {
	 selected = [ 2, 4 ];
  modalRef: BsModalRef;
  message: string;
  cdPosition;
  dateDebuPosition;
  dateFinPosition;
  cdBanque;
  cdMdr;
  numeroCompte;
  entente;
  datas: any;
  listeBanque = [];
  listePosition = [];
  listedescrPosition = [];
  listeMdr= [];
  rechercheForm: FormGroup;
  validerForm: FormGroup;
  showTable = false;
  tabCodeBanque: any;
  alerts: any[] = [{}];
  tabCodeMdr=[];
  tabCodePosition: any;

  myDate:any = new Date();
  display: any;
  constructor(private router:Router,
    private datePipe: DatePipe,
    private fb: FormBuilder,
    private service: SaisieService,
    private http: HttpClient,private modalService: BsModalService) {
    this.myDate = this.datePipe.transform(this.myDate, 'dd/MM/yyyy');
  }

  initForm() {
    this.rechercheForm = this.fb.group({
      matricule: ["", Validators.required],
    });
  }

  initForm2() {
    this.validerForm = this.fb.group({
      ncdPosition: ["", Validators.required],
      ndateDebuPosition: [this.myDate],
      ndateFinPosition: ["31-12-2099"],
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
    // console.log(this.tabCodeBanque);
    this.showTable = true;
    const boo = [];
    const matricule = this.rechercheForm.get("matricule").value;
    this.service.get(matricule).subscribe(data => {
      boo.push(data);
      console.log(data)
      this.datas = boo.map((e) => {
        return {
          matricule: e.matricule,
          nom: e.nom,
          prenom: e.prenom,
          cdPosition: e.cdPosition,
          dateDebuPosition: e.dateDebuPosition,
          dateFinPosition: e.dateFinPosition,
          cdBanque: e.cdBanque,
          cdMdr: e.cdMdr,
          numeroCompte: e.numeroCompte,
        };
      });
    }, error => {
      this.add('danger', error.error, 5000);
      this.showTable = false;
      this.datas = null;
    }, () => {
      this.cdPosition = this.datas[0].cdPosition;
      this.dateDebuPosition = this.datas[0].dateDebuPosition ;
      this.dateFinPosition = this.datas[0].dateFinPosition ;
      this.cdBanque = this.datas[0].cdBanque ;
      this.cdMdr = this.datas[0].cdMdr ;
      this.numeroCompte = this.datas[0].numeroCompte ;
      // this.add('success', 'recherche de ' + this.datas[0].matricule + ' reussi a : ', 1000);
    });
  }


  onvaliderFormaliderForm() {
    let ndatas = {};
    const matricule = this.datas[0].matricule;
    const acdPosition = this.cdPosition;
    const cdBanque = this.cdBanque;
    const cdMdr =this.cdMdr;
    const numeroCompte =this.numeroCompte;
    const adateDebuPosition =this.dateDebuPosition;
    const ncdPosition = this.validerForm.get("ncdPosition").value;
    const ndateDebuPosition = this.validerForm.get("ndateDebuPosition").value;
    ndatas = {matricule,cdBanque,cdMdr,numeroCompte, acdPosition, ncdPosition, adateDebuPosition, ndateDebuPosition};
    console.log(ndatas);
    this.service.saveMvm(ndatas).subscribe(data =>{
      },error => {
        console.log(error);
      },()=>{

      });
    this.router.navigateByUrl("/mouvements");
    //
    // this.service.saveMVT(ndatas).subscribe(data =>{
    // },error => {
    //   console.log(error);
    // });
  }

  ngOnInit(): void {
    this.initForm2();
    this.initForm();
    this.getAllPosition();
  }

  getAllPosition() {
    const boo = [];
    this.service.getAllPosition().subscribe(data => {
      boo.push(data);
      console.log(data);
      for (const datum of data) {
        this.listePosition.push(datum);
      }
     });
  }
  getAllCMdr(cdBanque){
    this.listeMdr=[];
    const boo=[] ;
    this.service.getAllMdr(cdBanque).subscribe(data => {
      boo.push(data);
      boo.map((e) => {
        for(let i=0 ; i< e._embedded.t_donne_mdrs.length; i++){
          this.listeMdr.push(e._embedded.t_donne_mdrs[i].cdMdr)
        }
      });
    },error => {
      this.add('danger', error.error, 5000);
    },()=>{
      this.tabCodeMdr = this.listeMdr;
      console.log( this.tabCodeMdr);
    });
  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  confirm(): void {
    this.message = 'Confirmed!';
    this.modalRef.hide();
    let ndatas = {};
    const matricule = this.datas[0].matricule;
    const acdPosition = this.cdPosition;
    const cdBanque = this.cdBanque;
    const cdMdr =this.cdMdr;
    const numeroCompte =this.numeroCompte;
    const adateDebuPosition =this.dateDebuPosition;
    const ncdPosition = this.validerForm.get("ncdPosition").value;
    const ndateDebuPosition = this.validerForm.get("ndateDebuPosition").value;
    ndatas = {matricule,cdBanque,cdMdr,numeroCompte, acdPosition, ncdPosition, adateDebuPosition, ndateDebuPosition};
    console.log(ndatas);
    this.service.saveMvm(ndatas).subscribe(data =>{
      this.getTableMvm();
    },error => {
      console.log(error);
    },()=>{

    });
    this.router.navigateByUrl("/mouvements");
    //
    // this.service.saveMVT(ndatas).subscribe(data =>{
    // },error => {
    //   console.log(error);
    // });
  }

  decline(): void {
    this.message = 'Declined!';
    this.modalRef.hide();
  }

  getTableMvm(){
    let val;
    this.service.getAllMVT().subscribe(data => {
      val= data;
    }, error => {
      console.log(error)
    }, () => {
    });

  }

}
