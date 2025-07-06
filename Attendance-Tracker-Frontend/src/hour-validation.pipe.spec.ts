import { HourValidationPipe } from './hour-validation.pipe';

describe('HourValidationPipe', () => {
  it('create an instance', () => {
    const pipe = new HourValidationPipe();
    expect(pipe).toBeTruthy();
  });
});
