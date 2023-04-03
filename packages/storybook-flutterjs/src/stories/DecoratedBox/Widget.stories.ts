import type { Meta, StoryObj } from '@storybook/svelte';
import Widget from '../../Widget.svelte';
import {
	Container,
	ClipRRect,
	BorderRadius,
	Radius,
	Center,
	DecoratedBox,
	BoxDecoration,
	SizedBox,
	Border,
	Stack,
	BoxShadow,
	Offset
} from '@moonmoonbrothers/flutterjs';
import { dedent } from 'ts-dedent';
import { BorderSide } from '@moonmoonbrothers/flutterjs/src/type/_types/borders';

const meta = {
	title: 'Widget/DecoratedBox',
	component: Widget as any,
	parameters: {
		layout: 'fullscreen'
	}
} satisfies Meta<Widget>;

export default meta;
type Story = StoryObj<typeof meta>;

const BasicCode = dedent`
		Center({
			child: DecoratedBox({
				decoration: new BoxDecoration({ color: 'red' }),
				child: SizedBox({
					width: 200,
					height: 200
				})
			})
		}),
`;
export const Basic: Story = {
	args: {
		ssrSize: { width: 400, height: 400 },
		width: '400px',
		height: '400px',
		widget: Center({
			child: DecoratedBox({
				decoration: new BoxDecoration({ color: 'red' }),
				child: SizedBox({
					width: 200,
					height: 200
				})
			})
		}),
		code:
			dedent`import { SizedBox, Center, BoxDecoration, DecoratedBox } from '@moonmoonbrothers/flutterjs';\n\n\n` +
			BasicCode
	}
};

const CircleCode = dedent`
`;
export const Circle: Story = {
	args: {
		ssrSize: { width: 400, height: 400 },
		width: '400px',
		height: '400px',
		widget: Center({
			child: Stack({
				clipped: false,
				children: [
					Container({
						width: 200,
						height: 200,
						color: 'white'
					}),
					DecoratedBox({
						decoration: new BoxDecoration({ border: Border.all({}), shape: 'circle' }),
						child: SizedBox({
							width: 200,
							height: 200
						})
					})
				]
			})
		}),
		code:
			dedent`import { SizedBox, Center, BoxDecoration, DecoratedBox } from '@moonmoonbrothers/flutterjs';\n\n\n` +
			BasicCode
	}
};

const InnerBorderCode = dedent`
`;
export const InnerBorder: Story = {
	args: {
		ssrSize: { width: 400, height: 400 },
		width: '400px',
		height: '400px',
		widget: Center({
			child: Stack({
				clipped: false,
				children: [
					Container({
						width: 200,
						height: 200,
						color: 'white'
					}),
					DecoratedBox({
						decoration: new BoxDecoration({
							border: Border.all({ width: 20, color: 'green' })
						}),
						child: SizedBox({
							width: 200,
							height: 200
						})
					})
				]
			})
		}),
		code:
			dedent`import { SizedBox, Center, BoxDecoration, DecoratedBox } from '@moonmoonbrothers/flutterjs';\n\n\n` +
			BasicCode
	}
};

const OuterBorderCode = dedent`
`;
export const OuterBorder: Story = {
	args: {
		ssrSize: { width: 400, height: 400 },
		width: '400px',
		height: '400px',
		widget: Center({
			child: Stack({
				clipped: false,
				children: [
					Container({
						width: 200,
						height: 200,
						color: 'white'
					}),
					DecoratedBox({
						decoration: new BoxDecoration({
							border: Border.all({
								width: 20,
								color: 'green',
								strokeAlign: BorderSide.strokeAlignOutside
							})
						}),
						child: SizedBox({
							width: 200,
							height: 200
						})
					})
				]
			})
		}),
		code:
			dedent`import { SizedBox, Center, BoxDecoration, DecoratedBox } from '@moonmoonbrothers/flutterjs';\n\n\n` +
			BasicCode
	}
};

const WithBorderRadiusCode = dedent`
`;
export const WithBorderRadius: Story = {
	args: {
		ssrSize: { width: 400, height: 400 },
		width: '400px',
		height: '400px',
		widget: Center({
			child: Stack({
				clipped: false,
				children: [
					Container({
						width: 200,
						height: 200,
						color: 'white'
					}),
					DecoratedBox({
						decoration: new BoxDecoration({
							border: Border.all({
								width: 20
							}),
							borderRadius: BorderRadius.all(Radius.circular(10))
						}),
						child: SizedBox({
							width: 200,
							height: 200
						})
					})
				]
			})
		}),
		code:
			dedent`import { SizedBox, Center, BoxDecoration, DecoratedBox } from '@moonmoonbrothers/flutterjs';\n\n\n` +
			BasicCode
	}
};

const BorderTopCode = dedent`
`;
export const BorderTop: Story = {
	args: {
		ssrSize: { width: 400, height: 400 },
		width: '400px',
		height: '400px',
		widget: Center({
			child: Stack({
				clipped: false,
				children: [
					Container({
						width: 200,
						height: 200,
						color: 'white'
					}),
					DecoratedBox({
						decoration: new BoxDecoration({
							border: new Border({
								top: new BorderSide({ width: 10, color: 'black' })
							})
						}),
						child: SizedBox({
							width: 200,
							height: 200
						})
					})
				]
			})
		}),
		code:
			dedent`import { SizedBox, Center, BoxDecoration, DecoratedBox } from '@moonmoonbrothers/flutterjs';\n\n\n` +
			BasicCode
	}
};

const UnuniformedBorderCode = dedent`
`;
export const UnUniformBorder: Story = {
	args: {
		ssrSize: { width: 400, height: 400 },
		width: '400px',
		height: '400px',
		widget: Center({
			child: Stack({
				clipped: false,
				children: [
					Container({
						width: 200,
						height: 200,
						color: 'white'
					}),
					DecoratedBox({
						decoration: new BoxDecoration({
							border: new Border({
								top: new BorderSide({ width: 10, color: 'blue' }),
								left: new BorderSide({ width: 5, color: 'green' }),
								right: new BorderSide({ width: 20, color: 'red' }),
								bottom: new BorderSide({ width: 15, color: 'purple' })
							})
						}),
						child: SizedBox({
							width: 200,
							height: 200
						})
					})
				]
			})
		}),
		code:
			dedent`import { SizedBox, Center, BoxDecoration, DecoratedBox } from '@moonmoonbrothers/flutterjs';\n\n\n` +
			BasicCode
	}
};

const WithBoxShadowCode = dedent`
`;
export const WithBoxShadow: Story = {
	args: {
		ssrSize: { width: 400, height: 400 },
		width: '400px',
		height: '400px',
		widget: Center({
			child: Stack({
				clipped: false,
				children: [
					Container({
						width: 200,
						height: 200,
						color: 'white'
					}),
					DecoratedBox({
						decoration: new BoxDecoration({
							color: 'gray',
							boxShadow: [
								new BoxShadow({
									blurRadius: 10,
									offset: new Offset({ x: 10, y: 10 })
								}),
								new BoxShadow({
									blurRadius: 10,
									color: 'blue',
									offset: new Offset({ x: -10, y: -10 })
								})
							]
						}),
						child: SizedBox({
							width: 200,
							height: 200
						})
					})
				]
			})
		}),
		code:
			dedent`import { SizedBox, Center, BoxDecoration, DecoratedBox } from '@moonmoonbrothers/flutterjs';\n\n\n` +
			BasicCode
	}
};
