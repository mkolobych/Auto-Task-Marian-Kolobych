export function generateUniqueName(base: string): string {
    return `${base} ${Date.now()}`;
}