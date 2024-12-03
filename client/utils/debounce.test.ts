import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { debounce } from './debounce';

describe('debounce', () => {
	let mockFunction: ReturnType<typeof vi.fn>;
	let debouncedFunction: ReturnType<typeof debounce>;
	const defaultDelay = 1000;

	beforeEach(() => {
		vi.useFakeTimers();
		mockFunction = vi.fn();
		debouncedFunction = debounce(mockFunction); // will use default value of 1000ms
	});

	afterEach(() => {
		vi.useRealTimers();
	});

	it('calls the function after the default delay if no delay value is provided', async () => {
		debouncedFunction();

		expect(mockFunction).not.toHaveBeenCalled();

		await vi.advanceTimersByTime(defaultDelay);

		expect(mockFunction).toHaveBeenCalled();
	});

	it('calls the function after the specified delay', async () => {
		const customDelay = 500;
		debouncedFunction = debounce(mockFunction, customDelay);
		debouncedFunction();

		expect(mockFunction).not.toHaveBeenCalled();

		await vi.advanceTimersByTime(customDelay);

		expect(mockFunction).toHaveBeenCalled();
	});

	it('calls the function only once if called multiple times within the delay', async () => {
		debouncedFunction();
		debouncedFunction();
		debouncedFunction();

		await vi.advanceTimersByTime(defaultDelay);

		expect(mockFunction).toHaveBeenCalledTimes(1);
	});

	it('resets the delay if called again before the previous delay is over', async () => {
		debouncedFunction();

		// fast-forward, but not enough for the function to trigger
		await vi.advanceTimersByTime(500);

		// call debouncedFunction again to reset the timer
		debouncedFunction();

		// fast-forward again
		await vi.advanceTimersByTime(500);
		expect(mockFunction).not.toHaveBeenCalled();

		// fast-forward the remaining time
		await vi.advanceTimersByTime(500);
		expect(mockFunction).toHaveBeenCalledTimes(1);
	});

	it('does not call the function if cancel is called before the delay is over', async () => {
		debouncedFunction();
		debouncedFunction.cancel();

		await vi.advanceTimersByTime(defaultDelay);

		expect(mockFunction).not.toHaveBeenCalled();
	});
});
