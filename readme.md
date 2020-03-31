# Jitbug Helpers

![Build and Test](https://github.com/jitbug/helpers/workflows/Build%20and%20Test/badge.svg)

## Get Started

```sh
npm i @jitbug/helpers
```

Moment.js needs to be available in the global context in order to make the date helpers and some of the utils work.

## Publishing

There's a Github Action set up that automatically publishes new tags that follow the `v*.*.*` format. Use `npm run release` to create a new version, then push it using `git push --follow-tags`.
