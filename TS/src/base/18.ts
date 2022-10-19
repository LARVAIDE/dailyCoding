type BuildArray<
    Length extends number,
    Ele = unknown,
    Arr extends unknown[] = []
> = Arr['length'] extends Length
    ? Arr
    : BuildArray<Length, Ele, [...Arr, Ele]>;


type Add<Num1 extends number, Num2 extends number> = [...BuildArray<Num1>, ...BuildArray<Num2>]['length'];


interface IParams {
    a?: string,
    b?: string,
    c?: string
}

function getParams(params: IParams) {
    if (Object.keys(params).length > 0) {
        console.log('sss')
    } else {
        throw new Error("sss");
    }
}

getParams({})