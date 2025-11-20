# Contributing to Generative UI Designer

Thank you for your interest in contributing! This is an MVP project with lots of room for improvement.

## How to Contribute

### Reporting Bugs

Found a bug? Please open an issue with:
- Clear description of the problem
- Steps to reproduce
- Expected vs actual behavior
- Screenshots if applicable
- Your environment (OS, Node version, browser)

### Suggesting Features

Have an idea? Open an issue with:
- Clear description of the feature
- Why it would be useful
- Potential implementation approach
- Any alternatives considered

### Contributing Code

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/my-feature`
3. **Make your changes**
4. **Test thoroughly**
5. **Commit with clear messages**: `git commit -m "Add: feature description"`
6. **Push to your fork**: `git push origin feature/my-feature`
7. **Open a Pull Request**

## Development Setup

```bash
# Clone your fork
git clone https://github.com/YOUR_USERNAME/generative-ui-designer.git

# Install dependencies
npm install

# Set up environment
cp .env.local.example .env.local
# Add your OpenAI API key to .env.local

# Start development server
npm run dev
```

## Code Guidelines

### TypeScript
- Use strict typing (no `any` unless necessary)
- Export types from schemas
- Document complex types

### React
- Use functional components
- Use hooks appropriately
- Keep components focused and single-purpose
- Use client components only when needed

### Styling
- Use Tailwind utility classes
- Follow mobile-first responsive approach
- Maintain consistent spacing
- Use semantic color names

### Code Style
- Use Prettier for formatting (if configured)
- Follow existing code patterns
- Add comments for complex logic
- Keep functions small and focused

## Project Structure

```
generative-ui-designer/
├── app/              # Next.js App Router pages
│   ├── api/         # API routes
│   ├── layout.tsx   # Root layout
│   └── page.tsx     # Home page
├── components/       # React components
├── lib/             # Utilities and configurations
└── examples/        # Documentation and examples
```

## Areas for Contribution

### High Priority
- [ ] Error boundary for preview
- [ ] Better loading states
- [ ] Download as ZIP functionality
- [ ] Component history/storage
- [ ] Rate limiting
- [ ] Better mobile experience

### Medium Priority
- [ ] Theme customization
- [ ] Code syntax highlighting
- [ ] Copy individual sections
- [ ] Share generated components
- [ ] More example prompts
- [ ] Analytics/usage tracking

### Low Priority
- [ ] Dark/light mode toggle for UI (not generated code)
- [ ] Keyboard shortcuts
- [ ] Multiple AI provider support
- [ ] Export to CodeSandbox/StackBlitz
- [ ] Component variations
- [ ] A/B testing prompts

## Testing

Currently, the project uses manual testing. Future contributions could include:

- Unit tests with Jest
- Component tests with React Testing Library
- E2E tests with Playwright
- API endpoint tests

## Documentation

When adding features, please update:
- README.md (if changing core functionality)
- ARCHITECTURE.md (if changing structure)
- examples/sample-outputs.md (if changing AI output)
- Code comments (for complex logic)

## Commit Message Format

Use clear, descriptive commit messages:

- `Add: [new feature]`
- `Fix: [bug description]`
- `Update: [what was updated]`
- `Refactor: [what was refactored]`
- `Docs: [documentation changes]`
- `Style: [code style changes]`

Examples:
```
Add: download as ZIP functionality
Fix: preview not updating on code change
Update: system prompt for better accessibility
Refactor: extract validation into separate file
Docs: add examples for form generation
Style: format code with Prettier
```

## Code Review Process

All PRs will be reviewed for:
- Code quality and style
- Test coverage (if applicable)
- Documentation updates
- Breaking changes
- Performance impact

## Questions?

Feel free to:
- Open an issue for discussion
- Comment on existing issues
- Reach out to maintainers

## License

By contributing, you agree that your contributions will be licensed under the same MIT License that covers the project.

## Recognition

Contributors will be recognized in the README (future enhancement).

Thank you for helping make this project better! 🚀






