import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink, RouterModule } from '@angular/router';

import {
  IonIcon,
  IonHeader,
  IonToolbar,
  IonButton,
  IonTitle,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import * as Icons from 'ionicons/icons';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    IonIcon,
    IonHeader,
    IonToolbar,
    IonButton,
    IonTitle,
  ],
})
export class ToolbarComponent implements OnInit {
  @Input() iconStart: string = '';
  @Input() iconEnd: string = '';
  @Input() iconMode: 'outline' | 'sharp' | '' = 'outline';

  @Input() mode: 'search' | 'inform' = 'inform';
  @Input() placeholder: string = 'What are you looking for...?';
  @Input() title: string = 'Custom Toolbar';
  @Input() goBack: string = '';

  @Input() translucent: boolean = false;
  @Output() clicked = new EventEmitter();

  public iconStartName: string = '';
  public iconEndName: string = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {
    addIcons({ ...Icons });
    const title = this.route.snapshot.data['title'];
    const id = this.route.snapshot.params['id'];

    if (!title && !id) return;
    this.title = title || id;
  }

  ngOnInit() {
    this._buildIconTag();
  }

  clickStart() {
    this.clicked.emit('start');
  }

  clickEnd() {}

  buttonClick(type: 'start' | 'end') {
    if (type == 'start' && this.goBack) {
      this.router.navigate([this.goBack]);
      return;
    }
    this.clicked.emit(type);
  }

  private _buildIconTag() {
    if (!this.iconStart && !this.iconEnd) return;

    const hasModeStart = `${this.iconStart}-${this.iconMode}`;
    const hasModeEnd = `${this.iconEnd}-${this.iconMode}`;

    this.iconStartName = !this.iconMode ? this.iconStart : hasModeStart;
    this.iconEndName = !this.iconMode ? this.iconEnd : hasModeEnd;
  }
}
