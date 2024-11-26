import { fireEvent, renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { debounceMock } from '@/mocks/debounceMock';
import { useResizeEffect } from './useResizeEffect';

vi.mock('@/utils/debounce', () => ({
	debounce: debounceMock,
}));

describe('useResizeEffect', () => {
	beforeEach(() => {
		vi.useFakeTimers();
	});

	afterEach(() => {
		vi.useRealTimers();
		vi.clearAllMocks();
	});

	it('calls the callback initially', () => {
		const callback = vi.fn();

		renderHook(() => useResizeEffect(callback));

		expect(callback).toHaveBeenCalledTimes(1);
	});

	it('debounces the callback on resize', () => {
		const callback = vi.fn();
		renderHook(() => useResizeEffect(callback));

		// trigger multiple resize events
		fireEvent.resize(window);
		fireEvent.resize(window);
		fireEvent.resize(window);

		expect(callback).toHaveBeenCalledTimes(1); // only initial call

		vi.advanceTimersByTime(300);

		expect(callback).toHaveBeenCalledTimes(2); // initial call plus call after debounce
	});

	it('cleans up on unmount', () => {
		const callback = vi.fn();
		const { unmount } = renderHook(() => useResizeEffect(callback));

		unmount();

		// ensure debounce's `cancel` method was called
		expect(debounceMock).toHaveBeenCalledTimes(1);
		expect(debounceMock.mock.results[0].value.cancel).toHaveBeenCalled();
	});
});
