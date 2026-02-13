import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse, PaginatedResponse } from '../../../core/models';
import {
  CountrySearchRequest,
  CountryListModel,
  Country,
  CountryOption,
} from '../models/country.model';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  private readonly http = inject(HttpClient);
  private readonly url = '/country';
  getCountryList(
    request: CountrySearchRequest
  ): Observable<ApiResponse<PaginatedResponse<CountryListModel>>> {
    return this.http.post<ApiResponse<PaginatedResponse<CountryListModel>>>(
      `${this.url}/list`,
      request
    );
  }

  deleteCountry(countryId: number): Observable<ApiResponse<boolean>> {
    return this.http.delete<ApiResponse<boolean>>(`${this.url}/${countryId}`);
  }

  getCountryDetails(countryId: number): Observable<ApiResponse<Country>> {
    return this.http.get<ApiResponse<Country>>(`${this.url}/${countryId}`);
  }

  addCountry(model: Country): Observable<ApiResponse<boolean>> {
    return this.http.post<ApiResponse<boolean>>(`${this.url}`, model);
  }

  updateCountry( model: Country): Observable<ApiResponse<boolean>> {
    return this.http.put<ApiResponse<boolean>>(`${this.url}`, model);
  }

  getCountryOptions(): Observable<ApiResponse<CountryOption[]>> {
    return this.http.get<ApiResponse<CountryOption[]>>(`${this.url}/country-list`);
  }
}
