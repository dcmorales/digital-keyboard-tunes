// useResizeEffect

import { useEffect } from 'react';

import { debounce } from '@/utils/debounce';

export function useResizeEffect(callback: () => void): void {
	useEffect(() => {
		callback(); // call the function initially

		// create a debounced version of the function to avoid unnecessary runs
		const debouncedCallback = debounce(callback, 300);

		// update on resize
		window.addEventListener('resize', debouncedCallback);

		// clean up on component unmount
		return () => {
			debouncedCallback.cancel();
			window.removeEventListener('resize', debouncedCallback);
		};
	}, [callback]); // re-run effect if callback changes
}
