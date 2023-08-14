import type { Meta, StoryObj } from '@storybook/svelte';
import Widget from '../../Widget.svelte';
import { dedent } from 'ts-dedent';
import { BubbleChart } from '@moonmoonbrothers/uglychart';

const meta = {
	title: 'Widget/BubbleChart/Cases',
	component: Widget
} satisfies Meta<Widget>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Bubble: Story = {
	args: {
		ssrSize: { width: 740, height: 420 },
		width: '740px',
		height: '420px',
		widget: BubbleChart({
			theme: {
				border: {
					width: 1
				}
			},
			scale: {
				x: {
					min: 0,
					step: 5000
				},
				y: {
					min: 55,
					step: 5
				}
			},
			data: {
				title: 'Title',
				datasets: [
					{
						legend: 'Africa',
						data: [
							{ x: 4200, y: 70.35, value: 32209101, label: 'Morocco' },
							{ x: 4200, y: 70.71, value: 76117421, label: 'Egypt' },
							{ x: 5900, y: 56.46, value: 1355246, label: 'Gabon' },
							{ x: 6600, y: 72.74, value: 32129324, label: 'Algeria' },
							{ x: 6700, y: 76.28, value: 5631585, label: 'Libya' },
							{ x: 7100, y: 74.66, value: 9974722, label: 'Tunisia' },
							{ x: 10500, y: 69.28, value: 1096585, label: 'Trinidad and Tobago' },
							{ x: 12800, y: 72.09, value: 1220481, label: 'Mauritius' },
							{ x: 18200, y: 78.68, value: 396851, label: 'Malta' }
						]
					},
					{
						legend: 'America',
						data: [
							{ x: 4800, y: 74.64, value: 6191368, label: 'Paraguay' },
							{ x: 4900, y: 70.92, value: 6587541, label: 'El Salvador' },
							{ x: 5600, y: 69.22, value: 2754430, label: 'Peru' },
							{ x: 5800, y: 74.06, value: 2501738, label: 'Venezuela' },
							{ x: 6300, y: 67.63, value: 8833634, label: 'Dominican Republic' },
							{ x: 6500, y: 67.43, value: 272945, label: 'Belize' },
							{ x: 6600, y: 71.43, value: 4231077, label: 'Colombia' },
							{ x: 6900, y: 72.14, value: 3000463, label: 'Panama' },
							{ x: 8100, y: 71.41, value: 78410118, label: 'Brazil' },
							{ x: 9600, y: 76.63, value: 3956507, label: 'Costa Rica' },
							{ x: 9600, y: 74.94, value: 4495959, label: 'Mexico' },
							{ x: 12400, y: 75.7, value: 6914475, label: 'Argentina' },
							{ x: 14500, y: 75.92, value: 3399237, label: 'Uruguay' },
							{ x: 16400, y: 71.64, value: 278289, label: 'Barbados' },
							{ x: 17700, y: 65.63, value: 299697, label: 'Bahamas, The' },
							{ x: 17700, y: 77.49, value: 3897960, label: 'Puerto Rico' },
							{ x: 31500, y: 79.96, value: 32507874, label: 'Canada' },
							{ x: 32100, y: 77.43, value: 89302754, label: 'United States' }
						]
					},
					{
						legend: 'Asia',
						data: [
							{ x: 5600, y: 71.96, value: 92988000, label: 'China' },
							{ x: 5700, y: 61.29, value: 4863169, label: 'Turkmenistan' },
							{ x: 7700, y: 69.66, value: 19018924, label: 'Iran' },
							{ x: 7800, y: 66.07, value: 1514370, label: 'Kazakhstan' },
							{ x: 8100, y: 71.41, value: 14865523, label: 'Thailand' },
							{ x: 9700, y: 71.95, value: 23522482, label: 'Malaysia' },
							{ x: 12000, y: 75.23, value: 25795938, label: 'Saudi Arabia' },
							{ x: 13100, y: 72.85, value: 2903165, label: 'Oman' },
							{ x: 19200, y: 75.58, value: 48598170, label: 'Korea, South' },
							{ x: 19200, y: 73.98, value: 677886, label: 'Bahrain' },
							{ x: 20800, y: 79.17, value: 6199008, label: 'Israel' },
							{ x: 21300, y: 76.84, value: 2257549, label: 'Kuwait' },
							{ x: 23200, y: 73.4, value: 840290, label: 'Qatar' },
							{ x: 25200, y: 74.99, value: 2523915, label: 'United Arab Emirates' },
							{ x: 25300, y: 77.06, value: 22749838, label: 'Taiwan' },
							{ x: 27800, y: 81.53, value: 4353893, label: 'Singapore' },
							{ x: 29400, y: 81.04, value: 52733300, label: 'Japan' },
							{ x: 34200, y: 81.39, value: 6855125, label: 'Hong Kong' }
						]
					},
					{
						legend: 'Europe',
						data: [
							{ x: 7700, y: 71.12, value: 2235555, label: 'Romania' },
							{ x: 8200, y: 71.75, value: 7517973, label: 'Bulgaria' },
							{ x: 9800, y: 66.39, value: 54378233, label: 'Russia' },
							{ x: 10700, y: 76.38, value: 1582395, label: 'Chile' },
							{ x: 11200, y: 74.14, value: 4496869, label: 'Croatia' },
							{ x: 11500, y: 70.86, value: 2306306, label: 'Latvia' },
							{ x: 12000, y: 74.16, value: 38626349, label: 'Poland' },
							{ x: 12500, y: 73.46, value: 3607899, label: 'Lithuania' },
							{ x: 14300, y: 71.38, value: 1341664, label: 'Estonia' },
							{ x: 14500, y: 74.19, value: 5423567, label: 'Slovakia' },
							{ x: 14900, y: 72.25, value: 1003237, label: 'Hungary' },
							{ x: 16800, y: 75.78, value: 1024617, label: 'Czech Republic' },
							{ x: 17900, y: 77.35, value: 1052414, label: 'Portugal' },
							{ x: 19600, y: 75.93, value: 2011473, label: 'Slovenia' },
							{ x: 21300, y: 78.94, value: 10647529, label: 'Greece' },
							{ x: 23300, y: 79.37, value: 40280780, label: 'Spain' },
							{ x: 27700, y: 79.54, value: 58057477, label: 'Italy' },
							{ x: 28400, y: 80.3, value: 898640, label: 'Sweden' },
							{ x: 28700, y: 78.54, value: 22424609, label: 'Germany' },
							{ x: 28700, y: 79.44, value: 30424213, label: 'France' },
							{ x: 29000, y: 78.24, value: 5214512, label: 'Finland' },
							{ x: 29500, y: 78.68, value: 16318199, label: 'Netherlands' },
							{ x: 29600, y: 78.27, value: 60270708, label: 'United Kingdom' },
							{ x: 30600, y: 78.44, value: 10348276, label: 'Belgium' },
							{ x: 31300, y: 78.87, value: 8174762, label: 'Austria' },
							{ x: 31900, y: 77.36, value: 3969558, label: 'Ireland' },
							{ x: 31900, y: 80.18, value: 293966, label: 'Iceland' },
							{ x: 32200, y: 77.44, value: 5413392, label: 'Denmark' },
							{ x: 33800, y: 80.31, value: 7450867, label: 'Switzerland' }
						]
					},
					{
						legend: 'Oceania',
						data: [
							{ x: 2200, y: 64.56, value: 5420280, label: 'Papua New Guinea' },
							{ x: 2700, y: 61.32, value: 100798, label: 'Kiribati' },
							{ x: 5900, y: 69.2, value: 880874, label: 'Fiji' },
							{ x: 14500, y: 78.75, value: 108775, label: 'Virgin Islands' },
							{ x: 23200, y: 78.49, value: 1993817, label: 'New Zealand' },
							{ x: 30700, y: 80.26, value: 5991314, label: 'Australia' }
						]
					}
				]
			}
		}),
		code: dedent`
		import { TextStyle, Text, Container, EdgeInsets, Positioned } from '@moonmoonbrothers/flutterjs';
		import { BubbleChart } from '@moonmoonbrothers/uglychart';
	`
	}
};
