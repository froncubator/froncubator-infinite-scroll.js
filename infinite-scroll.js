class InfiniteScroll {
    constructor(obj) {
        this.columns = 0
        this.destroyedOriginElems = []
        this.destroyedLastElems = []
        this.lastScrollTop = 0
        this.init()
    }

    init() {
        this.columns = document.getElementsByClassName("infinite-wrapper").length
        if (this.columns != document.getElementsByClassName("infinite-scroll").length) {
            console.error('Error in HTML template. Number of "infinite-wrapper" elements not equal number of "infinite-scroll" elements. Read documentation on https://github.com/froncubator/froncubator-infinite-scroll.js')
        } else {
            this._startInfiniteScroll()
        }
    }

    removeListener() {
        window.removeEventListener('scroll', () => {this._infiniteScroll()});
    }

    _startInfiniteScroll() {
        for (let i = 0; i < this.columns; i++) {
            this._createElements(i)
            this.destroyedOriginElems.push([])
            this.destroyedLastElems.push([])
        }
        window.addEventListener('scroll', () => {this._infiniteScroll()});
    }

    _createElements(number) {
        let inifiniteWrapperElem = document.getElementById("infinite-wrapper-" + number)

        //create start buffer
        let newStartBuffer = document.createElement("div");
        newStartBuffer.id += "start-buffer-" + number;  
        newStartBuffer.className += " start-buffer";
        inifiniteWrapperElem.insertBefore(newStartBuffer, inifiniteWrapperElem.childNodes[0])

        //create end buffer
        let newEndBuffer = document.createElement("div");
        newEndBuffer.id += "end-buffer-" + number;  
        newEndBuffer.className += " end-buffer";
        inifiniteWrapperElem.appendChild(newEndBuffer)
    }

    _infiniteScroll() {
        let scrollTopNow = document.documentElement.scrollTop
        for (let i = 0; i < this.columns; i++) {
            let infiniteScrollElem = document.getElementById("infinite-scroll-" + i)
            let startBuffer = document.getElementById('start-buffer-' + i)
            let endBuffer = document.getElementById('end-buffer-' + i)
    
            let infinitElemFirst = infiniteScrollElem.getElementsByClassName("infinit-item")[0]

            //When scroll down we calculate line after witch we remove infinite element and make start buffer higher
            let detectStartBufferBottomScrollDown = (window.innerHeight/2) + startBuffer.offsetHeight + infinitElemFirst.offsetHeight 
    
            //When scroll up we calculate line after witch we add infinite element and make start buffer smaller
            // Strange bug with scrrollTop - when elem is deleted from DOM scrollTop changes for marginBottom. So we deleted margin bottom from detectStartBufferBottom2 to check correctly.
            let infinitElemFirstStyle = window.getComputedStyle(infinitElemFirst)
            let marginBottom = infinitElemFirstStyle.marginBottom
            marginBottom = marginBottom.replace('px', '')
            let detectStartBufferBottomScrollUp = (window.innerHeight/2) + startBuffer.offsetHeight - infinitElemFirst.offsetHeight - marginBottom
            
            let bodyRect = document.body.getBoundingClientRect()
            let endBufferRect = endBuffer.getBoundingClientRect()
            //When scroll down we calculate line after witch we add infinite element and make end buffer smaller
            let detectEndBufferTopScrollDown = endBufferRect.top - bodyRect.top - window.innerHeight
    
            //When scroll up we calculate line after witch we remove infinite element and make end buffer higher
            let detectEndBufferTopScrollUp = endBufferRect.top - bodyRect.top - window.innerHeight - infiniteScrollElem.childNodes[infiniteScrollElem.childNodes.length - 1].offsetHeight;
    
            // console.log('top', detectStartBufferBottomScrollDown, detectStartBufferBottomScrollUp)
            // console.log('bottom', detectEndBufferTopScrollDown, detectEndBufferTopScrollUp)
            // console.log('scrollTop', scrollTopNow)
    
            // when scroll down
            if (scrollTopNow > this.lastScrollTop) {
                // destroy up element
                if (detectStartBufferBottomScrollDown < scrollTopNow && infiniteScrollElem.getElementsByClassName("infinit-item").length > 3) {
                    let colElem = infiniteScrollElem.getElementsByClassName("infinit-item")[0] 
                    let heightColElem = colElem.offsetHeight
                    this.destroyedOriginElems[i][this.destroyedOriginElems[i].length] = {0: colElem, 1: heightColElem}
                    let heightBufferElem = parseFloat(startBuffer.offsetHeight)
                    colElem.remove()
                    startBuffer.style.height = heightBufferElem + heightColElem + 'px'
                }
                // return bottom element
                if (detectEndBufferTopScrollDown < scrollTopNow) {
                    if (this.destroyedLastElems[i].length > 0) {
                        for (let j = 0; j<3; j++) {
                            if (this.destroyedLastElems[i][this.destroyedLastElems[i].length - 1] != undefined) {
                                let elemToAdd = this.destroyedLastElems[i][this.destroyedLastElems[i].length - 1]
                                let heightColElem = elemToAdd[1]
                                let heightBufferElem = parseFloat(endBuffer.offsetHeight)
                                infiniteScrollElem.append(elemToAdd[0]);
                                endBuffer.style.height = (heightBufferElem - heightColElem) + 'px'
                                this.destroyedLastElems[i].pop()
                            }
                        }
                    }
                }
            }  else {
            // when scroll up
                //retur up element
                if (detectStartBufferBottomScrollUp > scrollTopNow) {
                    if (this.destroyedOriginElems[i].length > 0) {
                        for (let j = 0; j<3; j++) {
                            if (this.destroyedOriginElems[i][this.destroyedOriginElems[i].length - 1] != undefined) {
                                let elemToAdd = this.destroyedOriginElems[i][this.destroyedOriginElems[i].length - 1]
                                let heightColElem = elemToAdd[1]
                                let heightBufferElem = parseFloat(startBuffer.offsetHeight)
                                infiniteScrollElem.insertBefore(elemToAdd[0], infiniteScrollElem.childNodes[0]);
                                startBuffer.style.height = (heightBufferElem - heightColElem) + 'px'
                                this.destroyedOriginElems[i].pop()
                            }
                        }
                    }
                }
    
                //destroy bottom element
                if (detectEndBufferTopScrollUp > scrollTopNow && infiniteScrollElem.getElementsByClassName("infinit-item").length > 3) {
                    let col = infiniteScrollElem.getElementsByClassName("infinit-item");
                    let colElem = col[col.length - 1];
                    let heightColElem = colElem.offsetHeight
                    this.destroyedLastElems[i][this.destroyedLastElems[i].length] = {0: colElem, 1: heightColElem}
                    let heightBufferElem = parseFloat(endBuffer.offsetHeight)
                    colElem.remove()
                    endBuffer.style.height =  heightBufferElem + heightColElem + 'px'
                }
            }
        }
        this.lastScrollTop = scrollTopNow
    }
}