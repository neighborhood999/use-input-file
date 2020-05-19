import { RefObject, useEffect, useState } from 'react';

interface Options {
  accept?: string;
  multiple?: boolean;
}

interface Props {
  ref: RefObject<HTMLInputElement>;
  options?: Options | undefined;
}

function useInputFile({ ref, options }: Props) {
  const [files, setFiles] = useState<FileList | null>(null);

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

      input.addEventListener('change', getFiles, false);

      return () => {
        input.removeEventListener('change', getFiles, false);
      };
    }
  }, [ref]);

  return { files };
}

export default useInputFile;
