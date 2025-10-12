# Shared Layouts for Eleventy

This repository contains reusable layouts and components for Eleventy sites using Nunjucks templating. It's designed to be used as a Git submodule across multiple sites like `developingapologist.com`, `blog.developingapologist.com` and `talks.developingapologist.com`.

## Structure

```
shared-layouts/
├── includes/
│   ├── components/
│   │   ├── navbar.njk          # Responsive navigation component
│   │   ├── footer.njk          # Footer component
│   │   ├── search-input.njk    # Reusable search input component
│   │   └── search-script.njk   # Search functionality script
│   ├── tailwind.config.js      # Shared Tailwind configuration
│   └── developing-apologist.css # Source CSS with design system
├── README.md
└── .eleventyignore
```

## Installation as Git Submodule

Add this repository as a submodule to your Eleventy project:

```bash
# Add the submodule
git submodule add https://github.com/developing-apologist/shared-layouts.git src/_includes/shared

# Initialize and update the submodule
git submodule update --init --recursive
```

## Configuration

### 1. Update Eleventy Configuration

In your `.eleventy.js` file:

```javascript
const { DateTime } = require("luxon");

module.exports = function(eleventyConfig) {
  // Add Luxon date filter for footer component
  eleventyConfig.addFilter("date", function(date, format) {
    return DateTime.fromJSDate(date).toFormat(format);
  });
  
  // Copy static assets
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("CNAME");
  eleventyConfig.addPassthroughCopy("_redirects");
  
  // Add shared layouts to includes path
  eleventyConfig.addPassthroughCopy("src/_includes/shared/includes");

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
```

### 2. Install Required Plugin

The footer component uses date formatting. Install Luxon directly:

```bash
npm install luxon
```

Then add it to your `.eleventy.js`:

```javascript
const { DateTime } = require("luxon");

module.exports = function(eleventyConfig) {
  // Add Luxon date filter
  eleventyConfig.addFilter("date", function(date, format) {
    return DateTime.fromJSDate(date).toFormat(format);
  });
  
  // ... rest of your configuration
};
```

**Note:** Luxon provides the date formatting functionality. The `{{ "now" | date("yyyy") }}` filter in the footer component will automatically update the copyright year.

## CSS Design System

This shared submodule includes the complete design system for all Developing Apologist sites.

### Files Included
- `tailwind.config.js` - Tailwind configuration with all brand colors and fonts
- `developing-apologist.css` - Source CSS file with custom components and styles

### Setup for Downstream Sites

1. **Use Shared Tailwind Config** in your `tailwind.config.js`:
```javascript
// Use shared Tailwind configuration
module.exports = require('./src/_includes/shared/tailwind.config.js');
```

2. **Create CSS Source File** (`src/css/main.css`):
```css
@import 'tailwindcss/base';
@import 'tailwindcss/components';
@import 'tailwindcss/utilities';

/* Import shared styles */
@import '../_includes/shared/developing-apologist.css';
```

3. **Build Process** in your `package.json`:
```json
{
  "scripts": {
    "build:css": "npx tailwindcss -i ./src/css/main.css -o ./src/css/tailwind.css --minify",
    "dev": "npx tailwindcss -i ./src/css/main.css -o ./src/css/tailwind.css --watch"
  }
}
```

4. **HTML Reference** in your layout files:
```html
<link rel="stylesheet" href="/css/tailwind.css">
```

### Updating the Design System
When the main site updates the design system:
1. Update files in this shared submodule
2. Run `git submodule update --remote` in your downstream sites
3. Rebuild your CSS

## Component Usage

### Navbar Component (`navbar.njk`)
>>>>>>> Stashed changes

Use this pattern in your layout files for automatic active state detection:

