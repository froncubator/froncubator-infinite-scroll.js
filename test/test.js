window.onload = function() {
    let i = 0
    let addElem = function() {
        for (let j = i; j < i + 20; j++) {
            for (let l =0; l < document.getElementsByClassName("infinite-wrapper").length; l++) {
                let infiniteScrollElem = document.getElementById("infinite-scroll-" + l)
                let node = document.createElement("div");  
                let rand = Math.floor(Math.random() * (400 - 200) + 200);
                node.style.height = rand + 'px'
                node.className += " infinit-item infinit-item-" + j;            
                let textnode = document.createTextNode(l + '' + j);         
                node.appendChild(textnode);                              
                infiniteScrollElem.append(node);
            }
        }
        i = i + 20
    } 
    addElem()

    let addColumnsItems = function() {
        let position = document.documentElement.scrollTop
        if (document.documentElement.offsetHeight === (position + window.innerHeight)) {
            addElem()
        }
    }
    window.addEventListener('scroll', addColumnsItems);


    const infiniteScroll = new InfiniteScroll()
};