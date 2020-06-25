var new_short = new Vue({
    el: '#new_short',
    data: {
        message: 'get short url !',
        haveShort: false,
        originalUrl: '',
        userShort: '',
        requestUrl: 'http://localhost:3000/api',
        yourShortUrl: ''
    },
    methods: {
        createUrl: async function () {
            console.log("send a request")
            const data = `short_name=${this.userShort}&&url=${this.originalUrl}`
            // send request 
            const response = await fetch(this.requestUrl, {
                method: 'post',
                headers: {
                  "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
                },
                body: data
            });
            const result = await response.json()
            this.haveShort = true

            console.log(result)
            if (result.checkCode == 100) {
                // do again
                this.yourShortUrl = `Your desired short url had been occupied, maybe use ${result.short_name} ?`
            } else {
                console.log("lskdjf;alkdsjf;laskdjfladskjfdslkfj")
                this.yourShortUrl = `http://localhost:3000/${result.short_name}`
            }
            
        }
    }
})