```njk
<!-- Navigation -->
{% set nav_data = {
    logo_image: "/assets/developing-apologist-logo-v2.png",
    logo_alt: "The Developing Apologist",
    site_title: "The Developing Apologist",
    show_wip_badge: true,
    nav_links: [
        { href: "/", label: "Home", active: page.url == "/" or page.url == "" },
        { href: "/about/", label: "About", active: page.url == "/about/" or page.url == "/about" },
        { href: "https://blog.developingapologist.com", label: "Blog", active: false },
        { href: "https://talks.developingapologist.com", label: "Presentations", active: false }
    ]
} %}

{% set logo_image = nav_data.logo_image %}
{% set logo_alt = nav_data.logo_alt %}
{% set site_title = nav_data.site_title %}
{% set show_wip_badge = nav_data.show_wip_badge %}
{% set nav_links = nav_data.nav_links %}
{% include "shared/includes/components/navbar.njk" %}
```

The navbar component accepts these variables:

#### Required Variables
- `nav_links`: Array of navigation link objects

#### Optional Variables
- `site_title`: The site title displayed next to the logo (default: "Site Title")
- `logo_image`: Path to the logo image (if not provided, shows default SVG)
- `logo_alt`: Alt text for the logo image (default: "Site Logo")
- `show_wip_badge`: Boolean to show/hide the "Work in Progress" badge (default: false)

#### Navigation Link Structure
Each link object should contain:
- `label` (required): The text to display for the link
- `href` (required): The URL the link should point to
- `active` (optional): Boolean to indicate if this is the current page

Example:
```javascript
[
  {
    label: "Home",
    href: "/",
    active: page.url == "/" or page.url == ""  // Handle both with and without trailing slash
  },
  {
    label: "About",
    href: "/about/",
    active: page.url == "/about/" or page.url == "/about"  // Handle both with and without trailing slash
  },
  {
    label: "External Link",
    href: "https://example.com",
    active: false  // External links should be false
  }
]
```

#### Troubleshooting Active State

If active states aren't working properly, try these debugging steps:

1. **Check the page.url value** by adding this to your template temporarily:
   ```njk
   <!-- Debug: Current page URL is "{{ page.url }}" -->
   ```

2. **Use more robust active detection**:
   ```njk
   { 
     href: "/about/", 
     label: "About", 
     active: page.url == "/about/" or page.url == "/about" or page.url.startsWith("/about/")
   }
   ```

3. **For blog/talks sites**, you might need to check the current site context:
   ```njk
   { 
     href: "/", 
     label: "Home", 
     active: page.url == "/" or page.url == "" or page.url == "/index.html"
   }
   ```

### Footer Component (`footer.njk`)

The footer component accepts these variables:

#### Optional Variables
- `site_title`: The site title displayed next to the logo (default: "Site Title")
- `logo_image`: Path to the logo image (if not provided, shows default SVG)
- `logo_alt`: Alt text for the logo image (default: "Site Logo")
- `site_description`: Description text displayed under the logo
- `show_wip_badge`: Boolean to show/hide the "Work in Progress" badge (default: false)
- `nav_links`: Array of navigation links (used for quick links section)
- `show_quick_links`: Boolean to show/hide the quick links section (default: true)
- `quick_links_title`: Title for the quick links section (default: "Quick Links")
- `resources`: Array of resource link objects
- `show_resources`: Boolean to show/hide the resources section (default: true)
- `resources_title`: Title for the resources section (default: "Resources")
- `copyright_text`: Custom copyright text (default: uses site_title)

**Note:** The footer uses `{{ "now" | date("yyyy") }}` for the copyright year, which requires Luxon to be installed and configured as a date filter.

#### Link Structure
The `resources` array should contain objects with:
- `label` (required): The text to display for the link
- `href` (required): The URL the link should point to

Example:
```javascript
{
  resources: [
    { href: "https://blog.example.com", label: "Developer Blog" },
    { href: "https://talks.example.com", label: "Presentations" }
  ]
}
```

**Note:** Quick links automatically use the same `nav_links` data as the navbar component.

### Search Input Component (`search-input.njk`)

A reusable search input component with beautiful styling and configurable options.

#### Basic Usage

```njk
<!-- Simple search input -->
{% include "shared/includes/components/search-input.njk" %}
```

