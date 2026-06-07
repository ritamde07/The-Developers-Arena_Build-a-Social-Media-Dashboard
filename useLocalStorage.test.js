import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useLocalStorage } from '../useLocalStorage';

describe('useLocalStorage Hook', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('returns initial value when localStorage is empty', () => {
    const { result } = renderHook(() => useLocalStorage('testKey', 'initialValue'));
    
    expect(result.current[0]).toBe('initialValue');
  });

  it('returns stored value when it exists in localStorage', () => {
    localStorage.setItem('testKey', JSON.stringify('storedValue'));
    
    const { result } = renderHook(() => useLocalStorage('testKey', 'initialValue'));
    
    expect(result.current[0]).toBe('storedValue');
  });

  it('updates localStorage when value is changed', () => {
    const { result } = renderHook(() => useLocalStorage('testKey', 'initial'));
    
    act(() => {
      result.current[1]('updated');
    });
    
    expect(result.current[0]).toBe('updated');
    expect(localStorage.getItem('testKey')).toBe(JSON.stringify('updated'));
  });

  it('works with objects', () => {
    const initialObj = { name: 'John', age: 30 };
    const { result } = renderHook(() => useLocalStorage('userKey', initialObj));
    
    expect(result.current[0]).toEqual(initialObj);
    
    act(() => {
      result.current[1]({ name: 'Jane', age: 25 });
    });
    
    expect(result.current[0]).toEqual({ name: 'Jane', age: 25 });
    expect(JSON.parse(localStorage.getItem('userKey'))).toEqual({ name: 'Jane', age: 25 });
  });

  it('works with arrays', () => {
    const initialArray = [1, 2, 3];
    const { result } = renderHook(() => useLocalStorage('arrayKey', initialArray));
    
    expect(result.current[0]).toEqual(initialArray);
    
    act(() => {
      result.current[1]([4, 5, 6]);
    });
    
    expect(result.current[0]).toEqual([4, 5, 6]);
  });

  it('works with boolean values', () => {
    const { result } = renderHook(() => useLocalStorage('boolKey', false));
    
    expect(result.current[0]).toBe(false);
    
    act(() => {
      result.current[1](true);
    });
    
    expect(result.current[0]).toBe(true);
    expect(localStorage.getItem('boolKey')).toBe('true');
  });

  it('supports function-like updater (similar to useState)', () => {
    const { result } = renderHook(() => useLocalStorage('counter', 0));
    
    act(() => {
      result.current[1](prev => prev + 1);
    });
    
    expect(result.current[0]).toBe(1);
  });

  it('persists across hook re-renders', () => {
    const { result, rerender } = renderHook(
      ({ key, initial }) => useLocalStorage(key, initial),
      { initialProps: { key: 'testKey', initial: 'value1' } }
    );
    
    expect(result.current[0]).toBe('value1');
    
    act(() => {
      result.current[1]('value2');
    });
    
    rerender({ key: 'testKey', initial: 'value1' });
    
    expect(result.current[0]).toBe('value2');
  });

  it('handles JSON parsing errors gracefully', () => {
    // Set invalid JSON in localStorage
    localStorage.setItem('badKey', 'not valid json {');
    
    const { result } = renderHook(() => useLocalStorage('badKey', 'fallback'));
    
    // Should return fallback value when JSON parsing fails
    expect(result.current[0]).toBe('fallback');
  });

  it('works with null and undefined values', () => {
    const { result: nullResult } = renderHook(() => useLocalStorage('nullKey', null));
    expect(nullResult.current[0]).toBe(null);
    
    const { result: undefinedResult } = renderHook(() => useLocalStorage('undefinedKey', undefined));
    expect(undefinedResult.current[0]).toBe(undefined);
  });
});
