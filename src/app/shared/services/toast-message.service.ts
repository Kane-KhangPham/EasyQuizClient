import { Injectable } from '@angular/core';
import {MessageService} from 'primeng';

@Injectable({
  providedIn: 'root'
})
export class ToastMessageService {

  constructor(private messageService: MessageService) { }

  success(message: string){
    this.messageService.add({severity:'success', detail: message});
  }

  error(message: string) {
    this.messageService.add({severity:'error', detail: message});
  }

  info(message: string) {
    this.messageService.add({severity:'info', detail: message});
  }

  warn(message: string) {
    this.messageService.add({severity:'warn', detail: message});
  }
}
