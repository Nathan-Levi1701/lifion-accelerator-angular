export default class Loader {
    public state: 'loading' | 'complete' | 'empty' | 'error';

    constructor(state: 'loading' | 'complete' | 'empty' | 'error') {
        this.state = state;
    }
}