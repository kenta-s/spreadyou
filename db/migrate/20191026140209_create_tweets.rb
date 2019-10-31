class CreateTweets < ActiveRecord::Migration[6.0]
  def change
    create_table :tweets do |t|
      t.references :user, null: false, foreign_key: true
      t.references :product, null: false, foreign_key: true
      t.string :tweet_id_on_twitter, null: true
      t.string :tweet_url, null: true
      t.string :content, null: false
      t.integer :status, null: false, default: 0

      t.timestamps
    end

    add_index :tweets, [:user_id, :product_id], unique: true
  end
end
