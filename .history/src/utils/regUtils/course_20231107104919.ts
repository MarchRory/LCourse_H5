const Reg = {
    filterHTMLInCommand: /<input[^>]*?value=[\"\'](.*?)[\"\'][^>]*>/i
}

export function filterHTMLInCommand(originCommand: string) {
    return originCommand.replace(Reg.filterHTMLInCommand, '$1')
}