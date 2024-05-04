export function formatDate(date) {
    const day = date.getDate().toString().padStart(2, '0');  // Ensures two digits
    const month = (date.getMonth() + 1).toString().padStart(2, '0');  // Month is zero-indexed, add 1 to correct
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
}
