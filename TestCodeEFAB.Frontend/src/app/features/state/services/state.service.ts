import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable } from "rxjs";
import { ApiResponse } from "../../../core/models";
import { StateSearchRequest, StateListModel } from "../models/state.model";

@Injectable({
    providedIn: 'root'
})
export class StateService {
  private readonly http = inject(HttpClient);
  private readonly url = '/state';
  getStateList(request?: StateSearchRequest): Observable<ApiResponse<StateListModel[]>> {
    return this.http.post<ApiResponse<StateListModel[]>>(`${this.url}/list`, request);
  }

  deleteState(stateId: number): Observable<ApiResponse<boolean>> {
    return this.http.delete<ApiResponse<boolean>>(`${this.url}/${stateId}`);
  }


}