import { Injectable } from "@angular/core";
import { Location } from "@angular/common";
import { Router, CanActivate } from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class AuthGuardService implements CanActivate {

  constructor(public router: Router) { }

  canActivate(): boolean {
    const user = localStorage.getItem("user");
    if (user) {
      const userJson = JSON.parse(user);
      if (userJson.accessToken) {
        return true;
      } else {
        this.router.navigate(["login"]);
        return false;
      }
    }
    this.router.navigate(["login"]);
    return false;
  }
}
