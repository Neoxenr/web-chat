import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';

@WebSocketGateway(3001)
export class MessagesGateway {
  @SubscribeMessage('messages')
  handleMessage(@MessageBody() data: string): string {
    return data;
  }
}
