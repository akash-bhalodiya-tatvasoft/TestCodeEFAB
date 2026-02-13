import { Component, OnInit, inject, signal } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { provideNativeDateAdapter } from "@angular/material/core";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatTableDataSource } from "@angular/material/table";
import { MatTooltipModule } from "@angular/material/tooltip";
import { Router, ActivatedRoute } from "@angular/router";
import { ApiResponse } from "../../../../core/models";
import { SharedModule } from "../../../../core/modules/shared.module";
import { ConfirmationService } from "../../../../shared";
import { StateListModel, StateSearchRequest } from "../../models/state.model";
import { StateService } from "../../services/state.service";

@Component({
    selector: 'app-state-list',
    standalone: true,
    imports: [SharedModule, MatProgressSpinnerModule, MatTooltipModule],
    providers: [provideNativeDateAdapter()],
    templateUrl: './state-list.html',
    styleUrls: ['./state-list.scss']
  })
  export class StateList implements OnInit {
    private readonly service = inject(StateService);
    private readonly router = inject(Router);
    private readonly route = inject(ActivatedRoute);
    private readonly fb = inject(FormBuilder);
    private readonly confirmService = inject(ConfirmationService);
    
    readonly loading = signal<boolean>(false);
  
    
  
      readonly searchText = signal<string>('');
    readonly sortField = signal<string>('');
    readonly sortOrder = signal<'asc' | 'desc' | ''>('');
  
    filterForm = this.fb.group({
      name: [null],
    });
  
  
    dataSource = new MatTableDataSource<StateListModel>([]);
  
    ngOnInit(): void {
    
      this.loadData();
    }
  
    
  
    loadData(): void {
    this.loading.set(true);
    const raw = this.filterForm.value;
    const request: StateSearchRequest = {
      searchText: this.searchText(),
      sortField: this.sortField(),
      sortOrder: this.sortOrder(),
      ...(raw as Partial<StateSearchRequest>),
    };
    this.service.getStateList(request).subscribe({
      next: (res) => {
        this.dataSource.data = res.data;
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
  
    onEdit(stateId: number): void {
    this.router.navigate(['edit', stateId], { relativeTo: this.route });
  }
  
  onDelete(stateId: number): void {
      this.confirmService.confirm({
        title: 'Delete State',
        message: 'Are you sure you want to delete this state?',
        confirmText: 'Delete',
        cancelText: 'Cancel'
      }).subscribe(confirmed => {
        if (confirmed) {
          this.loading.set(true);
          this.service.deleteState(stateId).subscribe({
            next: (res: ApiResponse<boolean>) => {
              this.loadData();
            },
            error: () => this.loading.set(false),
            complete: () => this.loading.set(false)
          });
        }
      });
    }
    onSortChange(sort: { active: string; direction: 'asc' | 'desc' | '' }): void {
      
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
      this.filterForm.reset();
      this.searchText?.set('');
      this.loadData();
    }
  
  
  
  }