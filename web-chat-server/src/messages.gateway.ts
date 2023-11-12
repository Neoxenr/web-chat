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

  handleConnection(client: any) {
    this.clients.push(client);

    this.logger.log(`Client id: ${client.id} connected`);
  }

  handleDisconnect(client: any) {
    this.logger.log(`Client id: ${client.id} disconnected`);
  }

  @SubscribeMessage('message')
  handleMessage(
    @MessageBody() data: string,
  ): Observable<WsResponse<any>> | any {
    this.logger.debug(`Payload: ${data}`);

    this.clients.forEach((client) => {
      client.send(JSON.stringify({ event: 'message', data }));
    });
  }
}
