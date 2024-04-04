import { formatGranularity } from './chart';

describe('formatGranularity function', () => {
  it('returns the original array when granularity is 1 week', () => {
    const dates = ['2023-01-01', '2023-01-08', '2023-01-15'];
    const granularity = '1 week';
    const result = formatGranularity(dates, granularity);
    expect(result).toEqual(dates);
  });

  it('filters every second date for 2 weeks granularity', () => {
    const dates = ['2023-01-01', '2023-01-08', '2023-01-15', '2023-01-22'];
    const granularity = '2 weeks';
    const expected = ['2023-01-01', '2023-01-15'];
    const result = formatGranularity(dates, granularity);
    expect(result).toEqual(expected);
  });

  it('returns an empty array when provided dates array is empty', () => {
    const granularity = '1 week';
    const result = formatGranularity([], granularity);
    expect(result).toEqual([]);
  });

  it('handles granularity that results in a single date', () => {
    const dates = ['2023-01-01', '2023-01-08', '2023-01-15', '2023-01-22'];
    const granularity = '4 weeks';
    const expected = ['2023-01-01'];
    const result = formatGranularity(dates, granularity);
    expect(result).toEqual(expected);
  });

  it('returns the full dates array when granularity is invalid', () => {
    const dates = ['2023-01-01', '2023-01-08', '2023-01-15'];
    const invalidGranularity: any = '5 weeks';
    const result = formatGranularity(dates, invalidGranularity);
    expect(result).toEqual(dates);
  });

  it('returns the full dates array when granularity is an empty string', () => {
    const dates = ['2023-01-01', '2023-01-08', '2023-01-15'];
    const invalidGranularity: any = '';
    const result = formatGranularity(dates, invalidGranularity);
    expect(result).toEqual(dates);
  });

  it('returns the full dates array when granularity is a non-string value', () => {
    const dates = ['2023-01-01', '2023-01-08', '2023-01-15'];
    const invalidGranularity: any = 10;
    const result = formatGranularity(dates, invalidGranularity);
    expect(result).toEqual(dates);
  });
});