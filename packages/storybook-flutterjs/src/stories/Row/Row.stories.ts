import type { Meta, StoryObj } from '@storybook/svelte';
import Widget from '../../Widget.svelte';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Row, Container, Flexible } from '@moonmoonbrothers/flutterjs';
import { dedent } from 'ts-dedent';
const ImportWidgetCode = dedent` import { Row, Container, Flexible } from '@moonmoonbrothers/flutterjs';
\n\n`;

const meta = {
	title: 'Widget/Row',
	component: Widget,
	tags: ['autodocs'],
	parameters: {
		docs: {
			description: {
				component: dedent`
				This is **Row** widget. 
				This widget motivated by Row in Flutter.
				
				>A widget that displays its children in a horizontal array.
				To cause a child to expand to fill the available horizontal space, wrap the child in an Expanded widget.
				The Row widget does not scroll (and in general it is considered an error to have more children in a Row than will fit in the available room). If you have a line of widgets and want them to be able to scroll if there is insufficient room, consider using a ListView.
				For a vertical variant, see Column.
				If you only have one child, then consider using Align or Center to position the child.

				See: https://api.flutter.dev/flutter/widgets/Row-class.html

				## Props
				### mainAxisAlignment 
				**Value: center | start | end | spaceBetween | spaceEven | spaceAround** (default: **start**)

				This prop defines the **horizontal** display of its children.

				### crossAxisAlignment
				**Value: stretch | start | center | end** (default: **center**)

				This prop defines the **vertical** display of its children.

				### children
				**value**: **Widget[]**
				`
			}
		}
	}
} satisfies Meta<Widget>;

export default meta;
type Story = StoryObj<typeof meta>;

const Case1Code = dedent`
	widget: Container({
		color: 'lightblue',
		child: Row({
			children: [
				Container({
					width: 50,
					height: 50,
					color: 'red'
				}),
				Container({
					width: 50,
					height: 100,
					color: 'blue'
				}),
				Container({
					width: 50,
					height: 50,
					color: 'green'
				})
			]
		})
	})
`;
export const Case1: Story = {
	args: {
		ssrSize: { width: 600, height: 300 },
		width: '600px',
		height: '300px',
		widget: eval(Case1Code),
		code: ImportWidgetCode + Case1Code
	}
};

const Case2Code = dedent`
	widget: Container({
		color: 'lightblue',
		child: Row({
			mainAxisAlignment: 'end',
			children: [
				Container({
					width: 50,
					height: 50,
					color: 'red'
				}),
				Container({
					width: 50,
					height: 50,
					color: 'blue'
				}),
				Container({
					width: 50,
					height: 50,
					color: 'green'
				})
			]
		})
	})
`;
export const Case2: Story = {
	args: {
		ssrSize: { width: 600, height: 300 },
		width: '600px',
		height: '300px',
		widget: eval(Case2Code),
		code: ImportWidgetCode + Case2Code
	}
};

const Case3Code = dedent`
	widget: Container({
		color: 'lightblue',
		child: Row({
			mainAxisAlignment: 'spaceBetween',
			children: [
				Container({
					width: 50,
					height: 50,
					color: 'red'
				}),
				Container({
					width: 50,
					height: 50,
					color: 'blue'
				}),
				Container({
					width: 50,
					height: 50,
					color: 'green'
				})
			]
		})
	})
`;

export const Case3: Story = {
	args: {
		ssrSize: { width: 600, height: 300 },
		width: '600px',
		height: '300px',
		widget: eval(Case3Code),
		code: ImportWidgetCode + Case3Code
	}
};

const Case4Code = dedent`
	widget: Container({
		color: 'lightblue',
		child: Row({
			mainAxisAlignment: 'spaceEvenly',
			children: [
				Container({
					width: 50,
					height: 50,
					color: 'red'
				}),
				Container({
					width: 50,
					height: 50,
					color: 'blue'
				}),
				Container({
					width: 50,
					height: 50,
					color: 'green'
				})
			]
		})
	})
`;

export const Case4: Story = {
	args: {
		ssrSize: { width: 600, height: 300 },
		width: '600px',
		height: '300px',
		widget: eval(Case4Code),
		code: ImportWidgetCode + Case4Code
	}
};

