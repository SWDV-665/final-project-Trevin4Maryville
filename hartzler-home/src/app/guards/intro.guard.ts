import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Storage } from '@capacitor/storage';

export const USER_INTRO_KEY = "intro-has-been-seen";

@Injectable({
  providedIn: 'root'
})
export class IntroGuard implements CanLoad {

  constructor(private router: Router) { }


  // This basically checks if the User has been in the app before. If not, it shows them the intro page (basically how to use the app.)
  async canLoad(): Promise<boolean> {
    const hasIntoBeenShown = await Storage.get({key: USER_INTRO_KEY});
    if (hasIntoBeenShown && (hasIntoBeenShown.value === 'true')) {
      return true;
    } else {
      this.router.navigateByUrl('/intro', { replaceUrl:true });
      return false;
    }
  }
}
