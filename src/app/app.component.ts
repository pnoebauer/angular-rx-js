import { AsyncPipe } from '@angular/common';
import {
  Component,
  DestroyRef,
  effect,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { interval, map, Observable, Subscriber } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  imports: [AsyncPipe],
})
export class AppComponent implements OnInit {
  private destroyRef = inject(DestroyRef);
  clickCount = signal(0);
  clickCount$ = toObservable(this.clickCount);

  interval$ = interval(1000);
  intervalSignal = toSignal(this.interval$);

  customInterval$ = new Observable((subscriber) => {
    setInterval(() => {
      console.log('Emitting new value...');
      subscriber.next({ message: 'New value' });
    }, 1000);
  });

  constructor() {
    effect(() => {
      console.log('this.clickCount', this.clickCount());

      console.log('this.intervalSignal', this.intervalSignal());
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

    const subscription = this.customInterval$.subscribe({
      next: (val) => console.log(val),
    });
    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }

  onClick(event: MouseEvent): void {
    console.log('button clicked', event);
    this.clickCount.update((value) => value + 1);
    console.log('this.clickCount', this.clickCount());
  }
}
