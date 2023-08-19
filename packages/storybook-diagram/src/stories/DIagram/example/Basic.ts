import { dedent } from 'ts-dedent';
import { Node } from '@moonmoonbrothers/diagram';

const BasicStory = {
	widget: Node({
		children: []
	}),
	code: dedent`
	hi
}`
};

export default BasicStory;
