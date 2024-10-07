import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type MetricProps = {
	title: string;
	value: string;
};

const Metric = ({ title, value }: MetricProps) => {
	return (
		<Card className="text-center border-muted">
			<CardHeader>
				<CardTitle>{title}</CardTitle>
			</CardHeader>
			<CardContent>
				<p>{value}</p>
			</CardContent>
		</Card>
	);
};

export default Metric;
