Installation:

This is a vite project with no additional dependencies. To run it:

```
cd fifty-years
npm install
npm run dev
```
It should run on port 5173, assuming that port is free.

What I would do if I had more time:
- Error handling
- Move inline styles to dedicated CSS files
- More styling
- Use React router instead of using component state to determine which page the user is on
- Memoize and/or cache API results, as the initial call is slow and Star Wars characters are unlikely to change very often.
