# use-input-file

![CI](https://github.com/neighborhood999/use-input-file/workflows/CI/badge.svg)
[![npm](https://flat.badgen.net/npm/v/use-input-file)](https://www.npmjs.com/package/use-input-file)
[![minified + gzip](https://flat.badgen.net/bundlephobia/min/use-input-file)](https://bundlephobia.com/result?p=use-input-file)
[![styled with prettier](https://flat.badgen.net/badge/style%20with/prettier/ff69b4)](https://github.com/prettier/prettier)

A React hook that allows you to handle HTML `<input type="file">`.

## DEMO

[![Edit](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/use-input-file-demo-5wke5)

## Installation

```sh
$ yarn add use-input-file
```

## Basic Usage

```jsx
import React, { useEffect } from 'react';
import useInputFile from 'use-input-file';

const App () => {
  const { ref, files } = useInputFile();

  // Check your upload files changed
  useEffect(() => {
    console.log(files);
  }, [files]);

  return (
    <input ref={ref}>
  )
};
```

## Passing Custom `ref`

```jsx
import React, { useEffect, useRef } from 'react';

const App () => {
  const ref = useRef(null);
  const { files } = useInputFile({ ref });

  // Check your upload files
  useEffect(() => {
    console.log(files);
  }, [files]);

  return (
    <input ref={ref}>
  )
};
```

## Setting Input Options

You can set input file attributes by `options`:

```jsx
const options = { multiple: true, accept: 'image/*' };
const { ref, files } = useInput({ options });

// render: <input type="file" multiple="multiple" accept="image/*">
```

## The `onChange` Callback

As above, the hook default will return empty `files`, when the input file changed will return new `files` with your changed.

Sometimes you may want to custom onChange for your logic, so you can pass `onChange` callback argument to `hook` and handle input file change for you want.

```jsx
const onChange = event => {
  // Doing something...
  console.log(event.currentTarget.files);
};
const { ref } = useInputFile({ onChange });
```

## API

```js
const { ref, file } = useInputFile({/* ...options */});
```

### Hook Parameters

You can configure `use-input-file` via the below parameters:

| Key      | Type            | Default                                 | Description                                                                                                         |
| -------- | --------------- | --------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| ref      | React.RefObject | `React.RefObject<HTMLInputElement>`     | Passing your custom `ref`.                                                                                          |
| options  | object          | `{ accept: string, multiple: boolean }` | Check [MDN - input type="file"](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file) for more details. |
| onChange | function        |                                         | You can pass `onChange` callback argument to `hook` and handle input file change for you want.                      |

### Return Values

| Key   | Type            | Default           | Description                                                                                                                                                                                                                    |
| ----- | --------------- | ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| ref   | React.RefObject | `React.RefObject` | The react `ref`.                                                                                                                                                                                                               |
| files | array           | `[]`              | The hook default will return empty [File](https://developer.mozilla.org/en-US/docs/Web/API/File), when the input file changed will return new [File](https://developer.mozilla.org/en-US/docs/Web/API/File) with your changed. |


## Tests

```sh
$ make test
```

## Lint

```sh
$ make lint
```

## License

MIT © [Peng Jie](https://github.com/neighborhood999/)
