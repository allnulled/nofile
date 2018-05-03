module.exports = {

		/**
		 * @name {nofile.find}
		 * @type {Function}
		 * @param pattern {String} Pattern of the no-file we 
		 * want to find. In the string, we must include a 
		 * placeholder for numbers, like this: {n}. If it
		 * is not found, the function will throw an error.
		 * @return {Promise} A promise will be returned, 
		 * where we can chain the methods "then", "catch"
		 * and "finally".
		 * @description Finds the first no-file in a directory
		 * (no-file means the first file not found in a folder)
		 * that follows a specified pattern. For example, if
		 * we supply a pattern like this as parameter:
		 * 
		 * 		my/folder/somwhere/my-file-{n}.json
		 * 
		 * The function will try to find the first no-file
		 * that matches, in this order, one of these paths:
		 *
		 *    my/folder/somwhere/my-file-0.json
		 *    my/folder/somwhere/my-file-1.json
		 *    my/folder/somwhere/my-file-2.json
		 *    my/folder/somwhere/my-file-3.json
		 *    my/folder/somwhere/my-file-4.json
		 *    my/folder/somwhere/my-file-5.json
		 *    (...and so on...)
		 * 
		 * The function will return the first path where there 
		 * is no file.
		 */
		find: function(pattern) {
				var counter = -1;
				const fs = require("fs");
				const pos = pattern.indexOf("{n}");
				const prePattern = pattern.substr(0, pos);
				const postPattern = pattern.substr(pos + 3);
				const get = function(inc = 0) {
						counter += inc;
						return prePattern + counter + postPattern;
				};
				return new Promise(function(resolve, reject) {
						var checkFile = function() {
								fs.access(get(1), function(error) {
										if (error && error.code === "ENOENT") {
												return resolve(get());
										}
										checkFile();
								});
						};
						checkFile();
				});
		},

		/**
		 * @name nofile.findSync
		 * @type {Function}
		 * @return {String} name of the no-file
		 * @description works exactly the same as the 
		 * {nofile}.find method, but this one is blocking.
		 */
		findSync: function(pattern) {
				var counter = -1;
				const fs = require("fs");
				const pos = pattern.indexOf("{n}");
				const prePattern = pattern.substr(0, pos);
				const postPattern = pattern.substr(pos + 3);
				const get = function(inc = 0) {
						counter += inc;
						return prePattern + counter + postPattern;
				};
				while (fs.existsSync(get(1))) {}
				return get(0);
		}
};