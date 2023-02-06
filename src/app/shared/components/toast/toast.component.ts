import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent {
  closeIcon= '';
  @Input() toastDescription: string = 'Changes saved successfully';
  @Input() toastIcon: string = '../../../../assets/check.svg';
  @Input() toastPositionY: string = 'top';
  @Input() toastPositionX: string = 'end';
}
