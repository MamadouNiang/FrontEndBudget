import {Component, OnInit, ViewChild} from '@angular/core';
import {SelectEventArgs, SidebarComponent} from '@syncfusion/ej2-angular-navigations';
import {Route, Router} from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-default-sidebar',
  templateUrl: './default-sidebar.component.html',
  styleUrls: ['./default-sidebar.component.scss']
})
export class DefaultSidebarComponent implements OnInit {

  constructor( private router:Router, private authServ:AuthenticationService) {

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
    { text: 'Ajout Personnel',  'category': 'Recrutement' },
    { text: 'De Compte',  'category': 'Changements' },
    { text: 'De Position',  'category': 'Changements' },
    { text: "D'elements de salaire",  'category': 'Changements' },
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
  isAdmin(){
    return this.authServ.isAdmin();
  }
  isUser(){
    return this.authServ.isUser();
  }
  isAuthenticated(){
    return this.authServ.isAuthenticated();
  }

  logOut(){
    this.authServ.logout();
  }
}
