export default {
    calculateAlias(alias, matchAliases) {
        let async = require('async');
        let maxNumber = 0;

        return new Promise((resolve, reject) => {
            async.each(matchAliases, (singleAliasObject, callback) => {
                var aliasWordArray = singleAliasObject.alias.split('-');
                var aliasCounter = aliasWordArray[aliasWordArray.length - 1];
                if (!isNaN(parseInt(aliasCounter))) {
                    var aliasNumber = parseInt(aliasCounter);
                    if (aliasNumber > maxNumber) {
                        maxNumber = aliasNumber;
                    }
                }
                callback();
            }, (error) => {
                let createdAlias = alias + '-' + (maxNumber + 1);
                logger.info(createdAlias + ' alias created for ');
                resolve(createdAlias);
            });
        })
    }
}
