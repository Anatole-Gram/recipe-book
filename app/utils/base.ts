export const minMax = (val: number, limits: number[]): number => Math.max(limits[0], Math.min(val, limits[1]));

export const toRelative = (url: string) => {
    try {
        return url.startsWith('http') ? new URL(url).pathname : url;
    } catch {
        return url;
    }
}