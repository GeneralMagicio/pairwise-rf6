import posthogJs from 'posthog-js';
export type PostHog = typeof posthogJs;
export {};
declare global {
  interface Window {
    posthog: PostHog
  }
}
