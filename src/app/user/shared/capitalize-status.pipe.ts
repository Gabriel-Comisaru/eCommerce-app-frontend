import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalizeStatus',
})
export class CapitalizeStatusPipe implements PipeTransform {
  transform(value: string): string {
    return value[0].toUpperCase() + value.substring(1).toLowerCase();
  }
}
