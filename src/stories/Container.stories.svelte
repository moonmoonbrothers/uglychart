<!-- YourComponent.stories.svelte -->
<script>
  import Widget from '../lib/Widget.svelte'
  import { Meta, Template, Story } from '@storybook/addon-svelte-csf';
  import { Container, Text } from '$lib/flutter/component'
  import { Alignment, EdgeInsets } from '$lib/flutter/type'
</script>

<!--👇 The title determines where your story goes in the story list -->
<Meta
  title="Widget/Container"
  component={Widget}
  parameters={{
    chromatic: { delay: 300 }
  }}
/>

<Template let:args>
  <Widget {...args} />
  <p style="width: 600px;">
    {args.description || ''}
  </p>
</Template>

<Story
  name="case1"
  args={{
    width: '600px',
    height: '300px',
    widget: Container({
      color: 'lightblue',
    }),
    description: 'if container has no child, it would be stretched as possibe as it can be'
  }}
/>

<Story
  name="case2"
  args={{
    width: '600px',
    height: '300px',
    widget: Container({
      color: 'lightblue',
      child: Text('text', {style: {fontSize: '30px'}})
    }),
    description: 'if container has child, it would be shirinked in order to fit child'
  }}
/>

<Story
  name="case3"
  args={{
    width: '600px',
    height: '300px',
    widget: Container({
      color: 'lightblue',
      width: 300,
      height: 300,
      padding: EdgeInsets.all(10),
      child: Container({
        color: 'green',
        child: Text('child in blue container')
      })
    }),
    description: `if container has width and height, 
    it pass tight constraint that means any child in this component would be stretched as possible as it can be`
  }}
/>

<Story
  name="case4"
  args={{
    width: '600px',
    height: '300px',
    widget: Container({
      color: 'lightblue',
      width: 300,
      height: 300,
      padding: EdgeInsets.all(10),
      alignment: Alignment.center,
      child: Container({
        color: 'green',
        child: Text('child')
      })
    }),
    description: `although the container is in tight constraint(including that it have own width and height), 
   containter with alignment loosen constraint. so child dont have to be expanded`
  }}
/>