import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { HomeComponent } from './layouts/main-alcaria/main-components/home/home.component';
import { NavBarComponent } from './layouts/main-alcaria/main-components/nav-bar/nav-bar.component';
import { EquipoDirectivoComponent } from "./layouts/main-alcaria/main-components/equipo-directivo/equipo-directivo.component";
import { FooterComponent } from "./layouts/main-alcaria/main-components/footer/footer.component";
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavBarComponent, RouterModule, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Alcaria-front';
}
