# Troubleshooting Guide

Common issues and their solutions.

## Installation Issues

### `npm install` fails

**Problem**: Dependencies won't install

**Solutions**:
```bash
# Clear npm cache
npm cache clean --force

# Delete lock file and node_modules
rm -rf node_modules package-lock.json

# Try installing again
npm install
```

**Alternative**: Try using a different package manager
```bash
# Using yarn
yarn install

# Using pnpm
pnpm install
```

---

## Environment Issues

### "OpenAI API key not configured"

**Problem**: API key not found

**Solutions**:
1. Make sure `.env.local` exists in project root
2. Verify the file contains: `OPENAI_API_KEY=sk-...`
3. Restart the dev server after adding the key
4. Check for typos in the env var name

**Verify**:
```bash
# Check if file exists
ls -la .env.local

# Check contents (without revealing key)
cat .env.local | grep OPENAI
```

### "Invalid API key"

**Problem**: API key is incorrect or expired

**Solutions**:
1. Go to https://platform.openai.com/api-keys
2. Generate a new API key
3. Replace the old key in `.env.local`
4. Restart the dev server

---

## Generation Issues

### Generation takes too long

**Problem**: Requests timing out or taking 30+ seconds

**Solutions**:
1. Switch to faster model:
```env
OPENAI_MODEL=gpt-4o-mini  # Fast and cheap
```

2. Check OpenAI status: https://status.openai.com/
3. Verify your internet connection
4. Check OpenAI usage limits in your account

### "Failed to generate UI"

**Problem**: Generation fails with generic error

**Check**:
1. Browser console for detailed errors
2. Server logs in terminal
3. OpenAI API status
4. Your prompt length (10-1000 chars)

**Solutions**:
- Simplify your prompt
- Try a different prompt
- Check API rate limits
- Verify model availability

### Generated code has errors

**Problem**: Code preview shows errors

**Common Causes**:
1. AI generated invalid JSX
2. Unsupported React features
3. Syntax errors

**Solutions**:
- Try regenerating with a clearer prompt
- Check the code tab for syntax issues
- Report the issue with your prompt

---

## Preview Issues

### Preview shows blank screen

**Problem**: Nothing appears in preview

**Check**:
1. Browser console for errors
2. Code tab for syntax errors
3. Network tab for failed requests

**Solutions**:
```bash
# Clear browser cache
# Chrome: Ctrl+Shift+Delete
# Firefox: Ctrl+Shift+Delete

# Hard reload
# Chrome/Firefox: Ctrl+Shift+R
```

### Preview doesn't update

**Problem**: Changes not reflecting in preview

**Solutions**:
1. Switch to Code tab and back to Preview
2. Hard reload the page
3. Restart dev server

---

## Development Server Issues

### Port 3000 already in use

**Problem**: `Error: Port 3000 is already in use`

**Solutions**:
```bash
# Find what's using port 3000
# Windows:
netstat -ano | findstr :3000

# macOS/Linux:
lsof -i :3000

# Kill the process or use different port
PORT=3001 npm run dev
```

### Hot reload not working

**Problem**: Changes don't trigger reload

**Solutions**:
1. Restart the dev server
2. Check if files are saved
3. Clear `.next` folder:
```bash
rm -rf .next
npm run dev
```

---

## Build Issues

### `npm run build` fails

**Problem**: Production build errors

**Common Causes**:
1. Type errors
2. Import errors
3. Environment variables missing

**Solutions**:
```bash
# Check for type errors
npx tsc --noEmit

# Clean build
rm -rf .next
npm run build
```

### Deployed app shows errors

**Problem**: Works locally but fails in production

**Check**:
1. Environment variables set in deployment platform
2. Build logs for errors
3. Browser console in deployed app

**Deployment Checklist**:
- [ ] Set `OPENAI_API_KEY` in platform
- [ ] Set `OPENAI_MODEL` (optional)
- [ ] Build completed successfully
- [ ] No TypeScript errors
- [ ] Test the deployed URL

---

## Browser Issues

### Preview not working in Safari

