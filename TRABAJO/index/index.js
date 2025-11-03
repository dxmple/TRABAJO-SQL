const oracledb = require('oracledb');

oracledb.initOracleClient({ libDir: 'C:\\Users\\USER\\Desktop\\instantclient_23_9' });

async function main() {
  let connection;

  try {
    connection = await oracledb.getConnection({
      user: "biblioteca",
      password: "12345",
      connectString: "localhost/XE"
    });

    console.log("Conexión exitosa a Oracle");

    const tablas = ["LIBROS", "SOCIO", "PRESTAMO", "CATEGORIA", "AUTOR"];

    for (const tabla of tablas) {
      console.log(`\n Datos de la tabla ${tabla}:`);
      const result = await connection.execute(`SELECT * FROM ${tabla}`);
      console.table(result.rows);
    }

  } catch (err) {
    console.error("Error al conectar o consultar Oracle:", err);
  } finally {
    if (connection) {
      try { await connection.close(); } 
      catch (err) { console.error(err); }
    }
  }
}

main();

