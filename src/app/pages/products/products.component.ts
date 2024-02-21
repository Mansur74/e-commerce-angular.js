import { Component, OnInit } from '@angular/core';
import { ProductCartComponent } from '../../components/product-cart/product-cart.component';
import { CommonModule } from '@angular/common';
import { getAllProducts } from '../../services/ProductService';
import { Product } from '../../interfaces/Product';
import { RouterLink } from '@angular/router';
import { Router } from "@angular/router"
import { getAccessToken } from '../../services/AuthService';
import { Category } from '../../interfaces/Category';
import { getAllCategories } from '../../services/CategoryService';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [ProductCartComponent, CommonModule, RouterLink],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  isOpenColor = false;
  isOpenCategory = false;
  isOpenRate = false;
  isOpenSort = false;
  isOpenMenu = false;
  isSuccess: boolean = true;
  products!: Product[];
  filteredProducts: Product[] = [];
  categories!: Category[];
  selectedCategories: string[] = [];

  constructor(private router: Router) {

  }

  ngOnInit() {
    if (localStorage.getItem("refreshToken") == null && sessionStorage.getItem("refreshToken") == null)
      this.router.navigate(["/sign-in"]);
    else {
      this.getCategories();
      this.getProducts();
    }
  }

  async getProducts() {
    const local: string = localStorage.getItem("refreshToken")!;
    const session: string = sessionStorage.getItem("refreshToken")!;
    const refreshToken: string = local != null ? local : session;
    const accessToken = (await getAccessToken(refreshToken)).data.data.accessToken;
    const result = await getAllProducts(accessToken);
    this.products = [...result.data.data];
    this.filterProducts();
  }

  updateSelectedCategories = (event: any) => {
    if(event.target.checked)
      this.selectedCategories = [event.target.value, ...this.selectedCategories]
    else
    {
      const [categoryName, ...selectedCategories] = this.selectedCategories;
      this.selectedCategories = selectedCategories;
    }

    this.filterProducts();
      
  }

  filterProducts = () => {
    this.filteredProducts = [];
    this.products.forEach((product) => {
      product.categories?.forEach((pc) => {
        this.selectedCategories.forEach((categoryName) => {
          if(pc.name == categoryName)
            this.filteredProducts = [product, ...this.filteredProducts];
        });
      }); 
    })
    if(this.filterProducts.length == 0)
      this.filteredProducts = this.products;
  }

  getCategories = async () => {
    const result = await getAllCategories();
    this.categories = result.data.data;
  }

  toggleSortDropdown() {
    this.isOpenSort = !this.isOpenSort;
  }

  toggleColor() {
    this.isOpenColor = !this.isOpenColor;
  }

  toggleCategory() {
    this.isOpenCategory = !this.isOpenCategory;
  }

  toggleRate() {
    this.isOpenRate = !this.isOpenRate;
  }

  toggleMenu() {
    this.isOpenMenu = !this.isOpenMenu;
  }
}
