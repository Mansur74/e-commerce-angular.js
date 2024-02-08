import { Component } from '@angular/core';
import { ProductCartComponent } from '../../components/product-cart/product-cart.component';
import { CommonModule } from '@angular/common';
import { HomeCarouselComponent } from '../../components/home-carousel/home-carousel.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ProductCartComponent, CommonModule, HomeCarouselComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  isOpenColor = false;
  isOpenCategory = false;
  isOpenRate = false;
  isOpenSort = false;
  isOpenMenu = true;
  isSuccess: boolean = true;
  
  list = [{type: "Outdoor", name: "monstera", src: "https://user-images.githubusercontent.com/2805249/64069899-8bdaa180-cc97-11e9-9b19-1a9e1a254c18.png"}, {type: "Indoor", name: "Oak Tree", src: "https://cdn.shopify.com/s/files/1/0070/7032/files/universal_20product_20code.png?format=jpg&quality=90&v=1697911576&width=1024"}];
  
  toggleSortDropdown()
  {
    this.isOpenSort = !this.isOpenSort;
  }

  toggleColor()
  {
    this.isOpenColor = !this.isOpenColor;
  }

  toggleCategory()
  {
    this.isOpenCategory = !this.isOpenCategory;
  }

  toggleRate()
  {
    this.isOpenRate = !this.isOpenRate;
  }

  toggleMenu()
  {
    this.isOpenMenu = !this.isOpenMenu;
  }



}
