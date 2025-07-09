import { HttpClient } from "@angular/common/http";
import { inject, Injectable, signal } from "@angular/core";
import { Chat, LastMessageRes, Message, SortedMessageObject } from "../interfaces/chats.interface";
import { ProfileService } from "./profile.service";
import { map } from 'rxjs';
import { format, isToday, isYesterday } from 'date-fns';
import { ru } from 'date-fns/locale';

@Injectable({
	providedIn: 'root'
})
export class ChatsService {
	http = inject(HttpClient);
	me = inject(ProfileService).me;
	baseApiUrl = 'https://icherniakov.ru/yt-course/';
	chatsUrl = `${this.baseApiUrl}chat/`;
	messageUrl = `${this.baseApiUrl}message/`;
	activeChatMessages = signal<SortedMessageObject[]>([]);

	private formatMessageDate(date: string): string {
		const standardizedDate = `${date}Z`;
		if (isToday(standardizedDate)) {
			return 'Сегодня';
		} else if (isYesterday(standardizedDate)) {
			return 'Вчера';
		} else {
			return format(standardizedDate, 'd MMMM yyyy', { locale: ru });
		}
	}

	createChat(userId: number) {
		return this.http.post<Chat>(`${this.chatsUrl}${userId}`, {});
	}

	getMyChats() {
		return this.http.get<LastMessageRes[]>(`${this.chatsUrl}get_my_chats/`);
	}

	getChatById(chatId: number) {
		return this.http.get<Chat>(`${this.chatsUrl}${chatId}`)
			.pipe(map(chat => {
				const patchedMessages = chat.messages.map(message => {
					return {
						...message,
						user: chat.userFirst.id === message.userFromId ? chat.userFirst : chat.userSecond,
						isMine: message.userFromId === this.me()!.id
					}
				});

				const chatWithDates: any = {};

				patchedMessages.forEach(message => {
					const date = this.formatMessageDate(message.createdAt);

					if (!(date in chatWithDates)) {
						chatWithDates[date] = [];
					}

					chatWithDates[date].push(message);
				});

				const sortedPatchedMessages = [];

				for (const key in chatWithDates) {
					if (Object.prototype.hasOwnProperty.call(chatWithDates, key)) {
						const element = chatWithDates[key];
						sortedPatchedMessages.push({ date: key, messages: element })
					}
				}

				console.log(sortedPatchedMessages);

				this.activeChatMessages.set(sortedPatchedMessages);

				return {
					...chat,
					companion: chat.userFirst.id === this.me()!.id ? chat.userSecond : chat.userFirst,
					messages: sortedPatchedMessages
				}
			}));
	}

	sendMessage(chatId: number, message: string) {
		return this.http.post(`${this.messageUrl}send/${chatId}`, {}, {
			params: {
				message
			}
		});
	}
}