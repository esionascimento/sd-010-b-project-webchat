const rewire = require("rewire")
const messages = rewire("./messages")
const create = messages.__get__("create")
// @ponicode
describe("create", () => {
    test("0", async () => {
        await create({ name: "Jean-Philippe", price: 56784, image: "http://placeimg.com/640/480/cats" })
    })

    test("1", async () => {
        await create({ name: "Pierre Edouard", price: 25.00, image: "http://placeimg.com/640/480/cats" })
    })

    test("2", async () => {
        await create({ name: "Anas", price: 987650, image: "http://placeimg.com/640/480/cats" })
    })

    test("3", async () => {
        await create({ name: "Anas", price: 56784, image: "http://placeimg.com/640/480/cats" })
    })

    test("4", async () => {
        await create({ name: "Michael", price: 258.00, image: "http://placeimg.com/640/480/cats" })
    })

    test("5", async () => {
        await create({ name: undefined, price: undefined, image: undefined })
    })
})
