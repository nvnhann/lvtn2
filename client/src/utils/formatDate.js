export const formatDate = date => {
    if (!date) return
    const m = new Date(date);
    return (
        m.getUTCFullYear() + "/" +
        ("0" + (m.getUTCMonth() + 1)).slice(-2) + "/" +
        ("0" + m.getUTCDate()).slice(-2) + " " +
        ("0" + m.getUTCHours()).slice(-2) + ":" +
        ("0" + m.getUTCMinutes()).slice(-2) + ":" +
        ("0" + m.getUTCSeconds()).slice(-2))
}