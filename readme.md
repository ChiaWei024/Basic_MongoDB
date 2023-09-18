# Description

This practice connects to a MongoDB database and create models/schenmas using mongoose.

Following the tutorial: https://www.youtube.com/watch?v=f2EqECiTBL8

Following previous practice: Basic_UserRole_Authorization - https://github.com/ChiaWei024/Basic_UserRole_Authorization.git

# Miscellaneous

1. Require dotenv at the beginning of server.js for neat code.

1. Mongoose: https://mongoosejs.com/docs/guide.html

   - Elegant mongodb object modeling for node.js

1. Connect to MongoDB

   - database user: mongotut/ my password (see .env)
   - mongoose.connection.once("open", ...): Listen once to open event. If the connection is created, then listen to the opened local port.

1. Using Mongoose model to realize CRUD operation.

   - Mongoose Schema: https://mongoosejs.com/docs/guide.html

1. Promises, query, and exec()

   - https://mongoosejs.com/docs/queries.html

1. Do not add ; at the end of line in .env file.
   - MongoDB connection string will fail.
   - https://stackoverflow.com/questions/65305856/no-write-concern-mode-named-majority-found-in-replica-set-configuration-err
