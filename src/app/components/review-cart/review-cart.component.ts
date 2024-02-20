import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ProductReview } from '../../interfaces/ProductReview';
import { ProductRate } from '../../interfaces/ProductRate';

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
  rateNums = [1, 2, 3, 4, 5];

  constructor() { }

  ngOnInit() {
  }

}
