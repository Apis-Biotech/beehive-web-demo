import {Client} from 'pg';
import {config} from "../config"
import {calculatePercentageIncrease} from "../lib/process"



export async function submitData(req: any, res: any, next: any) {

    try{

        const client = new Client({
            user: config.db_user,
            host: config.db_host,
            database: config.db_name,
            password: config.db_pass,
            port: config.db_port,
        })
        client.connect()


        const hive_name: string = req.body.hive_name

        // Check that this hive name exists in the db
        const hive_resp = await client.query(`SELECT * FROM hives WHERE hive_name = '${hive_name}';`)
        const hive_exists = hive_resp.rows.length > 0

        if (!hive_exists){
            res.status(404)
            res.send({"msg":null, "error": "This hive does not exist in the database"});
            return
        }

        // Get hive id
        const hive_id = hive_resp.rows[0].id
        
        // Process data
        const hive_data = req.body.data
        const relative_stress = calculatePercentageIncrease(hive_data, 10, 10)

        // Insert relative stress
        let query = "INSERT INTO readings (hive_id, processed_value) VALUES ($1, $2) RETURNING id"
        const reading_resp = await client.query(query, [hive_id, relative_stress])

        // Get the generated id for the reading
        const reading_id = reading_resp.rows[0].id

        // Insert all of individual data points
        for(const data_point in hive_data){
            let query = "INSERT INTO data_points (reading_id, data_value) VALUES ($1, $2)"
            await client.query(query, [reading_id, data_point])
        }

        console.log("Data inserted")

        await client.end()

        res.status(200)
        res.send({"msg":"ok", "error": null});

    } catch (error){
        return next(error)
    }
};