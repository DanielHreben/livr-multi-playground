import { observable } from 'mobx';

export default class AppState {
    @observable message = 'Waiting for your input...';
    @observable status =  'pending';
    @observable rules = {};
    @observable input = {};
    @observable implementations = [];
}
