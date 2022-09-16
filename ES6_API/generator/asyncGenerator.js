function* main() {
    try {
        const users = axios.get('https://jsonplaceholder.typicode.com/users')
        console.log(users)

        const posts = axios.get('https://jsonplaceholder.typicode.com/posts')
        console.log(posts)

        const todos = axios.get('https://jsonplaceholder.typicode.com/users/1/todos')
        console.log(todos)
    } catch (error) {
        console.log(error)
    }
}

function co() {
    const g = main()
    function handleResult(res) {
        if (res.done) return
        res.value.then(data => {
            handleResult(g.next(data))
        }, err => {
            g.throw(err)
        })
    }
    handleResult(g.next())
}

co(main)


