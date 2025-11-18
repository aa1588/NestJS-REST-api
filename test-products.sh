#!/bin/bash

echo "=== Creating Products ==="

# Product 1
curl -X POST http://localhost:3000/products \
  -H "Content-Type: application/json" \
  -d '{"name":"Laptop","price":"1200.50"}'
echo -e "\n"

# Product 2
curl -X POST http://localhost:3000/products \
  -H "Content-Type: application/json" \
  -d '{"name":"Phone","price":"899.99"}'
echo -e "\n"

# Product 3
curl -X POST http://localhost:3000/products \
  -H "Content-Type: application/json" \
  -d '{"name":"Headphones","price":"199.00"}'
echo -e "\n"

echo "=== Getting All Products ==="
curl -X GET http://localhost:3000/products
echo -e "\n"

echo "=== Getting Product with ID  ==="
curl -X GET http://localhost:3000/products/2
echo -e "\n"

echo "=== Updating Product 2 ==="
curl -X PUT http://localhost:3000/products/2 \
  -H "Content-Type: application/json" \
  -d '{"name":"Updated Laptop","price":"1400.00"}'
echo -e "\n"

echo "=== Deleting Product 2 ==="
curl -X DELETE http://localhost:3000/products/2
echo -e "\n"

echo "=== Final Product List ==="
curl -X GET http://localhost:3000/products
echo -e "\n"
