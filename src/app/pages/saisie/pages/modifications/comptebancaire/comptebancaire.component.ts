import {Component, ElementRef, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SaisieService} from '../../../../../services/saisie.service';
import {AlertComponent} from 'ngx-bootstrap/alert/alert.component';
import {HttpClient} from '@angular/common/http';
import {any} from 'codelyzer/util/function';
import {Router} from '@angular/router';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-comptebancaire',
  templateUrl: './comptebancaire.component.html',
  styleUrls: ['./comptebancaire.component.scss']
})
export class ComptebancaireComponent implements OnInit {
	 selected = [ 2, 4 ];
  selectedBanque= null;
  modalRef: BsModalRef;
  message: string;
  acb:'';
  acm:'';
  anc:'';
  acp:'';
  aded:'';
  entente;
  datas: any;
  listeBanque = [];
  listeBanqueA = [];
  listeBanqueReduit = [];
  listeMdr= [];
  rechercheForm: FormGroup;
  validerForm: FormGroup;
  showTable = false;
  tabCodeBanque: any;
  tabCodeBanqueA: any;
  tabCodeBanqueDesc: any;
  alerts: any[] = [{}];
  tabCodeMdr=[];
  selectedCityId: any = null;

  constructor(private modalService: BsModalService,private fb: FormBuilder, private service: SaisieService, private http: HttpClient,private router:Router) {
  }

  initForm() {
    this.rechercheForm = this.fb.group({
      matricule: ["", Validators.required],
    });
  }

  initForm2() {
    this.validerForm = this.fb.group({
      ncdBanque: ["", Validators.required],
      ncdMdr: ["", Validators.required],
      nnumeroCompte: ["", Validators.required],
      acb:'',
      acm:'',
      anc:'',
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
      console.log(data);
      this.datas = boo.map((e) => {
        return {
          matricule: e.matricule,
          nom: e.nom,
          prenom: e.prenom,
          cdBanque: e.cdBanque,
          cdMdr: e.cdMdr,
          numeroCompte: e.numeroCompte,
          cdPosition:e.cdPosition,
          dateDebuPosition:e.dateDebuPosition,
        };
      });
    }, error => {
      this.add('danger', error.error, 5000);
      this.showTable = false;
      this.datas = null;
    }, () => {
      this.acb =this.datas[0].cdBanque;
      this.acm =this.datas[0].cdMdr;
      this.anc =this.datas[0].numeroCompte;
      this.acp =this.datas[0].cdPosition;
      this.aded =this.datas[0].dateDebuPosition;
      this.add('success', 'recherche de ' + this.datas[0].matricule + ' reussi a : ', 1000);
    });
  }

  onvaliderFormaliderForm() {
    let ndatas = {};
    const matricule = this.datas[0].matricule;
    const acdBanque = this.acb;
    const acdMdr =this.acm;
    const anumeroCompte = this.anc;
    const acdPosition = this.acp;
    const adateDebuPosition =this.aded
    const ncdBanque = this.validerForm.get("ncdBanque").value;
    const ncdMdr = this.validerForm.get("ncdMdr").value;
    const typeMvm = 'changement de posotion';
    const nnumeroCompte = this.validerForm.get("nnumeroCompte").value;
    const id = null;
    ndatas = {matricule,acdBanque,acdMdr,anumeroCompte,ncdBanque, ncdMdr, nnumeroCompte, acdPosition,adateDebuPosition,typeMvm,id} ;
    console.log(ndatas);
    if(confirm("Etes vous sur de vouloir enregistrer. \n Tapez: \n -OK Pour enregister vos Modification. \n -Annuler ")){
      this.service.saveMvm(ndatas).subscribe(data =>{
      },error => {
        console.log(error);
        return false;
      },()=>{
      });
      // window.location.reload();
      this.router.navigateByUrl("/mouvements")

    }else{

    }


    // this.router.navigateByUrl('/modification_position');
  }

  ngOnInit(): void {
    this.initForm2();
    this.initForm();
    this.getAllCB();

  }
  public height: string = '220px';
  public watermark: string = 'Select an item';
  public filterPlaceholder: string = 'Search';
  getAllCB() {
    const boo = [];
    this.service.getAllBanque().subscribe(data => {
      boo.push(data);

      boo.map((e) => {
        for (let i = 0; i < e._embedded.t_ref_cd_banques.length; i++) {
          this.listeBanqueA.push(e._embedded.t_ref_cd_banques[i]);
          this.listeBanque.push(e._embedded.t_ref_cd_banques[i].cdBanque);
          this.listeBanqueReduit.push(e._embedded.t_ref_cd_banques[i].descrReduit)
        }
      });
    }, error => {
      this.add('danger', error.error, 5000);
    }, () => {
      this.tabCodeBanque = this.listeBanque;
      this.tabCodeBanqueA = this.listeBanqueA;
      this.tabCodeBanqueDesc = this.listeBanqueReduit;
      console.log( this.tabCodeBanqueDesc )
      console.log(  this.tabCodeBanque )
    });
  }
  getAllCMdr(cdBanque){
    console.log(cdBanque);
    this.listeMdr=[];
    const boo=[] ;
    this.service.getAllMdr(cdBanque).subscribe(data => {
      boo.push(data);
      console.log(data);
      boo.map((e) => {
        for(let i=0 ; i< e._embedded.t_donne_mdrs.length; i++){
          this.listeMdr.push(e._embedded.t_donne_mdrs[i])
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
    const acdBanque = this.acb;
    const acdMdr =this.acm;
    const anumeroCompte = this.anc;
    const acdPosition = this.acp;
    const adateDebuPosition =this.aded
    const ncdBanque = this.validerForm.get("ncdBanque").value;
    const ncdMdr = this.validerForm.get("ncdMdr").value;
    const typeMvm = 'changement de posotion';
    const nnumeroCompte = this.validerForm.get("nnumeroCompte").value;
    const id = null;
    ndatas = {matricule,acdBanque,acdMdr,anumeroCompte,ncdBanque, ncdMdr, nnumeroCompte, acdPosition,adateDebuPosition,typeMvm,id} ;
    console.log(ndatas);
    this.service.saveMvm(ndatas).subscribe(data =>{
      },error => {
        console.log(error);
        return false;
      },()=>{
      });
    this.router.navigateByUrl("/mouvements")
  }

  decline(): void {
    this.message = 'Declined!';
    this.modalRef.hide();
  }

}

