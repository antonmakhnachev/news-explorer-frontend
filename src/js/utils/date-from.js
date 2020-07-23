export function dateFrom (days) {
    const today = new Date();
    const dateFrom = new Date(today.setDate(today.getDate() - days));

    return dateFrom.toISOString().slice(0,10);    
};