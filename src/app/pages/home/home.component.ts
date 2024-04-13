import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeCarouselComponent } from '../../components/home-carousel/home-carousel.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HomeCarouselComponent, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  

}
