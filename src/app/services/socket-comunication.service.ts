import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { map } from 'rxjs/operators';

@Injectable()
export class ChatService {
  constructor(private socket: Socket) {}

  sendMessage(msg: string) {
    this.socket.emit('message', msg);
  }
  getMessage() {
    return this.socket.fromEvent('mensaje_bienvenida').pipe(map((data) => data));
  }

  getMessageGPS() {
    return this.socket.fromEvent('chat_send_server_message').pipe(map((data) => data));
  }
}