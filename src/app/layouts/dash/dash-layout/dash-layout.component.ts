import { Component } from '@angular/core';
import { DashSidebarComponent } from '../dash-components/dash-sidebar/dash-sidebar.component';
import { RouterOutlet } from '@angular/router';
import { DashFooterComponent } from '../dash-components/dash-footer/dash-footer.component';

@Component({
  selector: 'app-dash-layout',
  standalone: true,
  imports: [RouterOutlet,DashSidebarComponent,DashFooterComponent],
  templateUrl: './dash-layout.component.html',
  styleUrl: './dash-layout.component.css'
})
export class DashLayoutComponent {

}
