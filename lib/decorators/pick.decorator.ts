export const pick = Symbol('pick');

export const Pick = () => {
    return (target: any, propertyKey: string) => {
        const propertyList = target[pick] || (target[pick] = []);
        propertyList.push(propertyKey);
    };
};

export function getPick(obj: any): Array<string> {
    return obj.prototype[pick];
}
