# `@ur-news/locations`

A list of all locations (Colleges, Schools, Departments, and Combinations) in university of Rwanda.

## Usage
### Installation
```sh
npm install @ur-news/locations
```

### List Colleges

This method can also be used to list Schools, Departments or Combinations.

```js
const {colleges} = require('@ur-news/locations');
for (college in colleges) {
  console.log(college);
}
```

### List Schools in one college

```js
const {colleges, schools} = require('@ur-news/locations');

const {abbr} = colleges.UR[0]; // Select abbreviation of the first college in UR school

console.log(schools[abbr]);

```

### List Combinations in one Department

```js
const {departments, combinations} = require('@ur-news/locations');

const {abbr} = departments['ENG'][0]; // Select abbreviation of the first department in School of Engineering

console.log(combinations[abbr]);
```
