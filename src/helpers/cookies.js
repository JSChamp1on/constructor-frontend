export const cookies = {
    all: () => document.cookie.match(/[\w-]+=([\w%'!*-.]+)?((?=;))?/g) ?? [],

    set: (name, value, expires) => {
        const year = 31536000000;

        const date = new Date(Date.now() + expires ?? year);

        document.cookie = `${name}=${encodeURIComponent(value)}; path=/; expires=${date.toUTCString()}`;
    },

    get: function (name) {
        for (let cookie of this.all()) {
            if (new RegExp(`${name}(?==)`).test(cookie)) {
                const value = cookie.replace(new RegExp(`${name}=(.+)?`), '$1');

                return decodeURIComponent(value);
            }
        }

        return null;
    },

    has: function (name) {
        return this.all().some((item) => {
            return new RegExp(`${name}(?==)`).test(item);
        });
    },

    remove: function (name) {
        for (let cookie of this.all()) {
            if (new RegExp(`${name}(?==)`).test(cookie)) {
                document.cookie = `${cookie}; max-age=0`;

                return true;
            }
        }

        return false;
    },
};
