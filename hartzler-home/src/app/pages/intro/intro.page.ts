import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonSlides } from '@ionic/angular';
import { USER_INTRO_KEY } from 'src/app/guards/intro.guard';
import { Storage } from '@capacitor/storage'

@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
})



export class IntroPage implements OnInit {
  @ViewChild(IonSlides)slides: IonSlides;

  constructor( private router: Router ) { }

  ngOnInit() {
  }

  next() {
    this.slides.slideNext();
    // Should just re-route to another page after start is pressed... or just alert that it has been registered.
  }

  
  async start() {
    await Storage.set({key: USER_INTRO_KEY, value: 'true'});
    this.router.navigateByUrl('/login',{ replaceUrl:true});
  }

}
