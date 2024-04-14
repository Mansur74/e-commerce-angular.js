import { getShopById } from './../../services/ShopService';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Shop } from '../../interfaces/Shop';
import { Product } from '../../interfaces/Product';
import { createShopRate, getShopRateById, updateShopRate } from '../../services/ShopRateService';
import { User } from '../../interfaces/User';
import { getUser } from '../../services/UserService';
import { ShopRate } from '../../interfaces/ShopRate';
import { ShopReview } from '../../interfaces/ShopReview';
import { createShopReview, deleteShopReview } from '../../services/ShopReviewService';
import { ProductCardComponent } from '../../components/product-card/product-card.component';

@Component({
  selector: 'app-shop-detail',
  standalone: true,
  imports: [ProductCardComponent, CommonModule, RouterModule],
  templateUrl: './shop-detail.component.html',
  styleUrls: ['./shop-detail.component.css']
})
export class ShopDetailComponent implements OnInit {
  user!: User;
  shop!: Shop;
  products: Product[] = [];
  averageRate: number = 0;
  shopRate: number = 0;
  pageNumber: number = 1;
  pageSize: number = 1;
  totalPages: number = 0;
  isReviewOpen: boolean = false;
  review: string = "";
  constructor(private route: ActivatedRoute, private router: Router) { }

  async ngOnInit() {
    if (localStorage.getItem("refreshToken") == null && sessionStorage.getItem("refreshToken") == null)
      this.router.navigate(["/sign-in"]);
    else {
      await this.getShop();
      await this.getMe();
      await this.getProducts();
      await this.getShopRate();
      this.calculateAverageRate();
    }

  }

  getMe = async () => {
    this.user = (await getUser()).data.data;
  }

  getShop = async () => {
    const shopId = this.route.snapshot.paramMap.get("id");
    this.shop = (await getShopById(parseInt(shopId!))).data.data;
  }

  getShopRate = async () => {
    this.shopRate = (await getShopRateById(this.user.id!, this.shop.id!)).data.data.rate!;
    console.log(this.shopRate)
  }

  calculateAverageRate = () => {
    this.averageRate = 0;
    this.shop?.rates?.forEach((rate) => {
      this.averageRate += rate.rate!;
    });
    this.averageRate = Math.round(this.averageRate / this.shop?.rates?.length!);
  
  }

  getProducts = async () => 
  {
    this.totalPages = this.shop.products?.length! / this.pageSize;
    this.products = [];
    this.shop.products?.forEach((product, i) => {
      this.products = (i >= (this.pageNumber-1) * this.pageSize && i < (this.pageNumber-1) * this.pageSize + this.pageSize) ? [product, ...this.products] : this.products;
    });
  }

  handlePage = async (pageNumber: number) => {
    this.pageNumber = pageNumber;
    this.getProducts();
  }

  handleNextPage = async () => {
    if(this.pageNumber < this.totalPages){
      this.pageNumber++;
      this.getProducts();
    }
  }

  handlePreviousPage = async () => {
    if(this.pageNumber > 1){
      this.pageNumber--;
      this.getProducts();
    }
  }

  handleRate = async (rateNum: number) => {
    const rate: ShopRate = {rate: rateNum};
    const shopRate: ShopRate | null = (await getShopRateById(this.user.id!, this.shop?.id!)).data.data;
    shopRate == null ? await createShopRate(rate, this.user.id!, this.shop?.id!) : await updateShopRate(rate, this.user.id!, this.shop?.id!);
    await this.getShop();
    await this.getShopRate();
    this.calculateAverageRate();
  }

  toggleIsReviewOpen = () => {
    this.isReviewOpen = !this.isReviewOpen;
  }

  sendReview = async () => {
    const productReview: ShopReview = {review: this.review};
    await createShopReview(productReview, this.user.id!, this.shop?.id!);
    this.isReviewOpen = false;
    await this.getShop(); 
  }

  deleteReview = async (reviewId: number) => {
    await deleteShopReview(reviewId);
    const shopId = parseInt(this.route.snapshot.paramMap.get("id")!);
    this.shop = (await getShopById(shopId)).data.data;
  }

}
