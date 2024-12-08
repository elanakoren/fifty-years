Installation:

This is a vite project with no additional dependencies. To run it:

```
cd fifty-years
npm install
npm run dev
```
It should run on port 5173, assuming that port is free.

Architecture:

The app uses component state of the top-level component to manage the view the user is currently on. I would eventually migrate this to React Router, if I was running this in production. (This would also help break up App.tsx into smaller, more modular components.) It fetches all pages of the API on mount, in a loop, because we need all that information up-front in order to determine neighbors. I also could've used Promise.all to accomplish this. Promise.all is faster but requires thinking about rate limiting and doesn't maintain order. 

What I would do if I had more time:
- Error handling: What happens if the Star Wars API is down, for example?
- More styling
- Better loading state
- Some scalable solution for managing CSS (e.g., BEM, styled components, tailwind)
- Have nice formatters to display some of the less-human readable data (mass, homeplanet, etc)
- Use React router instead of using component state to manage the different views
- Memoize/cache API results, as the initial call is slow and Star Wars characters are unlikely to change very often.
- Should you be able to search for characters by any attribute other than their name? We could support this.
