export function indexPage(req: any, res: any) {
    res.status(200)
    res.render("index.ejs");
};

export function hiveStats(req: any, res: any) {
    const  hive_name = req.params.hive_name
    var template_data:any = {}

    template_data.hive_name = hive_name

    res.status(200)
    res.render("hive_stats.ejs", {data: template_data});
};