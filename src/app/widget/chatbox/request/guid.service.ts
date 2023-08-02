import { Injectable } from '@angular/core';

@Injectable()
export class GuidService {

  constructor() { }

  public get GuidEmpty() {
    return '00000000-0000-0000-0000-000000000000';
  }

  S4() {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  }

  newGuid(): string {
    // then to call it, plus stitch in '4' in the third group
    return (this.S4() + this.S4() + '-' + this.S4() + '-4' +
      this.S4().substring(0, 3) + '-' + this.S4() + '-' + this.S4() +
      this.S4() + this.S4())
      .toLowerCase();
  }

  /**
   * Generate new random token
   * @returns
   */
  newRandom() {
    return this.S4();
  }
}
