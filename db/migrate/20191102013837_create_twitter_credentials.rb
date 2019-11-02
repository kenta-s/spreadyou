class CreateTwitterCredentials < ActiveRecord::Migration[6.0]
  def change
    create_table :twitter_credentials do |t|
      t.references :user, null: false, foreign_key: true
      t.string :access_token, null: false
      t.string :secret_token, null: false

      t.timestamps
    end
  end
end
