import type { Meta, StoryObj } from '@storybook/svelte';
import Widget from '../../Widget.svelte';
import { dedent } from 'ts-dedent';
import { AreaChart } from '@moonmoonbrothers/uglychart';

const meta = {
	title: 'Widget/AreaChart/Cases',
	component: Widget
} satisfies Meta<Widget>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
	args: {
		ssrSize: { width: 800, height: 480 },
		width: '800px',
		height: '480px',
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
						legend: 'Legend 1',
						data: [30, 40.5, 50.12, 30.5, 40, 90, 50, 20, 10]
					},
					{
						legend: 'Legend 2',
						data: [60, 20.5, 20.2, 22.5, 10, 10, 10, 30, 20]
					},
					{
						legend: 'Legend 3',
						data: [6, 10.5, 20.2, 12.5, 1, 23, 17, 91, 0, 21]
					}
				]
			}
		}),
		code: dedent`
		import { TextStyle, Text, Container, EdgeInsets, Positioned } from '@moonmoonbrothers/flutterjs';
		import { AreaChart } from '@moonmoonbrothers/uglychart';
	`
	}
};
