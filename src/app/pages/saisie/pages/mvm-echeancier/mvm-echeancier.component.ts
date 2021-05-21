import { Component, OnInit, ViewChild } from '@angular/core';
import { EcheancierModel } from '../../../../models/echeancier/echeancier-model.model';
import { EcheancierService } from '../../../../services/echeancier.service';
import {Grid,Group , EditSettingsModel, EditService, RowDataBoundEventArgs, GridComponent, gridContent} from '@syncfusion/ej2-angular-grids';
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
@Component({
  selector: 'app-mvm-echeancier',
  templateUrl: './mvm-echeancier.component.html',
  styleUrls: ['./mvm-echeancier.component.scss']
})
export class MvmEcheancierComponent implements OnInit {
  @ViewChild('grid') public grid: GridComponent;
  tabMvm={};
  tempTab=[];
  AlltabMvm=[];
  typeEcheancier=[];
  typeOneEcheancier:any;
  typeTEst={};
  public toolbar: string[];
  columnsR=[
    {field:'id', headerText:"ID"},
    {field:'matricule', headerText:"Matricule"},
    {field:'nni', headerText:"NNI"},
    {field:'prenom', headerText:"Nom & Prenom "},
    {field:'montant', headerText:"Montant"},
    {field:'codePost', headerText:"Code Poste"},
    {field:'aMontant', headerText:"Ancien Montant"},
    {field: 'dateMvm',format: {type:'date', format:'dd/MM/yyyy'}, headerText:"Date MAJ"},
  ];

  public editSettings: EditSettingsModel;
  public initialPage: Object;
  public formatOptions: object;
  constructor(
    private excelSrv: EcheancierService,
    private chargement: ChargemetService,
    private service: SaisieService,
    private route:Router,
  ) { }

  ngOnInit(): void {
    this.toolbar = ['Search'];
    this.getAllMvmEcheancier();
    this.editSettings = {
      mode: 'Batch',
      showDeleteConfirmDialog: true,
      showConfirmDialog: true,
      allowEditing: true,
      allowAdding: true,
      allowDeleting: true
    };
    this.initialPage = {pageSizes: true, pageCount: 4};
    console.log(this.tempTab)

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

  subs:any;
  ngOnDestroy(){
    if(this.subs != undefined){
      this.subs.unsubscribe();
    }
  }
  getAllByMatriculeEcheancier(matricule){

    let taille = Object.keys(this.tabMvm);
    var char :number= taille.length;
    console.log(char)
    this.subs = timer(0,200).subscribe(n=>{
      console.log(n)
      if(n===char-1){
        this.ngOnDestroy();
        console.log("fin : " +n)
        this.ngOnDestroy();
      }

    });
    // this.service.getAllByMatriculeEcheancier(matricule).subscribe((data)=>{
    //   // this.tempTab.push(data[0]);
    //   console.log(data);
    // },error => {
    //   console.log(error)
    // });
  }
  getAllMvmEcheancier(){
  this.service.getAllMvmEcheancier().subscribe((data)=>{
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
        dateMvm:e.dateMvm,
      };
    });
    let taille = Object.keys(data);
    var char :number= taille.length;
    console.log(char);
    // for (const datum of data) {
    //   this.tempTab.push(this.removeDup(char,data))
    // }
    // for (let i = 0; i < char ; i++) {
    //   this.tempTab.push(data[i])
    //   //this.tempTab.push(this.removeDup(char,data))
    // }
    var obj = {};

    for ( var i=0, len=char; i < len; i++ )
      obj[data[i]['nni']] =data[i];

    data = new Array();
    for ( var key in obj )
    {
      data.push(obj[key]);
      this.tempTab.push(obj[key])
    }

  },error => console.log(error));
  }
  removeItemOnce(arr, value) {
    var index = arr.indexOf(value);
    if (index > -1) {
      arr.splice(index, 1);
    }
    return arr;
  }
  removeDup(tailleTab,Tab=[]){
    var obj = {};
    for ( var i=0, len=tailleTab; i < len; i++ ){}
      obj[Tab[i]['nni']] = Tab[i];
    Tab = new Array();
    for ( var key in obj )
    {Tab.push(obj[key]);}
    return Tab;
  }
}
