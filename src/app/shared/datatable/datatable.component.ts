import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  TemplateRef,
  ViewChild,
  computed,
  effect,
  input,
  output,
} from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-datatable',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatIconModule,
    CommonModule,
    MatMenuModule,
  ],
  templateUrl: './datatable.component.html',
  styleUrl: './datatable.component.scss',
  changeDetection: ChangeDetectionStrategy.Default,
})
export class DatatableComponent {
  dataSource!: MatTableDataSource<DataItem>;
  displayedColumns!: string[];
  additionalMenuActionsTemplate = input<TemplateRef<any> | null>(null);
  additionalGroupActionsTemplate = input<TemplateRef<any> | null>(null);
  tableData = input.required<DataItem[]>();
  ignoreColumns = input<string[]>();
  disablePaginator = input<boolean>(false);
  disableSorting = input<boolean>(false);
  disableActionColumn = input<boolean>(false);

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;
  preparedData: any;

  onEditClick = output<any>();
  onDeleteClick = output<any>();
  onViewClick = output<any>();

  constructor(private cdr: ChangeDetectorRef) {
    effect(() => {
      this.preparedData = prepareMaterialTableData(this.tableData());
      this.dataSource = this.preparedData.dataSource;
      this.displayedColumns = prepareTableColumns(
        this.preparedData.displayedColumns,
        this.ignoreColumns(),
        this.disableActionColumn()
      );
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getrowdata(data: any) {
    console.error(data);
  }
}

interface DataItem {
  [key: string]: any;
}

function prepareMaterialTableData(jsonData: DataItem[]): {
  dataSource: MatTableDataSource<DataItem>;
  displayedColumns: string[];
} {
  if (!jsonData || jsonData.length === 0) {
    return {
      dataSource: new MatTableDataSource<DataItem>([]),
      displayedColumns: [],
    };
  }

  // Extract keys for columns
  const displayedColumns = Object.keys(jsonData[0]);

  // Create data source
  const dataSource = new MatTableDataSource<DataItem>(jsonData);

  return {
    dataSource,
    displayedColumns,
  };
}

function prepareTableColumns(
  rawData: any,
  ignoreColumns: any,
  actionButtonDisabled: boolean
) {
  if (!rawData || rawData.length === 0) return [];
  let columns = rawData.filter((key: any) => !ignoreColumns.includes(key));
  if (!actionButtonDisabled) columns.push('star');
  return columns;
}
