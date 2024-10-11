import { Client } from "@notionhq/client";
import dotenv from 'dotenv';
dotenv.config();

//Nota: Tienes que abrir la tabla como tal, NO la pagina
//https://www.notion.so/11cb2d90ce5a80dd8affc45177564e9b?v=5e1b4597f83045a9805d60278310eb20&pvs=4
//                     | database ID                    |

async function getNotionData() {
    //Config api integration
    const notion = new Client({
        auth: process.env.NOTION_SECRET_KEY
    });

    //Query al api de notion
    const results = await notion.databases.query({
        database_id: "11cb2d90ce5a80dd8affc45177564e9b",
    });

    // console.log(results);

    //En la parte de properties tienes acceso a la info de cada row de la db
    //Aqui muestro los datos de cada uno
    (results.results).forEach(element => {
        console.log(element);
    });
}

getNotionData();