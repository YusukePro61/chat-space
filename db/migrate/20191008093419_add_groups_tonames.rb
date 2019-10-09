class AddGroupsTonames < ActiveRecord::Migration[5.0]
  def change
    add_column :groups, :name, :text, :null => false
  end
end
