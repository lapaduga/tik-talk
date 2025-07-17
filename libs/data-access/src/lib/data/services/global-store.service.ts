import { Injectable, signal } from "@angular/core";
import { Profile } from "..";

@Injectable({
	providedIn: 'root'
})
export class GlobalStoreService {
	me = signal<Profile | null>(null);
}