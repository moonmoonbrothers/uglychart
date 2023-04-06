import type { Meta, StoryObj } from '@storybook/svelte';
import Widget from '../../Widget.svelte';
import { dedent } from 'ts-dedent';
import { Container, Center, RichText, TextSpan, TextAlign } from '@moonmoonbrothers/flutterjs';

const meta = {
	title: 'Widget/RichText',
	component: Widget
} satisfies Meta<Widget>;

export default meta;
type Story = StoryObj<typeof meta>;

const BasicWidget = dedent`
	Center({
		child: Container({
			width: 200,
			height: 200,
			color: 'orange'
		})
	})
`;

export const Basic: Story = {
	args: {
		ssrSize: { width: 600, height: 300 },
		width: '600px',
		height: '300px',
		code:
			dedent`import { Container, Center } from '@moonmoonbrothers/flutterjs'\n\n\n` + BasicWidget,
		widget: Center({
			child: Container({
				color: 'orange',
				width: 100,
				child: RichText({
					textAlign: TextAlign.end,
					text: new TextSpan({
						text: 'Hello AAA asdfalksdf AAA'
					})
				})
			})
		})
	}
};
