import { dedent } from 'ts-dedent';
import { AreaChart } from '@moonmoonbrothers/uglychart';
export default {
	widget: AreaChart({
		data: {
			title: 'Title',
			labels: [
				'label1',
				'label2',
				'label3',
				'label4',
				'label5',
				'label6',
				'label7',
				'label8',
				'label9'
			],
			datasets: [
				{
					legend: 'A',
					data: [30, 40.5, 50.12, 30.5, 40, 90, 50, 20, 10]
				},
				{
					legend: 'B',
					data: [60, 20.5, 20.2, 22.5, 10, 10, 10, 30, 20]
				},
				{
					legend: 'C',
					data: [6, 10.5, 20.2, 12.5, 1, 23, 17, 91, 0]
				}
			]
		},
		custom: {
			area: {
				type: 'config',
				spline: true
			}
		}
	}),
	code: dedent`
		import { TextStyle, Text, Container, EdgeInsets, Positioned } from '@moonmoonbrothers/flutterjs';
		import { LineChart } from '@moonmoonbrothers/uglychart';
	`
};
