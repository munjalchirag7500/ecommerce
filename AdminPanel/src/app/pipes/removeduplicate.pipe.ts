import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'removeduplicate'
})
export class RemoveduplicatePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return null;
  }

}
