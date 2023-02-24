import { tweetsData } from "./data.js";
import { v4 as uuidv4 } from 'https://jspm.dev/uuid';


///////////////////////////////////
/*         Main Functions        */
///////////////////////////////////


renderFeed();

// render tweets on screen
function renderFeed() {
    const feed = document.getElementById('feed');
    feed.classList.add('hidden');
    feed.innerHTML = getTweetsHtml();
    feed.classList.remove('hidden');
}

function getTweetsHtml() {
    let tweetHtml = "";

    tweetsData.forEach(tweet => {

        // create the replies for a tweet if there are replies
        let repliesHtml = "";
        if (tweet.replies.length) {
            tweet.replies.forEach(reply => {
                repliesHtml += `
                <div class="reply">
                    <div class="tweet-inner">
                        <img src="${reply.profilePic}" class="profile-pic" alt="${reply.handle}'s profile pic">
                        <div>
                            <p class="username">${reply.handle}</p>
                            <p class="tweet-text">${reply.tweetText}</p>
                        </div>
                    </div>
                </div>
                `;
            })
        }

        // check for tweet details
        let liked = tweet.isLiked ? "liked" : "";
        let retweeted = tweet.isRetweeted ? "retweeted" : "";

        tweetHtml += `
        <div class="tweet">
            <div class="tweet-inner">
                <img src="${tweet.profilePic}" class="profile-pic" alt="${tweet.handle}'s profile pic">
                <div>
                    <p class="username">${tweet.handle}</p>
                    <p class="tweet-text">${tweet.tweetText}</p>
                    <div class="tweet-details">
                        <span class="tweet-detail">
                            <i class="fa-regular fa-comment-dots" data-reply="${tweet.uuid}"></i>
                            ${tweet.replies.length}
                        </span>
                        <span class="tweet-detail">
                            <i class="fa-solid fa-heart ${liked}" data-like="${tweet.uuid}"></i>
                            ${tweet.likes}
                        </span>
                        <span class="tweet-detail">
                            <i class="fa-solid fa-retweet ${retweeted}" data-retweet="${tweet.uuid}"></i>
                            ${tweet.retweets}
                        </span>
                    </div>
                </div>
            </div>
            <div id="replies-${tweet.uuid}" class="replies hidden">
                <div class="add-reply">
                    <div class="add-tweet-area">
                        <img src="./images/scrimbalogo.png" class="profile-pic" alt="scrimba profile pic">
                        <textarea id="reply-input-${tweet.uuid}" placeholder="Tweet your reply"></textarea>
                    </div>
                    <button id="reply-btn-${tweet.uuid}">Reply</button>
                </div>
                ${repliesHtml}
            </div>
        </div>
        `;
    });

    return tweetHtml;
}


///////////////////////////////////
/*         Event Handling        */
///////////////////////////////////

document.addEventListener('click', evt => {
    if (evt.target.dataset.like) {
        handleLikeClick(evt.target.dataset.like);
    }
    else if (evt.target.dataset.retweet) {
        handleRetweetClick(evt.target.dataset.retweet);
    } else if (evt.target.dataset.reply) {
        handleReplyClick(evt.target.dataset.reply);
    } else if (evt.target.id === "tweet-btn") {
        addTweet();
    } else if (evt.target.id.includes("reply-btn-", 0)) {
        // if a reply button is pressed add the reply
        addReply(evt.target.id.substring(10));
    }
})

function handleLikeClick(tweetId) {
    const tweetObject = tweetsData.filter(tweet => tweet.uuid === tweetId)[0];
    tweetObject.likes = tweetObject.isLiked ? (tweetObject.likes - 1) : (tweetObject.likes + 1);
    tweetObject.isLiked = !tweetObject.isLiked;
    renderFeed();
}

function handleRetweetClick(tweetId) {
    const tweetObject = tweetsData.filter(tweet => tweet.uuid === tweetId)[0];
    tweetObject.retweets = tweetObject.isRetweeted ? (tweetObject.retweets - 1) : (tweetObject.retweets + 1);
    tweetObject.isRetweeted = !tweetObject.isRetweeted;
    renderFeed();
}

function handleReplyClick(tweetId) {
    document.getElementById(`replies-${tweetId}`).classList.toggle('hidden');
}

function addTweet() {
    const tweetInput = document.getElementById('tweet-input');
    // check if tweet empty
    if (!tweetInput.value.trim()) {
        return;
    }

    const tweet = {
        handle: `@scrimba`,
        profilePic: `./images/scrimbalogo.png`,
        likes: 0,
        retweets: 0,
        tweetText: tweetInput.value,
        replies: [],
        isLiked: false,
        isRetweeted: false,
        uuid: uuidv4()
    }
    tweetsData.unshift(tweet);

    tweetInput.value = "";
    renderFeed()
}

function addReply(tweetId) {
    const replyInput = document.getElementById(`reply-input-${tweetId}`);
    // check if reply empty
    if(!replyInput.value.trim())  {
        return;
    }

    const reply = {
        handle: "@scrimba",
        profilePic: "./images/scrimbalogo.png",
        tweetText: replyInput.value
    };

    const tweetObj = tweetsData.filter(tweet => tweet.uuid === tweetId)[0];
    tweetObj.replies.unshift(reply);
    
    replyInput.value = "";
    renderFeed();
}