import {
	Container,
	GestureDetector,
	Positioned,
	Size,
	SizedBox,
	Stack,
	State,
	StatefulWidget,
	Text
} from '@moonmoonbrothers/flutterjs';

class DomOrderTestWidget extends StatefulWidget {
	createState() {
		return new DomOrderTestWidgetState();
	}
}

class DomOrderTestWidgetState extends State<DomOrderTestWidget> {
	visible = true;

	handleClick() {
		this.setState(() => {
			this.visible = !this.visible;
			console.log(this.visible);
		});
	}

	build() {
		return Stack({
			children: [
				Positioned({
					right: 0,
					top: 0,
					child: GestureDetector({
						onClick: () => {
							this.handleClick();
						},
						child: Container({
							color: 'green',
							child: Text('click')
						})
					})
				}),
				Positioned({
					top: 0,
					left: 0,
					child: this.visible
						? Container({
								width: 100,
								height: 100,
								color: 'red'
						  })
						: SizedBox.shrink()
				}),
				Positioned({
					top: 0,
					left: 50,
					child: Container({
						width: 100,
						height: 100,
						color: 'blue'
					})
				})
			]
		});
	}
}

export default () => new DomOrderTestWidget();
