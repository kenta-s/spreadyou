class CreateStatuses < ActiveRecord::Migration[6.0]
  def change
    create_table :statuses do |t|
      t.references :user, null: false, foreign_key: true
      t.integer :spread_point, null: false, default: 0

      t.timestamps
    end
  end
end
