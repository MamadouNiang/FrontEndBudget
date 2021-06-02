import { Component, OnInit, ViewChild } from '@angular/core';
import { EcheancierModel } from '../../../../models/echeancier/echeancier-model.model';
import { EcheancierService } from '../../../../services/echeancier.service';
import {Grid,Group , EditSettingsModel, EditService, RowDataBoundEventArgs, GridComponent, gridContent, RowSelectEventArgs} from '@syncfusion/ej2-angular-grids';
// import { TreeGrid } from '@syncfusion/ej2-treegrid';
import { SortService, GroupService, ColumnMenuService, PageService, FilterService } from '@syncfusion/ej2-angular-grids';
import {  GroupSettingsModel, FilterSettingsModel } from '@syncfusion/ej2-angular-grids';
import { ToolbarItems, IEditCell, ReorderService } from '@syncfusion/ej2-angular-grids';
import { ChargemetService } from "../../../../components/chargement/chargemet.service";
import {SaisieService} from '../../../../services/saisie.service';
import {of, Observable, interval, timer} from 'rxjs';
import { filter, map } from 'rxjs/operators';
import {errorObject} from 'rxjs/internal-compatibility';
import { createSpinner, showSpinner, hideSpinner } from '@syncfusion/ej2-angular-popups';
import { setSpinner } from '@syncfusion/ej2-angular-popups';
import { Router } from '@angular/router';
import {DropDownList} from "@syncfusion/ej2-dropdowns";
import { SelectionSettingsModel, } from '@syncfusion/ej2-angular-grids';
@Component({
  selector: 'app-mvm-echeancier',
  templateUrl: './mvm-echeancier.component.html',
  styleUrls: ['./mvm-echeancier.component.scss']
})
export class MvmEcheancierComponent implements OnInit {
  @ViewChild('grid') public grid: GridComponent;
  @ViewChild('grid2') public grid2: GridComponent;

  selected?:String; // fait par nour
  tabCodeServices=[]; //fait par nour
  tabCodeServiceMaj=[];
  tabMvm={};
  tabMvm2={};
  tempTabMvm=[];
  tailleSelect = 0;
  TabSaveEcheancier={};
  tempTab=[];
  AlltabMvm={};
  datas: any;
  typeEcheancier=[];
  typeOneEcheancier:any;
  typeTEst={};
  public toolbar: string[];
  public toolbar2: string[];
  columnsR=[
    { type: 'checkbox', width: 20 },
    {field:'matricule', headerText:"Matricule"},
    // {field:'nni', headerText:"NNI"},
    {field:'prenom', headerText:"Nom & Prenom "},
    {field:'montantRetenuMois', headerText:"Ancien montantRetenuMois"},
    {field:'codePost', headerText:"Code Poste"},
    {field:'montant', headerText:"Nouveau Montant"},
    // {field:'numEcrit', headerText:"NumEcrit"},
    {field: 'dateMvm',format: {type:'date', format:'dd/MM/yyyy'}, headerText:"Date MAJ"},
  ];
  columnsR2=[
    {field:'matricule', headerText:"Matricule"},
    {field:'codePoste', headerText:"Ancien Poste"},
    {field:'montantRetenuMois', headerText:"Ancien montantRetenuMois"},
    {field: 'dateMvm',format: {type:'date', format:'dd/MM/yyyy'}, headerText:"Ancienne Date"},
  ];

  public editSettings: EditSettingsModel;
  public initialPage: Object;
  public groupOptions: Object;
  public formatOptions: object;
  public editSettings2: EditSettingsModel;
  public initialPage2: Object;
  public formatOptions2: object;
  public selectOptions: Object;
  public selectionOptions: SelectionSettingsModel;
  constructor(
    private excelSrv: EcheancierService,
    private chargement: ChargemetService,
    private service: SaisieService,
    private route:Router,
  ) { }

