import express from "express"
import enviroment from "./src/api/config/enviroment.js"
import connection from "./src/api/database/db.js"
import cors from "cors"

app.use(cors());

app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
})      

const app = express();
const PORT = enviroment.port;


app.get("/", (req, res) => {
    res.send("Hola mundo desde un servidor de Express.js")
});


app.get("/api/products", async (req, res) => {
    const result = await connection.query("SELECT * FROM products");
    console.log(result);

    res.status(200).json({
        payload: rows
    });
});

app.get("/api/products/:id", async (req, res) => {

    const id = req.params.id;
    // console.log(id);

    const [rows] = await connection.query(`SELECT * FROM products WHERE products.id = ${id}`)

    //console.log(rows)

    res.status(200).json({
        payload: rows
    })
})


app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto http://localhost:${PORT}`)
})