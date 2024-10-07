"use client";

import React from "react";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Legend, Label } from "recharts";

import { type Data } from "@/lib/type";
import { transformToDetailedWeeklyData } from "@/lib/utils";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "./ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "./ui/chart";

type ChartProps = {
	data: Data[];
};

const chartConfig = {
	fuel: {
		label: "Fuel",
		color: "hsl(var(--chart-1))",
	},
	water: {
		label: "Water",
		color: "hsl(var(--chart-2))",
	},
} satisfies ChartConfig;

const Chart = ({ data }: ChartProps) => {
	const weeklyData = transformToDetailedWeeklyData(data).reverse();
	const [selectedWeek, setSelectedWeek] = React.useState<string | null>(weeklyData[0].date_range);
	const selectedWeekData = weeklyData.find((item) => item.date_range === selectedWeek);
	return (
		<Card className="border-muted">
			<CardHeader>
				<CardTitle>Weekly Fuel and Water Production</CardTitle>
				<CardDescription>{selectedWeek}</CardDescription>
			</CardHeader>
			<CardContent>
				<Select onValueChange={(value) => setSelectedWeek(value)}>
					<SelectTrigger className="w-[180px] text-muted-foreground">
						<SelectValue placeholder={selectedWeek ? selectedWeek : "Select week"} />
					</SelectTrigger>
					<SelectContent>
						{weeklyData.map((item) => (
							<SelectItem key={item.date_range} value={item.date_range}>
								{item.date_range}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
				<ChartContainer config={chartConfig} className="mt-10 w-full -ml-4 sm:-ml-2">
					<LineChart data={selectedWeekData?.daily_aggregates} accessibilityLayer>
						<CartesianGrid vertical={false} horizontal={false} />
						<XAxis dataKey="day" tickLine={false} />
						<YAxis tickLine={false}>
							<Label
								value="Mass in grams"
								angle={-90}
								position="insideLeft"
								className="hidden sm:block"
							/>
						</YAxis>
						<ChartTooltip content={<ChartTooltipContent hideLabel />} />
						<Legend />
						<Line
							dataKey="fuel_mass__g"
							name="Fuel"
							stroke="var(--color-fuel)"
							type="monotone"
						/>
						<Line
							type="monotone"
							dataKey="water_mass__g"
							stroke="var(--color-water)"
							name="Water"
						/>
					</LineChart>
				</ChartContainer>
			</CardContent>
			<CardFooter>
				<p className="text-muted-foreground text-sm text-center lg:text-left">
					Showing total fuel and water production for selected week range
				</p>
			</CardFooter>
		</Card>
	);
};

export default Chart;
