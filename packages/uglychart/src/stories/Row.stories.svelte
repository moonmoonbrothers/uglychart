<!-- YourComponent.stories.svelte -->
<script>
  import Widget from "../lib/Widget.svelte"
  import { Meta, Template, Story } from "@storybook/addon-svelte-csf"
  import { Row, Container, Flexible } from "@moonmoonbrothers/like-flutter"
</script>

<!--👇 The title determines where your story goes in the story list -->
<Meta title="Widget/Row" component={Widget} />

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
      child: Row({
        children: [
          Container({
            width: 50,
            height: 50,
            color: "red",
          }),
          Container({
            width: 50,
            height: 100,
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
    description: `Row can have muliple widgets, 
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
      child: Row({
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
    description: `Row can have mainAxisAlignment: 'end'`,
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
      child: Row({
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
    description: `Row can have mainAxisAlignment: 'spaceBetween'`,
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
      child: Row({
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
    description: `Row can have mainAxisAlignment: 'spaceEvenly'`,
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
      child: Row({
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
    description: `Row can have mainAxisAlignment: 'spaceAround'`,
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
      child: Row({
        mainAxisAlignment: "spaceBetween",
        crossAxisAlignment: "center",
        children: [
          Container({
            width: 50,
            height: 50,
            color: "red",
          }),
          Container({
            width: 50,
            height: 100,
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
    description: `Row can have crossAlignment: 'center(default)'`,
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
      child: Row({
        mainAxisAlignment: "spaceBetween",
        crossAxisAlignment: "start",
        children: [
          Container({
            width: 50,
            height: 50,
            color: "red",
          }),
          Container({
            width: 50,
            height: 100,
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
    description: `Row can have crossAlignment: 'start'`,
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
      child: Row({
        mainAxisAlignment: "spaceBetween",
        crossAxisAlignment: "end",
        children: [
          Container({
            width: 50,
            height: 50,
            color: "red",
          }),
          Container({
            width: 50,
            height: 100,
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
    description: `Row can have crossAlignment: 'end'`,
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
      child: Row({
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
    description: `Row can have crossAlignment: 'stretch'`,
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
      child: Row({
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
    description: `Row can have Flexible widget`,
  }}
/>
