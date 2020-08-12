let params = new URLSearchParams(window.location.search)
let username = window.localStorage.getItem('username')

if (!username) window.loaction = "./index.html"


function logout () {
    window.localStorage.removeItem('username')
    window.location = './index.html'
}



let body = document.getElementById('body')
let db = firebase.firestore()

let group = params.get('group')
let chapter = params.get('chapter')
let submission = params.get('submission')

if (!group) {
    getGroups()
}

async function getGroups () {
    let username = window.localStorage.getItem('username')
    
    
    let user_docs = await db.collection('users').where('uid', '==', username).get()
    if (user_docs.docs.length == 0) window.localStorage.removeItem('username'), window.location = "./index.html"
    let user = user_docs.docs[0].data()

    let group_ids = user.groups

    let group_docs = await Promise.all(group_ids.map(e => db.collection('groups').doc(e).get()))
    let groups = group_docs.map(e => e.exists && e.data())

    for (let i of groups) {
        body.innerHTML += `
            <div id="group" class="card">
                ${i.name}
            </div>
        `
    }
}