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
        const hive_resp = await client.query("SELECT * FROM hives WHERE hive_name = $1;", [hive_name])
        const hive_exists = hive_resp.rows.length > 0

        if (!hive_exists){
            res.status(404)
            res.send({"msg":null, "error": "This hive does not exist in the database"});
            return
        }

        // Get hive id
        const hive_id = hive_resp.rows[0].id
        
        // Process data
        // const hive_data: number[] = req.body.data
        // const copy_hive_data: number[]  = Array.from(hive_data)

        // const relative_stress = calculatePercentageIncrease(copy_hive_data, 10, 10)

        var reading_id: number;

        if (req.body.new_reading){

            // Insert relative stress
            let query = "INSERT INTO readings (hive_id, processed_value) VALUES ($1, $2) RETURNING id"
            const reading_resp = await client.query(query, [hive_id, 0])

            // Get the generated id for the reading
            reading_id = reading_resp.rows[0].id

        } else {

            let query = "SELECT id FROM readings ORDER BY id DESC"
            const query_resp = await client.query(query)

            reading_id = query_resp.rows[0].id

        }

        let query = "INSERT INTO data_points (reading_id, data_value) VALUES ($1, $2)"
        await client.query(query, [reading_id, req.body.data_point])

        console.log("Data inserted")

        await client.end()

        res.status(200)
        res.send({"msg":"ok", "error": null});

    } catch (error){
        return next(error)
    }
};


export async function getData(req: any, res: any, next: any) {

    try{

        const client = new Client({
            user: config.db_user,
            host: config.db_host,
            database: config.db_name,
            password: config.db_pass,
            port: config.db_port,
        })
        client.connect()

        const hive_name = req.params.name

        // Get hive ID
        const hive_id_resp = await client.query("SELECT id FROM hives WHERE hive_name = $1", [hive_name])

        const hive_exists = hive_id_resp.rows.length > 0

        if (!hive_exists){
            res.status(404)
            res.send({"data":null, "error": "This hive name does not exist in the database"});
            return
        }

        const hive_id = hive_id_resp.rows[0].id

        // Get all readings
        const readings_resp = await client.query("SELECT * FROM readings WHERE hive_id = $1  ORDER BY date_added DESC",  [hive_id])
        const readings = readings_resp.rows

        var return_data:any = []

        for (const reading of readings){
            const date = reading.date_added
            const reading_id = reading.id
            const processed_value = reading.processed_value

            const data_resp = await client.query("SELECT data_value FROM data_points WHERE reading_id = $1",  [reading_id])
            const data_rows = data_resp.rows

            const data_points = data_rows.map((row) => row.data_value);
            
            

            return_data.push({
                                "relative_value": processed_value, 
                                "date": date,
                                "data_points": data_points
                            })
        }



        await client.end()

        res.status(200)
        res.send({"data":return_data, "error": null});

    } catch (error){
        return next(error)
    }
};