# use-input-file

![CI](https://github.com/neighborhood999/use-input-file/workflows/CI/badge.svg)

A React hook that allows you to handle `<input type="file">`.

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
import React, { useRef } from 'react';

const App () => {
  const ref = useRef(null);
  const { files } = useInputFile({ ref });

  // Check your upload files
  React.useEffect(() => {
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
```

## The `onChange` Callback

The hook default will return empty `files`. When input file changed will return new `files`.

You can pass `onChange` callback argument to `hook` and handle input file change for you want.

```jsx
const onChange = event => {
  // Doing something...
  console.log(event.currentTarget.files);
};
const { ref } = useInputFile({ onChange });
```

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
