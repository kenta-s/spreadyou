FactoryBot.define do
  factory :product do
    summary { "MyString" }
    description { "MyText" }
    url { "MyString" }
    user { nil }
  end
end
