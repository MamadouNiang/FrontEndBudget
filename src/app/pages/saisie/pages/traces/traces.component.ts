import {Component, OnInit, ViewChild} from '@angular/core';
import {SaisieService} from '../../../../services/saisie.service';
import { SelectionType, ColumnMode } from '@swimlane/ngx-datatable';
import { GroupService, SortService, GridComponent } from '@syncfusion/ej2-angular-grids';
import { DialogComponent } from '@syncfusion/ej2-angular-popups';
import { ToolbarService } from '@syncfusion/ej2-angular-grids';


@Component({
  selector: 'app-traces',
  templateUrl: './traces.component.html',
  styleUrls: ['./traces.component.scss'],

})
export class TracesComponent implements OnInit {
  public format= { format: 'M/d/yyyy', type: 'date'};
  public data: Object[];
  public groupOptions: Object;
  public pageSettings: Object;
  public refresh: Boolean;
  @ViewChild('grid')
  public grid: GridComponent;
  @ViewChild('alertDialog')
  public alertDialog: DialogComponent;
  public alertHeader: string = 'Grouping';
  public hidden: Boolean = false;
  public target: string = '.control-section';
  public alertWidth: string = '300px';
  public alertContent: string = 'Grouping est descativer pour cette colone';
  public showCloseIcon: Boolean = false;
  public animationSettings: Object = { effect: 'None' };
  public alertDlgBtnClick = () => {
    this.alertDialog.hide();
  }
  public alertDlgButtons: Object[] = [{ click: this.alertDlgBtnClick.bind(this), buttonModel: { content: 'OK', isPrimary: true } }];
  @ViewChild('myTable') table: any;
  reorderable=true;
  funder = [];
  calculated = [];
  pending = [];
  groups = [];

  editing = {};
  rows ;
  rowsC ;
  rowsP ;
  public toolbar: string[];
  ColumnMode = ColumnMode;


  constructor(private service: SaisieService ) { }

  ngOnInit(): void {
    this.getAllTraces();
    this.groupOptions = { showGroupedColumn: false, columns: ['matricule'] };
    this.pageSettings = {  pageSize: 5,pageCount: 3  };
    this.toolbar = ['Search'];
  }
  getAllTraces(){
    let val;
    this.service.getAllTraces().subscribe(data => {
      val= data;
    }, error => {
      console.log(error)
    }, () => {
      this.rows=(val) ;
      this.data =(this.rows);

    });
  }

  dataBound() {
    if(this.refresh){
      this.grid.groupColumn('matricule');
      this.refresh =false;
    }
  }
  load() {
    this.refresh = (<any>this.grid).refreshing;
  }
  created() {
    this.grid.on("columnDragStart", this.columnDragStart, this);
  }
  public columnDragStart(args: any) {
    if(args.column.field === "Mainfieldsofinvention"){
      this.alertDialog.show();
    }
  }
}
