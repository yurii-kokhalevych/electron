import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sizeFormat'
})
export class SizeFormatPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {
    const units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    let l = 0;
    let n = parseInt(value, 10) || 0;
    while (n >= 1024 && ++l) {
      n = n / 1024;
    }
    return(n.toFixed(n < 10 && l > 0 ? 1 : 0) + ' ' + units[l]);
  }

}
