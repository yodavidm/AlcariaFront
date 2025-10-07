import { Component } from '@angular/core';
import { NavBarComponent } from '../main-components/nav-bar/nav-bar.component';
import { FooterComponent } from '../main-components/footer/footer.component';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-main-layout',
    imports: [RouterOutlet, NavBarComponent, FooterComponent],
    standalone: true,
    templateUrl: './main-layout.component.html',
    styleUrl: './main-layout.component.css'
})
export class MainLayoutComponent {

}
