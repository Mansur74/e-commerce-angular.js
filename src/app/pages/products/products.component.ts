import { Component, OnInit } from '@angular/core';
import { ProductCartComponent } from '../../components/product-cart/product-cart.component';
import { CommonModule } from '@angular/common';
import { getAllProducts } from '../../services/ProductService';
import { Product } from '../../interfaces/Product';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Router } from "@angular/router"
import { getAccessToken } from '../../services/AuthService';
import { Category } from '../../interfaces/Category';
import { getAllCategories } from '../../services/CategoryService';
import { ProductFilter } from '../../interfaces/ProductFilter';

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
  pageNumber!: number;
  pageSize!: number;
  totalPages!: number;
  products!: Product[];
  filteredProducts: Product[] = [];
  categories!: Category[];
  selectedCategories: string[] = ["Furniture", "Phone"];
  selectedColors: string[] = ["red", "blue", "green"];
  selectedRates: number[] = [5, 4, 3, 2, 1];

  constructor(private route: ActivatedRoute, private router: Router) {

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
    this.route.queryParams.subscribe(params => {
      this.pageNumber = params["pageNumber"];
      this.pageSize = params["pageSize"];
    });
  
    const productFilter: ProductFilter = {categories: this.selectedCategories, colors: this.selectedColors, rates: this.selectedRates};
    const result = await getAllProducts(productFilter, this.pageNumber, this.pageSize);
    this.products = [...result.data.data.rows];
    this.filteredProducts = this.products;
    this.totalPages = result.data.data.totalpages; 

  }

  updateSelectedCategories = async (event: any) => {
    if(event.target.checked)
      this.selectedCategories = [event.target.value, ...this.selectedCategories]
    else
    {
      this.selectedCategories = this.selectedCategories.filter((category) => category !== event.target.value);
    }
    await this.getProducts();
    
  }

  updateSelectedColors = async (event: any) => {
    if(event.target.checked)
      this.selectedColors = [event.target.value, ...this.selectedColors]
    else
    {
      this.selectedColors = this.selectedColors.filter((color) => color !== event.target.value);
    }
    await this.getProducts();
  }

  updateSelectedRates = async (event: any) => {
    if(event.target.checked)
      this.selectedRates= [event.target.value, ...this.selectedRates]
    else
    {
      this.selectedRates = this.selectedRates.filter((rate) => rate !== event.target.value);
    }
    await this.getProducts();
  }

  filterProducts = async (event: any) => {
    this.filteredProducts = this.products.filter(product => product.name?.includes(event.target.value))
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
