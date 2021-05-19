import { Component, OnInit, ViewChild } from '@angular/core';
import { EcheancierModel } from '../../../../models/echeancier/echeancier-model.model';
import { EcheancierService } from '../../../../services/echeancier.service';
import {Grid, EditSettingsModel, EditService, RowDataBoundEventArgs, GridComponent, gridContent} from '@syncfusion/ej2-angular-grids';
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
    this.getAllTypeEcheacier();
    this.getAllMvmEcheancier();
    this.editSettings = { mode: 'Batch',showDeleteConfirmDialog: true,showConfirmDialog: true, allowEditing: true, allowAdding: true, allowDeleting: true };
    this.initialPage = { pageSizes: true, pageCount: 4 };

  }
  dataBound(args: any) {
    this.grid.autoFitColumns();
    for (const cols of this.grid.columns) {
      if ((cols as any).field === 'dateMvm') {
        (cols as any).type = 'date';
        (cols as any).format= 'dd/MM/yyyy' ;
      }
    }
    // this.grid.refreshColumns()
  }

  getAllTypeEcheacier(){
    this.service.getAllTypeEcheancier().subscribe((data)=>{
      this.typeEcheancier = data;
    },error => console.log(error));
  }

  getAllMvmEcheancier(){
  this.service.getAllEcheancier().subscribe((data)=>{
    this.tabMvm = (data) ;
    this.AlltabMvm = (data) ;
    for (const datum of data) {
      const partie = datum.partie;
      this.service.getOneTypeEcheancier(partie).subscribe(data=>{
        this.typeOneEcheancier = data ;
        console.log(datum)
        if (datum.cnam === 0) {
          delete this.typeOneEcheancier.cnam;
        }
        if (datum.cnss === 0) {
          delete this.typeOneEcheancier.cnss;
        }
        if (datum.its === 0) {
          delete this.typeOneEcheancier.its;
        }
        if (datum.partCnss === 0) {
          delete this.typeOneEcheancier.partcnss;
        }
        if (datum.partCnam === 0) {
          delete this.typeOneEcheancier.partcnam;
        }

        console.log(this.typeOneEcheancier)


      },error => console.log(error));
    }
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
  },error => console.log(error));
  }
  removeItemOnce(arr, value) {
    var index = arr.indexOf(value);
    if (index > -1) {
      arr.splice(index, 1);
    }
    return arr;
  }
}
