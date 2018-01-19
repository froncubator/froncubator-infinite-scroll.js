# Froncubator Infinite Scroll
A simple JavaScript library for infinite scroll without dependencies. Remove all problems with load due to the number of items in the DOM.

## Notice

The library is delete a viewed DOM elements and save them to a variable and then return them if necessary. A good solution if you dynamically load items onto a page. 

## Installation

CSS

Notice that after appending "infinite-scroll.css" you must change CSS properties for your project.
```html
<link rel="stylesheet" type="text/css" href="../infinite-scroll.css"/>
```

JS
```html
<script src="../infinite-scroll.js"></script>
```

Add to you HTML template must contain this elements
```html
<div id="infinite-wrapper-0" class="infinite-wrapper">
    <div id="infinite-scroll-0" class='infinite-scroll'></div>
</div>
<div id="infinite-wrapper-1" class="infinite-wrapper">
    <div id="infinite-scroll-1" class='infinite-scroll'></div>
</div>
```
...

You can add so many element as you need: infinite-wrapper-2, infinite-wrapper-3, ..., infinite-wrapper-n

You must append all element into "infinite-scroll" div elements and add them "infinit-item" class.

## Usage

```javascript
const infiniteScroll = new InfiniteScroll()
```

Froncubator Infinite Scroll is freely distributable under the terms of the [MIT license](https://github.com/froncubator/froncubator-infinite-scroll.js/blob/master/LICENSE).