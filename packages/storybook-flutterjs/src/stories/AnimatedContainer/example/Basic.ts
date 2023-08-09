import { dedent } from 'ts-dedent';
import {
	StatefulWidget,
	State,
	Center,
	GestureDetector,
	Widget,
	Text,
	TextStyle,
	AnimatedContainer,
	BoxDecoration,
	Border,
	BorderRadius,
	Radius,
	Alignment
} from '@moonmoonbrothers/flutterjs';

class CustomWidget extends StatefulWidget {
	createState(): State<StatefulWidget> {
		return new CustomWidgetState();
	}
}

class CustomWidgetState extends State<CustomWidget> {
	index = 0;
	props = [
		{
			width: 100,
			height: 100,
			decoration: new BoxDecoration({
				color: 'yellow',
				border: Border.all({ color: 'black', width: 10 }),
				borderRadius: BorderRadius.all(Radius.circular(10))
			})
		},
		{
			width: 200,
			height: 200,
			decoration: new BoxDecoration({
				color: 'red',
				border: Border.all({ color: 'gray', width: 20 }),
				borderRadius: BorderRadius.all(Radius.circular(20))
			})
		}
	];
	build(): Widget {
		return Center({
			child: GestureDetector({
				onClick: () => {
					this.setState(() => {
						this.index = (this.index + 1) % this.props.length;
					});
				},
				child: AnimatedContainer({
					duration: 1000,
					child: Text('Tab me', {
						style: new TextStyle({ fontSize: 16 })
					}),
					...this.props[this.index],
					alignment: Alignment.center
				})
			})
		});
	}
}

const BasicStory = {
	widget: new CustomWidget(),
	code: dedent`
import {
	StatefulWidget,
	State,
	Center,
	GestureDetector,
	Container,
	Widget,
	Alignment,
	Text,
	TextStyle,
	Offset,
	AnimatedSlide
} from '@moonmoonbrothers/flutterjs';

class CustomWidget extends StatefulWidget {
	createState(): State<StatefulWidget> {
		return new CustomWidgetState();
	}
}

class CustomWidgetState extends State<CustomWidget> {
	clicked = false;
	build(): Widget {
		return Center({
			child: AnimatedSlide({
				offset: this.clicked ? new Offset({ x: 1, y: 1 }) : new Offset({ x: 0, y: 0 }),
				duration: 1000,
				child: GestureDetector({
					onClick: () => {
						this.setState(() => {
							this.clicked = !this.clicked;
						});
					},
					child: Container({
						width: 100,
						height: 100,
						color: 'yellow',
						alignment: Alignment.center,
						child: Text('Tab me', {
							style: new TextStyle({ fontSize: 16 })
						})
					})
				})
			})
		});
	}
}
`
};

export default BasicStory;
