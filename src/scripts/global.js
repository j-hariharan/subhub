function logout () {
    window.localStorage.removeItem('username')
    window.location = './index.html'
}