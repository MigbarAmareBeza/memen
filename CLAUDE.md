# Claude Code Rules for Liquid/Shopify Theme Development

## Liquid Syntax Validation

### Valid Filters
Only use filters from the approved list. Never invent new filters.

**Cart Filters:**
- `cart | item_count_for_variant: {variant_id}`
- `cart | line_items_for: object`

**HTML Filters:**
- `settings.layout | class_list`
- `string | time_tag: string`
- `asset_name | inline_asset_content`
- `string | highlight: string`
- `string | link_to: string`
- `string | placeholder_svg_tag`
- `string | preload_tag: as: string`
- `string | script_tag`
- `string | stylesheet_tag`

**String Filters:**
- `string | append: string`
- `string | capitalize`
- `string | downcase`
- `string | escape`
- `string | handleize`
- `string | remove: string`
- `string | replace: string, string`
- `string | split: string`
- `string | strip`
- `string | truncate: number`
- `string | upcase`
- And many others (see full list in liquid.mcd)

**Math Filters:**
- `number | abs`
- `number | ceil`
- `number | divided_by: number`
- `number | floor`
- `number | minus: number`
- `number | plus: number`
- `number | round`
- `number | times: number`

**Money Filters:**
- `number | money`
- `number | money_with_currency`
- `number | money_without_currency`

### Valid Tags
Only use tags from the approved list:
- Theme: `content_for`, `layout`, `include`, `render`, `javascript`, `section`, `stylesheet`, `sections`
- HTML: `form`, `style`
- Variable: `assign`, `capture`, `decrement`, `increment`
- Iteration: `break`, `continue`, `cycle`, `for`, `tablerow`, `paginate`, `else`
- Conditional: `case`, `if`, `unless`, `else`
- Syntax: `comment`, `echo`, `raw`, `liquid`

### Valid Objects
Only reference these global objects:
- `collections`, `pages`, `all_products`, `articles`, `blogs`
- `cart`, `customer`, `shop`, `theme`, `settings`
- `request`, `routes`, `localization`
- `canonical_url`, `page_title`, `page_description`
- And others (see full list in liquid.mcd)

### Syntax Rules
- Use `{% liquid %}` for multiline code
- Use `{% # comments %}` for inline comments
- Follow proper tag closing order
- Use proper object dot notation
- Respect object scope and availability

## Theme Structure

Place files in the correct directories:

```
sections/     - Customizable page sections with schema
blocks/       - Configurable elements within sections  
layout/       - Headers, footers, page structure
snippets/     - Reusable code fragments
config/       - Theme settings and schema
assets/       - CSS, JavaScript, images
locales/      - Translation files
templates/    - Page type specifications (JSON preferred)
templates/customers/  - Customer account pages
templates/metaobject/ - Custom content type pages
```

## UX Principles

### Translations
- Keep all text translated in locale files
- Use sensible translation keys
- Add only English text (staff translators handle other languages)

### Settings
- Keep settings simple, clear, non-repetitive
- Order settings by visual impact and flow
- Group related settings under headings (Layout, Typography, Colors, Padding)
- Use conditional settings judiciously to reduce cognitive load
- For checkboxes, avoid verb-based labels (use "Language selector" not "Enable language selector")

### Server-Side Rendering
- Render server-side with Liquid as first principle
- Use JavaScript sparingly, fetch HTML from server when possible
- Use optimistic UI only for small UI updates with high success probability

## HTML Guidelines

- Use semantic HTML
- Use modern features like `<details>` and `<summary>` over JavaScript
- Use CamelCase for IDs, append block/section IDs: `-{{ block.id }}`
- Ensure interactive elements are focusable with `tabindex="0"`

## CSS Guidelines

### Specificity
- Never use IDs as selectors
- Avoid element selectors
- Avoid `!important` (comment why if absolutely necessary)
- Use 0-1-0 specificity (single class selector)
- Maximum 0-4-0 specificity for parent/child relationships

### Variables
- Use CSS custom properties to reduce redundancy
- Set hardcoded values to variables first
- Never hardcode colors, use color schemes
- Scope variables to components unless global needed
- Global variables in `:root` in `snippets/theme-styles-variables.liquid`

### Scoping
- Use `{% stylesheet %}` tags in sections/blocks/snippets
- Reset CSS variables inline with style attributes for settings
- Avoid `{% style %}` tags with ID selectors

### BEM Naming
- Block: component name
- Element: `block__element`
- Modifier: `block--modifier` or `block__element--modifier`
- Use dashes to separate words

### Media Queries & Nesting
- Mobile first (min-width queries)
- Use `screen` for all media queries
- Do not use `&` operator
- Never nest beyond first level (except media queries)

## JavaScript Guidelines

### General Principles
- Zero external dependencies when possible
- Use native browser features first
- No `var`, prefer `const` over `let`
- Use `for (const item of items)` over `forEach()`
- Add newlines before code blocks

### Modules & Classes
- Use module pattern to avoid global scope pollution
- Prefix private methods with `#`
- Keep public API minimal
- Use utility functions for non-instance methods

### Code Style
- Use `async/await` over `.then()` chaining
- Prefer early returns over nested conditionals
- Use single optional chaining, early returns for multiple chains
- Use ternaries only for simple conditions
- Return boolean comparisons directly

### Web Components
- Initialize JS components with custom elements
- Use events for communication between components
- Consider shadow DOM and slots usage

## Development Commands

When working on the codebase, run these commands for validation:
- `npm run lint` - Check code style
- `npm run typecheck` - Validate types
- `npm run test` - Run test suite
- `npm run build` - Build for production

Always run lint and typecheck before completing tasks to ensure code quality.