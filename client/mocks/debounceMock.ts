// debounceMock
// A mock of the debounce function. For use whenever a resize event
// is fired inside of a test.

import { MockedFunction, vi } from 'vitest';

export const debounceMock = vi.fn((func: (arg: string) => void) => {
	const debouncedFunction = vi.fn((...args: [string]) =>
		func(...args)
	) as MockedFunction<(...args: [string]) => void> & {
		cancel: typeof vi.fn;
	};
	debouncedFunction.cancel = vi.fn();

	return debouncedFunction;
});
