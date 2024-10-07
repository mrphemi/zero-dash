import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import moment from "moment";
import { type Data } from "./type";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

type DailyAggregate = Pick<Data, "fuel_mass__g" | "water_mass__g"> & {
	day: string;
};

type DetailedWeeklyData = {
	date_range: string;
	total_fuel_mass__g: number;
	total_water_mass__g: number;
	daily_aggregates: DailyAggregate[];
	data_points: Data[];
};

/**
 * Formats a Moment object to 'MMM-DD' string format.
 * @param date - The Moment object to format.
 * @returns Formatted date string.
 */
function formatDate(date: moment.Moment): string {
	return date.format("MMM-DD");
}

/**
 * Transforms experiment data into detailed weekly summaries with day-of-week aggregates.
 * @param data - Array of experiment data objects.
 * @returns Array of detailed weekly data objects.
 */
export function transformToDetailedWeeklyData(data: Data[]): DetailedWeeklyData[] {
	// Sort data chronologically by datetime
	const sortedData = data.sort(
		(a, b) => moment(a.datetime).valueOf() - moment(b.datetime).valueOf()
	);

	// Group data by week
	const weeklyData: { [key: string]: Data[] } = {};

	sortedData.forEach((item) => {
		// Get the start of the week (Sunday) for this data point
		const weekStart = moment(item.datetime).startOf("week");
		// Create a key for this week in the format "YYYY-MM-DD"
		const weekKey = weekStart.format("YYYY-MM-DD");

		// Initialize the week's data array if it doesn't exist
		if (!weeklyData[weekKey]) {
			weeklyData[weekKey] = [];
		}
		// Add this data point to the appropriate week
		weeklyData[weekKey].push(item);
	});

	// Transform weekly data into detailed format
	const result: DetailedWeeklyData[] = Object.entries(weeklyData).map(([weekStart, weekData]) => {
		// Create moment objects for the start and end of the week
		const start = moment(weekStart);
		const end = moment(start).add(6, "days");

		// Initialize variables for weekly totals and daily aggregates
		const dailyAggregates: { [key: string]: DailyAggregate } = {};
		let totalFuelMass = 0;
		let totalWaterMass = 0;

		// Initialize daily aggregates for each day of the week
		["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].forEach(
			(day) => {
				dailyAggregates[day] = { day, fuel_mass__g: 0, water_mass__g: 0 };
			}
		);

		// Process each data point in the week
		weekData.forEach((item) => {
			// Get the day of the week for this data point
			const dayOfWeek = moment(item.datetime).format("dddd");

			// Add this data point's values to the day's totals
			dailyAggregates[dayOfWeek].fuel_mass__g += item.fuel_mass__g;
			dailyAggregates[dayOfWeek].water_mass__g += item.water_mass__g;

			// Add to the week's totals
			totalFuelMass += item.fuel_mass__g;
			totalWaterMass += item.water_mass__g;
		});

		// Construct and return the DetailedWeeklyData object
		return {
			date_range: `${formatDate(start)} - ${formatDate(end)}`,
			total_fuel_mass__g: Math.round(totalFuelMass * 100) / 100, // Round to 2 decimal places
			total_water_mass__g: Math.round(totalWaterMass * 100) / 100,
			daily_aggregates: Object.values(dailyAggregates),
			data_points: weekData, // Include all original data points for the week
		};
	});

	// Sort weeks chronologically
	return result.sort(
		(a, b) =>
			moment(a.date_range.split(" - ")[0], "MMM-DD").valueOf() -
			moment(b.date_range.split(" - ")[0], "MMM-DD").valueOf()
	);
}

/**
 * Gets the total fuel used from the data.
 * @param data - Array of experiment data objects.
 * @returns Total fuel used.
 */
export function getTotalFuelUsed(data: Data[]): number {
	return data.reduce((acc, item) => acc + item.fuel_mass__g, 0);
}

/**
 * Gets the total water used from the data.
 * @param data - Array of experiment data objects.
 * @returns Total water used.
 */
export function getTotalWaterUsed(data: Data[]): number {
	return data.reduce((acc, item) => acc + item.water_mass__g, 0);
}
