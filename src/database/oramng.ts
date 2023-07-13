import ora from 'oracledb';

export class OraMng {
  public async test() {
    ora.initOracleClient({libDir: 'D:\\app\\Admin\\product\\21c\\dbhomeXE'});
    ora.outFormat = ora.OUT_FORMAT_OBJECT;
    const connection = ora.getConnection({
        user: "mvk",
        password: "mvkprod$",
        connectString: `(DESCRIPTION =
        (ADDRESS_LIST =
        (ADDRESS = (PROTOCOL = TCP)(HOST = 172.16.27.8)(PORT = 1521))
        )
          (CONNECT_DATA =
            (SERVICE_NAME = billapp)
        )
      )`
      }
    );
    const result = (await connection).execute(
      `SELECT id, name
         FROM tu_type_permdoc
         WHERE id < :id`, [100],
      {
        autoCommit: true, // NB!!!
        resultSet: false,
        outFormat: ora.OUT_FORMAT_OBJECT,
      }
      );

    console.log((await result).rows);
    (await connection).close()
  }
}