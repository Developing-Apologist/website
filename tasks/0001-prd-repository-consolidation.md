# PRD: Repository Consolidation - Single Website

## Introduction/Overview

The Developing Apologist project currently consists of four separate repositories (main website, blog, talks, and shared layouts) that are managed independently. This architecture has become overly complex for a single-person project. This PRD outlines the consolidation of all four repositories into a single unified website repository that will be built with Eleventy and deployed as a static site.

**Problem:** Managing four separate repositories with independent deployments and a git submodule structure creates unnecessary complexity for maintenance, development, and deployment.

**Goal:** Consolidate all repositories into a single codebase that builds as one unified website with all content accessible via path-based routing (e.g., `/blog`, `/talks`) instead of subdomains.

## Goals

1. Merge all four repositories into the main website repository
2. Eliminate the git submodule structure for shared layouts
3. Create a unified Eleventy build process that handles all content types
4. Convert from subdomain-based routing to path-based routing
5. Maintain a single package.json with unified dependencies
6. Preserve existing content from blog and talks repositories
7. Prepare infrastructure for deployment to Azure Static Web Apps (while maintaining GitHub Pages temporarily)
8. Enable a single development server workflow

## User Stories

1. **As a developer**, I want to work on all parts of the website from a single repository so that I can make changes more efficiently without switching between repos.

2. **As a developer**, I want a single `npm run dev` command that starts one development server so that I can preview all sections of the website simultaneously.

3. **As a developer**, I want all shared layouts integrated directly into the codebase so that I don't have to manage git submodules.

4. **As a site visitor**, I want to access blog content at `/blog` and talks content at `/talks` so that URLs are simple and predictable.

5. **As a developer**, I want to deploy the entire site with a single build process so that deployment is faster and simpler.

6. **As a developer**, I want the flexibility to deploy to multiple hosting platforms (GitHub Pages, Azure Static Web Apps, Firebase) so that I can choose the best option for my needs.

## Functional Requirements

**Note:** Requirements are ordered by implementation priority, with build/test/deploy infrastructure first to enable early detection of issues.

### 1. Dependencies Management

1.1. All npm dependencies from blog, talks, and shared-layouts repositories must be merged into the main `package.json`.

1.2. Duplicate dependencies must be consolidated to use single versions.

1.3. Any version conflicts must be resolved to use compatible versions.

1.4. DevDependencies and regular dependencies must be properly categorized.

### 2. Build System

2.1. A single `eleventy.config.js` must configure all build processes for the consolidated website.

2.2. The system must generate path-based URLs (e.g., `/blog/post-title`, `/talks/talk-name`) instead of subdomain-based URLs.

2.3. All content types (main pages, blog posts, talks) must be built in a single Eleventy build process.

2.4. The build output must go to a single `_site/` directory.

2.5. Eleventy collections must be configured to properly organize blog posts and talks.

### 3. Development Workflow

3.1. Running `npm install` must successfully install all dependencies without conflicts.

3.2. Running `npm run dev` must start a single development server that serves all content.

3.3. The development server must support hot-reloading for changes to any content type.

3.4. Running `npm run build` must build the entire site in one step without errors.

### 4. Deployment Preparation

4.1. The existing `.github/workflows/deploy.yml` must continue to support GitHub Pages deployment.

4.2. The codebase must be structured to support future Azure Static Web Apps deployment.

4.3. The codebase must be structured to support future Firebase deployment.

4.4. Infrastructure-as-code (Terraform) for Azure Static Web Apps will be created separately (post-consolidation).

4.5. The build process must be compatible with multiple static hosting platforms.

4.6. Initial deployment test to GitHub Pages must succeed to validate the build pipeline.

### 5. Repository Structure

5.1. All `.njk` template pages from all repositories must be merged into the `src/` directory following Eleventy conventions.

5.2. Blog content files must be preserved in a `src/posts/` directory structure matching the original blog repository.

5.3. Talks content files must be preserved in a `src/talks/` directory structure matching the original talks repository.

5.4. The shared-layouts repository contents must be absorbed into `src/_includes/` directory, eliminating the submodule structure.

5.5. Existing assets (images, CSS, etc.) from all repositories must be merged into appropriate asset directories.

### 6. Tailwind CSS Configuration

6.1. All `tailwind.config.js` files from the repositories must be reviewed and merged into a single configuration.

6.2. Content paths in the Tailwind config must include all template directories (main site, blog templates, talks templates).

6.3. Any custom plugins, themes, or extensions from individual configs must be consolidated.

6.4. Running `npm run build:css` must successfully compile all Tailwind styles without errors.

### 7. Layout & Template Integration

7.1. All components from the shared-layouts repository (navbar, footer, etc.) must be available in `src/_includes/shared/includes/components/`.

