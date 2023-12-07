import bodyParser from "body-parser";
import express from "express";
import routes from "./routes/Routes";
import projectsRoutes from "./routes/projectsRoutes";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUI from "swagger-ui-express";

const path = require("path");
const PORT = process.env.PORT || 3000;

// Configuração do Swagger
const swaggerOptions = {
	definition: {
		openapi: "3.0.0",
		info: {
			title: "Architect API",
			version: "1.0.0",
			description: "A Express with Prima architect API",
		},
		servers: [
			{
				url: "http://localhost:3000",
			},
		],
	},
  apis: [path.join(__dirname, "/routes/*.ts")], // tive q pegar o path para encontrar o caminho correto
};

const swaggerSpect = swaggerJSDoc(swaggerOptions)

const app = express();

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpect));

app.set("view engine", "ejs");
app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());

app.use("/api", routes);
app.use("/api/projetos", projectsRoutes);


app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}/api`);
});
