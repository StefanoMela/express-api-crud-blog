// imports
const dbPosts = require('../data/db.json')
const path = require("path");
const { updateDBFile } = require('../utils.js');


// export controller
const index = (req, res) => {
    res.format({
        html: () => {
            let html = '<div>'
            dbPosts.forEach(post => {
                html +=
                    `<img width="250" src="/img/${post.image}"/>
                    <h2>${post.title}</h2>
                    <p>${post.content}
                    <h3>tags:</h3>
                    <ul>
                    `;
                post.tags.forEach(tag => html += `<li>${tag}</li>`);
                html += `
                    </ul>
                    <a href="/posts/${post.slug}"> Vai al post</a>
                    <br>
                    `
            })
            html += `</div>`
            res.send(html)
        },
    })
}
const show = (req, res) => {
    const requestedSlug = req.params.slug;
    const requestedPost = dbPosts.find(post => post.slug === requestedSlug);
    if (!requestedPost) {
        return res.status(404).send(`<h1>Post non trovato</h1>`);
    }
    res.format({
        html: () => {
            requestedPost ? res.send(`
                <div>
                    <h3>${requestedPost.title}</h3>
                    <img width="200" src=${`/img/${requestedPost.image}`} />
                    <p>${requestedPost.content}</p>
                    <p><strong>Tags</strong>: ${requestedPost.tags.map(t => `<span class="tag">${t}</span>`).join(', ')}</p>
                    <a href="/posts">torna alla lista</a>
                </div>
            `) : res.status(404).send(`<h1>Post non trovato</h1>`);
        }
    })
}

const createSlug = (name) => {
    const baseSlug = name.replaceAll(' ', '-').toLowerCase().replaceAll('/', '');
    const slugs = dbPosts.map(p => p.slug);
    let counter = 1;
    let slug = baseSlug;
    while(slugs.includes(slug)){
        slug = `${baseSlug}-${counter}`;
        counter ++;
    }
    return slug;
}

const create = (req, res) => {
    const prova = req.file;
    console.log(prova);
    const {title, content, image, tags} = req.body;
    const slug = createSlug(title)
    const newPost = {
        title,
        content,
        tags,
        image,
        slug
    }
    dbPosts.push(newPost);
    updateDBFile(dbPosts);
    res.format({
        html: () => {
            res.redirect(`/posts/${newPost.slug}`)
        },
        default: () => {
            res.json(newPost);
        }
    })
}

const download = (req, res) => {
    const slug = req.params.slug;
    const post = dbPosts.find(post => post.slug === slug)
    const downloadPath = path.join('public/img/' + post.image);
    console.log(downloadPath);
    res.download(downloadPath);
}

const destroy = (req, res) => {

} 

module.exports = {
    index,
    show,
    create,
    download,
}