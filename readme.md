# Jitbug Helpers

![Build and Test](https://github.com/jitbug/helpers/workflows/Build%20and%20Test/badge.svg)

## Installation

```sh
npm i @jitbug/helpers
```

## API

### Arrays (`@jitbug/helpers/arrays`)

* `createRange(start, end)`: Create a numeric array for the given range.
* `getArraySum(array)`: Calculate the sum of a numeric array.
* `removeFromArray(array, item)`: Remove an item from an array (returns a new array).
* `getLastElement(array)`: Get the last element of an array.
* `getPrevSibling(array, item)`: Get the previous sibling of an array element.
* `getNextSibling(array, item)`: Get the next sibling of an array element.
* `makeArrayUnique(array)`: Use a Set to get only the unique values of an array.
* `getCountWithLimit(array, filterFn, limit)`: Get the count of elements of an array that pass the filter, and return either the count or the limit (whatever is smaller) as a string.
* `reduceObjectArrayToObject(array)`: Reduce an array of objects to an object.
* `sortByKey(key)`: Get a function that can be passed into `Array#sort` to sort an array of objects by the given key.
* `flatten(array)`: Flatten an array.

### Dates (`@jitbug/helpers/dates`)

**Important:** before using any of the `moment.js` related date helpers, you have to use `setMomentReference` once, to pass a reference for `moment`. This is so that this library doesn't need to ship its own `moment.js` bundle (for bundle size reasons). A good place to do this is in an app initialization script (e. g. for Stencil apps, that would be the `globalScript`).

```ts
import { setMomentReference } from '@jitbug/helpers';
import moment from 'moment'; // or 'moment-timezone'

setMomentReference(moment);
```

* `mergeDateAndTime(date, time)`: Merges the time of a date into another date.
* `minsToMs(mins)`: Convert minutes to milliseconds.
* `msToDecimalHours(ms)`: Convert milliseconds to decimal hours.
* `getWorkedHours(start, end, breakMinutes)`: Get the amount of worked hours as a decimal.
* `sortByDate(key)`: Get a function to pass to `Array#sort` to sort an array of objects by date.
* `formatAsTimestamp(date)`: Format a date as a timestamp depending on how long ago it was.
* `formatAsDayAndMonth(date)`: Format a date as day and month without the year, respecting the current locale (hopefully this works).
* `getNextWorkingDay()`: Get the next working day, i. e. the next day that's not on a weekend (Sat/Sun).
* `getDuration(start, end)`: Get the difference between an start an end time.
* `validateShiftDuration(start, end, min)`: Validate a shift's duration.
* `getDatesOfNextWeeks(start, n)`: Get the dates of the next `n` weeks from the start date. Only includes work days (Mo - Fr). Don't try to use this with a start date that's not a Monday or you will break the internetz.
* `getCalendarMonthBoundaries(month)`: Get the start and end dates of a calendar month, which is the start date of the week that includes the first day of the month, and the end date of the week that includes the last day of the month.

### Functional Programming (`@jitbug/helpers/fp`)

* `compose(...fns)`: Compose the passed in functions.
* `pipe(...fns)`: Create a pipe of the passed in functions.
* `pluck(key)(obj)`: Create a function that plucks a property out of an object.
* `is(key, value)(obj)`: Create a function that checks whether a plucked value is equal to the given value.
* `isNot(key, value)(obj)`: Create a function that checks whether a plucked value is not equal to the given value.
* `Bool(value)`: Same as `Boolean` but acts as a type guard/"null check".
* `noop()`: Do nothing.
* `isEnabled(obj)`: Check the `enabled` property of the given object.
* `isDisabled(obj)`: Check the `enabled` property of the given object.
* `isSelected(obj)`: Check the `selected` property of the given object.
* `isDeselected(obj)`: Check the `selected` property of the given object.
* `isChecked(obj)`: Check the `checked` property of the given object.
* `isUnchecked(obj)`: Check the `checked` property of the given object.
* `isVisible(obj)`: Check the `visible` property of the given object.
* `isInvisible(obj)`: Check the `visible` property of the given object.
* `getValueOrDefault(value, default)`: Return the value if it's set, or the default value otherwise.

### Ionic (`@jitbug/helpers/ionic`)

* `showActionSheet(options)`: Show an action sheet.
* `showAlert(message, options)`: Show an alert.
* `showLoading(options)`: Show a loading popover.
* `showLoadingWhile(promise)`: Show a loading popover while awaiting a promise.
* `showModal(options)`: Show a modal.
* `showToas(message, options)`: Show a toast.
* `showPopover(options)`: Show a popover.
* `showProgress()`: Show a progress bar at the top of the page (nprogress).
* `showProgressWhile(promise)`: Show a progress bar while awaiting a promise.
* `showConfirmationAlert(question, options)`: Show a confirmation alert.
* `viewportIsMin(size)`: Check whether the viewport is at least of specified size.
* `goToRoute(url)`: Go to a route programmatically.
* `goToPreviousRoute()`: Go back to the previous route in the history.
* `changeRouteHash(hash)`: Change the hash of the current route without adding a new state to the browser history.

### Strings (`@jitbug/helpers/strings`)

* `toStringOrEmptyString(string)`: Call `toString()` on a value if it exists in its prototype, or return `''` otherwise.
* `toTitleCase(string)`: Convert a string to title case.
* `pascalToCamelCase(string)`: Convert a string from pascal to camel case.
* `getInitials(string)`: Get the initials for each word in a string (capitalized).
* `toOrdinal(number)`: Convert a number to it's ordinal version.
* `filterAndJoin(parts)`: Filter falsy elements from an array, then join them.
* `removeDataUrlPrefix(url)`: Remove the prefix of a base64 encoded data url.
* `bytes(string)`: Convert a size description into its amount of bytes.
* `formatBytes(number)`: Format a number of bytes into a human-readable format.

### Time (`@jitbug/helpers/time`)

A time represents the hours and minutes of a day and can therefore be somewhere in between `00:00` and `23:59`.

* `new Time(timeLike)`: Construct a new time object; a time-like value is a number (of minutes), string (`HH:MM`), `Moment` or another `Time` instance.
* `Time.add(number)`: Add the number of minutes and return a new `Time` instance with the new value. This is circular.
* `Time.subtract(number)`: Same as `add` but subtracts the number of minutes.

The class implements `toValue`, `toJSON` and `toString` for easier serialization.

### Utilities (`@jitbug/helpers/utils`)

* `wait(ms)`: Wait for a given amount of time.
* `debounce(fn, delay)`: Debounce a function by the given delay.
* `throttle(fn, delay, skipFn)`: Throttle a function by the given delay.
* `getRandomInt(min, max)`: Get a random integer in the given range.
* `base64ImageToDataUrl(string)`: Get a data url from a base64 encoded image (assumes jpg by default).
* `getByPath(object, path)`: Get the value at the path of an object.
* `clone(object)`: Make a deep clone of an object.
* `downloadFile(data, mime, name)`: Download a file by opening it via a data url in a new window.
* `raf(options)`: Run a callback on the queried element within the parent. This uses `requestAnimationFrame` to make sure of the element's existence 
* `stopPropagation(event)`: Handler to stop event propagation.
* `readFile(file)`: Read a file using a `FileReader` and return its data as a base64 encoded string.
* `uuid()`: Generate a v4 compliant uuid.
* `convertDataUrlToBlob(data)`: Convert the given data url into a blob.

## Publishing

There's a Github Action set up that automatically publishes new tags that follow the `v*.*.*` format. Use `npm run release` to create a new version, then push it using `git push --follow-tags`.
