import log from 'loglevel';

interface EventParams {
  event_callback?: () => void;
}

interface ConfigParams {
  page_path?: string
}

interface SetParams {
  user_id?: string
}

interface PurchaseParams {
  value: string;
  event_callback?: () => void
}

type PropertyID = 'G-M78C6GHGTG';
type OpType = 'js'|'config'|'event' | 'set';

const gtag: (
  op: OpType,
  type?: Date | PropertyID | SetParams,
  args?: EventParams | PurchaseParams | ConfigParams
) => void = (window as any).gtag;

class Analytics {
  config() {
    gtag('js', new Date());
    gtag('config', 'G-M78C6GHGTG');
  }

  pageView(path: string) {
    gtag('config', 'G-M78C6GHGTG', {
      page_path: path,
    });
  }
}

export const analytics = new Analytics();
