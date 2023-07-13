import ora from 'oracledb';
import * as process from 'process';

/*
Пример обращения к web-servic'у из pl|sql
mvk$utl.send_to_diadoc.HTTP_Documents
*/

export class OraMng {

  public async decls_by_cnu_id(id: number): Promise<JSON> {
    ora.initOracleClient({libDir: process.env.CLIENT_HOME_DIR});
    let connection;
    let result;
    try {
      connection = ora.getConnection({
          user: process.env.USER,
          password: process.env.PASSWORD,
          connectString: process.env.CONNECT_STRING,
        }
      );
      result = (await connection).execute(
        `SELECT *
         FROM eco_vdecls_simple
         WHERE cnu_id = :id
         Order by id desc`, [id],
        {
          autoCommit: true, // NB!!!
          // resultSet: false,
          // outFormat: ora.OUT_FORMAT_OBJECT,
        }
      );

      // console.log((await result).rows);

    } catch (err) {
      console.log('Error on execute oramn function:', err);
    } finally {
      if (connection) {
        (await connection).close()
      }
    }
    return (await result).rows;
  }

  public async test(): Promise<JSON> {
    ora.initOracleClient({libDir: process.env.CLIENT_HOME_DIR});
    let connection;
    let result;
    try {
      connection = ora.getConnection({
          user: process.env.USER,
          password: process.env.PASSWORD,
          connectString: process.env.CONNECT_STRING,
        }
      );
        result = (await connection).execute(
        `SELECT id, name, abbr
         FROM tu_type_permdoc
         WHERE id < :id`, [100],
        {
          autoCommit: true, // NB!!!
          // resultSet: false,
          // outFormat: ora.OUT_FORMAT_OBJECT,
        }
      );

      console.log((await result).rows);

    } catch (err) {
      console.log('Error on execute oramn function:', err);
    } finally {
      if (connection) {
        (await connection).close()
      }
    }
    return (await result).rows;
  }
}