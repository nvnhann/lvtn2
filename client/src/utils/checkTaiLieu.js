export const checkTL = (id, arr) => {
    if(!id || !arr) return;
    if(arr.length === 0) return;
    let check = false;
    arr.map(e=> {
        if(e.id === id) check = true
    })
    return check
}