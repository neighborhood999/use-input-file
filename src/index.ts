import { RefObject, useEffect, useRef, useState } from 'react';

export interface Options {
  accept?: string;
  multiple?: boolean;
}

export interface OnChange<T extends Event = Event> {
  (event: T): void;
}

export type Return = {
  ref: RefObject<HTMLInputElement>;
  files: File[] | null;
};

function useInputFile(
  args: {
    ref?: RefObject<HTMLInputElement>;
    options?: Options | undefined;
    onChange?: OnChange;
  } = {}
): Return {
  const [files, setFiles] = useState<File[] | null>(null);
  const defaultRef = useRef<HTMLInputElement>(null);
  const customHandler = useRef<OnChange | undefined>(undefined);

  const ref = args.ref || defaultRef;
  customHandler.current = args.onChange;

  useEffect(() => {
    const input = ref.current;

    if (input && args.options) {
      const { options } = args;

      if (options.accept) {
        input.setAttribute('accept', options.accept);
      }
      if (options.multiple) {
        input.setAttribute('multiple', 'multiple');
      }
    }
  }, [ref, args]);

  useEffect(() => {
    const input = ref.current;

    if (input) {
      const getFiles = (event: Event) => {
        // Always create a new files by Array.from().
        // Because in Firefox, if you use `useEffect` to watch `files` changed it can't work,
        // but in the Chrome & Safari works well.
        //
        // details: https://codesandbox.io/s/input-file-with-useeffect-demo-yrmgk
        const fileList = (event.currentTarget as HTMLInputElement)
          .files as FileList;
        const files: File[] = Array.from(fileList);

        setFiles(files);
      };

      const eventListener = (event: Event) => {
        if (customHandler.current) {
          return customHandler.current(event);
        }

        return getFiles(event);
      };

      input.setAttribute('type', 'file');

      input.addEventListener('change', eventListener, false);

      return () => {
        input.removeEventListener('change', eventListener, false);
      };
    }
  }, [ref]);

  return { ref, files };
}

export default useInputFile;
