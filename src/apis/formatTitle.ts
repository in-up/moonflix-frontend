export function formatTitle(title: string): string {
    const titleWithoutYear = title.replace(/\s*\(\d{4}\)/, '');

    const match = titleWithoutYear.match(/^(.*), (The|A)$/i);

    if (match) {
        return `${match[2]} ${match[1]}`;
    } else {
        return titleWithoutYear;
    }
}
