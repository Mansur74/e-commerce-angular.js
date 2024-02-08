import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  isOpen : boolean = false;
  isMobileMenuOpen : boolean = false;

  toggleDropdown(){
    this.isOpen = !this.isOpen;
  }

  toggleMobileMenu(){
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }
}
