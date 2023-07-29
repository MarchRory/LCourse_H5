const defaultTitle: String = '易二课'

export default function getPageTitle(pageTitle: [String, undefined, null]): String {
    if (pageTitle) {
        return `${pageTitle}`
    }
    return defaultTitle
}