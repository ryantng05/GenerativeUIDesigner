# Sample Generated Outputs

This document shows example outputs from the Generative UI Designer to help you understand what to expect.

## Example 1: Finance Dashboard

### Prompt
```
Clean finance dashboard with dark mode, cards, line chart, and keyboard navigation
```

### Expected Output Structure

**Description**:
```
A clean finance dashboard featuring a dark theme with multiple metric cards 
displaying key financial data. The dashboard includes a line chart for 
visualizing trends and supports keyboard navigation for accessibility.
```

**Accessibility Features**:
- Semantic HTML with proper heading hierarchy (h1, h2)
- ARIA labels on all interactive elements
- Keyboard navigation support with tab order
- Focus indicators on all interactive elements
- Screen reader friendly chart descriptions
- High contrast colors for readability

**Responsiveness**:
- Mobile-first design approach
- Cards stack vertically on mobile (default)
- 2-column grid on tablets (md: breakpoint)
- 3-column grid on desktop (lg: breakpoint)
- Chart scales appropriately across all screen sizes
- Touch-friendly tap targets (min 44x44px)

**Code Structure**:
```tsx
export default function GeneratedComponent() {
  // State management for interactive features
  const [activeMetric, setActiveMetric] = useState(0);
  
  return (
    <div className="min-h-screen bg-gray-900 p-4 md:p-8">
      <header>
        <h1 className="text-3xl font-bold text-white">Dashboard</h1>
      </header>
      
      {/* Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Card components with proper ARIA */}
      </div>
      
      {/* Chart Section */}
      <section aria-label="Performance Chart">
        {/* Chart visualization */}
      </section>
    </div>
  );
}
```

---

## Example 2: Pricing Page

### Prompt
```
Modern pricing page with three tiers, toggle for monthly/yearly, and highlight popular plan
```

### Expected Output Structure

**Description**:
```
A modern pricing page featuring three pricing tiers with a monthly/yearly 
toggle switch. The middle tier is highlighted as the most popular option 
with visual emphasis and a badge.
```

**Accessibility Features**:
- Toggle switch with ARIA role and labels
- Each pricing card has proper headings
- Button states clearly communicated
- Price changes announced to screen readers
- Focus management on toggle interaction
- Descriptive alt text for any icons

**Responsiveness**:
- Single column on mobile (< 768px)
- Three columns on tablet and desktop (≥ 768px)
- Flexible card heights that adapt to content
- Spacing adjusts for different screen sizes
- Toggle switch remains accessible on all devices
- Text sizes scale appropriately

**Code Structure**:
```tsx
export default function GeneratedComponent() {
  const [isYearly, setIsYearly] = useState(false);
  
  const plans = [
    { name: 'Basic', price: 10, yearlyPrice: 100 },
    { name: 'Pro', price: 25, yearlyPrice: 250, popular: true },
    { name: 'Enterprise', price: 50, yearlyPrice: 500 },
  ];
  
  return (
    <div className="min-h-screen bg-white p-8">
      {/* Toggle Switch */}
      <div role="switch" aria-checked={isYearly}>
        {/* Toggle UI */}
      </div>
      
      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map(plan => (
          <article key={plan.name}>
            {/* Card content */}
          </article>
        ))}
      </div>
    </div>
  );
}
```

---

## Example 3: Contact Form

### Prompt
```
Contact form with validation states, success message, and accessible error handling
```

### Expected Output Structure

**Description**:
```
A contact form with real-time validation, clear error states, and a success 
message on submission. Features accessible error handling with ARIA live 
regions and visual feedback.
```

**Accessibility Features**:
- Form labels properly associated with inputs
- Error messages linked via aria-describedby
- Live regions for dynamic error announcements
- Required fields clearly marked
- Focus moves to first error on submit
- Success message announced to screen readers

**Responsiveness**:
- Full-width on mobile
- Centered with max-width on desktop
- Input fields scale appropriately
- Button remains accessible on all sizes
- Error messages display clearly on mobile
- Success message is prominent

---

## Key Patterns in Generated Code

### State Management
```tsx
const [value, setValue] = useState(initialValue);
```

### Event Handling
```tsx
const handleClick = (e: React.MouseEvent) => {
  // Logic here
};
```

### Accessibility
```tsx
<button
  aria-label="Submit form"
  aria-describedby="error-message"
  onClick={handleClick}
>
  Submit
</button>
```

### Responsiveness
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {/* Content */}
</div>
```

### Dark Mode
```tsx
<div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
  {/* Content */}
</div>
```

## What the AI Understands

The AI is trained to recognize and generate:

### Layout Patterns
- Hero sections
- Navigation bars
- Card grids
- Sidebars
- Forms
- Dashboards
- Pricing tables
- Feature lists

### Interactive Elements
- Buttons
- Toggles/switches
- Tabs
- Accordions
- Modals (state-based)
- Dropdowns
- Forms with validation

### Visual Styles
- Dark mode
- Light mode
- Gradients
- Shadows
- Borders
- Hover effects
- Transitions

### Design Systems
- Color schemes
- Spacing
- Typography
- Icons (as SVG or emoji)
- Responsive breakpoints

## Tips for Better Prompts

### ✅ Good Prompts
- "Clean finance dashboard with dark mode, cards, line chart, and keyboard navigation"
- "Responsive product grid with hover effects, filters sidebar, and mobile-friendly layout"
- "Contact form with validation states, success message, and accessible error handling"

### ❌ Vague Prompts
- "Make a website" (too broad)
- "Dashboard" (not enough detail)
- "Something nice" (no specifics)

### 🎯 Prompt Tips
1. **Be specific**: Mention colors, layout, features
2. **Include interactivity**: Toggles, tabs, forms
3. **Mention accessibility**: Keyboard nav, ARIA
4. **Specify responsive needs**: Mobile, tablet, desktop
5. **State your style**: Clean, modern, minimal, bold

## Limitations

The AI-generated code:
- ✅ Uses standard HTML/React elements
- ✅ Implements Tailwind CSS classes
- ✅ Includes basic interactivity with useState
- ❌ Cannot use external libraries (charts, icons)
- ❌ Cannot fetch real data (uses mock data)
- ❌ Cannot include images (uses placeholders)
- ❌ Limited to single-component scope

These limitations are by design for the MVP to ensure:
- Client-side preview works reliably
- No external dependencies needed
- Code is self-contained
- Fast generation and rendering






