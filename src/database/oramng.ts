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

  public async get_ldr_file(id: number): Promise<ora.Result<blobUnit>> {
    ora.initOracleClient({libDir: process.env.CLIENT_HOME_DIR});
    let connection;
    let result;
    let bu;
    try {
      connection = ora.getConnection({
          user: process.env.USER,
          password: process.env.PASSWORD,
          connectString: process.env.CONNECT_STRING,
        }
      );
      result = (await connection).execute(
        `SELECT *
         FROM ldr_file_storage
         WHERE id = :id
        `, [id],
        {
          autoCommit: true, // NB!!!
          // resultSet: false,
          outFormat: ora.OUT_FORMAT_OBJECT,
        }
      );

        ora.fetchAsBuffer = [ora.BLOB];
        const sql = `Select bl_files blob_data
					From ldr_file_storage
					Where id = :id`;
        return connection.execute(sql, [id], {
          autoCommit: true, // NB!!!
          resultSet: false,
          outFormat: ora.OUT_FORMAT_OBJECT,
        });
      bu = new blobUnit();
      /*
        ID: number;
        FILE_NAME: string;
        FILE_EXT: string;
        private _BLOB_DATA: NodeJS.ArrayBufferView;
        public get BLOB_DATA(): NodeJS.ArrayBufferView {
          return this._BLOB_DATA;
        }
        public set BLOB_DATA(value: NodeJS.ArrayBufferView) {
          this._BLOB_DATA = value;
        }
        DATE_IN: Date;
        USER_IN: string;
        IS_PROCESSED: string;
        BLOB_LENGTH: number;
      */

      bu.id = id;
      bu.BLOB_DATA = ora.fetchAsBuffer;
      bu.file_name = result.rows[0].file_name;

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

export class blobUnit {
  ID: number;
  FILE_NAME: string;
  FILE_EXT: string;
  private _BLOB_DATA: NodeJS.ArrayBufferView;
  public get BLOB_DATA(): NodeJS.ArrayBufferView {
    return this._BLOB_DATA;
  }
  public set BLOB_DATA(value: NodeJS.ArrayBufferView) {
    this._BLOB_DATA = value;
  }
  DATE_IN: Date;
  USER_IN: string;
  IS_PROCESSED: string;
  BLOB_LENGTH: number;
  /*
  constructor(
    id: number,
    file_name: string,
    file_ext: string,
    blob_data: NodeJS.ArrayBufferView,
    date_in: Date,
    user_in: string,
    is_processed: string,
    blob_length: number,
  ) {
    this.ID = id;
    this.FILE_NAME = file_name;
    this.FILE_EXT = file_ext;
    this.BLOB_DATA = blob_data;
    this.DATE_IN = date_in;
    this.USER_IN = user_in;
    this.IS_PROCESSED = is_processed;
    this.BLOB_LENGTH = blob_length;
  }
  */
}
