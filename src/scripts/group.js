let params = new URLSearchParams(window.location.search)
let username = window.localStorage.getItem('username')

if (!username) window.loaction = "./index.html"


let body = document.getElementById('body')
let db = firebase.firestore()
let group_id = params.get('groupid')

if(!group_id) window.loaction = "./home.html"

getChapters()

async function getChapters () {
    let [ group_doc, chapters_docs ] = await Promise.all([
        db.collection('groups').doc(group_id).get(), 
        db.collection('groups').doc(group_id).collection('chapters').get()
    ])

    if(!group_doc.exists) window.loaction = "./home.html"

    let group = group_doc.data()
    let chapters = chapters_docs.docs.map(e => ({...e.data(), id: e.id}))

    for (let i of chapters) {
        body.innerHTML += `
            <div id="chapter" class="card orange lighten-5" onclick="window.location = './chapter.html?chapterid=${i.id}'">
                ${i.name}
            </div>
        `
    }

    document.getElementById('group_name').innerText = group.name
    document.getElementById('group_name').href = "./group.html?groupid="+group_id
}