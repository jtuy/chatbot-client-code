import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as io from 'socket.io-client';

@Injectable()
export class SocketService {

  // private socket = io('http://127.0.0.1:8000');
  private socket = io('https://plaid-different-danger.glitch.me');
  constructor() { }

  sendMessage(data) {
    this.socket.emit('message', data);
  }

  receivedReply() {
    const observable = new Observable<any>(observer => {
      this.socket.on('reply', (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });
    return observable;
  }

}