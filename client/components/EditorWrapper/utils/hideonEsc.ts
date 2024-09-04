export const hideOnEsc = {
    name: 'hideOnEsc',
    defaultValue: true,
    fn({ hide }: { hide: any }) {
        function onKeyDown(event:any) {
            if (event.keyCode === 27) {
                hide();
            }
        }

        return {
            onShow() {
                document.addEventListener('keydown', onKeyDown);
            },
            onHide() {
                document.removeEventListener('keydown', onKeyDown);
            },
        };
    },
};