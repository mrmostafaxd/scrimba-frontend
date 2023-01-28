/////////////////////////////////
/*       global variables      */
/////////////////////////////////

const main = document.querySelector("main");

const posts = [
    {
        name: "Vincent van Gogh",
        username: "vincey1853",
        location: "Zundert, Netherlands",
        avatar: "images/avatar-vangogh.jpg",
        post: "images/post-vangogh.jpg",
        comment: "just took a few mushrooms lol",
        likes: 21,
        isLiked: false
    },
    {
        name: "Gustave Courbet",
        username: "gus1819",
        location: "Ornans, France",
        avatar: "images/avatar-courbet.jpg",
        post: "images/post-courbet.jpg",
        comment: "i'm feelin a bit stressed tbh",
        likes: 4,
        isLiked: false
    },
        {
        name: "Joseph Ducreux",
        username: "jd1735",
        location: "Paris, France",
        avatar: "images/avatar-ducreux.jpg",
        post: "images/post-ducreux.jpg",
        comment: "gm friends! which coin are YOU stacking up today?? post below and WAGMI!",
        likes: 152,
        isLiked: false
    }
]


/////////////////////////////////
/*       main functions        */
/////////////////////////////////

// create post as string
function createPost(postEl, index) {
    const {name, username, location, avatar, post, comment, likes} = postEl;
    return `
    <article>
        <header class="article-header">
            <img class="user-img" src="${avatar}" alt="${name}'s profile picture">
            <div>
                <p class="accent-text">${name}</p>
                <p>${location}</p>
            </div>
        </header>
        <img class="post-img" src="${post}" alt="${name} oil painting" data-name="post" data-index="${index}">
        <div class="container">
            <img class="select react-img" src="./images/icon-heart.png" alt="like icon" data-name="like"  data-index="${index}">
            <img class="react-img" src="./images/icon-comment.png" alt="comment icon" data-name="comment" data-index="${index}">
            <img class="react-img" src="./images/icon-dm.png" alt="send icon" data-name="send" data-index="${index}">
            <p class="post-text accent-text" data-index="${index}">${likes} likes</p>
            <p class="post-text"><span class="accent-text">${username}</span> ${comment}</p>
        </div>
    </article>
    `;
}

// render post string on screen
function renderPosts(posts) {
    let postHTML = posts.map((el, index) => createPost(el, index));
    main.innerHTML = postHTML;
}

// change the number of likes based on the event listener
function renderLikes(index, likes) {
    const likesParag = document.querySelector(`p.post-text[data-index="${index}"]`);
    likesParag.textContent = `${likes} likes`;
}

const time_1 = performance.now();
renderPosts(posts);


// /////////////////////////////////
// /*       Event Handling        */
// /////////////////////////////////

function eventLike(evt, elName) {
    if (evt.target.dataset.name && evt.target.dataset.name === elName) {
        if (posts[evt.target.dataset.index].isLiked) {
            posts[evt.target.dataset.index].likes--;
        } else {
            posts[evt.target.dataset.index].likes++;
        }
        posts[evt.target.dataset.index].isLiked = !posts[evt.target.dataset.index].isLiked;
        renderLikes(evt.target.dataset.index, posts[evt.target.dataset.index].likes);
    }
}

main.addEventListener("click", e => eventLike(e,"like"));
main.addEventListener("dblclick", e => eventLike(e, "post"));

const time_2 = performance.now();
console.log(`method two takes ${time_2 - time_1}`);
