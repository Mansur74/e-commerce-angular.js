import { Component, OnInit } from '@angular/core';
import { ProductCartComponent } from '../../components/product-cart/product-cart.component';
import { CommonModule } from '@angular/common';
import { getAllProducts } from '../../services/ProductService';
import { Product } from '../../interfaces/Product';
import { RouterLink } from '@angular/router';
import {Router} from "@angular/router"

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [ProductCartComponent, CommonModule, RouterLink],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit{

  isOpenColor = false;
  isOpenCategory = false;
  isOpenRate = false;
  isOpenSort = false;
  isOpenMenu = false;
  isSuccess: boolean = true;
  products! : Product[];

  constructor(private router: Router)
  {

  }

  ngOnInit() {
    if(localStorage.getItem("refreshToken") == null && sessionStorage.getItem("refreshToken") == null)
      this.router.navigate(["/sign-in"]);
    else
      this.getProducts();
  }

  async getProducts()
  {
    const result = await getAllProducts();
    this.products = [...result.data.data];
  }

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
