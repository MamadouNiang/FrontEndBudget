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
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { Query } from '@syncfusion/ej2-data'
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {BsModalService} from "ngx-bootstrap/modal";
@Component({
  selector: 'app-echeancier',
  templateUrl: './echeancier.component.html',
  styleUrls: ['./echeancier.component.scss']
})
export class EcheancierComponent implements OnInit {
  DataEcheancier$: Observable<any>| null = null;
  cas=[];
  selected?:String;
  tabCodeServices=[];
  TableEcheancer=[];
  tabMvm={};
  AlltabMvm=[];
  typeEcheancierV=[];
  typeOneEcheancier:any;
  partieElem: HTMLElement;
  partieObj: DropDownList;
  Erreurs=true;
  columns=[];
  typeEcheancier:any;
  columnsR=[
    {field:'matricule'},
    {field:'nni'},
    {field:'Banque'},
    {field:'prenom'},
    {field:'nrCompte'},
    {field:'brut'},
    {field:'its'},
    {field:'cnss'},
    {field:'cnam'},
    {field:'net'},
    {field:'pension'},
    {field:'partCnss'},
    {field:'partCnam'},
    {field:'partPension'},
    {field:'observation'},
    {field: 'partie' , edit: {
        create: () => {
          this.partieElem = document.createElement('input');
          return this.partieElem;
        },
        read: () => {
          return this.partieObj.text;
        },
        destroy: () => {
          this.partieObj.destroy();
        },
        write: () => {
          this.partieObj = new DropDownList({
            dataSource:this.typeEcheancier,
            fields: {value: 'partie', text: 'partie'},
            placeholder: 'Selection',
            floatLabelType: 'Never'
          });
          this.partieObj.appendTo(this.partieElem);
        }}},
    // {field:'codeService'},

  ];
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
              private fb: FormBuilder,
  ) { }
  ngOnInit(): void {
    this.getAllrefService();
    this.editSettings = { mode: 'Batch',showDeleteConfirmDialog: true,showConfirmDialog: true, allowEditing: true, allowAdding: true, allowDeleting: true };
    this.filterSettings = { type: 'CheckBox' };
    this.getAllTypeEcheancier();
  }
  public gridCreated(): void {
    this.grid.hideSpinner = () => true;
    setSpinner({ type: 'Bootstrap' });
  }
  getAllrefService(){
  this.service.getAllrefService().subscribe((data)=>{
    for (const datum of data) {
      this.tabCodeServices.push(datum)
    }
  },error => console.log(error))
  }

