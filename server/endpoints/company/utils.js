module.exports = {
    mapUsersToSnacks,
    mapSnacksToUsers,
};

function mapUsersToSnacks(user_snack) {
    let snack_id = 0;
    let snack_index = -1;
    let snacks = [];
    user_snack.forEach(snack => {
        if (snack.snack_ID == snack_id) {
            console.log('here');
            snacks[snack_index]['users'].push(snack.user_name);
        } else {
            let user_name = snack.user_name;
            delete snack.user_name;
            snacks.push({ ...snack, users: [user_name] });
            snack_id = snack.snack_ID;
            snack_index++;
            console.log(snack_index);
        }
        console.log(snacks);
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
