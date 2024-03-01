export function formatMoney(number: number | bigint) {
    return new Intl.NumberFormat('en-US',
        {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(number);
}