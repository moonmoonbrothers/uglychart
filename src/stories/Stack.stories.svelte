<!-- YourComponent.stories.svelte -->
<script>
  import Widget from '../lib/Widget.svelte'
  import { Meta, Template, Story } from '@storybook/addon-svelte-csf';
  import { Container, Stack, Positioned } from '$lib/flutter/component'
  import { Alignment, } from '$lib/flutter/type'
</script>

<!--👇 The title determines where your story goes in the story list -->
<Meta
  title="Widget/Stack"
  component={Widget}
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
    ssrSize: {width: 600, height: 300},
    width: '600px',
    height: '300px',
    widget: Container({
      color: 'lightgrey',
      alignment: Alignment.center,
      child: Stack({
          children: [
            Container({
              width: 100,
              height: 100,
              color: 'green',
            }),
            Container({
              width: 50,
              height: 50,
              color: 'red',
            }),
          ]
        }
      )
    }),
    description: `
      Stack try to fit maximum child size
    `
  }}
/>

<Story
  name="case2"
  args={{
    ssrSize: {width: 600, height: 300},
    width: '600px',
    height: '300px',
    widget: Container({
      color: 'lightgrey',
      width: Infinity,
      height: Infinity,
      alignment: Alignment.center,
      child: Stack({
          children: [
            Container({
              width: 100,
              height: 100,
              color: 'green',
            }),
            Positioned({
              bottom: 0,
              right: 0,
              child: Container({
                width: 50,
                height: 50,
                color: 'red',
              }),
            })
          ]
        }
      )
    }),
    description: `
      Positioned widget in Stack can decide to its own offset with props: top, left, right, bottom,
      here is red one with bttom: 0, right: 0
    `
  }}
/>