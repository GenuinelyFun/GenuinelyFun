export function buildURL(
  uri: string,
  searchParams?: Record<string, unknown>
): string {
  if (!searchParams) {
    return uri;
  }

  const urlSearchParams = new URLSearchParams();

  for (const [key, value] of Object.entries(searchParams)) {
    urlSearchParams.set(key, `${value}`);
  }

  return urlSearchParams.size > 0
    ? `${uri}?${urlSearchParams.toString()}`
    : uri;
}
