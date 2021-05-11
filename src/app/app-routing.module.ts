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


const routes: Routes = [
  {path: 'saisie', component: SaisieComponent},
  {path: 'sidebar', component: DefaultSidebarComponent},
  {path: 'login', component: LoginComponent},
  { path: 'register', component : RegisterComponent, },
  { path: 'modification_compte', component : ComptebancaireComponent, },
  { path: 'Changement de Compte', component : ComptebancaireComponent, },
  { path: 'modification_position', component : PositionsComponent, },
  { path: 'Changement de Position', component : PositionsComponent, },
  { path: 'mouvements', component : MouvementsComponent, },
  { path: 'Listes des Instances', component : MouvementsComponent, },
  { path: 'rejeter', component : RejetsComponent, },
  { path: 'Listes des Rejets', component : RejetsComponent, },
  { path: 'valider', component : ValiderComponent, },
  { path: 'Listes des Validations', component : ValiderComponent, },
  { path: 'traces', component : TracesComponent, },
  { path: 'Historiques', component : TracesComponent, },
  { path: 'echeancier', component : EcheancierComponent, },
  { path: 'Echeancier', component : EcheancierComponent, },
  { path: 'EcheancierMvm', component : MvmEcheancierComponent, },
  { path: "chargement", component: ChargementComponent, },
  { path: '', component: PositionsComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
