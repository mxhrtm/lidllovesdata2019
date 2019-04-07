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
  weather_factor: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', stock: 1.0079, ai_reco: 20, weather_factor: 0.02 },
  { position: 2, name: 'Helium', stock: 4.0026, ai_reco: 15, weather_factor: 0.10 },
  { position: 3, name: 'Lithium', stock: 6.941, ai_reco: 17, weather_factor: 0.12 },
  { position: 4, name: 'Beryllium', stock: 9.0122, ai_reco: 29, weather_factor: 0.23 },
  { position: 5, name: 'Boron', stock: 10.811, ai_reco: 18, weather_factor: 0.12 },
  { position: 6, name: 'Carbon', stock: 12.0107, ai_reco: 59, weather_factor: 0.03 },
  { position: 7, name: 'Nitrogen', stock: 14.0067, ai_reco: 47, weather_factor: 0.23},
  { position: 8, name: 'Oxygen', stock: 15.9994, ai_reco: 27, weather_factor: 0.12 },
  { position: 9, name: 'Fluorine', stock: 18.9984, ai_reco: 82, weather_factor: 0.32 },
  { position: 10, name: 'Neon', stock: 20.1797, ai_reco: 27, weather_factor: 0.12 },
];

@Component({
  selector: 'waiting-area',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardPage implements OnInit {
  //** TABELLE */
  displayedColumns: string[] = ['position', 'name', 'stock', 'ai_reco', 'weather_factor'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  //** TABELLE */
  private _bardata: any;
  public generated: boolean = true;

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
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: 'My First dataset',
          backgroundColor: '#42A5F5',
          borderColor: '#1E88E5',
          data: [65, 59, 80, 81, 56, 55, 40]
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
}
