(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(factory(root));
    } else if (typeof exports === 'object' && typeof exports.nodeName !== 'string') {
        // CommonJS
        module.exports = factory(root);
    } else {
        // Browser globals
        root.pu = root.pu || {};
        root.pu.dialog = factory(root);
    }
}(typeof window !== "undefined" ? window : this, function(root) {
    let document = root.document;
    if (!document) console.error('purecss-ui-js requires a window with a document');

    class Dialog {
        constructor(args) {
            args = args || {};
            if (args.isModal == null) args.isModal = true;

            let _this = this;

            _this.target = null;

            if (args.id) {
                _this.target = document.getElementById(id);
            } else {
                _this.target = document.createElement('div');
                _this.target.id = document.getElementsByClassName('dialog').length + 1;
                _this.target.className = args.className || 'dialog';

                _this.target.innerHTML = `
                <div class="dialog-content card card-primary">
                    ${(() => {
                        if (args.title) {
                            return `
                            <div class="card-header h5 text-bold">
                                ${args.title}
                            </div>
                            `;
                        } else {
                            return ``;
                        }
                    })()}
                    <div class="card-body">
                        ${args.message}
                    </div>
                </div>
                `;

                document.body.appendChild(_this.target);
            }

            // let closeButton = null;
            // // get a handle to an existing closeButton if it exists.
            // let closeButtons = _this.target.getElementsByClassName('dialog-close');
            // if (closeButtons != null && closeButtons.length > 0) {
            //     closeButton = closeButtons[0];
            // }
            // // Add a new close button if not already present.
            // if (closeButton == null) {
            //     closeButton = document.createElement('div');
            //     closeButton.className = 'dialog-close';
            //     closeButton.innerHTML = '<i class="fas fa-times"></i>';
            //     _this.target.appendChild(closeButton);
            // }
            // // Wire up to the click event to close the dialog.
            // closeButton.onclick = () => {
            //     close(true);
            // };

            _this.show = () => {
                // if (args.isModal) {
                //     let backdrop = document.createElement('div');
                //     backdrop.id = _this.target.id + '-backdrop';
                //     backdrop.className = 'dialog-backdrop';
                //     _this.target.insertAdjacentElement('beforebegin', backdrop);
                // }

                _this.target.classList.add('open');

                return _this;
            };

            _this.close = () => {
                _this.target.classList.remove('open');
                _this.target.remove();

                return _this;
            };
        }
    }

    function show(args) {
        return new Dialog(args).show();
    }

    function alert() {
    }

    function confirm() {
    }

    function hide() {
    }

    function close() {
    }

    return {
        show: show
    };
}));