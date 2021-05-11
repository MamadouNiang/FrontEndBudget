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
    { text: 'Changement de Compte' },
    { text: 'Changement de Position' },
    { text: 'Listes des Instances' },
    { text: 'Listes des Validations' },
    { text: 'Listes des Rejets' },
    { text: 'Historiques' },
    { text: 'Echeancier' },
    { text: 'EcheancierMvm' },
  ];
  public fields: Object = { tooltip: 'text' };

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
