import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {
  AbstractControl,
  AsyncValidator,
  ValidationErrors,
} from '@angular/forms';
import { delay, map, Observable } from 'rxjs';
import { Profile } from '@tt/interfaces/profile';

@Injectable({
  providedIn: 'root',
})
export class NameValidator implements AsyncValidator {
  baseApiUrl = 'https://icherniakov.ru/yt-course/account/test_accounts';
  http = inject(HttpClient);

  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    return this.http.get<Profile[]>(this.baseApiUrl).pipe(
      delay(1000),
      map((users) => {
        return users.filter((u) => u.firstName === control.value).length > 0
          ? null
          : {
              nameValid: {
                message: `Имя должно быть одним из списка: ${users
                  .map((user) => user.firstName)
                  .join(', ')}`,
              },
            };
      })
    );
  }
}
