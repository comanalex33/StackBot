export function formatDate(date) {
    let dateObject = null

    if(!date) {
        return 'Not set'
    }

    if(typeof date === 'string') {
        dateObject = new Date(date)
    } else {
        dateObject = date
    }
    
    const day = dateObject.getDate().toString().padStart(2, '0');  // Ensures two digits
    const month = (dateObject.getMonth() + 1).toString().padStart(2, '0');  // Month is zero-indexed, add 1 to correct
    const year = dateObject.getFullYear();

    return `${day}/${month}/${year}`;
}

export function formatDateForApiRequest(date) {
    let dateObject = null

    if(typeof date === 'string') {
        dateObject = new Date(date)
    } else {
        dateObject = date
    }
    
    const day = dateObject.getDate().toString().padStart(2, '0');  // Ensures two digits
    const month = (dateObject.getMonth() + 1).toString().padStart(2, '0');  // Month is zero-indexed, add 1 to correct
    const year = dateObject.getFullYear();

    return `${year}-${month}-${day}`;
}
