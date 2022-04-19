import { useEffect, useRef } from "react";

interface Point {
    x: number
    y: number
}
interface Branch {
    start: Point
    length: number
    theta: number
}

function Floor() {
    const canvasEl = useRef<HTMLCanvasElement>(null);
    const width = 1440, height = 900;

    useEffect(() => {
        init();
    })

    const init = () => {
        step({
            start: { x: 0, y: 0 },
            length: 10,
            theta: Math.PI / 4,
        })
    }

    let pendingTasks: Function[] = []
    function step(b: Branch, depth = 0) {
        const end = getEndPoint(b)
        drawBranch(b)
        if (depth < 4 || Math.random() < 0.5) {
            pendingTasks.push(() => step({
                start: end,
                length: b.length - (Math.random() * 2 - 1),
                theta: b.theta - 0.4 * Math.random(),
            }, depth + 1))
        }
        if (depth < 4 || Math.random() < 0.5) {
            pendingTasks.push(() => step({
                start: end,
                length: b.length + (Math.random() * 2 - 1),
                theta: b.theta + 0.4 * Math.random(),
            }, depth + 1))
        }
    }
    function frame() {
        const tasks: Function[] = []
        pendingTasks = pendingTasks.filter((i) => {
            if (Math.random() > 0.3) {
                tasks.push(i)
                return false
            }
            return true
        })
        tasks.forEach(fn => fn())
    }
    let framesCount = 0
    function startFrame() {
        requestAnimationFrame(() => {
            framesCount += 1
            if (framesCount % 3 === 0)
                frame()
            startFrame()
        })
    }
    startFrame()

    const getEndPoint = (b: Branch): Point => {
        return {
            x: b.start.x + b.length * Math.sin(b.theta),
            y: b.start.y + b.length * Math.cos(b.theta)
        }
    }

    const drawLine = (startNode: Point, endNode: Point) => {
        const ctx = canvasEl.current?.getContext('2d');
        if (!!ctx) {
            ctx.strokeStyle = 'rgba(0, 0, 0, .5)';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(startNode.x, startNode.y);
            ctx.lineTo(endNode.x, endNode.y);
            ctx.stroke();
        }
    }

    const drawBranch = (b: Branch) => {
        drawLine(b.start, getEndPoint(b))
    }

    return (<canvas ref={canvasEl} width={width} height={height} style={{ border: '1px solid #ccc' }} />)
}
export default Floor;