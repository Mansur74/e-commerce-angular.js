import { createProductRate, getProductRateById, updateProductRate } from '../../services/ProductRateService';
import { createProductReview, deleteProductReview } from './../../services/ProductReviewService';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import { getProductById } from '../../services/ProductService';
import { Product } from '../../interfaces/Product';
import { CommonModule } from '@angular/common';
import { createCart } from '../../services/CartService';
import { Cart } from '../../interfaces/Cart';
import { User } from '../../interfaces/User';
import { getUser } from '../../services/UserService';
import { ProductReview } from '../../interfaces/ProductReview';
import { ProductRate } from '../../interfaces/ProductRate';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  isReviewOpen: boolean = false;
  review: string = "";
  averageRate: number = 0;
  productRate: number = 0;
  user!: User;
  product: Product | null = null;
  isLoading: boolean = true;
  constructor(private route: ActivatedRoute, private router: Router) {

  }

  async ngOnInit() {
    if (localStorage.getItem("refreshToken") == null && sessionStorage.getItem("refreshToken") == null)
      this.router.navigate(["/sign-in"]);
    else {
      const productId = parseInt(this.route.snapshot.paramMap.get("id")!);
      await this.getProduct(productId);
      await this.getMe();
      await this.getProductRate();
      this.calculateAverageRate();
    }

  }

  getProduct = async (productId: number) => {
    try {
      const result = await getProductById(productId);
      this.product = result.data.data;
    } catch (error) {
      this.product = null;
    }

    this.isLoading = false;
  }

  getMe = async () => {
    this.user = (await getUser()).data.data;
  }

  addToCart = async () => {
    const cart: Cart = { quantity: 1 }
    const productId = parseInt(this.route.snapshot.paramMap.get("id")!);
    const user = await getUser();
    const result = await createCart(cart, user.data.data.id!, productId);
    this.router.navigate(["/cart"]);
  }

  toggleIsReviewOpen = () => {
    this.isReviewOpen = !this.isReviewOpen;
  }

  sendReview = async () => {
    const productReview: ProductReview = {review: this.review};
    await createProductReview(productReview, this.user.id!, this.product?.id!);
    this.isReviewOpen = false;
    const productId = parseInt(this.route.snapshot.paramMap.get("id")!);
    this.product = (await getProductById(productId)).data.data;
    
  }

  deleteReview = async (reviewId: number) => {
    await deleteProductReview(reviewId);
    const productId = parseInt(this.route.snapshot.paramMap.get("id")!);
    this.product = (await getProductById(productId)).data.data;
  }

  getProductRate = async () => {
    this.productRate = (await getProductRateById(this.user.id!, this.product?.id!)).data.data.rate!;
  }

  calculateAverageRate = () => {
    this.averageRate = 0;
    this.product?.rates?.forEach((rate) => {
      this.averageRate += rate.rate!;
    });
    this.averageRate = Math.round(this.averageRate / this.product?.rates?.length!);
  
  }

  handleRate = async (rateNum: number) => {
    const rate: ProductRate = {rate: rateNum};
    const productRate: ProductRate | null = (await getProductRateById(this.user.id!, this.product?.id!)).data.data;
    productRate == null ? await createProductRate(rate, this.user.id!, this.product?.id!) : await updateProductRate(rate, this.user.id!, this.product?.id!);
    await this.getProduct(this.product?.id!);
    await this.getProductRate();
    this.calculateAverageRate();
  }

}