const Case5Code = dedent`
	widget: Container({
		color: 'lightblue',
		child: Row({
			mainAxisAlignment: 'spaceAround',
			children: [
				Container({
					width: 50,
					height: 50,
					color: 'red'
				}),
				Container({
					width: 50,
					height: 50,
					color: 'blue'
				}),
				Container({
					width: 50,
					height: 50,
					color: 'green'
				})
			]
		})
	})
`;

export const Case5: Story = {
	args: {
		ssrSize: { width: 600, height: 300 },
		width: '600px',
		height: '300px',
		widget: eval(Case5Code),
		code: ImportWidgetCode + Case5Code
	}
};

const Case6Code = dedent`
	widget: Container({
		color: 'lightblue',
		child: Row({
			mainAxisAlignment: 'spaceBetween',
			crossAxisAlignment: 'center',
			children: [
				Container({
					width: 50,
					height: 50,
					color: 'red'
				}),
				Container({
					width: 50,
					height: 100,
					color: 'blue'
				}),
				Container({
					width: 50,
					height: 50,
					color: 'green'
				})
			]
		})
	})
`;

export const Case6: Story = {
	args: {
		ssrSize: { width: 600, height: 300 },
		width: '600px',
		height: '300px',
		widget: eval(Case6Code),
		code: ImportWidgetCode + Case6Code
	}
};

const Case7Code = dedent`
	widget: Container({
		color: 'lightblue',
		child: Row({
			mainAxisAlignment: 'spaceBetween',
			crossAxisAlignment: 'start',
			children: [
				Container({
					width: 50,
					height: 50,
					color: 'red'
				}),
				Container({
					width: 50,
					height: 100,
					color: 'blue'
				}),
				Container({
					width: 50,
					height: 50,
					color: 'green'
				})
			]
		})
	})
`;

export const Case7: Story = {
	args: {
		ssrSize: { width: 600, height: 300 },
		width: '600px',
		height: '300px',
		widget: eval(Case7Code),
		code: ImportWidgetCode + Case7Code
	}
};

const Case8Code = dedent`
	widget: Container({
		color: 'lightblue',
		child: Row({
			mainAxisAlignment: 'spaceBetween',
			crossAxisAlignment: 'end',
			children: [
				Container({
					width: 50,
					height: 50,
					color: 'red'
				}),
				Container({
					width: 50,
					height: 100,
					color: 'blue'
				}),
				Container({
					width: 50,
					height: 50,
					color: 'green'
				})
			]
		})
	})
`;

export const Case8: Story = {
	args: {
		ssrSize: { width: 600, height: 300 },
		width: '600px',
		height: '300px',
		widget: eval(Case8Code),
		code: ImportWidgetCode + Case8Code
	}
};

const Case9Code = dedent`
	widget: Container({
		color: 'lightblue',
		child: Row({
			mainAxisAlignment: 'spaceBetween',
			crossAxisAlignment: 'stretch',
			children: [
				Container({
					width: 50,
					height: 50,
					color: 'red'
				}),
				Container({
					width: 50,
					height: 100,
					color: 'blue'
				}),
				Container({
					width: 50,
					height: 50,
					color: 'green'
				})
			]
		})
	})
`;

export const Case9: Story = {
	args: {
		ssrSize: { width: 600, height: 300 },
		width: '600px',
		height: '300px',
		widget: eval(Case9Code),
		code: ImportWidgetCode + Case9Code
	}
};

const Case10Code = dedent`
	widget: Container({
		color: 'lightblue',
		child: Row({
			children: [
				Flexible({
					child: Container({
						width: 50,
						height: 50,
						color: 'red'
					})
				}),
				Flexible({
					child: Container({
						width: 50,
						height: 50,
						color: 'blue'
					})
				})
			]
		})
	})
`;

export const Case10: Story = {
	args: {
		ssrSize: { width: 600, height: 300 },
		width: '600px',
		height: '300px',
		widget: eval(Case10Code),
		code: ImportWidgetCode + Case10Code
	}
};
