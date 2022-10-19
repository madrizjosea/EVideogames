const { DataTypes } = require('sequelize');

module.exports = sequelize => {
  sequelize.define(
    'account',
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
        unique: true,
      },
    },
    {
      timestamps: false,
    }
  );
};
