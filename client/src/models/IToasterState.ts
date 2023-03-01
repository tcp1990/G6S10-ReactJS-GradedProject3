export default interface IToasterState {
    responseState: 'initial' | 'success' | 'error',
    toastMessage: string,
    show: boolean
};