import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { debounce } from './debounce';

describe('debounce', () => {
	let mockFunction: ReturnType<typeof vi.fn>;
	let debouncedFunction: ReturnType<typeof debounce>;
	const delay = 1000; // default value

	beforeEach(() => {
		vi.useFakeTimers();
		mockFunction = vi.fn();
		debouncedFunction = debounce(mockFunction); // will use default value of 1000ms
	});

	afterEach(() => {
		vi.useRealTimers();
	});

	it('calls the function after the default delay if no delay value is provided', () => {
		// defined in beforeEach with no delay value provided
		debouncedFunction();

		// function shouldn't be called immediately
		expect(mockFunction).not.toHaveBeenCalled();

		// fast-forward time by the custom delay
		vi.advanceTimersByTime(delay);

		expect(mockFunction).toHaveBeenCalled();
	});

	it('calls the function after the specified delay', () => {
		const customDelay = 500;
		debouncedFunction = debounce(mockFunction, customDelay);
		debouncedFunction();

		// function shouldn't be called immediately
		expect(mockFunction).not.toHaveBeenCalled();

		// fast-forward time by delay
		vi.advanceTimersByTime(customDelay);

		expect(mockFunction).toHaveBeenCalled();
	});

	it('calls the function only once if called multiple times within the delay', () => {
		debouncedFunction();
		debouncedFunction();
		debouncedFunction();

		// fast-forward time by delay
		vi.advanceTimersByTime(delay);

		expect(mockFunction).toHaveBeenCalledTimes(1);
	});

	it('resets the delay if called again before the previous delay is over', () => {
		debouncedFunction();

		// fast-forward, but not enough for the function to trigger
		vi.advanceTimersByTime(500);

		// call debouncedFunction again to reset the timer
		debouncedFunction();

		// fast-forward again - the function should still not have been called
		vi.advanceTimersByTime(500);
		expect(mockFunction).not.toHaveBeenCalled();

		// fast-forward the remaining time
		vi.advanceTimersByTime(500);
		expect(mockFunction).toHaveBeenCalledTimes(1);
	});

	it('does not call the function if cancel is called before the delay is over', () => {
		debouncedFunction();
		debouncedFunction.cancel();

		// fast-forward time by delay
		vi.advanceTimersByTime(delay);

		expect(mockFunction).not.toHaveBeenCalled();
	});
});
