import { renderHook } from '@testing-library/react-hooks';
import { fireEvent, render, screen } from '@testing-library/react';

import useInputFile, { Options } from '../src';

const setup = () => {
  const ref = { current: document.createElement('input') };
  const file = new File([`(¯\_(ツ)_/¯)`], 'me.png', {
    type: 'image/png'
  });

  return { ref, file };
};

describe('useInputFile', () => {
  describe('ref', () => {
    it('should set input type as file ', () => {
      function Component() {
        const { ref } = useInputFile();

        return <input ref={ref} data-testid="my-input" />;
      }

      render(<Component />);

      expect(screen.getByTestId('my-input')).toHaveAttribute('type', 'file');
    });

    it('should set input type as file with custom ref', () => {
      const { ref } = setup();
      const { result } = renderHook(() => useInputFile({ ref }));
      const input = result.current.ref.current as HTMLInputElement;

      expect(input.type).toBe('file');
    });
  });

  describe('options', () => {
    it('should set input `accept` attributes', () => {
      const { ref } = setup();
      const options: Options = { accept: 'image/*' };
      const { result } = renderHook(() => useInputFile({ ref, options }));
      const input = result.current.ref.current as HTMLInputElement;

      expect(input).toHaveAttribute('accept');
      expect(input.getAttribute('accept')).toBe('image/*');
    });

    it('should set input `multiple` attributes', () => {
      const { ref } = setup();
      const options: Options = { multiple: true };
      const { result } = renderHook(() => useInputFile({ ref, options }));
      const input = result.current.ref.current as HTMLInputElement;

      expect(input).toHaveAttribute('multiple');
      expect(input.getAttribute('multiple')).toBe('multiple');
    });
  });

  describe('files', () => {
    it('should called custom onChange once', () => {
      const { ref, file } = setup();
      const onChange = jest.fn();
      renderHook(() => useInputFile({ ref, onChange }));

      fireEvent.change(ref.current, { target: { files: [file] } });

      expect(onChange).toBeCalled();
    });

    it('should get a file by change input file', () => {
      const { ref, file } = setup();
      const { result } = renderHook(() => useInputFile({ ref }));

      fireEvent.change(ref.current, { target: { files: [file] } });

      expect(result.current.files).toEqual([file]);
    });
  });
});
