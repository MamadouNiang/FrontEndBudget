import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { HeaderComponent } from './components/header/header.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AlertModule } from 'ngx-bootstrap/alert';
import { SaisieComponent } from './pages/saisie/saisie.component';

import { SlidebarSaisieComponent } from './pages/saisie/componentsaisie/slidebar-saisie/slidebar-saisie.component';
import { PositionsComponent } from './pages/saisie/pages/positions/positions.component';
import { ComptebancaireComponent } from './pages/saisie/pages/modifications/comptebancaire/comptebancaire.component';
import {Ng2SearchPipeModule} from 'ng2-search-filter';
import { MouvementsComponent } from './pages/saisie/pages/mouvements/mouvements.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ModalModule, BsModalService } from 'ngx-bootstrap/modal';
import { NgSelectModule } from '@ng-select/ng-select';
import { RejetsComponent } from './pages/saisie/pages/rejets/rejets.component';
import { ValiderComponent } from './pages/saisie/pages/valider/valider.component';
import { TracesComponent } from './pages/saisie/pages/traces/traces.component';
import { EcheancierComponent } from './pages/saisie/pages/echeancier/echeancier.component';
import { DefaultSidebarComponent } from './components/default-sidebar/default-sidebar.component';
import {SidebarModule,TreeViewAllModule} from '@syncfusion/ej2-angular-navigations';
// import {SelectionType } from '@swimlane/ngx-datatable/src/ ';
// import { ColumnMode } from '@swimlane/ngx-datatable/lib/types/column-mode.type';
import {ListViewModule } from '@syncfusion/ej2-angular-lists';
//Syncfusion ej2-angular-popups module
import {DialogModule, TooltipModule} from '@syncfusion/ej2-angular-popups';
// import the GridModule for the Grid component
import { GridModule, GroupService, SortService, PageService, ToolbarService, EditService,PagerModule, ResizeService, ColumnMenuService, FilterService } from '@syncfusion/ej2-angular-grids';
import { DropDownTreeModule } from '@syncfusion/ej2-angular-dropdowns';
import { ChargementComponent } from './components/chargement/chargement.component';
import { MvmEcheancierComponent } from './pages/saisie/pages/mvm-echeancier/mvm-echeancier.component';
import { ElementDeSalaireComponent } from './pages/saisie/pages/element-de-salaire/element-de-salaire.component';
import { ElementsDeSalairesComponent } from './pages/saisie/pages/elements-de-salaires/elements-de-salaires.component';
import { MvmsEcheancierComponent } from './pages/saisie/pages/mvms-echeancier/mvms-echeancier.component';
import { RecrutementComponent } from './pages/saisie/pages/recrutement/recrutement.component';

@NgModule({
  declarations: [

    AppComponent,
    LoginComponent,
    RegisterComponent,
    HeaderComponent,
    SaisieComponent,

    SlidebarSaisieComponent,
    ComptebancaireComponent,
    PositionsComponent,
    MouvementsComponent,
    RejetsComponent,
    ValiderComponent,
    TracesComponent,
    EcheancierComponent,
    DefaultSidebarComponent,
    ChargementComponent,
    MvmEcheancierComponent,
    ElementDeSalaireComponent,
    ElementsDeSalairesComponent,
    MvmsEcheancierComponent,
    RecrutementComponent,



  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AlertModule,
    FormsModule,
    Ng2SearchPipeModule,
    NgxDatatableModule,
    ModalModule.forRoot(),
    NgSelectModule,
    SidebarModule,
    TreeViewAllModule,
    ListViewModule,
    TooltipModule,
    GridModule,
    DialogModule,
    DropDownTreeModule,
    PagerModule,
  ],
  providers: [BsModalService,
    GroupService,
    SortService ,
    PageService,
    ToolbarService,
    EditService,
    ToolbarService,
    ResizeService,
    ColumnMenuService,
    FilterService],
  bootstrap: [AppComponent]
})
export class AppModule { }