  ngOnInit(): void {
    this.getEtabEch();
    this.selectionOptions = { checkboxMode: 'ResetOnRowClick',};
    this.selectOptions = { persistSelection: true };
    this.toolbar = ['Search'];
    this.toolbar2 = ['Search'];
    this.groupOptions = { showGroupedColumn: false, columns: ['matricule'] };
    this.editSettings = {
      mode: 'Batch',
      showDeleteConfirmDialog: true,
      showConfirmDialog: true,
      allowEditing: true,
      allowAdding: true,
      allowDeleting: true
    };
    this.editSettings2 = {
      mode: 'Batch',
      showDeleteConfirmDialog: true,
      showConfirmDialog: true,
      allowEditing: true,
      allowAdding: true,
      allowDeleting: true
    };
    this.initialPage = {pageSizes: true, pageCount: 4};
    this.initialPage2 = {pageSizes: true, pageCount: 4};
  }
  rowSelected(args: RowSelectEventArgs) {
    const selectedrecords: object[] = this.grid.getSelectedRecords();
    this.tailleSelect = (selectedrecords).length;
    this.TabSaveEcheancier = (selectedrecords);

  }
  rowDeSelected(args: RowSelectEventArgs) {
    const selectedrecords: object[] = this.grid.getSelectedRecords();
    this.tailleSelect = (selectedrecords).length;
    this.TabSaveEcheancier = (selectedrecords);
  }
  subsaveEch:any;
  ngOnDestroySaveEch(){
    if(this.subsaveEch != undefined){
      this.subsaveEch.unsubscribe();
    }

  }
  subdeleteEch:any;
  ngOnDestroyDeleteEch(){
    if(this.subdeleteEch != undefined){
      this.subdeleteEch.unsubscribe();
    }

  }
  async getEleByMat(matricule:any) {
    let response = await this.service.getAllByMatriculeEcheancier(matricule).toPromise();
    if (response) {
      for (const datum of response) {
        // console.log(datum.numEcrit);
          await this.service.deleteBynumEcrit(datum.numEcrit).subscribe(data=>{
            console.log(data);
          },error => console.log(error.error.text));
      }
    }
  }

