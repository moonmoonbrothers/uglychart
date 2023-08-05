import {
	Alignment,
	Container,
	GestureDetector,
	Text,
	TextStyle,
	ComponentWidget
} from '@moonmoonbrothers/flutterjs';
import { dedent } from 'ts-dedent';

class SizeChageWidget extends ComponentWidget {
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
				child: Text('click to size up!', {
					style: new TextStyle({ fontSize: 20, fontWeight: 'bold', color: 'white' })
				})
			})
		});
	}
}

const SizeChangeStory = {
	widget: Container({
		alignment: Alignment.center,
		child: new SizeChageWidget()
	}),
	code: dedent`
		`
};

export default SizeChangeStory;
