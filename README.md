
# Todo
Create a `.env` file in the root project folder location and write `DATABASE_URL="mysql://root:db_password@localhost:3308/nestdb"`


# Create
```
curl -X POST http://localhost:3000/products \
  -H "Content-Type: application/json" \
  -d '{"name":"Laptop","price":1200.50}'
```
# Get all
`curl -X GET http://localhost:3000/products
`
# Get one
`curl -X GET http://localhost:3000/products/1
`
# Update
```
curl -X PUT http://localhost:3000/products/1 \
  -H "Content-Type: application/json" \
  -d '{"name":"Updated Laptop","price":1400.00}'
```

# Delete
`curl -X DELETE http://localhost:3000/products/1
`




## Migration (Whenever you change your db structure)
`$ npx prisma migrate dev --name <add_product_model>
`

This does three things:
✅ Creates a migration file in prisma/migrations/
✅ Updates your database tables
✅ Regenerates Prisma Client (auto)


## WHEN TO RUN npx prisma generate

You run this whenever the Prisma Client must be refreshed



---
## API Test (Automation)

```
 $ chmod +x test-products.sh
 $ ./test-products.sh  
```

---
## Docker Compose
```
 $ docker compose up --build
```