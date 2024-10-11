import dotenv from 'dotenv';
dotenv.config();

//MODEL =====================================================================>

const headers = {
    'Authorization': `Bearer ${process.env.NOTION_SECRET}`,
    'Content-Type': 'application/json',
    'Notion-Version': '2022-06-28'
}

async function readAll() {
    try {
        const page = await fetch(`https://api.notion.com/v1/databases/${process.env.DATABASE_ID}`, {
            method:'GET',
            headers
        });
        const data = await page.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}

async function addData(data) {
    try {
        const page = await fetch(`https://api.notion.com/v1/pages`, {
            method: 'POST',
            headers,
            body: JSON.stringify(data)
        });
        const pageCreated = await page.json();
        return pageCreated;
    } catch (error) {
        console.log(error);
    }    
}

async function updateData(data,pageId) {
    try {
        const page = await fetch(`https://api.notion.com/v1/pages/${pageId}`, {
            method: 'PATCH',
            headers,
            body: JSON.stringify(data)
        })
        const pageUpdated = await page.json();
        return pageUpdated;
    } catch (error) {
        console.log(error);
    }
}

async function deleteData(pageId) {
    // return await updateData({'archived': true}, pageId);
    try {
        const page = await fetch(`https://api.notion.com/v1/pages/${pageId}`, {
            method: 'PATCH',
            headers,
            body: JSON.stringify({'archived':true})
        })
        const pageDeleted = await page.json();
        return pageDeleted;
    } catch (error) {
        console.log(error);
    }
}


(async()=>{
    const allData = await readAll();
    console.log('All data: ' + allData);

    let data = {
        'parent': {'database_id': process.env.DATABASE_ID},
        'properties': {
            'Name':{'title':[{'text':  {'content': 'New Record'}}]}
        },
    }; 

    const page = await addData(data);
    console.log("ADD DATA")

    data = {
        'properties': {
            'Name':{'title':[{'text':  {'content': 'Updated Record'}}]}
        },
    }; 

    await updateData(data, page.id);

    console.log("UPDATE DATA");

    await deleteData(page.id);

    console.log("DELETE DATA")
})()


//CONTROLLER =====================================================================>

    // import * as notionModel from '../models/NotionModel.js';

    // export async function getAllData(req, res) {
    //     try {
    //         const data = await notionModel.readAll();
    //         res.status(200).json(data);
    //     } catch (error) {
    //         res.status(500).json({ error: 'Error retrieving data from Notion' });
    //     }
    // }

    // export async function createData(req, res) {
    //     try {
    //         const newData = {
    //             parent: { database_id: process.env.DATABASE_ID },
    //             properties: {
    //                 'Name': { title: [{ text: { content: req.body.name } }] },
    //             },
    //         };
    //         const createdData = await notionModel.addData(newData);
    //         res.status(201).json(createdData);
    //     } catch (error) {
    //         res.status(500).json({ error: 'Error creating data in Notion' });
    //     }
    // }

    // export async function updateData(req, res) {
    //     try {
    //         const { pageId } = req.params;
    //         const updateData = {
    //             properties: {
    //                 'Name': { title: [{ text: { content: req.body.name } }] },
    //             },
    //         };
    //         const updatedPage = await notionModel.updateData(updateData, pageId);
    //         res.status(200).json(updatedPage);
    //     } catch (error) {
    //         res.status(500).json({ error: 'Error updating data in Notion' });
    //     }
    // }

    // export async function deleteData(req, res) {
    //     try {
    //         const { pageId } = req.params;
    //         const deletedPage = await notionModel.deleteData(pageId);
    //         res.status(200).json(deletedPage);
    //     } catch (error) {
    //         res.status(500).json({ error: 'Error deleting data in Notion' });
    //     }
    // }


//ROUTER =====================================================================>

    // import express from 'express';
    // import * as notionController from '../controllers/NotionController.js';

    // const router = express.Router();

    // router.get('/data', notionController.getAllData);
    // router.post('/data', notionController.createData);
    // router.patch('/data/:pageId', notionController.updateData);
    // router.delete('/data/:pageId', notionController.deleteData);

    // export default router;
    