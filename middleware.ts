export {default} from 'next-auth/middleware'

export const config = {
    matcher: [
        '/tickets/create', 
        '/tickets/edit/:id+'
    ]
}