import { dedent } from 'ts-dedent';
import { Node } from '@moonmoonbrothers/diagram';
import { Container } from '@moonmoonbrothers/flutterjs';

const BasicStory = {
	widget: Node({
		content: Container({
			width: 50,
			height: 100,
			color: 'red'
		}),
		childNodes: [
			Container({
				width: 50,
				height: 100,
				color: 'blue'
			}),
			Container({
				width: 50,
				height: 100,
				color: 'green'
			}),
			Container({
				width: 50,
				height: 100,
				color: 'yellow'
			})
		]
	}),
	code: dedent`
	hi
}`
};

export default BasicStory;
