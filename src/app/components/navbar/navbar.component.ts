import { CommonModule } from '@angular/common';
import { Component, HostListener, Input, OnInit } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
  @Input()
  isSignIn : boolean = false;
  isOpen : boolean = false;
  isMobileMenuOpen : boolean = false;

  ngOnInit(): void {
    if(localStorage.getItem("refreshToken") == null && sessionStorage.getItem("refreshToken") == null)
      this.isSignIn = false

    else
      this.isSignIn = true;

  }
  @HostListener('document:click', ['$event'])
  clickOutside(event: Event) {
    if (!(event.target as HTMLElement).closest('.relative')) {
      this.isOpen = false;
    }
  }

  toggleDropdown(){
    this.isOpen = !this.isOpen;
  }

  toggleMobileMenu(){
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  signOut = () => {
    localStorage.removeItem("refreshToken");
    sessionStorage.removeItem("refreshToken");
    this.isSignIn = false;
  }
}
