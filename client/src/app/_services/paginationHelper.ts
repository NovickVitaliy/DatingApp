import {HttpClient, HttpParams} from "@angular/common/http";
import {PaginatedResult} from "../_models/pagination";
import {map} from "rxjs";
import {Inject} from "@angular/core";

export function getPaginatedResult<T>(url:string, params: HttpParams, httpClient: HttpClient) {
  const paginatedResult: PaginatedResult<T> = new PaginatedResult<T>();
  return httpClient.get<T>(url, {observe: 'response', params: params})
    .pipe(
      map(response => {
        if (response.body) {
          paginatedResult.result = response.body;
        }
        const pagination = response.headers.get('Pagination');
        if (pagination) {
          paginatedResult.pagination = JSON.parse(pagination);
        }
        return paginatedResult;
      })
    );
}

export function getPaginationHeaders(pageNumber: number, pageSize: number) {
  let params = new HttpParams();

  if (pageNumber && pageSize) {
    params = params.append('pageNumber', pageNumber);
    params = params.append('pageSize', pageSize);
  }

  return params;
}