  deleteDansEcheancier(data:any){
    let finDupTabMvm =[]
    let char = data.length;
    var obj = {};
    for ( var i=0, len=char; i < len; i++ )
      obj[data[i]['matricule']] =data[i];
    finDupTabMvm = new Array();
    for ( var key in obj )
    {
      finDupTabMvm.push(Object.assign({}, obj[key]))
    }
    this.subdeleteEch = timer(0,1000).subscribe(async n=>{
      this.chargement.requestStarted();
      this.chargement.requestStarted2(n,finDupTabMvm.length-1);
      await this.getEleByMat(finDupTabMvm[n].matricule);
      if (n===finDupTabMvm.length-1){
        this.subdeleteEch.unsubscribe();
        this.chargement.resetSpinner();
        this.chargement.requestEnded();
        this.subdeleteEch.unsubscribe();
      }
      console.log("fin : " +n)
      this.saveDansEcheancier(data);
    });
  }
  async saveEleDansEcheancier(el:any){
    console.log(el);
    let response = await this.service.saveDonneeEch(el).toPromise();
    console.log(response.message.text)
    // if (response){
    //   console.log('jai fini de supprimer je save')
    //   console.log(response)
    // }
  }
  saveDansEcheancier(data:any){
    let finTabMvm ={}
    this.subsaveEch = timer(0,1000).subscribe( n=>{
      finTabMvm = data.map((e) => {
        return{
          matricule:e.matricule,
          codePoste:e.codePost,
          dateMvm:e.dateMvm,
          dateFin:e.dateFin,
          numEcrit:e.numEcrit,
          montantMensuelVar:e.montant,
          montantCapitalARetenir:"0",
          montantCumulRetenu:"0",
          montantRetenuMois:e.montant,
          cdEtab:"0",
          serviceOuInput:'',
          actif:"1"
        };
      });
      this.chargement.requestStarted();
      this.chargement.requestStarted2(n,data.length-1);
      this.saveEleDansEcheancier(finTabMvm[n]);
      if (n==data.length-1){
        this.subsaveEch.unsubscribe();
        console.log("fin : " +n)
        this.chargement.resetSpinner();
        this.chargement.requestEnded();
        this.subsaveEch.unsubscribe();
      }
      this.deleteFromMvm(data);
    });

  }
  subdeleteMvm:any;
  ngOnDestroyDeleteMvm(){
    if(this.subdeleteMvm != undefined){
      this.subdeleteMvm.unsubscribe();
    }

  }
  async deleteElFromMvm(id:any){
    let res = await  this.service.deleteById(id).toPromise();
    console.log(res.message.text);
  }
  deleteFromMvm(data:any){
    this.subdeleteMvm = timer(0,1000).subscribe(n=>{
      this.deleteElFromMvm(data[n].id);
      this.chargement.requestStarted();
      this.chargement.requestStarted2(n,data.length-1);
      this.grid.refreshColumns()
      if (n==data.length-1){
        this.getAllMvmEcheancier(data[n].codeService)
        this.subdeleteMvm.unsubscribe();
        console.log("fin : " +n)
        this.chargement.resetSpinner();
        this.chargement.requestEnded();
        this.subdeleteMvm.unsubscribe();
      }
      this.tailleSelect =0;
    });

  }
  customiseCell(args:RowDataBoundEventArgs) {
    const id = ((args.row as HTMLTableRowElement));
    this.grid.deleteRow(id);

    // if(args.data['montantRetenuMois'] === null && args.data['montant'] ===0){
    //   // this.grid.deleteRow(args.rows[])
    //   //console.log(args.row.getAttribute("data-uid"))
    //   // console.log(args.data['montantRetenuMois']+' - '+args.data['montant']);
    // }
  }
    dataBound(args: any) {
    this.grid.autoFitColumns();
    for (const cols of this.grid.columns) {
      if ((cols as any).field === 'dateMvm') {
        (cols as any).type = 'date';
        (cols as any).format= 'dd/MM/yyyy' ;
      }
    }
  }
  dataBound2(args: any) {
    this.grid2.autoFitColumns();
    for (const cols of this.grid2.columns) {
      if ((cols as any).field === 'dateMvm') {
        (cols as any).type = 'date';
        (cols as any).format= 'dd/MM/yyyy' ;
      }
    }
  }
  getAllMvmEcheancier2(data:any){
    let nour  = []
    let ttem = this.tabMvm;
    for (let i = 0; i <data.length; i++) {
      const mvmMat :number = data[i].matricule;
      const codeService = data[i].codeService;
      const param  = mvmMat+','+codeService
      this.service.getMvmByMatCdService(param).subscribe(data=>{
        nour.push({matricule:mvmMat,taille:data.length});
      },error => console.log(error));
    }
    let boo =[];
    for (const objElement of data) {
      if(objElement.matricule!=null){
        this.service.getAllByMatriculeEcheancier(objElement.matricule).subscribe((data)=>{
          for (const datum of data) {
            boo.push(datum)
            let nombre = Object.keys(this.tabMvm);
            var tailleMvm :number= nombre.length;
            var tailleEch :number= data.length;
            for (let i = 0; i < tailleMvm; i++) {
              const mvmMat :number = this.tabMvm[i].matricule;
              const echMat :number = datum['matricule']
              if ( mvmMat === echMat ){
                const mvmCode :number = this.tabMvm[i].codePost;
                const echCode :number = datum['codePoste'];
                for (let j = 0; j <nour.length; j++) {
                  if(nour[j].matricule == mvmMat){
                      if(mvmCode == echCode){
                        this.tabMvm[i].montantRetenuMois = datum['montantRetenuMois'];
                        this.grid.refreshColumns()
                      }
                        // else{
                      //   if(this.tabMvm[i].montantRetenuMois === null ){
                      //     if(this.tabMvm[i].montant===0 ){
                      //       console.log(this.tabMvm[i].montantRetenuMois+'--'+this.tabMvm[i].montant)
                      //     }
                      //   }
                      // }
                  }
                }
              }

            }
          }

        },error => {console.log(error),()=>{
        }});
      }
    }

  }
  getEtabEch2(data:any){
    for (let i = 0; i < data.length; i++) {
      // console.log(data[i].codeService);

    }
  }
  getEtabEch(){
    this.service.getAllMvmEcheancier().subscribe(data=>{
      let taille = Object.keys(data);
      var char :number= taille.length;
      var obj = {};
      for ( var i=0, len=char; i < len; i++ )
        obj[data[i]['codeService']] =data[i];
      data = new Array();
      for ( var key in obj )
      {
        data.push(obj[key]);
        this.tabCodeServiceMaj.push(Object.assign({}, obj[key]))
      }
      for (const objElement of this.tabCodeServiceMaj) {
        this.service.getOneEtabBy(objElement.codeService).subscribe(data=>{
         this.tabCodeServices.push(data);
        },error => console.log(error))
      }
    },error => console.log(error));
  }
  getAllMvmEcheancier(cdService){
    let boo =[] ;
  this.service.getEtabBy(cdService).subscribe((data)=>{
    this.tabMvm = (data) ;
    this.tabMvm = data.map((e) => {
      return {
        id:e.id,
        nni:e.nni,
        matricule: e.matricule,
        prenom: e.prenom,
        numeroCompte: e.nrCompte,
        brut:e.brut,
        montant:e.montant,
        partie:e.partie,
        codePost:e.codePost,
        codePoste:'',
        montantRetenuMois:null,
        dateMvm:e.dateMvm,
        codeService:e.codeService,
        numEcrit:e.numEcrit,
        dateFin:e.dateFin,
      };
    });
    let taille = Object.keys(data);
    var char :number= taille.length;
    // this.initialPage = {pageSize:char};
    var obj = {};
    for ( var i=0, len=char; i < len; i++ )
      obj[data[i]['nni']] =data[i];
    data = new Array();
    for ( var key in obj )
    {
      data.push(obj[key]);
      this.tempTab.push(Object.assign({}, obj[key]))
    }
this.getAllMvmEcheancier2(this.tempTab);
  },error => console.log(error),()=>{
  });
  }

  removeItemOnce(arr, value) {
    var index = arr.indexOf(value);
    if (index > -1) {
      arr.splice(index, 1);
    }
    return arr;
  }
}
