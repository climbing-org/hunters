export class GeneralHelper {
    static isEmpty(res) {
        if (res.data) {
            return !!res.data['detail'];
        } else {
            return true;
        }
    }

    static reloadApp() {
        window.location.replace('/');
    }
}
