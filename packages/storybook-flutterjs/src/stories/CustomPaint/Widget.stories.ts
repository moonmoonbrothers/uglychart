import type { Meta, StoryObj } from '@storybook/svelte';
import Widget from '../../Widget.svelte';
import { dedent } from 'ts-dedent';
import {
	Container,
	Align,
	Alignment,
	Row,
	Spacer,
	Center,
	CustomPaint
} from '@moonmoonbrothers/flutterjs';

const meta = {
	title: 'Widget/CustomPaint',
	component: Widget
} satisfies Meta<Widget>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
	args: {
		ssrSize: { width: 400, height: 400 },
		width: '400px',
		height: '400px',
		widget: Center({
			child: CustomPaint()
		}),
		code: dedent`
		`
	}
};
