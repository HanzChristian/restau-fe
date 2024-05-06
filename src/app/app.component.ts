import { Component } from '@angular/core';
import { trigger, transition, style, query, group, animateChild, animate } from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('routeAnimations', [
      transition('* <=> *', [
        style({ position: 'relative' }),
        query(':enter, :leave', [
          style({
            position: 'absolute',
            top: 0,
            right: 0,
            width: '100%'
          })
        ]),
        query(':enter', [
          style({ right: '-100%'})
        ]),
        query(':leave', animateChild()),
        group([
          query(':leave', [
            animate('300ms ease-out', style({ right: '100%'}))
          ]),
          query(':enter', [
            animate('300ms ease-out', style({ right: '0%'}))
          ])
        ]),
        query(':enter', animateChild()),
      ])
    ]),
  ],
})
export class AppComponent {
  title = "restau"
}
