import {
  Component,
  DestroyRef,
  effect,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { interval, map } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  private destroyRef = inject(DestroyRef);
  clickCount = signal(0);

  constructor() {
    effect(() => {
      console.log('this.clickCount', this.clickCount());
    });
  }

  ngOnInit(): void {
    // const subscription = interval(1000)
    //   .pipe(
    //     map((value) => value * 2),
    //   )
    //   .subscribe({
    //     next: (value) => {
    //       console.log(value);
    //     },
    //   });
    // this.destroyRef.onDestroy(() => {
    //   subscription.unsubscribe();
    // });
  }

  onClick(event: MouseEvent): void {
    console.log('button clicked', event);
    this.clickCount.update((value) => value + 1);
    console.log('this.clickCount', this.clickCount());
  }
}
