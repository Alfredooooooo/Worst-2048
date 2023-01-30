export default class Tile {
    private _tileElement;
    private _x: any;
    private _y: any;
    private _value: any;

    constructor(tileContainer: any, value = Math.random() > 0.5 ? 2 : 4) {
        this._tileElement = document.createElement('div');
        this._tileElement.classList.add('tile');
        tileContainer.append(this._tileElement);
        this.value = value;
    }

    get value() {
        return this._value;
    }

    set value(v) {
        this._value = v;
        this._tileElement.textContent = v;
        const power = Math.log2(v);
        const backgroundLightness = 100 - power * 9;
        this._tileElement.style.setProperty(
            '--background-lightness',
            `${backgroundLightness}%`
        );
        this._tileElement.style.setProperty(
            '--text-lightness',
            `${backgroundLightness <= 50 ? 90 : 10}%`
        );
    }

    set x(value: any) {
        this._x = value;
        this._tileElement.style.setProperty('--x', value);
    }

    set y(value: any) {
        this._y = value;
        this._tileElement.style.setProperty('--y', value);
    }

    remove() {
        this._tileElement.remove();
    }

    waitForTransition(animation = false) {
        return new Promise((resolve) => {
            this._tileElement.addEventListener(
                animation ? 'animationend' : 'transitionend',
                resolve,
                {
                    once: true,
                }
            );
        });
    }
}
