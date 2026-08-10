declare module "*.css";

/**
 * View Transitions API. Not in the TypeScript DOM lib for this TS version yet,
 * and always feature-detected before use (Firefox has no support as of 2026).
 */
interface ViewTransition {
  readonly ready: Promise<void>;
  readonly finished: Promise<void>;
  readonly updateCallbackDone: Promise<void>;
  skipTransition(): void;
}

interface Document {
  startViewTransition?: (callback: () => void | Promise<void>) => ViewTransition;
}
