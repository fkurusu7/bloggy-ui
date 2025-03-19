export function formatShortDate(isoString: string) {
  return new Date(isoString).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
  });
}

export function formatDateSimple(isoString: string) {
  return new Date(isoString).toLocaleString('en-US', {
    weekday: 'short',
    // year: '2-digit',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

// @ts-ignore
// export const API_BASE_URL = (import.meta as any).env.PROD ? 'https://api.barudesu.codes' : '';
export const API_BASE_URL = import.meta.env?.PROD ? 'https://api.barudesu.codes' : '';

export const logger = (message: any) => {
  import.meta.env?.PROD ? '' : console.log(message);
};
