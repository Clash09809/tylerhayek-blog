module.exports = function (config) {
  config.addPassthroughCopy("src/Assets");
  config.addPassthroughCopy("src/CSS");
  config.addPassthroughCopy("src/JS");
  config.addPassthroughCopy("src/PHP");
  return {
    dir: {
      input: "src",
      output: "dist",
      data: "_data",
    },
  };
};
