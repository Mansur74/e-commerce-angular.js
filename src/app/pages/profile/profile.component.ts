import { Component, OnInit } from '@angular/core';
import { User } from '../../interfaces/User';
import { getAccessToken, getRefreshToken, getUser } from '../../services/AuthService';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user! : User;
  
  constructor() { }

  ngOnInit() {
    this.getMe();
  }

  getMe = async () => {
    const refreshToken = getRefreshToken();
    const accessToken = (await getAccessToken(refreshToken)).data.data.accessToken;
    this.user = (await getUser(accessToken)).data.data;
  }

}
