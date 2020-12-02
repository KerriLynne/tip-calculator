# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Meal.create(amount: 50, category_id: 3, created_at: "2020-11-17")
Meal.create(amount: 85.49, category_id: 3, created_at: "2020-10-7")
Meal.create(amount: 36.70, category_id: 3, created_at: "2020-11-2")
Meal.create(amount: 25, category_id: 3, created_at: "2020-10-20")

Meal.create(amount: 70.45, category_id: 2, created_at: "2020-9-24")
Meal.create(amount: 110, category_id: 2, created_at: "2020-10-1")
Meal.create(amount: 130, category_id: 2, created_at: "2020-11-30")
Meal.create(amount: 90.33, category_id: 2, created_at: "2020-11-21")