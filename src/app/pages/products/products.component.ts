import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { getAllProducts } from '../../services/ProductService';
import { Product } from '../../interfaces/Product';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Router } from "@angular/router"
import { ProductFilter } from '../../interfaces/ProductFilter';
import { ProductCardComponent } from '../../components/product-card/product-card.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [ProductCardComponent, CommonModule, RouterLink],
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
  pageSize: number = 1;
  totalPages: number = 0;
  products!: Product[];
  search: string = "";
  selectedCategories: string[] = ["Furniture", "Phone"];
  selectedColors: string[] = ["red", "blue", "green"];
  selectedRates: number[] = [5, 4, 3, 2, 1];

  constructor(private route: ActivatedRoute, private router: Router) {

  }

  ngOnInit() {
    if (localStorage.getItem("refreshToken") == null && sessionStorage.getItem("refreshToken") == null)
      this.router.navigate(["/sign-in"]);
    else {
      this.route.queryParams.subscribe(params => {
        this.pageNumber = params["pageNumber"];
      });
      this.getProducts();
    }
  }

  async getProducts() {

    const productFilter: ProductFilter = {categories: this.selectedCategories, colors: this.selectedColors, rates: this.selectedRates, search: this.search};
    const result = await getAllProducts(productFilter, this.pageNumber, this.pageSize);
    this.products = [...result.data.data.rows];
    this.totalPages = result.data.data.totalPages; 

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
      this.selectedRates= [parseInt(event.target.value), ...this.selectedRates]
    else
    {
      this.selectedRates = this.selectedRates.filter((rate) => rate !== parseInt(event.target.value));
    }

    await this.getProducts();
  }

  handleSearch = async (event: any) => {
   this.search = event.target.value;
   await this.getProducts();
   this.router.navigate(["/products"], {queryParams: {"pageNumber": 1}});
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

  handlePage = async (pageNumber: number) => {
    this.pageNumber = pageNumber;
    this.getProducts();
    this.router.navigate(["/products"], {queryParams: {"pageNumber": pageNumber}});
  }

  handleNextPage = async () => {
    if(this.pageNumber < this.totalPages){
      this.pageNumber++;
      this.getProducts();
      this.router.navigate(["/products"], {queryParams: {"pageNumber": this.pageNumber}});
    }
  }

  handlePreviousPage = async () => {
    if(this.pageNumber > 1){
      this.pageNumber--;
      this.getProducts();
      this.router.navigate(["/products"], {queryParams: {"pageNumber": this.pageNumber}});
    }
  }
}