getAllTypeEcheancier(){
  this.service.getAllTypeEcheancier().subscribe(data=>{
    console.log(data);
    this.typeEcheancier = (data);
  },error => console.log(error));
}
  customiseCell(args:RowDataBoundEventArgs){
    this.toolbar = ['Add', 'Edit', 'Delete', 'Update', 'Cancel','Search'];
    let net = args.data['net'];
    const brut =  args.data['brut'];
    const its =  args.data['its'];
    const cnam =  args.data['cnam'];
    const cnss =  args.data['cnss'];
    const pension =  args.data['pension'];
    const partPension =  args.data['partPension'];
    const neta = brut - (its+ cnam + cnss+pension);
    if(args.data['brut']-args.data['its']-args.data['cnam']-args.data['cnss']-args.data['pension'] !== args.data['net']){
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
    this.cas =[]
    const target: DataTransfer = <DataTransfer>(evt.target);
    if (target.files.length !== 1) { throw new Error('Cannot use multiple files'); }

    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {

      const bstr: string = e.target.result;
      const data = <any[]>this.excelSrv.importFromFile(bstr);

      const header: string[] = Object.getOwnPropertyNames(new EcheancierModel());
      const importedData = data.slice(1);
      this.initialPage = { pageSizes: true, pageCount: 4 ,pageSize:importedData.length};
      // this.columns.push(header+',Partie'+',Pension'+',Part Pension');
      for (let i = 0; i < importedData.length; i++) {
        importedData[i].push('11',this.selected)
      }
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
  subs2:any;
  ngOnDestroy(){
    console.log(this.subs)
    if(this.subs != undefined){
      this.subs.unsubscribe();
    }
  }
  ngOnDestroy2(){
    console.log(this.subs2)
    if(this.subs2 != undefined){
      this.subs2.unsubscribe();
    }
  }
  saveDataEcheancier(){
    const erreurs = [];
    let tailleEcheancier =this.TableEcheancer.length;
    console.log(this.TableEcheancer)
    this.subs2 = timer(0,100).subscribe(n=>{
      this.chargement.requestStarted();
      this.chargement.requestStarted2(n,tailleEcheancier);
      this.service.saveEcheanciers(this.TableEcheancer[n]).subscribe(
          ()=> {
          }
          ,error =>{
          console.log((error));
          erreurs.push(n);
          n=n-1
        }
      );
     if(n===tailleEcheancier-1){
       this.ngOnDestroy2();
       console.log("fin : " +n)
       this.chargement.resetSpinner();
       this.chargement.requestEnded();
       setTimeout(function(){
       }, 200);
       this.route.navigateByUrl('/Instances');
       this.ngOnDestroy2();
     }
   });
  }
  saveExcel(){
    let nour = []
    let taille = Object.keys(this.grid.dataSource);
    var char :number= taille.length;
    this.subs = timer(0,100).subscribe(n=>{
      const erreurs = [];
      this.chargement.requestStarted();
      this.chargement.requestStarted2(n,char);
      if(n === char) {
        this.ngOnDestroy();
        console.log("fin = "+n)
        this.chargement.resetSpinner();
         this.saveDataEcheancier();
        this.chargement.requestEnded();
        this.ngOnDestroy();
      }else {
        var obj = {};
        for ( var i=0, len=char; i < len; i++ )
          obj[this.grid.dataSource[i]['matricule']] =this.grid.dataSource[i];
        nour = new Array();
        for ( var key in obj )
        {
          nour.push(Object.assign({}, obj[key]))
        }
        console.log(nour)
        const partie = this.grid.dataSource[n].partie;
        this.service.getOneTypeEcheancier(partie).subscribe(data => {
          this.typeOneEcheancier = data;
          console.log(data)
          delete this.typeOneEcheancier.partie;

          if (this.grid.dataSource[n].cnam === 0) {
            this.service.getAllByMatriculeEcheancier(this.grid.dataSource[n].matricule).subscribe(data=>{
              for (const datum of data) {
                console.log(this.grid.dataSource[n].matricule+'-'+datum.codePoste)
               if(datum.codePoste != '611'){
                 console.log('je supprime element cnam')
                 delete this.typeOneEcheancier.cnam;
               }
              }
            });
          }
          if (this.grid.dataSource[n].cnss === 0) {
            this.service.getAllByMatriculeEcheancier(this.grid.dataSource[n].matricule).subscribe(data=>{
              for (const datum of data) {
                console.log(this.grid.dataSource[n].matricule+'-'+datum.codePoste)
                if(datum.codePoste != '601'){
                  console.log('je supprime element cnss')
                  delete this.typeOneEcheancier.cnss;
                }
              }
            });
          }
          if (this.grid.dataSource[n].its === 0) {
            this.service.getAllByMatriculeEcheancier(this.grid.dataSource[n].matricule).subscribe(data=>{
              for (const datum of data) {
                console.log(this.grid.dataSource[n].matricule+'-'+datum.codePoste)

                if(datum.codePoste != '610'){
                  console.log('je supprime element its')
                  delete this.typeOneEcheancier.its;
                }
              }
            });

          }
          if (this.grid.dataSource[n].partCnss === 0) {
            this.service.getAllByMatriculeEcheancier(this.grid.dataSource[n].matricule).subscribe(data=>{
              for (const datum of data) {
                console.log(this.grid.dataSource[n].matricule+'-'+datum.codePoste)

                if(datum.codePoste != '808'){
                  console.log('je supprime element partCnss')

                  delete this.typeOneEcheancier.partCnss;
                }
              }
            });

          }
          if (this.grid.dataSource[n].partCnam === 0) {
            this.service.getAllByMatriculeEcheancier(this.grid.dataSource[n].matricule).subscribe(data=>{
              for (const datum of data) {
                console.log(this.grid.dataSource[n].matricule+'-'+datum.codePoste)

                if(datum.codePoste != '811'){
                  console.log('je supprime element partCnam')
                  delete this.typeOneEcheancier.partCnam;

                }
              }
            });
          }
          if (this.grid.dataSource[n].pension === 0) {
            this.service.getAllByMatriculeEcheancier(this.grid.dataSource[n].matricule).subscribe(data=>{
              for (const datum of data) {
                console.log(this.grid.dataSource[n].matricule+'-'+datum.codePoste)

                if(datum.codePoste != '600'){
                  console.log('je supprime element pension')

                  delete this.typeOneEcheancier.pension;
                }
              }
            });
          }
          if (this.grid.dataSource[n].partPension === 0) {
            this.service.getAllByMatriculeEcheancier(this.grid.dataSource[n].matricule).subscribe(data=>{
              for (const datum of data) {
                console.log(this.grid.dataSource[n].matricule+'-'+datum.codePoste)

                if(datum.codePoste != '805'){
                  console.log('je supprime element partPension')

                  delete this.typeOneEcheancier.partPension;

                }
              }
            });
          }

          let tailleT = Object.keys(this.typeOneEcheancier);
          var charT: number = tailleT.length;
          for (let i = 0; i < charT; i++) {
            const filtreExcel = [this.grid.dataSource[n]].map((e) => {
              console.log(e);
              return {
                nni: e.nni,
                matricule: e.matricule,
                prenom: e.prenom,
                numeroCompte: e.nrCompte,
                brut: e.brut,
                net: e.net,
                cnss: e.cnss,
                cnam: e.cnam,
                pension: e.pension,
                its: e.its,
                partPension: e.partPension,
                partCnam: e.partCnam,
                partCnss: e.partCnss,
                codePost: this.typeOneEcheancier[Object.keys(this.typeOneEcheancier)[i]],
                dateMvm: Date.now(),
                montant: 0,
                partie: e.partie,
                codeService: e.codeService,
              };
            });
            // console.log( filtreExcel[0]);
            filtreExcel[0].montant = filtreExcel[0][Object.keys(this.typeOneEcheancier)[i]]
            this.TableEcheancer.push(filtreExcel[0])

          }
          console.log(n)
          console.log(char)
          if (n > char) {
            this.ngOnDestroy();
            console.log("fin : " + n)
            this.chargement.resetSpinner();
            //this.saveDataEcheancier();
            this.chargement.requestEnded();
            // this.saveDataEcheancier();
            // setTimeout(function(){
            //   }, 200);
            // this.route.navigateByUrl('/EcheancierMvm');
            this.ngOnDestroy();
          }
        });
      }
    });

  }
}
