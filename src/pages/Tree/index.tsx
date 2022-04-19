import { useRef , useEffect} from "react";

interface Node {
    x: number,
    y: number
}

interface Branch {
    startNode: Node,
    endNode: Node
}

function Tree(){
    const canvasEl = useRef<HTMLCanvasElement>(null);
    const width = 900, height = 900;

    useEffect(() => {
        init()
    })

    const init = () => {
        step({
            x: width/2,
            y: 0
        })
    }

    const pendingTasks: Function[] = [];
    const step = (startNode: Node) => {
        const lend = getLeftEndNode(startNode);
        const rend = getRightEndNode(startNode);
        drawBranch({
            startNode: startNode,
            endNode: lend
        });
        drawBranch({
            startNode: startNode,
            endNode: rend
        });
    }

    const getLeftEndNode = (startNode: Node): Node => {
        return {
            x: startNode.x + 30,
            y: startNode.y + 60 * Math.sin(2*Math.PI / 360 * 45)
        }
    }
    const getRightEndNode = (startNode: Node): Node => {
        return {
            x: startNode.x - 30,
            y: startNode.y + 60 * Math.sin(2*Math.PI / 360 * 45)
        }
    }

    const drawBranch = (b: Branch) => {
        const ctx = canvasEl.current?.getContext('2d');
        if (!!ctx) {
            ctx.strokeStyle = 'rgba(0, 0, 0, .5)';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(b.startNode.x, b.startNode.y);
            ctx.lineTo(b.endNode.x, b.endNode.y);
            ctx.stroke();
        }
    }

    return (<canvas ref={canvasEl} width={width} height={height} style={{ border: '1px solid #ccc' }} />)
}

export default Tree;