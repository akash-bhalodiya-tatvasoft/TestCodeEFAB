import { CommonModule } from "@angular/common";
import { Component, OnInit, input, inject, signal } from "@angular/core";
import { ReactiveFormsModule, FormControl } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSelectModule } from "@angular/material/select";
import { ApiResponse } from "../../../../core/models";
import { CountryOption } from "../../models/country.model";
import { CountryService } from "../../services/country.service";

@Component({
    selector: 'app-country-dropdown',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, MatSelectModule, MatFormFieldModule],
    templateUrl: './country-dropdown.html',
    styleUrls: ['./country-dropdown.scss'],
  })
  export class CountryDropdown implements OnInit {
    control = input.required<FormControl>();
    label = input<string>('Country');
    placeholder = input<string>('Select Country');
  
    private readonly service = inject(CountryService);
    readonly options = signal<CountryOption[]>([]);
  
    
    readonly filteredOptions = signal<CountryOption[]>([]);
  
    onSearch(event: Event): void {
      const value = (event.target as HTMLInputElement).value.toLowerCase();
  
      const filtered = this.options().filter(item =>
        String(item.name).toLowerCase().includes(value)
      );
  
      this.filteredOptions.set(filtered);
    }
  
    ngOnInit(): void {
      this.loadOptions();
    }
  
    loadOptions(): void {
      this.service.getCountryOptions().subscribe({
        next: (res: ApiResponse<CountryOption[]>) => {
          if (res.statusCode === 200 && res.data) {
            this.options.set(res.data);
            this.filteredOptions.set(res.data);
          }
        },
        error: (err) => {
          console.error('Error loading options:', err);
        }
      });
    }
  }
  