<!-- YourComponent.stories.svelte -->
<script>
  import Widget from "../lib/Widget.svelte"
  import { Meta, Template, Story } from "@storybook/addon-svelte-csf"
  import {
    Alignment,
    EdgeInsets,
    Column,
    Container,
    Flexible,
  } from "@moonmoonbrothers/like-flutter"
</script>

<!--👇 The title determines where your story goes in the story list -->
<Meta title="Widget/Column" component={Widget} />

<Template let:args>
  <Widget {...args} />
  <p style="width: 600px;">
    {args.description || ""}
  </p>
</Template>

<Story
  name="case1"
  args={{
    ssrSize: { width: 600, height: 300 },
    width: "600px",
    height: "300px",
    widget: Container({
      color: "lightblue",
      child: Column({
        children: [
          Container({
            width: 50,
            height: 50,
            color: "red",
          }),
          Container({
            width: 100,
            height: 50,
            color: "blue",
          }),
          Container({
            width: 50,
            height: 50,
            color: "green",
          }),
        ],
      }),
    }),
    description: `Column can have muliple widgets, 
    Basically, its height would be stretched as possible. 
    its width would be shrinked to fit child max width
    `,
  }}
/>

<Story
  name="case2"
  args={{
    ssrSize: { width: 600, height: 300 },
    width: "600px",
    height: "300px",
    widget: Container({
      color: "lightblue",
      child: Column({
        mainAxisAlignment: "end",
        children: [
          Container({
            width: 50,
            height: 50,
            color: "red",
          }),
          Container({
            width: 50,
            height: 50,
            color: "blue",
          }),
          Container({
            width: 50,
            height: 50,
            color: "green",
          }),
        ],
      }),
    }),
    description: `Column can have mainAxisAlignment: 'end'`,
  }}
/>

<Story
  name="case3"
  args={{
    ssrSize: { width: 600, height: 300 },
    width: "600px",
    height: "300px",
    widget: Container({
      color: "lightblue",
      child: Column({
        mainAxisAlignment: "spaceBetween",
        children: [
          Container({
            width: 50,
            height: 50,
            color: "red",
          }),
          Container({
            width: 50,
            height: 50,
            color: "blue",
          }),
          Container({
            width: 50,
            height: 50,
            color: "green",
          }),
        ],
      }),
    }),
    description: `Column can have mainAxisAlignment: 'spaceBetween'`,
  }}
/>
<Story
  name="case4"
  args={{
    ssrSize: { width: 600, height: 300 },
    width: "600px",
    height: "300px",
    widget: Container({
      color: "lightblue",
      child: Column({
        mainAxisAlignment: "spaceEvenly",
        children: [
          Container({
            width: 50,
            height: 50,
            color: "red",
          }),
          Container({
            width: 50,
            height: 50,
            color: "blue",
          }),
          Container({
            width: 50,
            height: 50,
            color: "green",
          }),
        ],
      }),
    }),
    description: `Column can have mainAxisAlignment: 'spaceEvenly'`,
  }}
/>

<Story
  name="case5"
  args={{
    ssrSize: { width: 600, height: 300 },
    width: "600px",
    height: "300px",
    widget: Container({
      color: "lightblue",
      child: Column({
        mainAxisAlignment: "spaceAround",
        children: [
          Container({
            width: 50,
            height: 50,
            color: "red",
          }),
          Container({
            width: 50,
            height: 50,
            color: "blue",
          }),
          Container({
            width: 50,
            height: 50,
            color: "green",
          }),
        ],
      }),
    }),
    description: `Column can have mainAxisAlignment: 'spaceAround'`,
  }}
/>

<Story
  name="case6"
  args={{
    ssrSize: { width: 600, height: 300 },
    width: "600px",
    height: "300px",
    widget: Container({
      color: "lightblue",
      child: Column({
        mainAxisAlignment: "spaceBetween",
        crossAxisAlignment: "center",
        children: [
          Container({
            width: 50,
            height: 50,
            color: "red",
          }),
          Container({
            width: 100,
            height: 50,
            color: "blue",
          }),
          Container({
            width: 50,
            height: 50,
            color: "green",
          }),
        ],
      }),
    }),
    description: `Column can have crossAlignment: 'center(default)'`,
  }}
/>

<Story
  name="case7"
  args={{
    ssrSize: { width: 600, height: 300 },
    width: "600px",
    height: "300px",
    widget: Container({
      color: "lightblue",
      child: Column({
        mainAxisAlignment: "spaceBetween",
        crossAxisAlignment: "start",
        children: [
          Container({
            width: 50,
            height: 50,
            color: "red",
          }),
          Container({
            width: 100,
            height: 50,
            color: "blue",
          }),
          Container({
            width: 50,
            height: 50,
            color: "green",
          }),
        ],
      }),
    }),
    description: `Column can have crossAlignment: 'start'`,
  }}
/>

<Story
  name="case8"
  args={{
    ssrSize: { width: 600, height: 300 },
    width: "600px",
    height: "300px",
    widget: Container({
      color: "lightblue",
      child: Column({
        mainAxisAlignment: "spaceBetween",
        crossAxisAlignment: "end",
        children: [
          Container({
            width: 50,
            height: 50,
            color: "red",
          }),
          Container({
            width: 100,
            height: 50,
            color: "blue",
          }),
          Container({
            width: 50,
            height: 50,
            color: "green",
          }),
        ],
      }),
    }),
    description: `Column can have crossAlignment: 'end'`,
  }}
/>

<Story
  name="case9"
  args={{
    ssrSize: { width: 600, height: 300 },
    width: "600px",
    height: "300px",
    widget: Container({
      color: "lightblue",
      child: Column({
        mainAxisAlignment: "spaceBetween",
        crossAxisAlignment: "stretch",
        children: [
          Container({
            width: 50,
            height: 50,
            color: "red",
          }),
          Container({
            width: 100,
            height: 50,
            color: "blue",
          }),
          Container({
            width: 50,
            height: 50,
            color: "green",
          }),
        ],
      }),
    }),
    description: `Column can have crossAlignment: 'stretch'`,
  }}
/>

<Story
  name="case10"
  args={{
    ssrSize: { width: 600, height: 300 },
    width: "600px",
    height: "300px",
    widget: Container({
      color: "lightblue",
      child: Column({
        children: [
          Flexible({
            child: Container({
              width: 50,
              height: 50,
              color: "red",
            }),
          }),
          Flexible({
            child: Container({
              width: 50,
              height: 50,
              color: "blue",
            }),
          }),
        ],
      }),
    }),
    description: `Column can have Flexible widget`,
  }}
/>
