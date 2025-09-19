import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { EquipoDirectivoComponent } from './components/equipo-directivo/equipo-directivo.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'equipo', component: EquipoDirectivoComponent },
];
