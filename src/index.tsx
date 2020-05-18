import { useCallback, useEffect, useRef, useState } from 'react';

function useInputFile() {
  const ref = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<FileList | null>(null);

  const getFiles = useCallback((event: Event) => {
    const files = (event.target as HTMLInputElement).files;

    setFiles(files);
  }, []);

  useEffect(() => {
    const input = ref.current;

    if (input) {
      input.addEventListener('change', getFiles, false);

      return () => {
        input.removeEventListener('change', getFiles, false);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { ref, files };
}

export default useInputFile;
