var new_short = new Vue({
    el: '#new_short',
    data: {
        message: 'get short url !',
        originalUrl: '',
        userShort: '',
        requestUrl: 'http://localhost:3000/api'
    },
    methods: {
        createUrl: function () {
            const data = `short_name=${this.userShort}&&url=${this.originalUrl}`
            // send request 
            fetch(this.requestUrl, {
                method: 'post',
                headers: {
                  "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
                },
                body: data
            }).then((data) => {
                alert("done!")
            })
        }
    }
})

