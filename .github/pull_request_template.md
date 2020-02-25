## Description

**Proposed Changes:**

-

<!-- Choose one: either "fixes" when the PR fixes a bug, or "closes" otherwise. -->
Fixes #Issue.
Closes #Issue.

## Checklist

### API

- [ ] Errors return a `{ Code, Message }` object.
- [ ] Unit tests added.
- [ ] Cypress integration tests added.
<!-- Strikethrough if not relevant: -->
- [ ] Requires manual deployment task when releasing to Prod.
- [ ] Introduces new mock data.

### PWA

<!-- See https://github.com/jitbug/jitbug/wiki/PWA-Best-Practices for explanations. -->

- [ ] All network requests have a `.catch(handleError)`.
- [ ] Function props are bound by assigning an anonymous arrow function as a member (instead of inlining the arrow function into the template).
- [ ] Uses the `Host` functional component (use `stencil generate` for component boilerplates).
- [ ] Uses `Fragment` instead of returning arrays within templates.
- [ ] Uses localized formats for printing moments.
