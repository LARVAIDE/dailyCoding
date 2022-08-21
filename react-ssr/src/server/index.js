import app from './http'
import renderer from "./render";

app.get('*', (req, res) => {
    res.send(renderer(req))
})