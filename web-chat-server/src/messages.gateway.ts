import { Logger } from '@nestjs/common';
import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { Observable } from 'rxjs';

import { Server } from 'socket.io';

@WebSocketGateway(3001, { cors: true })
export class MessagesGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  private readonly logger = new Logger(MessagesGateway.name);

  private clients: any[] = [];

  @WebSocketServer() io: Server;

  afterInit() {
    this.logger.log('Initialized');
  }

  handleConnection(client: any) {
    this.clients.push(client);
    this.logger.log(`Client id: ${client.id} connected`);
  }

  handleDisconnect(client: any) {
    // отключить всех
    this.logger.log(`Client id: ${client.id} disconnected`);
  }

  @SubscribeMessage('message')
  handleMessage(
    @MessageBody() data: string,
  ): Observable<WsResponse<any>> | any {
    // this.logger.log(`Message received from client id: ${client.id}`);
    this.logger.debug(`Payload: ${data}`);

    for (let i = 0; i < this.clients.length; i++) {
      this.clients[i].send(JSON.stringify({ event: 'message', data }));
    }
  }
}
