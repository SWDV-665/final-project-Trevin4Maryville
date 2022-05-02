import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-info',
  templateUrl: 'Info.page.html',
  styleUrls: ['Info.page.scss']
})
export class InfoPage {

  constructor(private authService: AuthenticationService, private router: Router) {}

  async logoff() {
    await this.authService.logoff();
    this.router.navigateByUrl('/', { replaceUrl: true });
  }

}
