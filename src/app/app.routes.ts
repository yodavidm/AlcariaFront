import { Routes } from '@angular/router';
import { HomeComponent } from './layouts/main-alcaria/main-components/home/home.component';
import { EquipoDirectivoComponent } from './layouts/main-alcaria/main-components/equipo-directivo/equipo-directivo.component';
import { LoginComponent } from './layouts/main-alcaria/main-components/login/login.component';
import { LoginActivateComponent } from './layouts/main-alcaria/main-components/login-activate/login-activate.component';
import { LoginNormalComponent } from './layouts/main-alcaria/main-components/login-normal/login-normal.component';
import { UploadCsvComponent } from './layouts/main-alcaria/main-components/upload-csv/upload-csv.component';
import { MainLayoutComponent } from './layouts/main-alcaria/main-layout/main-layout.component';
import { DashLayoutComponent } from './layouts/dash/dash-layout/dash-layout.component';

export const routes: Routes = [
    {
        path: '',
        component: MainLayoutComponent,
        children: [
            { path: '', component: HomeComponent },
            { path: 'equipo', component: EquipoDirectivoComponent },
            { path: 'login', component: LoginComponent },
            { path: 'home', component: HomeComponent },
            { path: 'activar-cuenta', component: LoginActivateComponent },
            { path: 'login-normal', component: LoginNormalComponent },
            { path: 'uploadCSV', component: UploadCsvComponent }
        ]
    },

        {
        path: 'dashboard',
        component: DashLayoutComponent,
        children: [
            { path: '', component: HomeComponent },
            { path: 'uploadCSV', component: UploadCsvComponent },
        ]
    }


];
