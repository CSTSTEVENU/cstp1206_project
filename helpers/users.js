function formatUser(user) {
    return {
        ...user,
        firstName: user.first_name.toUpperCase()
    }
};

module.exports = {
    formatUser
};