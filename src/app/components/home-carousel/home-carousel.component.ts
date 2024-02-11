import { Component, Input } from '@angular/core';
import { Product } from '../../interfaces/Product';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home-carousel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home-carousel.component.html',
  styleUrls: ['./home-carousel.component.css']
})
export class HomeCarouselComponent {

  activeIndex = 0;

  @Input()
  listOfProducts: any[] = []

  nextItem() : void 
  {
    if(this.activeIndex === this.listOfProducts.length - 1)
      this.activeIndex = 0;

    else
      this.activeIndex++;
  }

  prevItem() : void 
  {
    if(this.activeIndex === 0)
      this.activeIndex = this.listOfProducts.length - 1;
    else
      this.activeIndex--;
  }
}
