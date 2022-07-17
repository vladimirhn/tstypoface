
export default function stepBack(arr:Array<any>): any[] {
    return arr.filter((_, index) => index !== arr.length - 1);
}