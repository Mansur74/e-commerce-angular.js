import { RefreshToken } from './../interfaces/RefreshToken';
import axios from "axios";
import { DataResult } from "../interfaces/DataResult";
import { AuthResponse } from "../interfaces/AuthResponse";
import { User } from "../interfaces/User";
import { Result } from "../interfaces/Result";
import { AuthRequest } from "../interfaces/AuthRequest";
import { AccessToken } from "../interfaces/AccessToken";

export const signIn = async (req: AuthRequest) => {
  const result = await axios.post<DataResult<AuthResponse>>(`http://localhost:8080/api/authorization/login`, req);
  return result;
}

export const signUp = async (user: User) => {
  const result = await axios.post<Result>(`http://localhost:8080/api/authorization/register`, user);
  return result;
}

export const getAccessToken = async (refreshToken: string) => {
  const body: RefreshToken = {refreshToken: refreshToken}

  const result = await axios.post<DataResult<AccessToken>>(`http://localhost:8080/api/authorization/accessToken`, body);
  return result;
}

export const getUser = async (accessToken: string) => {

  const result = await axios.get<DataResult<User>>(`http://localhost:8080/api/authorization/me`, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });
  return result;
}

export const getRefreshToken = () =>
{
  const local: string = localStorage.getItem("refreshToken")!;
  const session: string = sessionStorage.getItem("refreshToken")!;
  const refreshToken: string = local != null ? local : session;
  return refreshToken;
}


