# Description

This is a practice of basic MongoDB and mongoose.

Following the tutorial: https://www.youtube.com/watch?v=f2EqECiTBL8

Following previous practice: Basic_UserRole_Authorization - https://github.com/ChiaWei024/Basic_UserRole_Authorization.git

# Content

1. For cleaner code, put dotenv at the beginning of server.js.

1. Mongoose: https://mongoosejs.com/docs/guide.html

   - Elegant mongodb object modeling for node.js

1. Connect to MongoDB

   - database user: mongotut/ my password (see .env)
   - mongoose.connection.once("open", ...): listen once to open event

1. Using Mongoose model to realize CRUD operation.

   - Mongoose Schema: https://mongoosejs.com/docs/guide.html

1. Promises, query, and exec()

   - https://mongoosejs.com/docs/queries.html

1. Do not add ; at the end of line in .env file.
   - MongoDB connection string will fail.
   - https://stackoverflow.com/questions/65305856/no-write-concern-mode-named-majority-found-in-replica-set-configuration-err
