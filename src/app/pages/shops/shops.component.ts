import { Component, OnInit } from '@angular/core';
import { Shop } from '../../interfaces/Shop';
import { getAccessToken, getRefreshToken } from '../../services/AuthService';
import { getAllShops } from '../../services/ShopService';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { User } from '../../interfaces/User';
import { getUser } from '../../services/UserService';

@Component({
  selector: 'app-shops',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './shops.component.html',
  styleUrls: ['./shops.component.css']
})
export class ShopsComponent implements OnInit {
  user!: User;
  shops: Shop[] = [];
  constructor() { }

  async ngOnInit() {
    await this.getMe();
    await this.getShops();
    console.log(this.shops, this.user);
  }

  async getShops()
  {
    this.shops= (await getAllShops()).data.data;

  }

  async getMe()
  {
    const refreshToken: string = getRefreshToken();
    const accessToken: string = (await getAccessToken(refreshToken)).data.data.accessToken;
    this.user = (await getUser()).data.data;
  }

}
