import { Component } from '@angular/core';
import { ProductCartComponent } from '../../components/product-cart/product-cart.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ProductCartComponent, CommonModule],
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
  list = [{type: "Outdoor", name: "monstera"}, {type: "Indoor", name: "Oak Tree"}, {type: "Outdoor", name: "monstera"}, {type: "Indoor", name: "Oak Tree"}, {type: "Outdoor", name: "monstera"}, {type: "Indoor", name: "Oak Tree"}, {type: "Outdoor", name: "monstera"}, {type: "Indoor", name: "Oak Tree"}];
  
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
