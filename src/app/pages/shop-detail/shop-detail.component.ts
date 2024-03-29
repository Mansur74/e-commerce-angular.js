import { getShopById } from './../../services/ShopService';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { getAccessToken, getRefreshToken } from '../../services/AuthService';
import { Shop } from '../../interfaces/Shop';

@Component({
  selector: 'app-shop-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './shop-detail.component.html',
  styleUrls: ['./shop-detail.component.css']
})
export class ShopDetailComponent implements OnInit {
  shop!: Shop;
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.getShop();
  }

  async getShop()
  {
    const refreshToken = await getRefreshToken();
    const accessToken = (await getAccessToken(refreshToken)).data.data.accessToken;
    const shopId = this.route.snapshot.paramMap.get("id");
    this.shop = (await getShopById(accessToken, parseInt(shopId!))).data.data;
  }

}
