import { Component, OnInit, ViewChild, Input, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Observable, of, Subscription } from 'rxjs';
import { SelectionModel } from '@angular/cdk/collections';
import { take, map, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'generic-selectable-table',
  templateUrl: './generic-selectable-table.component.html',
  styleUrls: ['./generic-selectable-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GenericSelectableTableComponent<T> implements OnInit {
  // the data from which the table is generated
  @Input() data: Observable<T[]>;
  // toggels the ability to be able to select rows [true = selection working || false = selection not working]
  @Input() allowSelcetion = true;
  // toggels the ability to be able to select mulitple rows [true = multi selection working || false = mulit selection not working]
  @Input() allowMultiSelect = true;
  // enables the apperance of a checkbox colum [true = checkbox colum || false = no checkbox colum]
  @Input() enableCheckboxSelection = true;
  // all the selection of a row only by checkbox and not by clicking the row [true = only checkbox || flase = whole row to select]
  @Input() onlyCheckboxSelection = false;
  // changes the poition of the checkbox [true = checkbox on the left side of the table || flase = checkbox on the ride side of the table]
  @Input() checkboxPositionLeft = true;
  // enables the colorisation of the selected row/s [true = colorisation || false = no colorisation]
  @Input() coloriseSelectedRow = true;
  // a part of the dataset that should be select form begining
  @Input() initialSelection: Observable<T[]> = of([]);
  // an arry of strings with values from the objects of the dataset whitch should be represented in the table
  @Input() displayedColumns: string[] = ['id', 'materialId'];
  // a arry of strings with names for each value form the displayColums array. These values will be shown on top of the table
  @Input() displayedColumnsName: string[] = ['ID', 'Material'];
  // enables paging of the table with a pageinator at the bottom of the table [true = paninator enables || false = paginator disabled]
  @Input() enablePaging = true;
  // the default selected number of rows on a page
  @Input() pageSize: number = 10;
  // an array of numbers for the paginator representing the rows on each page
  @Input() pageSizeOptions: number[] = [10, 25, 50];
  // enables a search bar on top of the table to filter the dataset
  @Input() allowFilter = true;


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: MatTableDataSource<T>;
  selection: SelectionModel<T>;
  displayedColumnsWithSelect: string[] = [];

  private _getSelectedObservable: Observable<T[]>;
  private _EventBus = new EventTarget();
  private dataStubscription: Subscription;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    // set the inital selection as start value when not empty, emit the next value when a selction was made and always give the last value
    this._getSelectedObservable = Observable.create(observer => {
      let initialSelectionValue: T[];
      this.initialSelection.pipe(take(1)).subscribe(x => initialSelectionValue = x);
      if (initialSelectionValue && initialSelectionValue[0]) {
        observer.next(initialSelectionValue);
      }
      this._EventBus.addEventListener('selection', () => {
        observer.next(this.selection.selected);
      });
    }).pipe(shareReplay(1));

    let initalisationSubscription: Subscription;
    let subscribeTerminaterHelper = true;
    initalisationSubscription =  this.initialSelection.pipe(map((x: T[]) => {
      if ( x && x[0] && subscribeTerminaterHelper) {
        // generate a selection once when a inital seletion is given
        this.selection = new SelectionModel<T>(this.allowMultiSelect, x);
        subscribeTerminaterHelper = false;
        this._EventBus.dispatchEvent(new Event('selection'));
      } else if (!this.selection) {
        // generaet a selection when no initial seletion was given
        this.selection = new SelectionModel<T>(this.allowMultiSelect, []);
        this._EventBus.dispatchEvent(new Event('selection'));
      }
      if (!subscribeTerminaterHelper && initalisationSubscription) {
        initalisationSubscription.unsubscribe();
      }
    })).subscribe();
    if (this.allowSelcetion && this.enableCheckboxSelection ) {
      if (this.checkboxPositionLeft) {
        this.displayedColumnsWithSelect = ['select'].concat(this.displayedColumns);
      } else {
        this.displayedColumnsWithSelect = this.displayedColumns.concat(['select']);
      }
    } else {
      this.displayedColumnsWithSelect = this.displayedColumns;
    }
    this.dataStubscription = this.data.subscribe((x: T[]) => {
      this.dataSource = new MatTableDataSource<T>(x);
      this.dataSource.sort = this.sort;
      // remove the selected elements that are no longer in the dataset when datast is updatind
      this.getSelected().forEach((selectedElement: T) => {
        if (x.indexOf(selectedElement) < 0) {
          this.select(selectedElement);
        }
      });
      this.cdr.detectChanges();
    });
  }

  ngOnDestroy(): void {
    this.dataStubscription.unsubscribe();
  }

  private applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  /** Whether the number of selected elements matches the total number of rows. */
  private isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  private masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  private checkboxLabel(row?: T): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row[0]}`;
  }

  getSelected(): T[] {
    return this.selection.selected;
  }

  getSelectedObservable(): Observable<T[]> {
    return this._getSelectedObservable;
  }

  clearSelected(): void {
    this.selection.clear();
    this._EventBus.dispatchEvent(new Event('selection'));
  }

  private select(row: T): void {
    this.selection.toggle(row);
    this._EventBus.dispatchEvent(new Event('selection'));
  }

  private isSelected(row: T): boolean {
    if (!this.coloriseSelectedRow) {
      return false;
    }
    if (this.getSelected().indexOf(row) >= 0) {
      return true;
    }
    return false;
  }
}
