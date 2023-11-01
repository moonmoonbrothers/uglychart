import { dedent } from 'ts-dedent';

export default dedent`
import { Container, Alignment } from '@moonmoonbrothers/flutterjs';
import Widget from '@moonmoonbrothers/flutterjs-svelte';

const App = () => {

  return(
    <Widget
      width="600px"
      height="300px"
      widget={Container({
        alignment: Alignment.center,
        color: 'lightblue',
        child: Text("Hello, FlutterJS!", style: TextStyle({ fontSize: 30, weight: 'bold' })
      })}
    />
  )
}
`;