**Problem**: react-live issues in Safari

**Solutions**:
1. Update to latest Safari
2. Clear cache
3. Try in Chrome/Firefox
4. Check browser console

### Mobile preview issues

**Problem**: Layout broken on mobile

**Note**: This is about the main app UI, not generated components

**Check**:
1. Viewport meta tag in layout.tsx
2. Responsive Tailwind classes
3. Test on actual device vs browser DevTools

---

## Performance Issues

### Slow page load

**Problem**: App takes long to load initially

**Expected**: First load can take 5-10 seconds in development

**In Production**:
```bash
npm run build
npm start
```
Production builds are much faster.

### High memory usage

**Problem**: Browser/server using too much RAM

**Solutions**:
1. Close other tabs
2. Restart browser
3. Restart dev server
4. Limit concurrent generations

---

## API Issues

### Rate limit errors

**Problem**: "Rate limit exceeded"

**Solutions**:
1. Wait a few minutes
2. Check OpenAI usage dashboard
3. Upgrade OpenAI plan if needed
4. Implement client-side debouncing

### Network errors

**Problem**: "Failed to fetch" or network timeout

**Check**:
1. Internet connection
2. Firewall/proxy settings
3. VPN issues
4. Corporate network restrictions

**Solutions**:
- Try different network
- Disable VPN temporarily
- Check browser network settings

---

## TypeScript Issues

### Type errors in editor

**Problem**: Red squiggles in VS Code

**Solutions**:
```bash
# Restart TypeScript server
# VS Code: Ctrl+Shift+P → "TypeScript: Restart TS Server"

# Verify tsconfig.json is correct
npx tsc --noEmit
```

### Module not found

**Problem**: Import errors

**Check**:
1. Path aliases in tsconfig.json (`@/*`)
2. File actually exists
3. Correct file extension

**Solutions**:
```bash
# Restart dev server
npm run dev
```

---

## Common Gotchas

### 1. Forgot to restart after env changes
Always restart dev server after changing `.env.local`

### 2. Wrong Node version
Need Node 18+. Check with: `node --version`

### 3. CORS errors
Should not happen with Next.js API routes. If you see CORS errors, something is misconfigured.

### 4. react-live errors
If preview shows errors, the generated code might be invalid. Try regenerating.

### 5. Tailwind not working
Make sure `globals.css` is imported in `layout.tsx`

---

## Getting Help

### Before asking for help:

1. **Check the logs**
   - Browser console (F12)
   - Server terminal output

2. **Try the basics**
   - Restart dev server
   - Clear cache
   - Try in incognito mode

3. **Gather information**
   - Error messages (full text)
   - What you tried
   - Your environment (OS, Node version)
   - Steps to reproduce

### Where to get help:

1. **Check documentation**
   - README.md
   - ARCHITECTURE.md
   - QUICKSTART.md

2. **Search issues**
   - GitHub Issues
   - Stack Overflow

3. **Open a new issue**
   - Provide all information above
   - Include code samples
   - Be specific

---

## Debug Mode

Enable verbose logging:

```typescript
// In app/api/generate/route.ts
console.log('Request:', validatedRequest);
console.log('Response:', result);
```

Check browser console and server logs for details.

---

## Still Having Issues?

If none of these solutions work:

1. **Nuclear option**: Fresh install
```bash
rm -rf node_modules .next package-lock.json
npm install
npm run dev
```

2. **Check system requirements**:
   - Node.js 18 or higher
   - 4GB+ RAM available
   - Modern browser (Chrome, Firefox, Safari, Edge)

3. **Report the bug**:
   - Open an issue on GitHub
   - Include full error details
   - Describe what you tried

---

## Quick Reference

| Problem | Quick Fix |
|---------|-----------|
| API key error | Restart server |
| Preview blank | Check console |
| Port in use | Change PORT |
| Slow generation | Use gpt-4o-mini |
| Type errors | Restart TS server |
| Build fails | Clear .next folder |
| Hot reload broken | Restart dev server |

---

Remember: This is an MVP. Some rough edges are expected. Your feedback helps make it better!






