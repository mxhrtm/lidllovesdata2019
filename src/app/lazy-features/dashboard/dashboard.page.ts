import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ResourceStore } from '@app/root-store';
import { Store } from '@ngrx/store';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material';

export interface User {
  name: string;
}
export interface PeriodicElement {
  name: string;
  position: number;
  stock: number;
  ai_reco: number;
  historical_sales: number;
  weather_factor: number;
  event_factor: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Mineralwasser', stock: 28, ai_reco: 198, historical_sales: 204,weather_factor: 0.02, event_factor: 0.01 },
  { position: 2, name: 'Eiscreme', stock: 21, ai_reco: 10, historical_sales: 24, weather_factor: 0.10, event_factor: 0.02},
  { position: 3, name: 'Freeway Cole', stock: 50, ai_reco: 0, historical_sales: 24 , weather_factor: 0.12 , event_factor: 0.1},
  { position: 4, name: 'Grillmeister Fleischspieße', stock: 5, ai_reco: 120, historical_sales: 85 , weather_factor: 0.23, event_factor: 0.05},
  { position: 5, name: 'Brötchen', stock: 50, ai_reco: 179, historical_sales: 219, weather_factor: 0.12, event_factor: 0.042},
  { position: 6, name: 'Kidney Bohnen Dose', stock: 31, ai_reco: 0, historical_sales: 48, weather_factor: 0.03, event_factor: 0.023},
  { position: 7, name: 'Eisbergsalat', stock: 5, ai_reco: 85, historical_sales: 78 ,weather_factor: 0.23, event_factor:0.023},
  { position: 8, name: 'Kong Strong Energy 0,25', stock: 48, ai_reco: 68, historical_sales:72, weather_factor: 0.12, event_factor: 0.001},
];

@Component({
  selector: 'waiting-area',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardPage implements OnInit {
  //** TABELLE */
  displayedColumns: string[] = ['position', 'name', 'stock', 'ai_reco', 'historical_sales', 'weather_factor', 'event_factor'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  //** TABELLE */
  private _bardata: any;
  public generated: boolean = true;

  public weather_checked = true;
  public events_checked = true;

  myControl = new FormControl();
  options: User[] = [{ name: 'Mary' }, { name: 'Shelley' }, { name: 'Igor' }];

  constructor(private _resourceStore: Store<ResourceStore.State>) {}

  filteredOptions: Observable<User[]>;

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith<string | User>(''),
      map(value => (typeof value === 'string' ? value : value.name)),
      map(name => (name ? this._filter(name) : this.options.slice()))
    );

    // GET VALUE FROM FORM HERE!
    this.myControl.valueChanges.subscribe(inputValue =>
      console.log(inputValue)
    );

    this._bardata = {
      labels: ['Krombacher Pils 0,5', 'Grillfleisch', 'Tee Pfefferminze'],
      datasets: [
        {
           label: 'Demand changes based on datachannels',
          backgroundColor: '#005083',
          borderColor: '#1E88E5',
          data: [0.13, 0.08, -0.056 ]
        }
      ]
    };
  }

  displayFn(user?: User): string | undefined {
    return user ? user.name : undefined;
  }

  private _filter(name: string): User[] {
    const filterValue = name.toLowerCase();

    return this.options.filter(
      option => option.name.toLowerCase().indexOf(filterValue) === 0
    );
  }

  generateTable() {
    this.generated = false;
  }

  toggleEvent(event) {
    if(this.events_checked){
      this.displayedColumns = this.displayedColumns.filter(obj => obj !== "event_factor");
    } else {
      this.displayedColumns.push('event_factor');
    }
    this.events_checked = !this.events_checked;
  }
  toggleWeather(event) {
    if(this.weather_checked){
      this.displayedColumns = this.displayedColumns.filter(obj => obj !== "weather_factor");
    } else {
      this.displayedColumns.push('weather_factor');
    }
    this.weather_checked = !this.weather_checked;
  }
}
