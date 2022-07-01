require('dotenv').config();
const Sequelize = require('sequelize');

const HOST = process.env.DATABASE_HOST;
const PORT = process.env.DATABASE_PORT;
const USER_NAME = process.env.DATABASE_USER_NAME;
const PASSWORD = process.env.DATABASE_PASSWORD;
const DB = process.env.DATABASE_DB_NAME;
const MAX_POOL = process.env.MAX_POOL || 5;
const MIN_POOL = process.env.MIN_POOL || 0;
const ACQUIRE = process.env.ACQUIRE || 30000;
const IDLE = process.env.IDLE || 10000;
const DIALECT = process.env.DIALECT;
const STORAGE = process.env.STORAGE || ''; // only for sqlite
const TIMEZONE = process.env.TIMEZONE || '+07:00';
const LOGGING_DIRECTORY = process.env.LOGGING_DIRECTORY || '';
const LOGGING_FILE = process.env.LOGGING_FILE || '';
const logging = require("common-logging");

const logOptions = {
    logDirectory: LOGGING_DIRECTORY,
    logFileName: LOGGING_FILE,
    formatTimestamp: "YYYY-MM-DD HH:mm:ss",
    maxSize: 5120000,
    maxFiles: 5,
    handleException: true
  };

module.exports = {
    _sequelize: null,
    _logger: null,
    init: function() {
        let seqConfig = {
            host: HOST,
            port: PORT,
            dialect: DIALECT,
            pool: {
              max: parseInt(MAX_POOL),
              min: parseInt(MIN_POOL),
              acquire: parseInt(ACQUIRE),
              idle: parseInt(IDLE)
            },
            timezone: TIMEZONE,
            logQueryParameters: true,
            logging: this.logFunc
        };

        if(STORAGE !== '' && DIALECT === 'sqlite') {
            seqConfig.storage = STORAGE;
        }

        this._sequelize = new Sequelize(DB, USER_NAME, PASSWORD, seqConfig);
    },

    initDynamic: function(config) {
        let seqConfig = {
            host: config.host,
            port: config.port,
            dialect: config.dialect,
            pool: {
              max: parseInt(config.maxPool || 5),
              min: parseInt(config.minPool || 0),
              acquire: parseInt(config.acquire || 30000),
              idle: parseInt(config.idle || 10000)
            },
            timezone: config.timezone || '+07:00',
            logQueryParameters: true,
            logging: this.logFunc
        };

        if(config.storage && config.dialect === 'sqlite') {
            seqConfig.storage = config.storage;
        }

        if(config.loggingDirectory && config.loggingFile) {
            logOptions.logDirectory = config.loggingDirectory;
            logOptions.logFileName = config.loggingFile;
        }

        this._sequelize = new Sequelize(config.database, config.username, config.password, seqConfig);
    },

    logFunc: (msg) => {
        if(LOGGING_FILE == '' 
            && LOGGING_DIRECTORY == '') {
            console.log(msg);
        } else {
            if(this._logger == null) {
                this._logger = logging.logger(logOptions);
            }
            this._logger.info(msg);
        }
    },

    connect: function() {
        return this._sequelize.authenticate()
            .then(() => {
                console.log('Connection has been established successfully.');
            })
            .catch(err => {
                console.error('Unable to connect to the database:', err);
            });
    },

    sequelize: function(config = undefined) {
        if(this._sequelize == null) {
            if(config != undefined) {
                this.initDynamic(config);
            } else {
                this.init();
            }
        }
        return this._sequelize;
    }
}

