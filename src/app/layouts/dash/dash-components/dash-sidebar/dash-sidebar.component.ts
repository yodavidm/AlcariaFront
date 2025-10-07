import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, HostListener, QueryList, Renderer2, ViewChildren } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dash-sidebar',
  imports: [CommonModule, RouterLink],
  standalone: true,

  templateUrl: './dash-sidebar.component.html',
  styleUrl: './dash-sidebar.component.css'
})
export class DashSidebarComponent implements AfterViewInit {

  @ViewChildren('arrow') arrows!: QueryList<ElementRef>;
  @ViewChildren('sidebarBtn') sidebarBtn!: QueryList<ElementRef>;
  @ViewChildren('sidebar') sidebar!: QueryList<ElementRef>;

  private sidebarEl!: HTMLElement | null;
  private btnEl!: HTMLElement | null;

  constructor(private renderer: Renderer2) { }

  ngAfterViewInit(): void {
    // Manejar clicks en las flechas
    this.arrows.forEach((arrow) => {
      this.renderer.listen(arrow.nativeElement, 'click', (event: Event) => {
        const arrowParent = (event.target as HTMLElement).parentElement?.parentElement;
        if (arrowParent) {
          arrowParent.classList.toggle('showMenu');
        }
      });
    });

    // Guardar referencias a sidebar y botón
    this.sidebarEl = this.sidebar.first?.nativeElement ?? null;
    this.btnEl = this.sidebarBtn.first?.nativeElement ?? null;

    if (this.btnEl && this.sidebarEl) {
      this.renderer.listen(this.btnEl, 'click', () => {
        this.sidebarEl!.classList.toggle('close');
      });
    }
  }

  // Detectar clicks fuera de la sidebar
  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    const target = event.target as HTMLElement;

    // Si no hay referencias aún, salimos
    if (!this.sidebarEl || !this.btnEl) return;

    const clickedInsideSidebar = this.sidebarEl.contains(target);
    const clickedSidebarBtn = this.btnEl.contains(target);

    // Si el click no fue dentro ni en el botón, cerramos
    if (!clickedInsideSidebar && !clickedSidebarBtn) {
      this.sidebarEl.classList.add('close');
    }
  }
}