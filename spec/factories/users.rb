FactoryBot.define do
  factory :user do
    sequence :email do |n|
      "foo#{n}@example.com"
    end
    sequence :name do |n|
      "foo#{n}"
    end
    password { 'abcdefg1' }
    confirmed_at { Time.zone.local(2019, 9, 1, 10, 30) }

    trait :with_3_sp_point do |user|
      status { Status.new(spread_point: 3) }
    end
    trait :with_0_sp_point do |user|
      status { Status.new(spread_point: 0) }
    end
    initialize_with { User.find_or_create_by(email: email)}
  end
end
