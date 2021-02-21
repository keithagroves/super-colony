
import * as Types from './types';
import * as Maths from './maths';

export const assert = (cond: boolean, msg: string) => {
  if(!cond) {
    throw new Error(msg);
  }
}

export {Types,Maths};
