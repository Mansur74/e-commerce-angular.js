import { Component, OnInit } from '@angular/core';
import { Shop } from '../../interfaces/Shop';
import { getAccessToken, getRefreshToken } from '../../services/AuthService';
import { getAllShops } from '../../services/ShopService';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
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
  pageNumber: number = 1;
  pageSize: number = 1;
  totalPages: number = 0;
  user!: User;
  shops: Shop[] = [];
  constructor(private route: ActivatedRoute, private router: Router) { }

  async ngOnInit() {
    if (localStorage.getItem("refreshToken") == null && sessionStorage.getItem("refreshToken") == null)
      this.router.navigate(["/sign-in"]);
    else {
      this.route.queryParams.subscribe(params => {
        this.pageNumber = params["pageNumber"];
      });
      await this.getMe();
      await this.getShops();
    }

  }

  async getShops()
  {
    const result = await getAllShops(this.pageNumber, this.pageSize);
    this.shops = [...result.data.data.rows];
    this.totalPages = result.data.data.totalPages;
  }

  async getMe()
  {
    const refreshToken: string = getRefreshToken();
    const accessToken: string = (await getAccessToken(refreshToken)).data.data.accessToken;
    this.user = (await getUser()).data.data;
  }

  handlePage = async (pageNumber: number) => {
    this.pageNumber = pageNumber;
    this.getShops();
    this.router.navigate(["/shops"], {queryParams: {"pageNumber": pageNumber}});
  }

  handleNextPage = async () => {
    if(this.pageNumber < this.totalPages){
      this.pageNumber++;
      this.getShops();
      this.router.navigate(["/shops"], {queryParams: {"pageNumber": this.pageNumber}});
    }
  }

  handlePreviousPage = async () => {
    if(this.pageNumber > 1){
      this.pageNumber--;
      this.getShops();
      this.router.navigate(["/shops"], {queryParams: {"pageNumber": this.pageNumber}});
    }
  }

}