#### Advanced Usage with Custom Parameters

```njk
<!-- Custom search for different content types -->
{% include "shared/includes/components/search-input.njk" %}
    placeholder: "Search talks..."
    inputId: "talks-search-input"
    searchTarget: ".talk-card"
%}
```

#### Parameters

- `placeholder` (optional): Custom placeholder text (default: "Search articles...")
- `inputId` (optional): Custom input ID (default: "search-input")
- `searchTarget` (optional): CSS selector for search targets (default: ".post-card")

#### Styling Features

- **Glow Effect**: Blue glow around input on focus
- **Responsive Design**: Works on desktop and mobile
- **Consistent Theming**: Matches site color scheme
- **Clean Design**: No icons, minimal styling

### Search Script Component (`search-script.njk`)

JavaScript functionality for the search input component.

#### Basic Usage

```njk
<!-- Include search script -->
{% include "shared/includes/components/search-script.njk" %}
```

#### Advanced Usage with Custom Options

```html
<script>
document.addEventListener('DOMContentLoaded', function() {
    initializeSearch({
        inputId: 'talks-search-input',
        searchTarget: '.talk-card',
        titleAttribute: 'data-title',
        descriptionAttribute: 'data-description',
        tagsAttribute: 'data-tags',
        onSearch: function(visibleCount, totalCount) {
            console.log(`Showing ${visibleCount} of ${totalCount} items`);
        }
    });
});
</script>
```

#### Search Function Options

- `inputId`: ID of the search input element
- `searchTarget`: CSS selector for elements to search
- `titleAttribute`: Data attribute containing title text
- `descriptionAttribute`: Data attribute containing description text
- `tagsAttribute`: Data attribute containing tags
- `onSearch`: Callback function called after search (receives visibleCount, totalCount)

#### Features

- **Debounced Search**: 150ms delay for better performance
- **Multi-field Search**: Searches titles, descriptions, and tags
- **Real-time Results**: Instant filtering as you type
- **Custom Callbacks**: Execute custom code after search

### Complete Search Implementation Example

```njk
<!-- Search Section -->
<div class="max-w-2xl mx-auto mb-8">
    {% include "shared/includes/components/search-input.njk" %}
        placeholder: "Search workshops..."
        inputId: "workshop-search"
        searchTarget: ".workshop-card"
    %}
</div>

<!-- Include search script -->
{% include "shared/includes/components/search-script.njk" %}

<!-- Custom initialization -->
<script>
document.addEventListener('DOMContentLoaded', function() {
    initializeSearch({
        inputId: 'workshop-search',
        searchTarget: '.workshop-card',
        onSearch: function(visible, total) {
            document.getElementById('results-count').textContent = 
                `Showing ${visible} of ${total} workshops`;
        }
    });
});
</script>
```

### Using Both Components Together

You can configure both navbar and footer with the same data structure:

```njk
<!-- Navigation and Footer Configuration -->
{% set site_data = {
    logo_image: "/assets/developing-apologist-logo-v2.png",
    logo_alt: "The Developing Apologist",
    site_title: "The Developing Apologist",
    site_description: "Equipping Christian software developers to defend their faith through logical, systematic apologetics that bridges faith and reason.",
    show_wip_badge: true,
    nav_links: [
        { href: "/", label: "Home", active: page.url == "/" or page.url == "" },
        { href: "/about/", label: "About", active: page.url == "/about/" or page.url == "/about" },
        { href: "https://blog.developingapologist.com", label: "Blog", active: false },
        { href: "https://talks.developingapologist.com", label: "Presentations", active: false }
    ],
    resources: [
        { href: "https://blog.developingapologist.com", label: "Developer Apologetics Blog" },
        { href: "https://talks.developingapologist.com", label: "Technical Presentations" }
    ],
    quick_links_title: "Quick Links",
    resources_title: "Resources",
    show_quick_links: true,
    show_resources: true
} %}

<!-- Set variables for components -->
{% set logo_image = site_data.logo_image %}
{% set logo_alt = site_data.logo_alt %}
{% set site_title = site_data.site_title %}
{% set site_description = site_data.site_description %}
{% set show_wip_badge = site_data.show_wip_badge %}
{% set nav_links = site_data.nav_links %}
{% set resources = site_data.resources %}
{% set quick_links_title = site_data.quick_links_title %}
{% set resources_title = site_data.resources_title %}
{% set show_quick_links = site_data.show_quick_links %}
{% set show_resources = site_data.show_resources %}

<!-- Include components -->
{% include "shared/includes/components/navbar.njk" %}
{% include "shared/includes/components/footer.njk" %}
```