7.2. Base layouts must be accessible from `src/_includes/` without submodule references.

7.3. Nunjucks search paths must be configured to find all included templates.

7.4. The navbar component must be updated to reflect the new path-based navigation structure.

### 8. URL Structure & Routing

8.1. The main website pages must be accessible at the root path (e.g., `/`, `/about`, `/contact`).

8.2. Blog posts must be accessible at `/blog/[post-slug]` or similar path structure.

8.3. Blog index/listing pages must be accessible at `/blog` or `/blog/index.html`.

8.4. Talks must be accessible at `/talks/[talk-slug]` or similar path structure.

8.5. Talks index/listing pages must be accessible at `/talks` or `/talks/index.html`.

8.6. A `_redirects` file must be maintained for Netlify-style redirects (compatible with various hosting platforms).

### 9. Content Migration

9.1. All blog posts from the blog repository must be copied to the consolidated repository with their front matter intact.

9.2. All talks from the talks repository must be copied to the consolidated repository with their front matter intact.

9.3. Any blog-specific or talks-specific layouts/templates must be integrated into the shared layout system.

9.4. Content file paths in the consolidated repo must match the original source repository structure for easier content management.

### 10. Search Functionality

10.1. Existing JavaScript search code from the blog repository must be migrated and integrated.

10.2. Search JavaScript must be updated to handle the new path structure (e.g., `/blog/post-slug` instead of `/post-slug`).

10.3. If talks have separate search functionality, it must be integrated to work with the consolidated structure.

10.4. Search results must correctly link to posts and talks using the new URL structure.

### 11. RSS Feed

11.1. The RSS feed generation from the blog repository must be preserved and configured to generate at `/blog/feed.xml`.

11.2. RSS feed entries must use the new path-based URLs (e.g., `https://developingapologist.com/blog/post-slug`).

11.3. The RSS feed template must be updated to reflect the consolidated site structure.

### 12. Discord Comments Integration

12.1. The `discord-comments.njk` component must be included in the blog post layout template.

12.2. Discord comments must not be included in talks pages or main website pages.

12.3. Any configuration for Discord integration must be preserved from the blog repository.

## Non-Goals (Out of Scope)

1. **Redesigning the website** - This consolidation will not change the visual design or UX of any section.

2. **Restructuring content within sections** - Blog posts and talks will maintain their existing organization and structure.

3. **Adding new features** - No new functionality will be added during consolidation (e.g., no new search features, no new content types).

4. **Performance optimization** - Beyond the natural benefits of consolidation, specific performance tuning is out of scope.

5. **Preserving git history** - Only the latest code and content will be migrated; git history from other repos will not be preserved.

6. **Managing URL redirects** - 301 redirects from old subdomain URLs will be handled separately in Cloudflare by the developer.

7. **Immediate cloud deployment** - While the codebase will be prepared for Azure Static Web Apps and Firebase, the actual deployment configuration and migration will happen after consolidation.

8. **Migrating GitHub Issues/PRs** - No issues, pull requests, or discussions from other repositories need to be migrated.

9. **Content updates or edits** - Existing content will be migrated as-is without modification.

## Design Considerations

### Directory Structure (Proposed)

```
website/
├── .github/
│   └── workflows/
│       └── deploy.yml
├── src/
│   ├── _data/
│   │   └── site.json
│   ├── _includes/
│   │   ├── base.njk
│   │   ├── post.njk (from blog)
│   │   ├── talk.njk (from talks)
│   │   └── shared/
│   │       └── includes/
│   │           ├── components/
│   │           │   ├── footer.njk
│   │           │   ├── navbar.njk
│   │           │   ├── search-input.njk
│   │           │   └── discord-comments.njk
│   │           └── layouts/
│   │               └── base.njk
│   ├── assets/
│   │   └── (images, fonts, etc.)
│   ├── css/
│   │   ├── main.css
│   │   ├── tailwind.css
│   │   └── blog-custom.css (from blog)
│   ├── posts/
│   │   └── (blog markdown files)
│   ├── talks/
│   │   └── (talks markdown files)
│   ├── index.njk
│   ├── about.njk
│   ├── contact.njk
│   ├── thanks.njk
│   ├── blog.njk (blog index page)
│   └── talks.njk (talks index page)
├── _site/ (build output)
├── package.json
├── eleventy.config.js
├── tailwind.config.js
├── postcss.config.js
├── CNAME
└── _redirects
```

### URL Mapping

| Old URL | New URL |
|---------|---------|
| `developingapologist.com` | `developingapologist.com` |
| `blog.developingapologist.com` | `developingapologist.com/blog` |
| `blog.developingapologist.com/post-slug` | `developingapologist.com/blog/post-slug` |
| `talks.developingapologist.com` | `developingapologist.com/talks` |
| `talks.developingapologist.com/talk-slug` | `developingapologist.com/talks/talk-slug` |

