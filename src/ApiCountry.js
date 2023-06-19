class CountryApi {

	constructor() {
			this.path = "https://namaztimes.kz/ru/api";
	}

	getAllCountry() {
			return fetch(`${this.path}/country`, {
			}).then(res => res.json())
	}
}

export default CountryApi;