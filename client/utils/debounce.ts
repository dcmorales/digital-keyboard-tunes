// debounce
// A generic function for debouncing. It accepts a function called func
// that will be debounced. This func can take any number of arguments.
// The delay specifies the time to wait before calling func. A cancel
// method is also provided to clear the timeout.

export const debounce = <T extends (...args: unknown[]) => void>(
	func: T,
	delay: number = 1000
) => {
	let timeoutId: ReturnType<typeof setTimeout> | undefined;

	const debouncedFunction = (...args: Parameters<T>) => {
		// if there is an existing timeout, clear it to ensure only the latest call is executed
		if (timeoutId) {
			clearTimeout(timeoutId);
		}

		timeoutId = setTimeout(() => {
			func(...args); // call the function with the correct arguments
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