### Navigation Updates

The navbar component must be updated to link to:
- `/` (Home)
- `/blog` (Blog)
- `/talks` (Talks)
- `/about` (About)
- `/contact` (Contact)

## Technical Considerations

### Eleventy Configuration

1. **Collections**: Configure Eleventy collections for:
   - `posts` (blog posts) from `src/posts/`
   - `talks` from `src/talks/`

2. **Permalinks**: Set up permalink structures:
   - Blog posts: `/blog/:slug/` or `/blog/:fileSlug/`
   - Talks: `/talks/:slug/` or `/talks/:fileSlug/`

3. **Pagination**: Ensure blog and talks listing pages support pagination if needed.

4. **Passthrough Copy**: Configure passthrough copy for:
   - Assets from all sections
   - CSS files
   - CNAME file
   - _redirects file

### Dependency Merging Strategy

1. Review `package.json` from all four repositories
2. Identify common dependencies (e.g., Eleventy, Tailwind CSS)
3. Use the latest compatible versions
4. Test that all features work with consolidated dependencies

### Search Functionality

- If the blog has search functionality, ensure it works with the new path structure
- Update any hardcoded URLs in JavaScript to use relative paths

### RSS Feeds

- Update RSS feed configurations to use new URLs
- Ensure feed URLs reflect the `/blog` path structure

### GitHub Actions

- Keep the existing `deploy.yml` working for GitHub Pages
- Ensure the build command works for the consolidated structure
- Test that deployment succeeds with the new structure

## Success Metrics

1. **Single Repository**: All code exists in one repository with no submodules.

2. **Single Build Process**: Running `npm run build` successfully builds all content (main site, blog, talks) in one step.

3. **Single Dev Server**: Running `npm run dev` starts one development server that serves all content correctly.

4. **Correct URL Structure**: All pages are accessible at their new path-based URLs:
   - Main site at `/`
   - Blog at `/blog`
   - Talks at `/talks`

5. **All Content Preserved**: All blog posts and talks from the original repositories are accessible in the consolidated site.

6. **Working Navigation**: The navbar component correctly links to all sections using the new URL structure.

7. **Successful Deployment**: The site deploys successfully to GitHub Pages using the existing workflow.

8. **Clean Dependencies**: A single `package.json` contains all necessary dependencies without conflicts.

9. **No Broken Links**: All internal links work correctly with the new URL structure.

10. **Development Efficiency**: Development workflow is simplified - making changes no longer requires switching between repositories.

## Decisions & Additional Requirements

### Naming Conventions (Confirmed)

1. **Eleventy Collection Name**: Blog posts will be in a collection called `posts` (matches Eleventy conventions).

2. **Blog Index Page**: The blog listing page will be `src/blog.njk` (generates `/blog/index.html`).

3. **Talks Index Page**: The talks listing page will be `src/talks.njk` (generates `/talks/index.html`).

### Implementation Details (Confirmed)

4. **CSS Organization**: Blog-specific and talks-specific CSS will be merged into a single unified stylesheet.

5. **Asset Deduplication**: Duplicate assets (logos, images) across repositories should be identified and deduplicated during migration.

6. **Search Functionality**: 
   - Both blog and talks have existing JavaScript-based search functionality
   - Search JavaScript must be updated to work with the new path-based URL structure
   - Search functionality must work across both blog posts and talks
   - See FR 10 (Search Functionality) for detailed requirements

7. **RSS Feeds**: 
   - RSS feeds are currently generated for the blog
   - New RSS feed URL will be `/blog/feed.xml`
   - See FR 11 (RSS Feed) for detailed requirements

8. **Discord Comments**: 
   - Discord comments component is only used on blog posts
   - Must be integrated into the blog post layout template
   - Not needed for talks pages
   - See FR 12 (Discord Comments Integration) for detailed requirements

9. **Tailwind Config**: 
   - Multiple `tailwind.config.js` files may exist across repositories
   - These must be merged into a single unified configuration
   - See FR 6 (Tailwind CSS Configuration) for detailed requirements

10. **Environment Variables**: 
    - All secrets and variables are handled at the organization level in GitHub
    - No environment variable consolidation needed in the codebase

---

**Document Version:** 1.2  
**Created:** October 11, 2025  
**Last Updated:** October 11, 2025  
**Status:** ✅ Ready for Implementation

## Change Log

- **v1.2** - Reordered Functional Requirements by implementation priority (build/test/deploy first)
- **v1.1** - Converted Open Questions to Confirmed Decisions, added FR 10-12
- **v1.0** - Initial PRD creation

