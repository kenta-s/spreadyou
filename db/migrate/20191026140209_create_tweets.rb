class CreateTweets < ActiveRecord::Migration[6.0]
  def change
    create_table :tweets do |t|
      t.references :user, null: false, foreign_key: true
      t.string :tweet_id_on_twitter, null: false
      t.string :content, null: false

      t.timestamps
    end
  end
end
