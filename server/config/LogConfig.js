import winston from 'winston';
winston.emitErrs = true;

export default {

    setup : function(){

        global.logger = new winston.Logger({
            transports: [
                new winston.transports.File({
                    level: 'info',
                    filename: './logs/all-logs.log',
                    handleExceptions: true,
                    json: true,
                    maxsize: 5242880, //5MB
                    maxFiles: 5,
                    colorize: true
                }),
                new winston.transports.Console({
                    level: 'debug',
                    handleExceptions: true,
                    json: false,
                    colorize: true
                })
            ],
            exitOnError: false
        });

        global.logger.stream = {
            write: function(message, encoding){
                logger.info(message);
            }
        };

    }
}
