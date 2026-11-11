const STORAGE_KEY = "hy-newsletter-emails";

/**
 * Frontend-only: the address is kept in this browser's localStorage.
 * Replace the body with a call to your email provider or database when the backend exists.
 */
export const newsletterService = {
  async subscribe(email: string): Promise<void> {
    const normalized = email.trim().toLowerCase();
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      const list: string[] = raw ? (JSON.parse(raw) as string[]) : [];
      if (!list.includes(normalized)) {
        list.push(normalized);
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
      }
    } catch {
      // Storage unavailable (private mode). The UI still confirms the submission.
    }
  },
};
