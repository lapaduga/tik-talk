import { ChangeDetectionStrategy, Component, inject, OnDestroy } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, Subscription } from 'rxjs';
import { ProfileService } from '@tt/data-access';
import { Store } from '@ngrx/store';
import { profileActions, selectProfileFilters } from '../../store';

@Component({
  selector: 'app-profile-filters',
  imports: [ReactiveFormsModule],
  templateUrl: './profile-filters.html',
  styleUrl: './profile-filters.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileFilters implements OnDestroy {
  fb = inject(FormBuilder);
  profileService = inject(ProfileService);
  store = inject(Store);

  searchForm = this.fb.group({
    firstName: [''],
    lastName: [''],
    stack: [''],
  });

  searchFormSub!: Subscription;

  constructor() {
    this.searchFormSub = this.searchForm.valueChanges
      .pipe(
        debounceTime(300)
      )
      .subscribe(formValue => this.store.dispatch(profileActions.filterEvents({ filters: formValue })));

    const filtersSub = this.store.select(selectProfileFilters).subscribe(filters => {
      this.searchForm.patchValue(filters, { emitEvent: false });
    });

    this.searchFormSub.add(filtersSub);
  }

  ngOnDestroy() {
    this.searchFormSub.unsubscribe();
  }
}
