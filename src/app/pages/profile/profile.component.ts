import { Component, OnInit } from '@angular/core';
import { User } from '../../interfaces/User';
import { getAccessToken, getRefreshToken } from '../../services/AuthService';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { getUser } from '../../services/UserService';

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
    this.user = (await getUser()).data.data;
  }

}
