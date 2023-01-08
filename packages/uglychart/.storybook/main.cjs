const { typescript: preprocessTs } = require("svelte-preprocess")
const path = require("path")

module.exports = {
  stories: [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx|svelte)",
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
  ],
  framework: "@storybook/svelte",
  core: {
    builder: "@storybook/builder-vite",
  },
  svelteOptions: {
    preprocess: [preprocessTs()],
  },

  viteFinal: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      $lib: path.resolve(__dirname, "../src/lib"),
    }
    return config
  },
  // this is working for svele native format
  // "features": {
  //   "storyStoreV7": true
  // }
}
