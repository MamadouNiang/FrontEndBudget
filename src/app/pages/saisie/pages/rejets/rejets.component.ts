import { Component, OnInit } from '@angular/core';
import {SaisieService} from '../../../../services/saisie.service';
import {errorObject} from 'rxjs/internal-compatibility';
import { SelectionType, ColumnMode } from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-rejets',
  templateUrl: './rejets.component.html',
  styleUrls: ['./rejets.component.scss']
})
export class RejetsComponent implements OnInit {

  rawEvent: any;
  contextmenuRow: any;
  contextmenuColumn: any;
  tableMvm;
  listeMvm: any;
  listeMvmI: any;
  selected = [];
  rows ;

  columns = [{ name: 'matricule' }, { name: 'acdBanque' }, { name: 'acdMdr' },{ name: 'anumeroCompte' },{ name: 'acdPosition' },{ name: 'adatePosition' },{ name: 'ncdBanque' },{ name: 'ncdMdr' },{ name: 'nnumeroCompte' },{ name: 'ncdPosition' },{ name: 'ndateposition' }];
  allColumns = [{ name: 'Matricule' }, { name: 'Banque' }, { name: 'MDR' },{ name: 'Compte' },{ name: 'Position' },{ name: 'Date Position' },{ name: 'N.Banque' },{ name: 'N.Mdr' },{ name: 'N.Compte' },{ name: 'N.Position' },{ name: 'N.Date Position' }];

  SelectionType = SelectionType;
  ColumnMode = ColumnMode;

  constructor(private service: SaisieService) {
  }
  onTableContextMenu(contextMenuEvent) {
    console.log(contextMenuEvent);

    this.rawEvent = contextMenuEvent.event;
    if (contextMenuEvent.type === 'body') {
      this.contextmenuRow = contextMenuEvent.content;
      this.contextmenuColumn = undefined;
    } else {
      this.contextmenuColumn = contextMenuEvent.content;
      this.contextmenuRow = undefined;
    }

    contextMenuEvent.event.preventDefault();
    contextMenuEvent.event.stopPropagation();
  }
  toggle(col) {
    const isChecked = this.isChecked(col);

    if (isChecked) {
      this.columns = this.columns.filter(c => {
        return c.name !== col.name;
      });
    } else {
      this.columns = [...this.columns, col];
    }
  }
  isChecked(col) {
    return (
      this.columns.find(c => {
        return c.name === col.name;
      }) !== undefined
    );
  }
  onSelect({ selected }) {
    console.log('Select Event', selected, this.selected);
    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
  }
  onActivate(event) {
    // console.log('Activate Event', event);
  }
  add() {
    this.selected.push(this.rows[1], this.rows[3]);
  }
  update() {
    this.selected = [this.rows[1], this.rows[3]];
  }
  remove() {
    this.selected = [];
  }
  ngOnInit(): void {
    //this.getTableMvm();
    this.getTableMvI();
  }
  getTableMvm(){
    let val;
    this.service.getAllMVT().subscribe(data => {
      val= data;
    }, error => {
      console.log(error)
    }, () => {
      this.listeMvm = val;
      this.rows=(val) ;
      console.log( this.rows)
    });
  }
  getTableMvI(){
    let val=[];
    this.service.getAllMVT().subscribe(data => {
      for(let i =0 ; i< data.length;i++){
        if(data[i].rejeter){
          console.log(data[i]);
          val.push(data[i]);
        }
      }
    }, error => {
      console.log(error)
    }, () => {
      this.listeMvmI = val;
      this.rows=(val) ;
      console.log( this.rows)
    });
  }

  UpdateAdmin(data: any) {
    for(let i=0;i<data.length;i++){
      if(!data[i].validaton){
        data[i].validaton = true;
        this.service.UpdateMtoA(data[i],data[i].matricule).subscribe(data =>{},error => console.log(error.errors));
      }
    }
    // for (const sel  of data) {
    //   if (!sel.validaton) {
    //    sel.validaton=true;
    //     this.service.UpdateMtoA(data,sel.matricule).subscribe(data => {
    //     }, error => {
    //       console.log(error);
    //     }, () => {
    //     });
    //   }
    // }


  }
  RejectToAdmin(data:any){
    console.log(data);
  }

  checkAll(){

  }

}
