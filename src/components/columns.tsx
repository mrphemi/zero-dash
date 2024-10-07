"use client";

import moment from "moment";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

import { Button } from "./ui/button";

import { type Data } from "@/lib/type";

export const columns: ColumnDef<Data>[] = [
	{
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				>
					Date <ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},
		accessorKey: "datetime",
		cell: ({ row }) => {
			const date = row.getValue("datetime");
			const formatted = moment(date as string).format("MMM D, YYYY h:mm A");
			return <div className="font-medium">{formatted}</div>;
		},
	},
	{
		header: "Experiment ID",
		accessorKey: "experiment_id",
	},
	{
		header: "Fuel Mass (g)",
		accessorKey: "fuel_mass__g",
	},
	{
		header: "Water Mass (g)",
		accessorKey: "water_mass__g",
	},
];