## Features

### Navbar Component (`navbar.njk`)
- ✅ Responsive design with mobile hamburger menu
- ✅ Custom color scheme (logo-steel, logo-circuit, logo-orange, etc.)
- ✅ Configurable logo and site title
- ✅ Optional "Work in Progress" badge
- ✅ Active link highlighting
- ✅ Accessible with proper ARIA attributes
- ✅ Smooth transitions and hover effects
- ✅ Sticky positioning with z-index

### Footer Component (`footer.njk`)
- ✅ Responsive grid layout
- ✅ Brand section with logo and description
- ✅ Configurable quick links section
- ✅ Configurable resources section
- ✅ Optional "Work in Progress" badge
- ✅ Dynamic copyright year
- ✅ Consistent styling with navbar

## Customization

### Custom Color Scheme
Both components use custom CSS variables for colors. Make sure your site includes these CSS custom properties:

```css
:root {
  --color-logo-steel: #2d3748;
  --color-logo-circuit: #4a5568;
  --color-logo-orange: #ed8936;
  --color-logo-blue: #3182ce;
  --color-logo-glow: #63b3ed;
  --color-vs-fg: #d4d4d4;
}
```

Or define them in your Tailwind config:

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        'logo-steel': '#2d3748',
        'logo-circuit': '#4a5568',
        'logo-orange': '#ed8936',
        'logo-blue': '#3182ce',
        'logo-glow': '#63b3ed',
        'vs-fg': '#d4d4d4',
      }
    }
  }
}
```

### Replacing the Logo
Update the `logo_image` and `logo_alt` in your site_data:

```njk
{% set site_data = {
    logo_image: "/images/your-logo.png",
    logo_alt: "Your Site Name",
    // ... other options
} %}
```

### Customizing the Work in Progress Badge
To show the badge, set `show_wip_badge: true` in your site_data. To hide it, set it to `false`.

## Updating the Submodule

To update the shared layouts in your project:

```bash
# Update the submodule to the latest version
git submodule update --remote

# Commit the update
git add src/_includes/shared
git commit -m "Update shared layouts submodule"
```

## Contributing

To contribute to the shared layouts:

1. Fork this repository
2. Make your changes
3. Test in a local Eleventy project
4. Submit a pull request

## License

This project is licensed under the MIT License.

## Cursor Prompt for Implementation

Here's a ready-to-use Cursor prompt to implement these shared layouts in your Eleventy project:

```
I want to implement shared layouts for my Eleventy site using a Git submodule. Here's what I need:

1. Add the shared-layouts repository as a Git submodule at `src/_includes/shared`
2. Install Luxon for date formatting: `npm install luxon`
3. Update my .eleventy.js configuration to include Luxon date filter and shared layouts
4. Create a site_data configuration in my layout that includes:
   - Logo image and alt text
   - Site title and description
   - Navigation links with dynamic active state detection
   - Resources links for the footer
   - Work in progress badge toggle
   - Customizable section titles and visibility

The shared layouts include:
- A responsive navbar component with mobile hamburger menu
- A footer component with brand section, quick links (using nav data), and resources
- Custom color scheme using logo-steel, logo-circuit, logo-orange, etc.

Please help me implement this step by step, starting with the Git submodule setup and ending with a working configuration that matches the documentation at https://github.com/developing-apologist/shared-layouts
```
