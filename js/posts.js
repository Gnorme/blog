var Kc = window['kenticoCloudDelivery'];
var deliveryClient = new Kc.DeliveryClient({
    projectId: '3e35f4e9-c126-00b0-1e8c-47d62977d6b5'
   });

Vue.component('blog-list', {
    props:['limit'],
    data: function() {
        return {
            articles:[{title:'test',image:'',post:''}]
        }     
    },
    created: function() {
        var query = deliveryClient
        .items()
        .type('blog_post')
        .getPromise()
        .then(response => {
            this.$data.articles = response.items.map(item => ({
                title:item.title.value,
                image:item.image.assets[0].url,
                post:item.post.value
            }))
            console.log(response)
            }
        );
    },
    template: `
        <div id="posts">
            <div v-for="(article,index) in articles" class="p-container" :class="{'dark':index % 2 === 0, 'light':index % 2 !== 0}">
                <div class="post">
                    <div class="content">
                        <h1>{{article.title}}</h1>
                        <img :src="article.image" width="100%" height="auto"></img>
                        <div v-html="article.post"></div>
                    </div>
                </div>
            </div>
        </div>
    `
})

var blog = new Vue({
    el:'#blog',
    data:{
        posts:[]
    }
})