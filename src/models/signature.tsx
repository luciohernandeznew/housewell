export type Signature = {
    status: 'SENT' | 'UNSENT' | 'SIGNED' | 'REJECTED',
    userId: string,
    id: string,
}