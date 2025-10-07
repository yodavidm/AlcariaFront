import { Component } from '@angular/core';
import { DashSidebarComponent } from '../dash-components/dash-sidebar/dash-sidebar.component';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-dash-layout',
    imports: [RouterOutlet, DashSidebarComponent],
    standalone: true,
    templateUrl: './dash-layout.component.html',
    styleUrl: './dash-layout.component.css'
})
export class DashLayoutComponent {

}
