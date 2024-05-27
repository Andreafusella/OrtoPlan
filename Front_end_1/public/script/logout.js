function logout(){
    localStorage.clear();
    window.location.href = '/';
}


if (localStorage.length === 0){
    window.location.href = '/';
}
