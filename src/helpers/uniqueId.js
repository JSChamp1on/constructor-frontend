class UniqueId {
    #state = {
        id: [],
    }

    static singleton(instance) {
        if (instance === null) {
            instance = new this;
        }

        return instance;
    }

    get generate() {
        const arr = this.#state.id;

        while (true) {
            const id = Math.random().toString(36).replace(/[0-9.]/g, '');

            if (arr.indexOf(id) === -1) {
                arr.push(id);

                return id;
            }
        }
    }
}

let instance = null;

export const uniqueId = UniqueId.singleton(instance);