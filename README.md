## Layer Health Demo

The app was scaffolded using create-react-app. To build and run:
```
npm install
npm start
```

## Design
The trickiest part about this exercise was coming up with a design to handle the
one-to-many relationship between patients and notes while keeping the design simple and clean.

The approach taken was to create a single list of filters that filter 
notes, but then group and present them by patient. The demo should show how this
works, and it seems to effectively handle all the requirements.

## Alternative Designs
First and most important, when designing a solution for a customer it is much better
to work with them and ask a lot of clarifying questions, and build designs with 
a knowledge of a whole set of needs. I didn't do that here in this toy example just because this is an interview assignment, and we can have these discussions later. Plus it was only supposed to take 1.5 hours to code up, so there were limits to the complexity that could have been handled.

Some other possible designs that could potentially work involve having a router and
separate pages for searching notes/patients, and even sub-routes where you can
navigate to a "patient_profile" and see all data for that patient. 

In an alternate design, it may not be necessary to group notes by patients, maybe sorting them by date would be better. It really depends on the details of what user actions are required. That would probably be more of a "data analysis" or search type UX, rather than a "patient centric" UX. 

## Technical Discussion Topics
- Search notes. In this app I used the `string.includes()` function from javascript. This looks for an exact match of input, however more complex search could be used such as token based searching, exact matching with quotes, etc.
- Pagination done by patient group, rather than Note.
- Collapsing long notes and opening with toggle, for efficiency and visual reasons.
- Using sx for styles. A simple and efficient way to inline-css using Material-UI, other options work too though of course
- Using px for pixels, just keeping it simple
- Just use React State instead of state management for simplicity
- The Provider select would be better as a typeahead of some sort
- Assume data is valid, such as note.patient_id resolving to a note
- It's hard to copy/paste in a note because it gets collapsed on click, that UX should be improved
- Testing - Didn't add testing due to time constraints, a UI like this would probably do well with a Cypress test framework, along with some Unit tests
