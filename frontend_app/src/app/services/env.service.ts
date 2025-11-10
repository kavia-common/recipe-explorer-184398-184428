/**
 * Simple environment access wrapper for browser-run Angular app.
 * Reads build-time injected global (from index.html) or process.env when SSR.
 */
import { Injectable } from '@angular/core';

// PUBLIC_INTERFACE
@Injectable({ providedIn: 'root' })
export class EnvService {
  /** NG_APP_API_BASE value if present, otherwise undefined */
  get apiBase(): string | undefined {
    // Try SSR env
    const ssr = (typeof process !== 'undefined' && (process as any)?.env?.NG_APP_API_BASE) || undefined;
    if (ssr) return ssr;

    // Try window-injected env (if any future setup adds it)
    const w = typeof window !== 'undefined' ? (window as any) : undefined;
    const fromWindow = w?.NG_APP_API_BASE || w?.ENV?.NG_APP_API_BASE;
    return fromWindow;
  }

  /** True if we should use local mock data. */
  get useMock(): boolean {
    return !this.apiBase || this.apiBase.trim().length === 0;
  }
}
