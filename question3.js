const http = require("http");
const pool = require("./db/dbInitialization").pool;

const port = 3000;

const requestHandler = (request, response) => {
  response.writeHead(200, { "Content-Type": "text/html" });
  const query = `SELECT 
  clientname, mobileno, ticketid, 
  storename, questiontype, 
  questionsubtype, dispositionname, datecreated FROM client INNER JOIN report
  ON client.id = report.client`;
  const tablehead = `<thead>
                        <tr>
                            <th>clientname</th>
                            <th>mobileno</th>
                            <th>ticketid</th>
                            <th>storename</th>
                            <th>questiontype</th>
                            <th>questionsubtype</th>
                            <th>dispositionname</th>
                            <th>datecreated</th>
                        </tr>
                    </thead>`;
  pool.query(query, (err, data) => {
    if (err) {
      console.log(err);
    }
    const body = data.rows
      .map(
        row => `
            <tr>
            <td>${row.clientname}</td>
            <td>${row.mobileno}</td>
            <td>${row.ticketid}</td>
            <td>${row.storename}</td>
            <td>${row.questiontype}</td>
            <td>${row.questionsubtype}</td>
            <td>${row.dispositionname}</td>
            <td>${row.datecreated}</td>
        </tr>`
      )
      .join(" ");
    response.end(
      "<h2>Calltronix</h2>" +
        "<table>" +
        tablehead +
        "<tbody>" +
        body +
        "</tbody>" +
        "</table>"
    );
  });
};

const server = http.createServer(requestHandler);

server.listen(port, err => {
  if (err) {
    return console.log("something bad happened", err);
  }

  console.log(`server is listening on ${port}`);
});
