db.createUser(
    {
        user: "bugtracker",
        pwd: "bugtracker123",
        roles: [
            {
                role: "readWrite",
                db: "mongodb"
            }
        ]
    }
)