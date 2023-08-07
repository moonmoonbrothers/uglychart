import {
	StatefulWidget,
	State,
	Alignment,
	Widget,
	Stack,
	Positioned,
	GestureDetector,
	AnimatedAlign,
	Text,
	Container
} from '@moonmoonbrothers/flutterjs';

export default class CustomWidget extends StatefulWidget {
	createState(): State<StatefulWidget> {
		return new CustomWidgetState();
	}
}

class CustomWidgetState extends State<CustomWidget> {
	alignements = [
		Alignment.topLeft,
		Alignment.topRight,
		Alignment.bottomRight,
		Alignment.bottomLeft
	];
	index = 0;
	build(): Widget {
		return Stack({
			alignment: Alignment.center,
			children: [
				Positioned({
					child: GestureDetector({
						child: Text('hil'),
						onClick: () => {
							// this.setState(() => {
							// 	this.index = (this.index + 1) % this.alignements.length;
							// });
						}
					})
				}),
				AnimatedAlign({
					alignment: this.alignements[this.index],
					duration: 300,
					child: Container({
						width: 50,
						height: 50,
						color: 'green'
					})
				})
			]
		});
	}
}
