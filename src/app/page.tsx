import moment from "moment";

import Table from "@/components/Table";
import Chart from "@/components/Chart";
import Metric from "@/components/Metric";
import { columns } from "@/components/columns";

import { type Data } from "@/lib/type";

async function getData() {
	try {
		const response = await fetch("https://test-dev.zero.co/dummy-api/");
		return response.json();
	} catch (error) {
		console.error(error);
	}
}

export default async function Home() {
	const data: Data[] = await getData();
	const totalFuelProduced = data.reduce((acc, item) => acc + item.fuel_mass__g, 0);
	const totalWaterProduced = data.reduce((acc, item) => acc + item.water_mass__g, 0);
	const peakFuelProduced = Math.max(...data.map((item) => item.fuel_mass__g));
	const peakFuelExperimentandDate = data.find((item) => item.fuel_mass__g === peakFuelProduced);
	const peakWaterConsumed = Math.max(...data.map((item) => item.water_mass__g));
	const peakWaterExperimentandDate = data.find(
		(item) => item.water_mass__g === peakWaterConsumed
	);

	// Sort data by datetime in descending order
	const sortedData = data.sort(
		(a, b) => moment(b.datetime).valueOf() - moment(a.datetime).valueOf()
	);

	return (
		<main className="min-h-screen bg-background">
			<div className="container mx-auto px-4 py-16">
				<div>
					<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
						<Metric
							title="Total Fuel Production"
							value={`${totalFuelProduced.toLocaleString()}g`}
						/>
						<Metric
							title="Total Water Production"
							value={`${totalWaterProduced.toLocaleString()}g`}
						/>
						<Metric
							title="Peak Fuel Production"
							value={`${peakFuelProduced.toLocaleString()}g : ${moment(
								peakFuelExperimentandDate?.datetime
							).format("MMM D, YYYY h:mm A")}`}
						/>
						<Metric
							title="Peak Water Production"
							value={`${peakWaterConsumed.toLocaleString()}g : ${moment(
								peakWaterExperimentandDate?.datetime
							).format("MMM D, YYYY h:mm A")}`}
						/>
					</div>
				</div>
				<div className="grid gap-4 mt-20 lg:grid-cols-2 lg:items-start">
					<Chart data={data} />
					<Table data={sortedData} columns={columns} />
				</div>
			</div>
		</main>
	);
}
