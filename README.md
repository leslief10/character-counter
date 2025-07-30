# Frontend Mentor - Character counter solution

This is a solution to the [Character counter challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/character-counter-znSgeWs_i6). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)

## Overview

### The challenge

Users should be able to:

- Analyze the character, word, and sentence counts for their text
- Exclude/Include spaces in their character count
- Set a character limit
- Receive a warning message if their text exceeds their character limit
- Receive a warning message if their text is the exact number as their character limit
- See the approximate reading time of their text
- Analyze the letter density of their text
- Select their color theme
- View the optimal layout for the interface depending on their device's screen size
- See hover and focus states for all interactive elements on the page

### Links

- Live Site URL: [Character Counter](https://leslief10.github.io/character-counter/)

## My process

### Built with

- [Vite](https://vite.dev/guide/)
- [TypeScript](https://www.typescriptlang.org/docs/)
- [React.js](https://react.dev/learn)
- [TailwindCSS](https://tailwindcss.com/docs/installation/using-vite)
- [Vitest](https://vitest.dev/guide/)
- [ESLint](https://eslint.org/docs/latest/)
- [Prettier](https://prettier.io/docs/)

### What I learned

While working in this project I learned how to use useMemo, I learned that I don't need to have a useState or useEffect for every variable in every component, which was what I wrongly assumed before. React is not super complicated to understand, it has a lot of parts and it can be overwhelming to try and use it "correctly" but I need to try things out and then read articles and make corrections as I go.
I also learned how to use Vitest for testing the components, which I found a bit easier to use than Jest, tbh.

### Continued development

I've used TailwindCSS in both of the projects that I've done with React so far, so for the next one I'll try something like Styled Components to compare. I like writing CSS classes and stuff, I'll most likely read more about what options I have to implement regular CSS in components like I do it in Vue.

For this project, Frontend Mentor has a couple of recommendations on things to try and improve it, like adding more counters (e.g., lines, spaces, etc.), or a word density graph like the letter density one so I might try that in the future.

### Useful resources

- [Pure CSS Custom Checkbox Style](https://moderncss.dev/pure-css-custom-checkbox-style/) - This helped me with the styling of the checkboxes, so I wouldn't have to create a whole personalized checkbox component.
- [How to style a progress bar using CSS](https://verpex.com/blog/website-tips/how-to-style-a-progress-bar-using-css) - This helped me with the styling of the progress bar, so I wouldn't have to create a whole personalized progress bar component :).
