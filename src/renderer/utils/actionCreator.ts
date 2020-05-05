export default function actionCreator (type: string, fn = (...args) => ({})) {
    return (...params) => ({
        type,
        payload: fn(...params)
    });
}
