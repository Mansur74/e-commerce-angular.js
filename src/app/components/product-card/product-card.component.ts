import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../../interfaces/Product';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {

  @Input()
  product!: Product;
  averageRate: number = 0;

  constructor() { }

  ngOnInit() {
    this.calculateAverageRate();
  }

  calculateAverageRate = () => {
    this.averageRate = 0;
    this.product?.rates?.forEach((rate) => {
      this.averageRate += rate.rate!;
    });
    this.averageRate = Math.round(this.averageRate / this.product?.rates?.length!);

  }

}
