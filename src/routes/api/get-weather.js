import { config } from 'dotenv';

config();

const FETCH_OPTIONS = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': process.env.API_KEY,
		'X-RapidAPI-Host': process.env.API_HOST
	}
};

// @ts-ignore
export async function GET(event) {
	const { searchParams } = event.url;
	const query = searchParams.get('q') ?? 'Madrid';
	console.log(event.url.searchParams);
	const response = await fetch(
		`https://weatherapi-com.p.rapidapi.com/current.json?q=${query}`,
		FETCH_OPTIONS
	);

	const data = await response.json();

	const { location, current } = data;
	const { country, localtime, name } = location;
	const { condition, humidity, feelslike_c, isday, temp_c, wind_kph, wind_dir } = current;
	const { icon, text } = condition;

	const body = {
		country,
		localtime,
		locationName: name,
		humidity,
		conditionIcon: icon,
		conditionText: text,
		feelsLike: feelslike_c,
		isDay: isday,
		temperature: temp_c,
		windSpeed: wind_kph,
		windDir: wind_dir
	};

	return {
		status: 200,
		body
	};
}
