# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [2.7.1](https://github.com/jitbug/helpers/compare/v2.7.0...v2.7.1) (2021-04-23)

### Features

- **dates:** allow to include weekends for getDatesOfNextWeeks ([5129241](https://github.com/jitbug/helpers/commit/5129241f34222e0f6c72b986090c1d62667d6e1a))

## [2.7.0](https://github.com/jitbug/helpers/compare/v2.6.0...v2.7.0) (2020-11-06)

### Features

- **dates:** allow to set granularity for isInFuture and isInPast ([b889880](https://github.com/jitbug/helpers/commit/b889880b59744e03821634bf0b263d07c3675ed4))

## [2.6.0](https://github.com/jitbug/helpers/compare/v2.5.1...v2.6.0) (2020-11-04)

### Features

- **dates:** add isInFuture and isInPast ([0e05699](https://github.com/jitbug/helpers/commit/0e056996c500fd31bdc231387f8c710c85d5c63b))

### [2.5.1](https://github.com/jitbug/helpers/compare/v2.5.0...v2.5.1) (2020-08-07)

### Bug Fixes

- inferred types of `throttle` with and without `skipFn` ([7e75442](https://github.com/jitbug/helpers/commit/7e754426f14703e02a20e35043478e0afff88fd0))

## [2.5.0](https://github.com/jitbug/helpers/compare/v2.4.1...v2.5.0) (2020-08-07)

### Features

- add goToPreviousRoute ([d814f19](https://github.com/jitbug/helpers/commit/d814f194d42873cb977fafbcd7c6100eb91b1397))

### Bug Fixes

- **utils:** return types of debounce and throttle ([023f484](https://github.com/jitbug/helpers/commit/023f484edc935930cf0390c349640cad38865624))

### [2.4.1](https://github.com/jitbug/helpers/compare/v2.4.0...v2.4.1) (2020-07-31)

### Bug Fixes

- **utils:** useRef doesn't set null refs by default ([6d79bc5](https://github.com/jitbug/helpers/commit/6d79bc50425269e4df6e5436bc19cb923079bbf2))

## [2.4.0](https://github.com/jitbug/helpers/compare/v2.3.0...v2.4.0) (2020-07-27)

### Features

- **ionic:** showProgress calls don't cancel each other ([b64c0f8](https://github.com/jitbug/helpers/commit/b64c0f8f8757c69f072383bd5f1a6b2fc6fd905b))

## [2.3.0](https://github.com/jitbug/helpers/compare/v2.2.0...v2.3.0) (2020-07-22)

### Features

- add `convertDataUrlToBlob` util ([4551a4d](https://github.com/jitbug/helpers/commit/4551a4dbd60dfe52662ab949ffba31c5421c1c59))

## [2.2.0](https://github.com/jitbug/helpers/compare/v2.1.0...v2.2.0) (2020-06-19)

### Features

- **utils:** add useRef helper ([fa05251](https://github.com/jitbug/helpers/commit/fa052513080f10c5400891f81d2d06b17a0954e4))

## [2.1.0](https://github.com/jitbug/helpers/compare/v2.0.1...v2.1.0) (2020-06-02)

### Features

- **utils:** validate jwt ([11902f8](https://github.com/jitbug/helpers/commit/11902f854e43bea4c5f2bf2d1aa0969a2d106928))

### [2.0.1](https://github.com/jitbug/helpers/compare/v2.0.0...v2.0.1) (2020-06-01)

### Bug Fixes

- **utils:** jwt parser util is for jitbug only ([ed47594](https://github.com/jitbug/helpers/commit/ed47594f0f5cd3cd717c228a333ff109db7158bd))
- **utils:** stop depending on moment ([8066265](https://github.com/jitbug/helpers/commit/80662651795a8480ac2ea4a70c02168236ba5696))

## [2.0.0](https://github.com/jitbug/helpers/compare/v1.0.3...v2.0.0) (2020-06-01)

### ⚠ BREAKING CHANGES

- **dates:** Instead of expecting that `moment` is defined globally, there's a new method `setMomentReference` that needs to be used to provide a reference to the `moment` function/object.

This also updates the `moment` and `moment-timezone` dependencies.

### Features

- **dates:** no more global moment ([08018f8](https://github.com/jitbug/helpers/commit/08018f897a03cf2782803e77e84f95e49ab66757))
- **time:** subtract method ([f59b7f1](https://github.com/jitbug/helpers/commit/f59b7f1b761c68515dd5dd9f8cdfee3fc43d9998))

### Bug Fixes

- **arrays:** `removeFromArray` always returns a copy ([4acb473](https://github.com/jitbug/helpers/commit/4acb47352a93e5cdd7f7d265c2571add9c6fdf77))

### [1.0.3](https://github.com/jitbug/helpers/compare/v1.0.2...v1.0.3) (2020-05-29)

### Bug Fixes

- viewportIsMin in safari ([f3b33fa](https://github.com/jitbug/helpers/commit/f3b33faa728645caa1d547e1f0ca49d19ecbf4f0))

### [1.0.2](https://github.com/jitbug/helpers/compare/v1.0.1...v1.0.2) (2020-03-31)

### Bug Fixes

- make mergeDateAndTime work across DST changes ([8e5bd63](https://github.com/jitbug/helpers/commit/8e5bd6328fd2abf679f4cb585f2fbcca9431e539))

### [1.0.1](https://github.com/jitbug/helpers/compare/v1.0.0...v1.0.1) (2020-03-11)

## 1.0.0 (2020-03-10)

Initial Version.
