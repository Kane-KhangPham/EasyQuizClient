import {Component} from '@angular/core';
import {DynamicDialogConfig, DynamicDialogRef} from 'primeng';

@Component({
  template: `
        <p-table [value]="items"  [responsive]="true">

            <ng-template pTemplate="body" let-car>
                <tr>
                   <td>{{car.question}}</td>
                </tr>
            </ng-template>
        </p-table>
    `,
})
// tslint:disable-next-line:component-class-suffix
export class ErorUploadDialog {
  items = [];
  constructor(public ref: DynamicDialogRef, public config: DynamicDialogConfig) { }

  ngOnInit() {
    console.log('-----', this.config.data);
    this.items = this.config.data;
  }
}
