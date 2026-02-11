import { Component, input, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLinkActive, RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [MatIconModule, RouterLinkActive, RouterModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {
  expanded = input<boolean>(true);
}
