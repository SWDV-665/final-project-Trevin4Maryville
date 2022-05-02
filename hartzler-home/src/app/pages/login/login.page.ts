import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/services/authentication.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  credentials: FormGroup;

  constructor( 
    private router: Router,
    private authService: AuthenticationService,
    private fb: FormBuilder,
    private alertController: AlertController,
    private loadingController: LoadingController,
  ) { }

  ngOnInit() {
    this.credentials = this.fb.group({
      username: ['professor@maryville.edu', [Validators.required]],
      password: ['admin1234', [Validators.required, Validators.minLength(8)]],
    })
  }

  async logon() {
    const loading = await this.loadingController.create();
    await loading.present();

    this.authService.logon(this.credentials.value).subscribe(
      async (res) => {
        await loading.dismiss();
        this.router.navigateByUrl('/tabs', { replaceUrl: true });
      },
      async (res) => {
        await loading.dismiss();
        const alert = await this.alertController.create({
          header: "Login Failed",
          message: res.error.error,
          buttons: ["OK"],
        });

        await alert.present();
      }
    );;
  }

  get username() {
    return this.credentials.get("username");
  }

  get password() {
    return this.credentials.get('password');
  }

  async setupPW() {
    this.router.navigateByUrl('/intro',{ replaceUrl:true});
  }
  
}
