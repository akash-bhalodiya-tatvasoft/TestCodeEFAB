import { Component, OnInit, inject, signal } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { provideNativeDateAdapter } from "@angular/material/core";
import { PageEvent } from "@angular/material/paginator";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatTableDataSource } from "@angular/material/table";
import { MatTooltipModule } from "@angular/material/tooltip";
import { Router, ActivatedRoute } from "@angular/router";
import { ApiResponse } from "../../../../core/models";
import { SharedModule } from "../../../../core/modules/shared.module";
import { ConfirmationService } from "../../../../shared";
import { CountryListModel, CountrySearchRequest } from "../../models/country.model";
import { CountryService } from "../../services/country.service";

@Component({
  selector: 'app-country-list',
  standalone: true,
  imports: [SharedModule, MatProgressSpinnerModule, MatTooltipModule],
  providers: [provideNativeDateAdapter()],
  templateUrl: './country-list.html',
  styleUrls: ['./country-list.scss']
})
export class CountryList implements OnInit {
  private readonly service = inject(CountryService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly fb = inject(FormBuilder);
  private readonly confirmService = inject(ConfirmationService);
  
  readonly loading = signal<boolean>(false);

  

    readonly totalCount = signal<number>(0);
  readonly pageIndex = signal<number>(0);
  readonly pageSize = signal<number>(10);
  readonly pageSizeOptions = [5, 10, 25, 100];
  readonly searchText = signal<string>('');
  readonly sortField = signal<string>('');
  readonly sortOrder = signal<'asc' | 'desc' | ''>('');


  dataSource = new MatTableDataSource<CountryListModel>([]);

  ngOnInit(): void {
  
    this.loadData();
  }

  

  loadData(): void {
  this.loading.set(true);
  const request: CountrySearchRequest = {
    pageIndex: this.pageIndex(),
    pageSize: this.pageSize(),
    searchText: this.searchText(),
    sortField: this.sortField(),
    sortOrder: this.sortOrder(),
  };
  this.service.getCountryList(request).subscribe({
    next: (res) => {
      this.dataSource.data = res.data.items;
      this.totalCount.set(res.data.totalCount);
      this.loading.set(false);
    },
    error: (err) => {
      console.error('Error fetching data', err);
      this.loading.set(false);
    },
  });
}



    onCreate(): void {
    this.router.navigate(['add'], { relativeTo: this.route });
  }

  onEdit(countryId: number): void {
  this.router.navigate(['edit', countryId], { relativeTo: this.route });
}

onDelete(countryId: number): void {
    this.confirmService.confirm({
      title: 'Delete Country',
      message: 'Are you sure you want to delete this country?',
      confirmText: 'Delete',
      cancelText: 'Cancel'
    }).subscribe(confirmed => {
      if (confirmed) {
        this.loading.set(true);
        this.service.deleteCountry(countryId).subscribe({
          next: (res: ApiResponse<boolean>) => {
            this.loadData();
          },
          error: () => this.loading.set(false),
          complete: () => this.loading.set(false)
        });
      }
    });
  }
  onPageChange(event: PageEvent): void {
    this.pageIndex.set(event.pageIndex);
    this.pageSize.set(event.pageSize);
    this.loadData();
  }

  onSortChange(sort: { active: string; direction: 'asc' | 'desc' | '' }): void {
    this.pageIndex.set(0);
    this.sortField.set(sort.active);
    this.sortOrder.set(sort.direction);
    this.loadData();
  }

  onSearchChange(searchValue: string): void {
    this.loadData();
  }

  applyFilters(): void {
    this.loadData();
  }

  resetFilters(): void {
    this.searchText?.set('');
    this.pageIndex?.set(0);
    this.loadData();
  }



}