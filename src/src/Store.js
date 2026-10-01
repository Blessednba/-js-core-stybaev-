export class Store {
#items = [];

constructor(items = []) {
if (!Array.isArray(items)) {
throw new TypeError("items must be an array");
}

items.forEach(item => this.add(item));
}

get items() {
return [...this.#items];
}

add(item) {
if (!item || typeof item !== "object") {
throw new TypeError("item must be an object");
}

const { name, price, qty } = item;

if (typeof name !== "string" || name.trim() === "") {
throw new TypeError("name must be a non-empty string");
}

if (typeof price !== "number" || price < 0) {
throw new TypeError("price must be a non-negative number");
}

if (!Number.isInteger(qty) || qty < 0) {
throw new TypeError("qty must be a non-negative integer");
}

this.#items.push({ name, price, qty });
return this;
}

remove(name) {
const index = this.#items.findIndex(item => item.name === name);

if (index === -1) {
return false;
}

this.#items.splice(index, 1);
return true;
}

find(name) {
return this.#items.find(item => item.name === name);
}

total() {
return this.#items.reduce(
(sum, { price, qty }) => sum + price * qty,
0
);
}

static from(items) {
return new Store(items);
}
}

export class SortedStore extends Store {
get items() {
return super.items.sort((a, b) => a.price - b.price);
}

add(item) {
super.add(item);
return this;
}
}
