import {
	Alignment,
	Container,
	GestureDetector,
	Text,
	TextStyle,
	ComponentWidget
} from '@moonmoonbrothers/flutterjs';
import { dedent } from 'ts-dedent';

class CustomWidget extends ComponentWidget {
	colors: string[];
	index = 0;
	constructor({ colors, key }: { colors: string[]; key?: string }) {
		super(key);
		this.colors = colors;
	}
	handleClick = () => {
		this.index = (this.index + 1) % this.colors.length;
		this.setState();
	};
	build() {
		return GestureDetector({
			onClick: () => {
				this.handleClick();
			},
			child: Container({
				width: 200,
				height: 200,
				color: this.colors[this.index],
				alignment: Alignment.center,
				child: Text('click here!!', {
					style: new TextStyle({ fontSize: 20, fontWeight: 'bold', color: 'white' })
				})
			})
		});
	}
}

const ColorChangeStory = {
	widget: Container({
		alignment: Alignment.center,
		color: 'lightgreen',
		child: new CustomWidget({
			colors: ['black', 'red', 'green']
		})
	}),
	code: dedent`
		`
};

export default ColorChangeStory;
