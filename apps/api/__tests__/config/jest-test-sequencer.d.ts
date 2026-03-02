// jest-extensions.d.ts
declare module '@jest/test-sequencer' {
  // eslint-disable-next-line import/no-extraneous-dependencies
  import { Test } from '@jest/core'

  export default class TestSequencer {
    sort(tests: Array<Test>): Array<Test>
  }
}
