
import * as Types from './types';


export const assert = (cond: boolean, msg: string) => {
  if(!cond) {
    throw new Error(msg);
  }
}

export {Types};
