import { Pipe, PipeTransform } from '@angular/core';
import { formatDistanceToNow } from 'date-fns';
import { ru } from 'date-fns/locale';

@Pipe({
  name: 'timePassedSince',
})
export class TimePassedSince implements PipeTransform {
  transform(pastDate: string | null): string | null {
    if (!pastDate) return null;

    return formatDistanceToNow(pastDate, { addSuffix: true, locale: ru });
  }
}
