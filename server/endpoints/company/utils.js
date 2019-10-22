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
    users = user.map(user => {
        let sugggested = [];
        snacks.forEach(snack => {
            // if(snack.snack_ID = )
        });
    });
}
