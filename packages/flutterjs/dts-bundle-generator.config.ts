const config = {
  entries: [
    {
      filePath: "./src/index.ts",
      outFile: `./package/index.d.ts`,
      noCheck: false,
    },
  ],
};

module.exports = config;
