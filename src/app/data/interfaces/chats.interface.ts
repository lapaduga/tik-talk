import { Profile } from "./profile.interface";

export interface Chat {
	id: number
	userFirst: Profile
	userSecond: Profile
	messages: Message[]
	companion?: Profile
}

export interface Message {
	id: number
	userFromId: number
	personalChatId: number
	text: string
	createdAt: string
	updatedAt: string
	isRead: boolean
	user?: Profile
	isMine?: boolean
}

export interface LastMessageRes {
	id: number
	userFrom: Profile
	message: string | null
	createdAt: string
	unreadMessages: number
}

export interface GroupedMessages {
	date: string
	messages: Message[]
}