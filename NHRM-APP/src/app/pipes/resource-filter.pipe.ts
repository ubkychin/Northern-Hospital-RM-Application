import { Pipe, PipeTransform } from '@angular/core';
import { PatientResource } from '../models/patient-resource';

@Pipe({
  name: 'resourceFilter'
})
export class ResourceFilterPipe implements PipeTransform {

  transform(items: PatientResource[], filter: string): any {
    if (!items || !filter)
      return items;

    return items.filter(item => item.resType == filter)
  }

}
