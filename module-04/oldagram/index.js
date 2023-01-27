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
        likes: 21
    },
    {
        name: "Gustave Courbet",
        username: "gus1819",
        location: "Ornans, France",
        avatar: "images/avatar-courbet.jpg",
        post: "images/post-courbet.jpg",
        comment: "i'm feelin a bit stressed tbh",
        likes: 4
    },
        {
        name: "Joseph Ducreux",
        username: "jd1735",
        location: "Paris, France",
        avatar: "images/avatar-ducreux.jpg",
        post: "images/post-ducreux.jpg",
        comment: "gm friends! which coin are YOU stacking up today?? post below and WAGMI!",
        likes: 152
    }
]


/////////////////////////////////
/*       main functions        */
/////////////////////////////////

function createImage(imgLocation, imgAlt="", additionalClasses="", index=-1) {
    const image = document.createElement("img");
    
    image.src = imgLocation;
    if (imgAlt !== "")
        image.alt = imgAlt;
    if (additionalClasses !== "")
        image.className = additionalClasses;
    
    // The index is used to identify which post is being interacted with
    //     for adding likes
    if (index !== -1)
        image.dataset.index = index;

    return image;
}

function createPargraph(content, additionalClasses="", index=-1) {
    const paragraph = document.createElement("p");

    paragraph.textContent = content;
    if (additionalClasses !== "")
        paragraph.className = additionalClasses;
    
    // The index is used to identify which post is being interacted with
    //     for adding likes
    if (index !== -1)
        paragraph.dataset.index = index;
    
    return paragraph;
}

function createPostHeader(posterName, posterLocation, posterAvatar) {

    // create the header and add to it the article header class
    //    <header class="article-header"></header>
    const postHeader = document.createElement("header");
    postHeader.classList.add("article-header");

    // create the image with the poster avatar and add to it the user img class
    //    <img class="user-img" src="posterAvatar" alt="posters's profile picture">
    const posterImage = createImage(posterAvatar, `${posterName}'s profile picture`, "user-img");

    // create the div container for poster's name and location
    const posterInfoContainer = document.createElement("div");
    
    // create the poster's name paragraph with the accent class
    //    <p class="accent-text"></p>
    const posterNameParag = createPargraph(posterName, "accent-text");

    // create the poster's location paragraph
    const posterLocationParag = createPargraph(posterLocation);

    // append the name and the location to the div container
    posterInfoContainer.append(posterNameParag, posterLocationParag);

    // append the poster info container and the poster's image to the header
    postHeader.append(posterImage, posterInfoContainer);
    
    return postHeader;
}

function createPostFooter(postLikes, userName, postComment, index) {
    // create the footer div container
    const postFooterContainer = document.createElement("div");
    postFooterContainer.classList.add("container");

    // create the fav image
    const favImage = createImage("./images/icon-heart.png", "fav icon", "react-img", index);

    // create the comment image
    const commentImage = createImage("./images/icon-comment.png", "comment icon", "react-img", index);
    
    // create the send image
    const sendImage = createImage("./images/icon-dm.png", "send icon", "react-img", index);

    // create the likes paragraph
    //     <p class="post-text accent-text"></p>
    const likesParag = createPargraph(`${postLikes} likes`, "post-text accent-text", index);

    // create the comment paragraph
    //    <p class="post-text"><span class="accent-text"></span></p>
    const commentParag = document.createElement("p");
    commentParag.innerHTML = `<span class="accent-text">${userName}</span> ${postComment}`;

    // append the react icons, the likes and the comment to the post footer container
    postFooterContainer.append(favImage, commentImage, sendImage, likesParag, commentParag);

    return postFooterContainer;
}

// create a single Oldagram post 
function createPost(post, index) {
    const article = document.createElement("article");

    // create the header of the post
    const postHeader = createPostHeader(post.name, post.location, post.avatar);

    // create the content of the post
    const postImg = createImage(post.post, `${post.name}'s oil painting`, "post-img", index);
    
    // create the footer of the post
    const postFooter = createPostFooter(post.likes, post.username, post.comment, index);

    // append the header, the content and the footer to the article
    article.append(postHeader, postImg, postFooter);

    return article;
}

// render the posts to the viewport
function renderContent(posts) {
    // using fragment to perform the operation away from the DOM
    //    to prevent excessive reflowing and repainting (increase the performance)
    const frag = document.createDocumentFragment();
    for (let i = 0; i < posts.length; i++) {
        const postArticle = createPost(posts[i], i);
        frag.appendChild(postArticle);
    }
    main.appendChild(frag);
}

renderContent(posts);


/////////////////////////////////
/*       Event Handling        */
/////////////////////////////////

for (let i = 0; i < posts.length; i++) {
    // by default the first item with the class react-img is the fav button
    const favIcon = document.querySelector(`.react-img[data-index="${i}"]`);
    const postImage = document.querySelector(`.post-img[data-index="${i}"]`);
    const likesParag = document.querySelector(`p.post-text[data-index="${i}"]`);

    favIcon.addEventListener("click", function(){
        posts[i].likes++;
        likesParag.textContent = `${posts[i].likes} likes`
    });

    postImage.addEventListener("dblclick", function(){
        posts[i].likes++;
        likesParag.textContent = `${posts[i].likes} likes`
    });
}
