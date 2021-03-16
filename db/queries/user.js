const insertUser = `insert into user_details (
    id,
    email,
    first_name,
    last_name,
    store_name,
    phone_number,
    password) values ($1, $2, $3, $4, $5, $6, $7)
    returning id, email, first_name, last_name, store_name, phone_number, created_at;
`;

const getUserByEmail = `
    select * from user_details
    where email = $1;
`;

module.exports = { insertUser, getUserByEmail };
