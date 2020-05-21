import { RefObject, useEffect, useRef, useState } from 'react';

export interface Options {
  accept?: string;
  multiple?: boolean;
}

export interface Args {
  ref: RefObject<HTMLInputElement>;
  options?: Options | undefined;
}

export interface Callback {
  (event: Event): void;
}

export type Files = {
  files: FileList | null;
};

function useInputFile({ ref, options }: Args, callback?: Callback): Files {
  const [files, setFiles] = useState<FileList | null>(null);
  const customerHandler = useRef<Callback | undefined>(undefined);

  customerHandler.current = callback;

  useEffect(() => {
    const input = ref.current as HTMLInputElement;

    input.type = 'file';
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const input = ref.current;

    if (input && options) {
      if (options.accept) {
        input.accept = options.accept;
      }
      if (options.multiple) {
        input.multiple = options.multiple;
      }
    }
  }, [ref, options]);

  useEffect(() => {
    const input = ref.current;

    if (input) {
      const getFiles = (event: Event) => {
        const files = (event.currentTarget as HTMLInputElement).files;

        setFiles(files);
      };

      const eventListener = (event: Event) => {
        if (customerHandler.current) {
          return customerHandler.current(event);
        }

        return getFiles(event);
      };

      input.addEventListener('change', eventListener, false);

      return () => {
        input.removeEventListener('change', eventListener, false);
      };
    }
  }, [ref]);

  return { files };
}

export default useInputFile;
