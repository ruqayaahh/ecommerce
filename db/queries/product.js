module.exports = {
  insertProduct: `
    insert into product_details (
        id,
        name,
        category,
        price,
        color,
        description,
        owner_id,
        store_name,
        average_rating,
        available_stock,
        size
    ) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
    returning *;
    `,
  insertProductRating: `
    insert into final_rating (
      product_id,
      product_name,
      rating,
      user_id,
      rater_id
    ) values ($1, $2, $3, $4, $5)
    returning *;
    `,
  calculateProductRating: `
    select AVG(rating) as average_rating
    from final_rating
    where product_id = $1;
    `,
  updateProductRating: `
    update product_details
    set average_rating = $2, updated_at = now()
    where id = $1
    returning *;
    `,
  fetchSingleProductById: `
    select * from product_details
    where id = $1;
    `,
  fetchAllProductRatings: `
    select * from final_rating
    where product_id = $1;
    `,
  updateProductDetails: `
    update product_details
    set name = $2,
      category = $3,
      price = $4,
      color = $5,
      description = $6,
      available_stock = $7,
      size = $8,
      updated_at = now()
    where id = $1
    returning *;
    `,
  deleteProduct: `
    delete from product_details
    where id = $1;
    `,
  fetchAllProducts: 'select * from product_details',
};
