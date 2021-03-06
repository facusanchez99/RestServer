const express = require('express');
// const corsMiddlewares = require('../cors/index');
const cors = require('cors');
const { dbConnection } = require('../database/config.db');



class Server {
    constructor() {
        this.app = express();

        this.port = process.env.PORT;
        this.path = {
            auth:'/api/auth',
            category:'/api/category',
            product:'/api/product',
            search:'/api/search',
            user:'/api/user'
        }

        //connect db
        this.databaseConnect();

        //middlewares
        this.middlewares();

        //rutas de la app
        this.routes();
    }

    async databaseConnect(){
        await dbConnection();
    }

    middlewares() {
        //Cors

        // this.app.options('*',corsMiddlewares);
        // this.app.use(corsMiddlewares);
        this.app.use(cors());

        //Lectura y parseo del body
        this.app.use(express.json());

        //directorio publico
        this.app.use(express.static('public'));
    }

    routes() {
        this.app.use(this.path.auth,require('../routes/auth.routes'));
        this.app.use(this.path.category,require('../routes/category.routes'));
        this.app.use(this.path.user, require('../routes/user.routes'));
        this.app.use(this.path.product,require('../routes/product.routes'))
        this.app.use(this.path.search,require('../routes/search.routes'))
    }

    listen() {
        this.app.listen(this.port, () => console.log(`Server enabled in the Port ${this.port}`));
    }
}

module.exports = Server;