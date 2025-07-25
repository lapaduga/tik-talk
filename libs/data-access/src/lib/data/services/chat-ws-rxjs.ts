import { finalize, Observable, tap } from "rxjs";
import { ChatConnectionWSParams, ChatWSMessage, ChatWsServiceInterface } from "../interfaces";
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';

export class ChatWSRxJsService implements ChatWsServiceInterface {
	#socket: WebSocketSubject<ChatWSMessage> | null = null;

	connect(params: ChatConnectionWSParams): Observable<ChatWSMessage> {
		if (!this.#socket) {
			this.#socket = webSocket({
				url: params.url,
				protocol: [params.token]
			});
		}

		return this.#socket.asObservable()
		.pipe(
			tap(message => params.handleMessage(message)),
			finalize(() => console.log('Сокет закрыт'))
		);
	}

	sendMessage(text: string, chatId: number) {
		this.#socket?.next({
			text,
			chat_id: chatId
		});
	}

	disconnect() {
		this.#socket?.complete();
	}
}