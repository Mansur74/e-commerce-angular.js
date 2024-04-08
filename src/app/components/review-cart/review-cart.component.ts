import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ProductReview } from '../../interfaces/ProductReview';
import { ProductRate } from '../../interfaces/ProductRate';
import { getProductRateById } from '../../services/ProductRate';

@Component({
  selector: 'app-review-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './review-cart.component.html',
  styleUrls: ['./review-cart.component.css']
})
export class ReviewCartComponent implements OnInit {
  @Input()
  productReview!: ProductReview;
  productRate!: ProductRate;
  rateNums = [1, 2, 3, 4, 5];

  constructor() { }

  ngOnInit() {
    this.getProductRate();
  }

  getProductRate = async () => {
    const userId: number = this.productReview.user?.id!;
    const productId: number = this.productReview.product?.id!;
    const result = await getProductRateById(userId, productId);
    this.productRate = result.data.data;
    console.log(this.productRate);
  }



}
