const { DateTime } = require("luxon");

module.exports = function(eleventyConfig) {
  // Add Nunjucks date filter
  eleventyConfig.addNunjucksFilter("date", function(date, format = "yyyy") {
    // If input is a string 'now', use current date
    if (date === "now") {
      return DateTime.now().toFormat(format);
    }
    // If input is a Date object
    if (date instanceof Date) {
      return DateTime.fromJSDate(date).toFormat(format);
    }
    // If input is a string date
    return DateTime.fromISO(date).toFormat(format);
  });

  // Copy static assets
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("CNAME");
  eleventyConfig.addPassthroughCopy("_redirects");

  // Watch CSS files for changes
  eleventyConfig.addWatchTarget("src/css/");

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      layouts: "_includes"
    },
    templateFormats: ["njk", "md", "html"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk",
    nunjucksOptions: {
      // Add shared includes to the search path
      searchPaths: [
        "src/_includes",
        "src/_includes/shared/includes"
      ]
    }
  };
}; 