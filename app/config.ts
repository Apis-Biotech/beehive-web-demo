export interface Config {
    http_port: number,
    https_port: number,
    db_host: string,
    db_user: string,
    db_pass: string
    db_name: string,
    db_port: number
}

export const config: Config = {
    http_port: 80,
    https_port: 443,
    db_host: "db",
    db_user: "postgres",
    db_pass: "pg-admin",
    db_name: "postgres",
    db_port: 5432

}