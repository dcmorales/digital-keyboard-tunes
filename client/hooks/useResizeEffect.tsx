// useResizeEffect
// A hook that ensures a callback function is executed initially and
// on window resize events. It is debounced to avoid excessive executions.

import { useEffect } from 'react';

import { debounce } from '@/utils/debounce';

export function useResizeEffect(callback: () => void): void {
	useEffect(() => {
		callback(); // initial call

		// create a debounced version of the function to avoid unnecessary runs
		const debouncedCallback = debounce(callback, 300);

		// update on resize
		window.addEventListener('resize', debouncedCallback);

		// clean up on component unmount
		return () => {
			debouncedCallback.cancel();
			window.removeEventListener('resize', debouncedCallback);
		};
	}, [callback]);
}
