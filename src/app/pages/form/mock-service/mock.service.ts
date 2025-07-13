import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { Feature } from "../interfaces/interfaces";

@Injectable({
	providedIn: 'root'
})
export class MockService {
	getAddresses(): Observable<any[]> {
		const addresses = [
			{
				"city": "Москва",
				"street": "Улица Ворошилова",
				"building": "35",
				"apartment": 105
			},
			{
				"city": "Саратов",
				"street": "Победы",
				"building": 102,
				"apartment": 28
			},
			{
				"city": "Челябинск",
				"street": "Улица 40 Лет Победы",
				"building": 10,
				"apartment": 112
			}
		]

		return of(addresses);
	}

	getFeatures(): Observable<Feature[]> {
		return of([
			{
				code: 'lift',
				label: 'Подъем на этаж',
				value: true,
			},
			{
				code: 'strong-package',
				label: 'Усиленная упаковка',
				value: true,
			},
			{
				code: 'fast',
				label: 'Ускоренная доставка',
				value: false,
			},
		]);
	}
}