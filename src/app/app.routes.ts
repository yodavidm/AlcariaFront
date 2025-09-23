import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { EquipoDirectivoComponent } from './components/equipo-directivo/equipo-directivo.component';
import { LoginComponent } from './components/login/login.component';
import { LoginActivateComponent } from './components/login-activate/login-activate.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'equipo', component: EquipoDirectivoComponent },
    { path: 'login', component: LoginComponent },
    { path: 'home', component: HomeComponent },
    { path: 'activar-cuenta', component:LoginActivateComponent}
];
