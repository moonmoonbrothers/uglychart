import type { Meta, StoryObj } from '@storybook/svelte';
import Widget from '../../Widget.svelte';
import { dedent } from 'ts-dedent';
import { TextStyle, Text, Container, EdgeInsets, Positioned } from '@moonmoonbrothers/flutterjs';
import { LineChart } from '@moonmoonbrothers/uglychart';

const meta = {
	title: 'Widget/LineChart/Cases',
	component: Widget
} satisfies Meta<Widget>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
	args: {
		ssrSize: { width: 800, height: 480 },
		width: '800px',
		height: '480px',
		widget: LineChart({
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
						data: [6, 10.5, 20.2, 12.5, 1, 23, 17, 91, 0, 21]
					}
				]
			},
			custom: {
				series: {
					type: 'config'
				},
				chart: {
					type: 'config',
					foregroundAdditions: [
						Positioned({
							bottom: -20,
							right: -15,
							child: Text('%ile')
						}),
						Positioned({
							bottom: -25,
							left: 20,
							child: Container({
								color: 'black',
								padding: EdgeInsets.symmetric({ horizontal: 2, vertical: 4 }),
								child: Text('made by moon', {
									style: new TextStyle({ fontSize: 12, color: 'white' })
								})
							})
						})
					]
				},
				title: {
					type: 'config',
					alignment: 'center',
					font: {
						fontSize: 40
					}
				}
			}
		}),
		code: dedent`
		import { TextStyle, Text, Container, EdgeInsets, Positioned } from '@moonmoonbrothers/flutterjs';
		import { LineChart } from '@moonmoonbrothers/uglychart';
	`
	}
};
