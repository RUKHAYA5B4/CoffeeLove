import { user } from './user.model';

describe('User', () => {
  it('should create an instance', () => {
    expect(new user()).toBeTruthy();
  });
});
