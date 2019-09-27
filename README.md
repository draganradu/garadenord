# Gara de nord 

> http://www.fotodex.ro/

**0.0.4** | Fotodex gara de nord is a light study. A vue 3 website made to showcase the diferent ways the light interacts with the scenary. And force me the author to play a bit more with tehnologies i will have to use 3 years from now when they are stable and conviniontly obsilete.

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

## Custom commands

``` bash
# build only color json
npm run only color
```
## Metrics

|  [v](doc/v_log.md) | [Size/JS](doc/js_size.png)   | [Size/Css](doc/css_size.png)  | [Seo](https://www.woorank.com/en/www/fotodex.ro)   | [Load time](doc/load_time.png)     | [LH P](doc/lh.png)   | [LH A](doc/lh.png) | [LH B](doc/lh.png)  | [LH S](doc/lh.png)  |
| ---       | ---       | ---       | ---   | ---           | ---   | ---   | ---   | ---   |
| 0.0.2     | 2.8 Mb    | 4.7 Kb    | 37    | 1802 ms       |       |       |       |       |
| 0.0.3     | 3.4 Mb    | 4.7 Kb    | 46    | 1627 ms       | 80    | 86    | 86    | 100   |      
| 0.0.4     |           |           |       |               |

## ToDo

**For version 0.0.4**

- [x] add General helper function
- [x] add Color helper function
- [X] remove bootrsap 4
- [ ] Cleanup SVG
- [ ] make meta description work
- [ ] deploy by ftp
- [ ] build version fix pages to show all the modifications 
- [x] add grayscale to color bar
- [ ] Seo
    - [ ] Title need studiu de lumina;
    - [ ] Add meta description useing color codes

    - [ ] 404 page need 404 head

    - [ ] Add social media pages
    
    - [ ] remove undescores from url
        - [ ] build normalize name (rename) function

    - [ ] add Schema.org to page

    - [ ] Open Graph Protocol

    - [ ] set asset compresion for js

- [ ] fix iarna cutout circle in the middle
**For version 0.0.3**

- [X] Google analitics integration

- [x] Add version in api file and add it to all page
    - [x] Api
    - [x] All page

- [x] Color Api 
    - [x] dose not load properly 
    - [x] Create a copy in api folder when build
    - [x] Add color api in useing axios in page

- [x] Show entire description in the footer
- [x] Show special on 2 rows
- [x] Fix social media row and make it black

- [x] HTacces redirect rules
    - [x] everithing is redirected to www 
    - [x] everithing is redirected to https 

- [x] site map
    - [X] add sitemap to robots.txt 
    - [x] fix sitemap 
    - [x] resubmit 

 - [x] fix color bar undefined errors for values computed after  

 helpers
**Need to fix backlog**

Starting point is 37 and i expect 70 ish
 
- [ ] convert to a 80 ish height for cards and align to middle
- [ ] fix landscape preview screen  

- [ ] Add audio

- [ ] Add jest test
    - [ ] build some simple tests

- [ ] optimize sitemap xml    

- [ ] refactor Css

- [ ] refactor readme md 
- [ ] convert PHP scripts to jsons
- [ ] first HTML loader
- [ ] separate JS from CSS from webpack
- [ ] color helperpage

https://medium.com/@meakaakka/a-beginners-guide-to-writing-a-kickass-readme-7ac01da88ab3


For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
