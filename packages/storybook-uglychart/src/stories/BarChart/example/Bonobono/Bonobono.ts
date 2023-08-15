import { dedent } from 'ts-dedent';
import {
	CustomPaint,
	Size,
	Opacity,
	Container,
	Alignment,
	StatefulWidget,
	State,
	AnimationController,
	Widget,
	Transform,
	GestureDetector,
	Positioned
} from '@moonmoonbrothers/flutterjs';
import Assets from './assets';
import { BarChart } from '@moonmoonbrothers/uglychart';

class AnimatedBonono extends StatefulWidget {
	createState(): State<StatefulWidget> {
		return new AnimatedBononoState();
	}
}

class AnimatedBononoState extends State<AnimatedBonono> {
	animationController = new AnimationController({
		duration: 3000
	});

	initState(): void {
		this.animationController.addListener(() => {
			this.setState();
		});
	}

	build(): Widget {
		return Transform.rotate({
			angle: Math.PI * 2 * this.animationController.value,
			child: GestureDetector({
				onClick: () => {
					if (this.animationController.isAnimating) {
						this.animationController.stop();
					} else {
						this.animationController.repeat();
					}
				},
				child: CustomPaint({
					size: Size.infinite,
					painter: {
						createDefaultSvgEl(context) {
							return {
								image: context.createSvgEl('image')
							};
						},
						paint({ image }, size) {
							image.setAttribute('width', `${size.width}`);
							image.setAttribute('height', `${size.height}`);
							image.setAttribute('href', Assets.bonobono);
						}
					}
				})
			})
		});
	}
}

const Bonobono = {
	widget: BarChart({
		data: {
			title: 'Title',
			labels: ['label1', 'label2', 'label3', 'label4', 'label5'],
			datasets: [
				{
					legend: 'A',
					data: [30, 40.5, 50.12, 30.5, 40]
				},
				{
					legend: 'B',
					data: [60, 20.5, 20.2, 22.5, 10]
				},
				{
					legend: 'C',
					data: [6, 10.5, 20.2, 12.5, 1]
				}
			]
		},
		custom: {
			plot: {
				type: 'config',
				backgroundAdditions: [
					Positioned({
						//you can specify position relative to plot component
						//top: 0,
						//left: 0,
						child: Opacity({
							opacity: 0.7,
							child: Container({
								alignment: Alignment.center,
								child: new AnimatedBonono()
							})
						})
					})
				]
			}
		}
	}),
	code: dedent`
import {
	CustomPaint,
	Size,
	Opacity,
	Container,
	Alignment,
	StatefulWidget,
	State,
	AnimationController,
	Widget,
	Transform,
	GestureDetector,
	Positioned
} from '@moonmoonbrothers/flutterjs';
import Assets from './assets';
import { BarChart } from '@moonmoonbrothers/uglychart';

BarChart({
	data: {
		title: 'Title',
		labels: ['label1', 'label2', 'label3', 'label4', 'label5'],
		datasets: [
			{
				legend: 'A',
				data: [30, 40.5, 50.12, 30.5, 40]
			},
			{
				legend: 'B',
				data: [60, 20.5, 20.2, 22.5, 10]
			},
			{
				legend: 'C',
				data: [6, 10.5, 20.2, 12.5, 1]
			}
		]
	},
	custom: {
		plot: {
			type: 'config',
			backgroundAdditions: [
				Positioned({
					//you can specify position relative to plot component
					//top: 0,
					//left: 0,
					child: Opacity({
						opacity: 0.7,
						child: Container({
							alignment: Alignment.center,
							child: new AnimatedBonono()
						})
					})
				})
			]
		}
	}

class AnimatedBonono extends StatefulWidget {
createState(): State<StatefulWidget> {
	return new AnimatedBononoState();
}
}

class AnimatedBononoState extends State<AnimatedBonono> {
	animationController = new AnimationController({
		duration: 3000
	});

	initState(): void {
		this.animationController.addListener(() => {
			this.setState();
		});
	}

	build(): Widget {
		return Transform.rotate({
			angle: Math.PI * 2 * this.animationController.value,
			child: GestureDetector({
				onClick: () => {
					if (this.animationController.isAnimating) {
						this.animationController.stop();
					} else {
						this.animationController.repeat();
					}
				},
				child: CustomPaint({
					size: Size.infinite,
					painter: {
						createDefaultSvgEl(context) {
							return {
								image: context.createSvgEl('image')
							};
						},
						paint({ image }, size) {
							image.setAttribute('width', \`$\{size.width}\`);
							image.setAttribute('height', \`$\{size.height}\`);
							image.setAttribute('href', Assets.bonobono);
						}
					}
				})
			})
		});
	}
}
	`
};

export default Bonobono;
