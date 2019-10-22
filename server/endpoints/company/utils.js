module.exports = {
    mapUsersToSnacks,
    mapSnacksToUsers,
};

function mapUsersToSnacks(snacks, user_snack) {
    snacks = snacks.map(snack => {
        //
        //Map over each user and add them to the snack
        let suggestedBy = [];
        user_snack.forEach(user => {
            if (user.snack_ID == snack.snack_ID) {
                suggestedBy.push(user.name);
            }
        });

        return {
            ...snack,
            suggestedBy,
        };
    });

    return snacks;
}

function mapSnacksToUsers(users, snacks) {
    users = users.map(user => {
        let user_snacks = [];
        snacks.forEach(snack => {
            if (user.user_ID == snack.user_ID) {
                user_snacks.push(snack.name);
            }
        });
        return {
            ...user,
            user_snacks,
        };
    });

    return users;
}
