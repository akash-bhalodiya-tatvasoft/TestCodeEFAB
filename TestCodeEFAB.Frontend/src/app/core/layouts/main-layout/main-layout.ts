import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header, Navbar } from './components';
import { MatSidenavModule } from '@angular/material/sidenav';
import { BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-main-layout',
  imports: [Header, Navbar, RouterOutlet, MatSidenavModule],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.scss',
})
export class MainLayout implements OnInit {
  private breakPointObserver = inject(BreakpointObserver);
  isExpanded = signal(true);
  sidenavMode: 'side' | 'over' = 'side';

  ngOnInit(): void {
    this.initializeBreakpoint();
  }

  initializeBreakpoint() {
    this.breakPointObserver.observe(['(max-width: 768px)']).subscribe((result) => {
      if (result.matches) {
        this.sidenavMode = 'over';
        this.isExpanded.set(false);
      } else {
        this.sidenavMode = 'side';
        this.isExpanded.set(true);
      }
    });
  }

  toggleSidebar() {
    this.isExpanded.set(!this.isExpanded());
  }
}
