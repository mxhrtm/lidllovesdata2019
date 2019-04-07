import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { AppStore, RouterActions } from '@app/root-store/app-store';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {

  constructor(private _appStore: Store<AppStore.State>) { }

  go(url: string) {
    this._appStore.dispatch(new RouterActions.Go({ path: [url]}));
  }

  ngOnInit() {
  }

}
