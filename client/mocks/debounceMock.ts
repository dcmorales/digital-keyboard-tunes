// debounceMock
// A complete mock of the debounce function.

import { MockedFunction, vi } from 'vitest';

export const debounceMock = vi.fn(
	<T extends (...args: unknown[]) => void>(
		callback: T,
		delay: number = 1000
	) => {
		let timeoutId: ReturnType<typeof setTimeout> | undefined;

		const debouncedFunction = vi.fn((...args: Parameters<T>) => {
			// clear the existing timeout to ensure only the latest call is executed
			if (timeoutId) {
				clearTimeout(timeoutId);
			}

			// set a new timeout for the callback
			timeoutId = setTimeout(() => {
				callback(...args);
			}, delay);
		}) as MockedFunction<(...args: Parameters<T>) => void> & {
			cancel: () => void;
		};

		// return a cleanup function that clears the timeout
		debouncedFunction.cancel = vi.fn(() => {
			if (timeoutId) {
				clearTimeout(timeoutId);
			}
		});

		return debouncedFunction;
	}
);
