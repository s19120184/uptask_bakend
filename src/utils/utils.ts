
export function formatDate(isString:string): string{
    const date= new Date(isString)
    const fomratter= new Intl.DateTimeFormat('es-Es',{
        year:'numeric',
        month:'long',
        day:'numeric'
    })
    return fomratter.format(date)
}