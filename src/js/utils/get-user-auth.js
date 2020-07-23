export function getUserAuth() {
    return JSON.parse(localStorage.getItem('user'));
};