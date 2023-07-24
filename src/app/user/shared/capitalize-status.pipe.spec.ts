import { CapitalizeStatusPipe } from './capitalize-status.pipe';

describe('CapitalizeStatusPipe', () => {
  it('create an instance', () => {
    const pipe = new CapitalizeStatusPipe();
    expect(pipe).toBeTruthy();
  });
});
