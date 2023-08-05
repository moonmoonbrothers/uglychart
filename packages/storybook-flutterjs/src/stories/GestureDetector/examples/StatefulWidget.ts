import {
	Alignment,
	Container,
	GestureDetector,
	Text,
	TextStyle,
	ComponentWidget,
	Column,
	MainAxisSize,
	StatelessElement,
	StatelessWidget,
	Widget,
	BuildContext,
	Stack,
	Positioned
} from '@moonmoonbrothers/flutterjs';
import { dedent } from 'ts-dedent';

class SizeChageWidget extends ComponentWidget {
	count = 0;
	constructor({ count }: { count: number }) {
		super();
		this.count = count;
	}
	index = 0;
	width = 200;
	height = 200;
	build() {
		const handleClick = () => {
			this.width = this.width + 10;
			this.height = this.height + 10;
			console.log('set state called!');
			this.setState();
		};
		return GestureDetector({
			onClick() {
				handleClick();
			},
			child: Container({
				width: this.width,
				height: this.height,
				color: 'black',
				alignment: Alignment.center,
				child: Column({
					mainAxisSize: MainAxisSize.min,
					children: [
						Text(`count: ${this.count}`, {
							style: new TextStyle({ fontSize: 20, fontWeight: 'bold', color: 'yellow' })
						}),
						Text('click to size up!', {
							style: new TextStyle({ fontSize: 20, fontWeight: 'bold', color: 'white' })
						})
					]
				})
			})
		});
	}
}

class CounterWidget extends StatelessWidget {
	count = 0;

	build(context: BuildContext): Widget {
		return Stack({
			children: [
				Positioned({
					right: 0,
					top: -30,
					child: GestureDetector({
						onClick: () => {
							this.setState(() => {
								this.count += 1;
							});
						},
						child: Container({
							color: 'white',
							child: Text('increse', {
								style: new TextStyle({ fontSize: 20 })
							})
						})
					})
				}),
				new SizeChageWidget({ count: this.count })
			]
		});
	}
}

const SizeChangeStory = {
	widget: Container({
		alignment: Alignment.center,
		child: new CounterWidget()
	}),
	code: dedent`
		`
};

export default SizeChangeStory;
