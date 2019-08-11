import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'readmore'
})
export class ReadmorePipe implements PipeTransform {

  transform(value: any, args?: any): any {
      if(args){
      	console.log(value.substr(0,args));
    	return value.substr(0,args);
    }
    else
    	{
    		return value;
    	}
  }

}
