import { dedent } from 'ts-dedent';
import { Diagram, Node } from '@moonmoonbrothers/diagram';
import { Container } from '@moonmoonbrothers/flutterjs';

const child4 = Node(
	Container({
		width: 300,
		height: 50,
		color: 'black'
	})
);
const child5 = Node(
	Container({
		width: 30,
		height: 80,
		color: 'orange'
	})
);
const child6 = Node(
	Container({
		width: 60,
		height: 80,
		color: 'gray'
	})
);
const child7 = Node(
	Container({
		width: 30,
		height: 80,
		color: 'purple'
	})
);
const child1 = Node(
	Container({
		width: 70,
		height: 50,
		color: 'blue'
	})
);

const child2 = Node(
	Container({
		width: 50,
		height: 150,
		color: 'green'
	})
);
const child3 = Node(
	Container({
		width: 30,
		height: 100,
		color: 'yellow'
	})
);
const node = Node(
	Container({
		width: 50,
		height: 100,
		color: 'red'
	})
)
	.addChildNode(child1)
	.addChildNode(child2)
	.addChildNode(child3);
child1.addChildNode(child4);
child1.addChildNode(child5);
child3.addChildNode(child6);
child6.addChildNode(child7);

const BasicStory = {
	widget: Diagram({ node }),
	code: dedent`
	hi
}`
};

export default BasicStory;
