export { }

interface Post {
    title: string
    content: string
    subtitle?: string
    readonly summary: string
}

function prinf(post: Post) {
    console.log(post.title, post.content)
}

prinf({
    title: '',
    content: '',
    summary: 'ssss'
});

interface Cache {
    [key: string]: string
}

const cache: Cache = {}

cache.a = 'a'
cache.b = 'b'