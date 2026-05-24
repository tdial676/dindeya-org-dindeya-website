/**
 * PWA and Service Worker utilities
 */

export async function registerServiceWorker(path: string = '/sw.js'): Promise<ServiceWorkerRegistration | null> {
  if (!('serviceWorker' in navigator)) {
    console.warn('Service Workers not supported');
    return null;
  }

  try {
    const registration = await navigator.serviceWorker.register(path);
    console.log('Service Worker registered:', registration);

    // Check for updates periodically
    setInterval(() => {
      registration.update();
    }, 60000); // Every minute

    // Listen for controller changes
    let refreshing = false;
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      if (!refreshing) {
        refreshing = true;
        window.location.reload();
      }
    });

    return registration;
  } catch (error) {
    console.error('Service Worker registration failed:', error);
    return null;
  }
}

export async function checkServiceWorkerUpdates(
  registration: ServiceWorkerRegistration
): Promise<void> {
  const update = await registration.update();
  console.log('Service Worker update check:', update);
}

export async function unregisterServiceWorker(): Promise<void> {
  if ('serviceWorker' in navigator) {
    const registrations = await navigator.serviceWorker.getRegistrations();
    for (const registration of registrations) {
      await registration.unregister();
    }
  }
}

export function setupInstallPrompt(
  onReady: (event: any) => void
): void {
  window.addEventListener('beforeinstallprompt', (e: any) => {
    e.preventDefault();
    onReady(e);
  });

  window.addEventListener('appinstalled', () => {
    console.log('PWA installed successfully');
  });
}

export function isInstalledAsPWA(): boolean {
  // Check if running as PWA
  const isStandalone = window.matchMedia('(display-mode: standalone)').matches ||
    (window.navigator as any).standalone === true;
  return isStandalone;
}

export function requestPersistentStorage(): Promise<boolean> {
  if (navigator.storage?.persist) {
    return navigator.storage.persist();
  }
  return Promise.resolve(false);
}
