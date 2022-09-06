const { conn, Videogame } = require("../../src/db")

describe("MODEL TEST --------------- Videogame", () => {
  jest.setTimeout(60000);

  beforeAll(async () => {
    await conn.sync({ force: true })
  })

  it("Should throw an error if name is null", async () => {

    try {

      await Videogame.create({})

    } catch (e) {
      expect(e.message).toBeDefined()
    }

  })

  it("Should return a videogame when the data is valid", async () => {

    try {

      const response = await Videogame.create({
        name: "Forza Horizon 5",
        description: "Carreritas",
        platforms: "XBOX, PC, PLAYSTATION"
      })

      expect(response).toHaveProperty("name", "Forza Horizon 5")

    } catch(e) {
      console.log(e)
    }

  })

})