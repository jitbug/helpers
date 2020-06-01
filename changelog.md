# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [2.0.1](https://github.com/jitbug/helpers/compare/v2.0.0...v2.0.1) (2020-06-01)


### Bug Fixes

* **utils:** jwt parser util is for jitbug only ([ed47594](https://github.com/jitbug/helpers/commit/ed47594f0f5cd3cd717c228a333ff109db7158bd))
* **utils:** stop depending on moment ([8066265](https://github.com/jitbug/helpers/commit/80662651795a8480ac2ea4a70c02168236ba5696))

## [2.0.0](https://github.com/jitbug/helpers/compare/v1.0.3...v2.0.0) (2020-06-01)


### ⚠ BREAKING CHANGES

* **dates:** Instead of expecting that `moment` is defined globally, there's a new method `setMomentReference` that needs to be used to provide a reference to the `moment` function/object.

This also updates the `moment` and `moment-timezone` dependencies.

### Features

* **dates:** no more global moment ([08018f8](https://github.com/jitbug/helpers/commit/08018f897a03cf2782803e77e84f95e49ab66757))
* **time:** subtract method ([f59b7f1](https://github.com/jitbug/helpers/commit/f59b7f1b761c68515dd5dd9f8cdfee3fc43d9998))


### Bug Fixes

* **arrays:** `removeFromArray` always returns a copy ([4acb473](https://github.com/jitbug/helpers/commit/4acb47352a93e5cdd7f7d265c2571add9c6fdf77))

### [1.0.3](https://github.com/jitbug/helpers/compare/v1.0.2...v1.0.3) (2020-05-29)


### Bug Fixes

* viewportIsMin in safari ([f3b33fa](https://github.com/jitbug/helpers/commit/f3b33faa728645caa1d547e1f0ca49d19ecbf4f0))

### [1.0.2](https://github.com/jitbug/helpers/compare/v1.0.1...v1.0.2) (2020-03-31)


### Bug Fixes

* make mergeDateAndTime work across DST changes ([8e5bd63](https://github.com/jitbug/helpers/commit/8e5bd6328fd2abf679f4cb585f2fbcca9431e539))

### [1.0.1](https://github.com/jitbug/helpers/compare/v1.0.0...v1.0.1) (2020-03-11)

## 1.0.0 (2020-03-10)

Initial Version.
