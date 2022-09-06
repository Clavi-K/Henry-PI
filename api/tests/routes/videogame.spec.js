const axios = require("axios")

describe("ROUTER TEST --------------- Videogame", () => {

    it("Should bring all games", async () => {

    try {

        const response = await axios.get("http://localhost:8082/videogames")
        expect(response).toHaveLength(100)

    } catch(e) {
        console.log(e)
    }

    })

})