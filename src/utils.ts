/**
 * Generate google autodownload url
 */
export function generateAutodownloadUrl(input: string): string {
  const id: string = /\/([A-Za-z0-9\-\_]+)\/(view|export)/
    .exec(input)[0]
    .replace(/^\//, '')
    .replace(/\/(view|export)$/, '')
  return `https://docs.google.com/uc?export=download&id=${id}`
}

/**
 * @source https://stackoverflow.com/a/15458987/2698227
 */
export function isValidGdriveUrl(input: string): boolean {
  return /\/([A-Za-z0-9\-\_]+)\/(view|export)/.test(input)
}
