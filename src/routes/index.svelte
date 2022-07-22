<script>
	import { getWeatherFrom } from '../services/weather.js';
	import WeatherFooter from '../components/weather-footer.svelte';
	import WeatherIcon from '../components/weather-icon.svelte';

	const weatherPromise = getWeatherFrom();
</script>

<svelte:head>
	<title>Weather Snake App</title>
</svelte:head>
{#await weatherPromise then weather}
	<section>
		<h1>{weather.locationName}</h1>
		<h2>{weather.temperature}º</h2>
		<h3>{weather.conditionText}</h3>
		<WeatherIcon icon={weather.conditionIcon} description={weather.conditionText} />
	</section>
	<WeatherFooter />
{/await}

<style>
	section {
		padding: 16px;
	}

	h1 {
		font-weight: 400;
		color: #333;
		text-transform: uppercase;
		padding: 16px 0 0 0;
	}

	h2 {
		font-weight: 400;
		font-size: 120px;
		color: #333;
		text-transform: uppercase;
		padding: 0;
	}

	h3 {
		font-weight: 700;
		color: #333;
		transform: rotate(-90deg);
		position: absolute;
		top: 56px;
		right: 12px;
	}
</style>
