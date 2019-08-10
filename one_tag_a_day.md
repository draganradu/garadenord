# One tag a day keeps the developer away

There are **100** HTML 5 valid tags and i was wondering could I use all of them in one site. It's a silly question I know, there are some that I have already used in the project, but could I use the rest of them?

Some of them I can't even remember ever using, and some I have never used, 1 a day would surely keep me busy the better part of a year.


## 1 Day: \<caption>


I have never used this tag before in my life. And it`s a tag used to add a caption for a table. It looks like a rich tag if you do something like a CMS containing lots of tables, but I don't have anything similar to this so ... I had to make it work by creating a table to test the output of one of my components. 

I don't want to be negative from the first day but I will never use this tag again, hopefully. 

[/pages/dev.vue:24](./src/pages/dev.vue:24)

``` html
<table>
    <caption>Test</caption>
    <tr v-for="(testData, index) in imgTest" :key="testData">
[...]
```

Did i use it before: **no**
Is it actualy usefull: **no**
Tag count in project: **1** 

-----

