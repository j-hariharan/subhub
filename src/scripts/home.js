let params = new URLSearchParams(window.location.search)
let username = window.localStorage.getItem('username')

if (!username) window.loaction = "./index.html"


let body = document.getElementById('body')
let db = firebase.firestore()

getGroups()

async function getGroups () {
        
    let user_docs = await db.collection('users').where('uid', '==', username).get()
    if (user_docs.docs.length == 0) window.localStorage.removeItem('username'), window.location = "./index.html"
    let user = user_docs.docs[0].data()

    let group_ids = user.groups

    let group_docs = await Promise.all(group_ids.map(e => db.collection('groups').doc(e).get()))
    let groups = group_docs.map(e => e.exists && {...e.data(), id: e.id})

    if (groups.length ==0) body.innerHTML += "You do not seem to be in any groups..."

    for (let i of groups) {
        body.innerHTML += `
            <div id="group" class="card orange lighten-5" onclick="window.location = './group.html?groupid=${i.id}'">
                ${i.name}
            </div>
        `
    }
}