<!-- YourComponent.stories.svelte -->
<script>
  import Widget from '../lib/Widget.svelte'
  import { Meta, Template, Story } from '@storybook/addon-svelte-csf';
  import { Container } from '$lib/flutter/component'
  const widget= Container()
  const name = Container.name
</script>

<!--👇 The title determines where your story goes in the story list -->
<Meta
  title="Widget/Container"
  component={Widget}
/>

<Template let:args>
  <Widget {...args} />
</Template>


<Story
  name="normal"
  args={{
    width: '600px',
    height: '300px',
    widget: Container({
      color: 'lightblue',
    })
  }}
/>