import {
  Component,
  EventEmitter,
  Injectable,
  Input,
  OnInit,
  Output,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import {
  NgbModal,
  NgbModalConfig,
  NgbModalRef,
} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  providers: [NgbModalConfig, NgbModal],
})
export class ModalComponent {
  iconClose = '../../../../assets/close.svg'
  @ViewChild('confirmationModal')
  modalContent!: TemplateRef<ModalComponent>;
  @Output() newConfirmationEvent = new EventEmitter<string>();
  @Input() modalButtonText: any;
  @Input() modalTitle: any;
  @Input() modalBody: any;
  @Input() modalButtonColor: any;
  @Input() actionType:any;
  modalRef!: NgbModalRef;

  constructor(config: NgbModalConfig, private modalService: NgbModal) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit(): void {}

  open(): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      this.modalRef = this.modalService.open(this.modalContent, { size: 'md',centered: true });
      this.modalRef.result.then(
        (result) => {
          console.log(result);
          this.newConfirmationEvent.emit(result);
        },
        (reason) => {
          console.log(reason);
        }
      );
    });
  }
}
