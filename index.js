const { Console } = require("console");
const express = require("express");
const fs = require("fs");

const app = express();

app.use(express.json())

const kodersJson = fs.readFileSync("koders.json", "utf-8")
let koders = JSON.parse(kodersJson);

//Listar a los koders
app.get("/koders",(request,response) => {
    response.json(koders);
})

//Crear un koder
app.post("/koders", (request,response) => {
    koders.push(request.body);
    const koderStr = JSON.stringify(koders)
    fs.writeFileSync("koders.json",koderStr,"utf-8")

    response.json({
        message: "koder added",
        koders,
    })

}) 

//Eliminar un koder
app.delete("/koders/:name", (request, response) => {
    const koderExist = koders.find((koder) => koder.name === request.params.name)

    if (!koderExist){
        response.status(404)
        response.json({ message : "Koder Not found"})
        return

    }
     const newKoders = koders.filter((koder) => koder.name !== request.params.name)
     koders = newKoders;
     const koderStr = JSON.stringify(koders)
     fs.writeFileSync("koders.json",koderStr,"utf-8")
     response.json({ message : "Koder deleted", koders})
})

app.delete("/koders", (request, response) => {
    koders = []
    const koderStr = JSON.stringify(koders)
     fs.writeFileSync("koders.json",koderStr,"utf-8")

     response.json({ message : "Reseted All Koders", koders})

})


//Servidor escuchando 
app.listen(8080, () => {
    console.log("server listening on port 8080");
});





//GET Hola
/* app.get("/hola", (request, response) => {
    response.writeHead(200, { "Content-Type": "application/json"})
    response.end(JSON.stringify({ message: "Hola desde express"}))
});

app.get("/hola/:nombre", (request, response) => {
    response.json({message: `Hola ${request.params.nombre}`})
})

app.post("/hola", (request,response) => {
    response.json({ message: "Hola dessde express con post"})
})

app.get("/", (request, response) => {
    response.writeHead(404, { "Content-Type" : "text/plain" });
    response.end("get desde la raiz")
}) */


