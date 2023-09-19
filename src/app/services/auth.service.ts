import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  baseUrl = "https://localhost:7235/api/";
  currentUser: BehaviorSubject<any> = new BehaviorSubject(null);

  jwtHelperService = new JwtHelperService();

  registerUser(account: Array<any>){
    return this.http.post(this.baseUrl + "Register/RegisterAccount", {
      FullName: account[0],
      FathersName: account[1],
      MobileNumber : account[2],
      Email: account[3],
      AadharNumber: account[4],
      DOB: account[5],
      RAddress: account[6],
      PAddress: account[7],
      RState: account[8],
      PState: account[9],
      RCity: account[10],
      PCity: account[11],
      RPincode: account[12],
      PPincode: account[13],
      OccupationType: account[14],
      Income: account[15],
      AnnualIncome: account[16]
    },
    {
      responseType: 'text',
    });
  }

  registerInternetBanking(user: Array<any>){
    return this.http.post(this.baseUrl + "Register/RegisterInternetBanking", {
      AccountNumber:user[0],
      Email: user[1],
      Password: user[2]
    }, {responseType:'text',});
  }

  loginUser(loginInfo: Array<any>){
    return this.http.post(this.baseUrl + "Register/Login", {
      Email: loginInfo[0],
      Password: loginInfo[1],
    }, {responseType:'text',})
  }

  setToken(token:string){
    localStorage.setItem("access_token", token);
    this.loadCurrentUser();
  }

  loadCurrentUser(){
    const token = localStorage.getItem("access_token");
    const userInfo = token != null ? this.jwtHelperService.decodeToken(token) : null;
    const data = userInfo ? {
      UserEmail: userInfo.email,
      UserAccountNumber: userInfo.acnumber
    } : null;
    this.currentUser.next(data);

    console.log(data);
  }
}
