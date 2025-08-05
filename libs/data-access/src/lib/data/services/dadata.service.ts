import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { DADATA_TOKEN } from './token';
import { DadataSuggestion } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class DadataService {
  #apiUrl = "https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address";
  #http = inject(HttpClient);

  getSuggestion(query: string): Observable<any> {
    return this.#http.post<{ suggestions: DadataSuggestion[] }>(this.#apiUrl, { query },
      {
        headers: {
          Authorization: `Token ${DADATA_TOKEN}`
        }
      }
    ).pipe(map(res => /* Array.from(new Set(res.suggestions.map((suggestion: DadataSuggestion) => suggestion.data.city))) */{
      return res.suggestions;
    }));
  }
}
