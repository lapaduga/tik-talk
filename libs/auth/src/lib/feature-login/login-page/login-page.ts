import { ChangeDetectionStrategy, Component, inject,/*  OnInit, */ signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@tt/data-access';
import { TtInput } from '@tt/common-ui';

@Component({
  selector: 'tt-login-page',
  imports: [ReactiveFormsModule, TtInput],
  templateUrl: './login-page.html',
  styleUrl: './login-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginPage/*  implements OnInit */ {
  authService = inject(AuthService);
  router = inject(Router);
  isPasswordVisible = signal<boolean>(false);

  form = new FormGroup({
    username: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required),
  });

/*   ngOnInit() {
    this.form.valueChanges.subscribe(v => {
      console.log(v);
    });

    this.form.controls.username.disable();
  } */

  onSubmit() {
    this.isPasswordVisible.set(true);

    if (this.form.valid) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      this.authService.login(this.form.value).subscribe((res) => {
        this.router.navigate(['']);
      });
    }
  }
}
