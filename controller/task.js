// task add
const taskCreate = async (req, res, next) => {
    try {
        var db = req.db;
        var data = {
            id: req.body.id,
            status: req.body.status,
            title: req.body.title,
            description: req.body.description,
            assign: req.body.assign,
            dueDate: req.body.dueDate,
            created_at: new Date()
        };
        if (req.file) {
            data.task_image = req.file.filename;
        }
        db.query("INSERT INTO task SET ?", [data], function (err, rows) {
            if (err) {
                res.status(500).send({
                    statusCode: 500,
                    message: "Error",
                });
            } else {
                res.status(201).send({
                    statusCode: 201,
                    message: "Success",
                });
            }
        });
    } catch (error) {
        res.status(500).send({
            statusCode: 500,
            message: "Error catch",
        });
    }
};
// task add
const taskList = async (req, res, next) => {
    var db = req.db;
    const status = req.params.id;

    // MySQL query to fetch tasks based on status
    const query = `
  SELECT task.*, GROUP_CONCAT(member.member_image) AS assigned_members
  FROM task
  LEFT JOIN member ON FIND_IN_SET(member.id, task.assign)
  WHERE status = ?
  GROUP BY task.id
  `;

    // Execute the query with the status parameter
    db.query(query, [status], (error, results) => {
        if (error) {
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        res.json(results);
    });
};
// task status update
const taskStatus = async (req, res, next) => {
    var db = req.db;
    const taskId = req.params.id;
    const newStatus = req.body.status;
    // Construct SQL query
    const sql = `UPDATE task SET status = ? WHERE id = ?`;

    // Execute the query
    db.query(sql, [newStatus, taskId], (err, result) => {
        if (err) {
            res.status(500).json({ error: 'Internal server error' });
            return;
        }
        res.status(200).json({ message: 'Task status updated successfully' });
    });
};


module.exports = {
    taskCreate,
    taskList,
    taskStatus
};
