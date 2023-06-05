import { TitleCasePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'titleCaseExtended'
})

export class TitleCaseExtendedPipe extends TitleCasePipe implements PipeTransform {
  constructor() {
    super();
  }

  override transform(value: any, ..._args: any[]): any {
    return super.transform(value.replaceAll('-', ' '));
  }
}
