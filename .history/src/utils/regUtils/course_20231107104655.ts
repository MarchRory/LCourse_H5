const Reg = {
    filterHTMLInCommand: RegExp = 
}

export function filterHTMLInCommand(originCommand: string) {
    if (Reg.filterHTMLInCommand === '') {
        Reg.filterHTMLInCommand = /<input[^>]*?value=[\"\'](.*?)[\"\'][^>]*>/i
    }

    return originCommand.replace(Reg.filterHTMLInCommand, '$1')
}