import { Component } from '@angular/core';
import { IonContent } from '@ionic/angular/standalone';
import { ToolbarComponent } from '@components/toolbar/toolbar.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonContent, ToolbarComponent],
})
export class HomePage {
  constructor() {}
}
