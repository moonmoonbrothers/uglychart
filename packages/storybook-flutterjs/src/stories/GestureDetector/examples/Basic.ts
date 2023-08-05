import {
	Alignment,
	Container,
	GestureDetector,
	Text,
	TextStyle
} from '@moonmoonbrothers/flutterjs';
import { dedent } from 'ts-dedent';

const Basic = {
	widget: Container({
		alignment: Alignment.center,
		color: 'lightgreen',
		child: GestureDetector({
			onClick() {
				alert('clicked!!');
			},
			child: Container({
				width: 200,
				height: 200,
				color: 'black',
				alignment: Alignment.center,
				child: Text('click here!!', {
					style: new TextStyle({ fontSize: 20, fontWeight: 'bold', color: 'white' })
				})
			})
		})
	}),
	code: dedent`
		import { Container, GestureDetector, Alignment, TextStyle, Text } from '@moonmoonbrothers/flutterjs';
			
		Container({
			alignment: Alignment.center,
			color: 'lightgreen',
			child: GestureDetector({
				onClick() {
					console.log('clicked!!');
				},
				child: Container({
					width: 200,
					height: 200,
					color: 'black',
					child: Text('click here!!', {
						style: new TextStyle({ fontSize: 20, fontWeight: 'bold', color: 'white' })
					})
				})
			})
		})`
};

export default Basic;
