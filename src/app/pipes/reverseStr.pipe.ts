import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'reverseStr'})
export class ReverseStr implements PipeTransform {
  transform(value: string): string {
    const newStr = value.split(',').reverse();
    return newStr.join(' ');
  }
}