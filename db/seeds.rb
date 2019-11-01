# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
User.create!([
  { 
    email: 'user1@example.com',
    password: 'aaaaaa',
  },
  { 
    email: 'user2@example.com',
    password: 'aaaaaa',
  },
])

Status.create!([
  {
    user: User.first,
    spread_point: 30,
  },
  {
    user: User.second,
    spread_point: 3,
  }
])

User.first.products.create([
  {
    summary: '良い感じのアドネットワーク',
    description: 'めちゃくちゃ良い感じのアドネットワークです。これを使えばいい感じになります。',
    url: 'https://ad.example.com',
    status: :approved,
  },
  {
    summary: '空前絶後の決済システム',
    description: 'すごい決済システムです。やばいことになります。',
    url: 'https://kessai.example.com',
    status: :approved,
  },
])
