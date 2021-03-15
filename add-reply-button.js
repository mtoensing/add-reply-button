const replybtns = document.querySelectorAll(".comment-list > li .comment-reply");

for (let i = 0; i < replybtns.length; i++) {
    let replybtn = replybtns[i];
    let replybtncp = replybtn.cloneNode(true);
    let cc = replybtn.parentElement.querySelectorAll('.children div.comment-content');
    let lastcc = cc[cc.length - 1];
    lastcc.appendChild(replybtncp);
}
