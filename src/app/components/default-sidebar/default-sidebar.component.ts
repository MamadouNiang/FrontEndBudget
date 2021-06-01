import {Component, OnInit, ViewChild} from '@angular/core';
import {SelectEventArgs, SidebarComponent} from '@syncfusion/ej2-angular-navigations';
import {Route, Router} from '@angular/router';

@Component({
  selector: 'app-default-sidebar',
  templateUrl: './default-sidebar.component.html',
  styleUrls: ['./default-sidebar.component.scss']
})
export class DefaultSidebarComponent implements OnInit {

  constructor( private router:Router) {

  }

  ngOnInit(): void {
  }
  @ViewChild('sidebarInstance')
  public sidebarInstance: SidebarComponent;
  public width: string = '250px';
  public type: string = 'Over';
  public closeOnDocumentClick:boolean = true;
  public showBackdrop:boolean = true;
  public dataList: { [key: string]: Object }[] = [
    { text: 'De Compte',  'category': 'Changements' },
    { text: 'De Position',  'category': 'Changements' },
    { text: "D'Element de Salaire",  'category': 'Changements' },
    { text: 'Des Instances',  'category': 'Listes' },
    { text: 'Des Validations' ,  'category': 'Listes'},
    { text: 'Des Rejets' ,  'category': 'Listes'},
    { text: 'Des Historiques',  'category': 'Listes' },
    { text: 'Importation',  'category': 'Echeanciers' },
    { text: 'Instances',  'category': 'Echeanciers' },
  ];
  // public fields: Object = { tooltip: 'text' };
  public fields: Object = { groupBy: 'category', tooltip: 'text' };
  // open new tab
  newTabClick(): void {
    let URL = location.href.replace(location.search,'');
    document.getElementById('newTab').setAttribute('href', URL.split('#')[0] + 'sidebar/sidebar-list');
  }
  // Listview select event handler
  onSelect(args: SelectEventArgs) {
    this.sidebarInstance.hide();
    const texte = args['text'];
    this.router.navigateByUrl('/'+texte)
    // document.getElementsByClassName('textArea')[0].innerHTML =args['text']+ " Page Content";
  }

  openClick() {
    this.sidebarInstance.show();
  }
  closeClick() {
    this.sidebarInstance.hide();
  }
}
