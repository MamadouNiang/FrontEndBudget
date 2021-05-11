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
@Component({
  selector: 'app-echeancier',
  templateUrl: './echeancier.component.html',
  styleUrls: ['./echeancier.component.scss']
})
export class EcheancierComponent implements OnInit {
  DataEcheancier$: Observable<any>| null = null;
  cas=[];
  Erreurs=true;
  columns=[];
  importEcheancier: EcheancierModel[] = [];
  exportEcheancier: EcheancierModel[] = [];
  public initialPage: Object;
  getStyles = {};
  psize;
  public editSettings: EditSettingsModel;
  public toolbar: ToolbarItems[];
  @ViewChild('grid')
  public grid: GridComponent;
  public filterSettings: FilterSettingsModel;
  constructor(private excelSrv: EcheancierService,
              private chargement: ChargemetService,
              private service: SaisieService,
              private route:Router,
  ) { }
  ngOnInit(): void {
    this.editSettings = { mode: 'Batch',showDeleteConfirmDialog: true,showConfirmDialog: true, allowEditing: true, allowAdding: true, allowDeleting: true };
    this.filterSettings = { type: 'CheckBox' };

  }
  public gridCreated(): void {
    this.grid.hideSpinner = () => true;
    setSpinner({ type: 'Bootstrap' });
  }

  customiseCell(args:RowDataBoundEventArgs){
    this.toolbar = ['Add', 'Edit', 'Delete', 'Update', 'Cancel'];
    let net = args.data['net'];
    const brut =  args.data['brut'];
    const its =  args.data['its'];
    const cnam =  args.data['cnam'];
    const cnss =  args.data['cnss'];
    const neta = brut - (its+ cnam + cnss);
    if(args.data['brut']-args.data['its']-args.data['cnam']-args.data['cnss'] !== args.data['net']){
      args.row.classList.add('below-30');
      if(!this.cas.includes(args.data['nni'])){
        if(args.data['nni'] != null){
          this.cas.push(args.data['nni'])
        }
      }
    }else{
      let ncas = this.removeItemOnce(this.cas,args.data['nni'])
    }
  }
  removeItemOnce(arr, value) {
    var index = arr.indexOf(value);
    if (index > -1) {
      arr.splice(index, 1);
    }
    return arr;
  }
  dataBound(args: any) {
    (this.grid.columns[1] as any).isPrimaryKey = 'true';
    this.grid.autoFitColumns();
  }
  onFileChange(evt: any) {
    const target: DataTransfer = <DataTransfer>(evt.target);
    if (target.files.length !== 1) { throw new Error('Cannot use multiple files'); }

    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {

      const bstr: string = e.target.result;
      const data = <any[]>this.excelSrv.importFromFile(bstr);

      const header: string[] = Object.getOwnPropertyNames(new EcheancierModel());
      const importedData = data.slice(1, -1);
      this.initialPage = { pageSizes: true, pageCount: 4 ,pageSize:importedData.length};
      this.columns.push(header);
      this.importEcheancier = importedData.map(arr => {
        const obj = {};
        for (let i = 0; i < header.length; i++) {
          const k = header[i];
          obj[k] = arr[i];
        }
        return <EcheancierModel>obj;
      })
    };
    reader.readAsBinaryString(target.files[0]);
  }
  isCas(ca):boolean{
    let net = ca.net;
    const brut = ca.brut;
    const its = ca.its;
    const cnam = ca.cnam;
    const cnss = ca.cnss;
    const neta = brut - (its+ cnam + cnss);
    if(net != neta){
      return true;
    }
  }
 subs:any;
  ngOnDestroy(){
    console.log(this.subs)
    if(this.subs != undefined){
      this.subs.unsubscribe();
    }
  }
  saveExcel(){

    // console.log(Object.keys(this.grid.dataSource))
    let taille = Object.keys(this.grid.dataSource);
    var char :number= taille.length;
    const erreurs = [];
    this.subs = timer(0,300).subscribe(n=>{
      console.log(n,char);
        this.chargement.requestStarted();
        this.chargement.requestStarted2(n,char);
      this.service.saveEcheanciers(this.grid.dataSource[n]).subscribe(
          ()=> {
          }
          ,error =>{
          console.log((error));
          erreurs.push(n);
          n=n-1
        }
      );
      if(n===char-1){
        this.ngOnDestroy();
        console.log("fin : " +n)
        this.chargement.resetSpinner();
        this.chargement.requestEnded();
        setTimeout(function(){

          }, 200);
        this.route.navigateByUrl('/EcheancierMvm');
        this.ngOnDestroy();

      }
    })
    }
}
