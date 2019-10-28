FactoryBot.define do
  factory :tweet do
    association :user, factory: :user
    association :product, factory: :product
    content { "MyString" }

    trait :pending do
      tweet_id_on_twitter { nil }
      tweet_url { nil }
    end

    trait :tweeted do
      tweet_id_on_twitter { "12345678" }
      tweet_url { 'https://www.example.com/foo/status/12345678' }
    end
  end
end
