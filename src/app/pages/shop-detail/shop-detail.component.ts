import { getShopById } from './../../services/ShopService';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Shop } from '../../interfaces/Shop';
import { Product } from '../../interfaces/Product';

@Component({
  selector: 'app-shop-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './shop-detail.component.html',
  styleUrls: ['./shop-detail.component.css']
})
export class ShopDetailComponent implements OnInit {
  shop!: Shop;
  products: Product[] = [];
  pageNumber: number = 1;
  pageSize: number = 1;
  totalPages: number = 0;
  constructor(private route: ActivatedRoute, private router: Router) { }

  async ngOnInit() {
    if (localStorage.getItem("refreshToken") == null && sessionStorage.getItem("refreshToken") == null)
      this.router.navigate(["/sign-in"]);
    else {
      await this.getShop();
      await this.getProducts();
    }

  }

  async getShop()
  {
    const shopId = this.route.snapshot.paramMap.get("id");
    this.shop = (await getShopById(parseInt(shopId!))).data.data;
  }

  async getProducts()
  {
    this.totalPages = this.shop.products?.length! / this.pageSize;
    this.products = [];
    this.shop.products?.forEach((product, i) => {
      this.products = (i >= (this.pageNumber-1) * this.pageSize && i < (this.pageNumber-1) * this.pageSize + this.pageSize) ? [product, ...this.products] : this.products;
    });
  }

  async handlePage(pageNumber: number) {
    this.pageNumber = pageNumber;
    this.getProducts();
  }

  async handleNextPage () {
    if(this.pageNumber < this.totalPages){
      this.pageNumber++;
      this.getProducts();
    }
  }

  async handlePreviousPage () {
    if(this.pageNumber > 1){
      this.pageNumber--;
      this.getProducts();
    }
  }

}
