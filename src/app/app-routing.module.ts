import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RegisterComponent} from './auth/register/register.component';
import {LoginComponent} from './auth/login/login.component';
import {SaisieComponent} from './pages/saisie/saisie.component';
import {ComptebancaireComponent} from './pages/saisie/pages/modifications/comptebancaire/comptebancaire.component';
import {PositionsComponent} from './pages/saisie/pages/positions/positions.component';
import {MouvementsComponent} from './pages/saisie/pages/mouvements/mouvements.component';
import {RejetsComponent} from './pages/saisie/pages/rejets/rejets.component';
import {ValiderComponent} from './pages/saisie/pages/valider/valider.component';
import {TracesComponent} from './pages/saisie/pages/traces/traces.component';
import {EcheancierComponent} from './pages/saisie/pages/echeancier/echeancier.component';
import {MvmEcheancierComponent} from './pages/saisie/pages/mvm-echeancier/mvm-echeancier.component';
import {DefaultSidebarComponent} from './components/default-sidebar/default-sidebar.component';
import { ChargementComponent } from './components/chargement/chargement.component';
import {ElementDeSalaireComponent} from "./pages/saisie/pages/element-de-salaire/element-de-salaire.component";
import {ElementsDeSalairesComponent} from "./pages/saisie/pages/elements-de-salaires/elements-de-salaires.component";
import {MvmsEcheancierComponent} from "./pages/saisie/pages/mvms-echeancier/mvms-echeancier.component";
import {RecrutementComponent} from "./pages/saisie/pages/recrutement/recrutement.component";


const routes: Routes = [
  {path: 'saisie', component: SaisieComponent},
  {path: 'sidebar', component: DefaultSidebarComponent},
  {path: 'login', component: LoginComponent},
  { path: 'register', component : RegisterComponent, },
  { path: 'modification_compte', component : ComptebancaireComponent, },
  { path: 'De Compte', component : ComptebancaireComponent, },
  { path: 'modification_position', component : PositionsComponent, },
  { path: 'De Position', component : PositionsComponent, },
  { path: "D'elements de salaire", component : ElementsDeSalairesComponent, },
  { path: 'mouvements', component : MouvementsComponent, },
  { path: 'Des Instances', component : MouvementsComponent, },
  { path: 'rejeter', component : RejetsComponent, },
  { path: 'Des Rejets', component : RejetsComponent, },
  { path: 'valider', component : ValiderComponent, },
  { path: 'Des Validations', component : ValiderComponent, },
  { path: 'traces', component : TracesComponent, },
  { path: 'Des Historiques', component : TracesComponent, },
  { path: 'echeancier', component : EcheancierComponent, },
  { path: 'Importation', component : EcheancierComponent, },
  { path: 'Instances', component : MvmEcheancierComponent, },
  // { path: 'Instances', component : MvmsEcheancierComponent, },
  { path: "chargement", component: ChargementComponent, },
  { path: "recrutement", component: RecrutementComponent, },
  {path: '', redirectTo: 'login', pathMatch: 'full'},

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
