// debounce
// A generic function for debouncing. It accepts a callback that
// will be debounced. This callback can take any number of arguments.
// The delay specifies the time to wait before calling the callback.
// A cancel method is also provided to clear the timeout.

export const debounce = <T extends (...args: unknown[]) => void>(
	callback: T,
	delay: number = 1000
) => {
	let timeoutId: ReturnType<typeof setTimeout> | undefined;

	const debouncedFunction = (...args: Parameters<T>) => {
		// if there is an existing timeout, clear it to ensure only the latest call is executed
		if (timeoutId) {
			clearTimeout(timeoutId);
		}

		timeoutId = setTimeout(() => {
			callback(...args);
		}, delay);
	};

	// return a cleanup function that clears the timeout
	debouncedFunction.cancel = () => {
		if (timeoutId) {
			clearTimeout(timeoutId);
		}
	};

	return debouncedFunction;
};
