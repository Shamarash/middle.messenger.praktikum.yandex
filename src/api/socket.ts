import {EventBus} from "../eventBus";
import {SocketEvents} from "../enum/websocket";

export class Socket extends EventBus {

   socket: WebSocket | null = null;

  constructor(url: string) {
    super();
    this.connect();
  }

   connect() {
    this.socket = new WebSocket(this.wsURL);

    this.registerEvents();

    this.registerWSEvents(this.connection);
  }

   registerEvents() {
    this.on(SocketEvents, () => this.loadChat());

    this.on(SocketEvents.ERROR, (e) => {
      console.log('socket error', e);
    });
  }

   registerWSEvents(socket: WebSocket) {
    socket.onopen = () => {
      this.emit(WebsocketService.EVENTS.CONNECTED);
    };

    socket.onmessage = (message: MessageEvent) => {
      const data = JSON.parse(message.data);

      if (data.type && data.type === 'pong') {
        return;
      }

      this.emit(WebsocketService.EVENTS.GET_MESSAGE, data);
    };

    socket.onclose = () => {
      this.emit(WebsocketService.EVENTS.CLOSE);
    };

    socket.onerror = (event) => {
      this.emit(WebsocketService.EVENTS.ERROR, event);
    };
  }

   close(code?: number, reason?: string) {
    if (!this.connection) {
      throw new Error('сокет не подключен');
    }
    this.connection.close(code, reason);
  }

   async loadChat() {
    await this.ping();
    this.getOldMessages();
  }

   async ping() {
    let pingInterval: any = setInterval(() => {
      if (!this.connection) {
        throw new Error('WS соединение не установлено');
      }
      this.connection.send(
          JSON.stringify({
            type: 'ping',
          }),
      );
    }, 10000);

    this.on(WebsocketService.EVENTS.CLOSE, () => {
      clearInterval(pingInterval);
      pingInterval = undefined;
    });
  }

  public async getOldMessages(from = 0) {
    if (!this.connection) {
      throw new Error('WS соединение не установлено');
    }
    await this.connection.send(
        JSON.stringify({
          content: from,
          type: 'get old',
        }),
    );
  }

  public sendMessage(text: string) {
    if (!this.connection) {
      throw new Error('WS соединение не установлено');
    }

    this.connection.send(
        JSON.stringify({
          content: text,
          type: 'message',
        }),
    );
  }

  public getSocket():WebsocketService {
    if (!this.connection || this.connection.readyState === this.connection.CLOSED) {
      this.connectWS();
    }
    return this;
  }
}