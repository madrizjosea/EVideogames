const { DataTypes } = require('sequelize');

module.exports = sequelize => {
  sequelize.define(
    'order',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      total: {
        type: DataTypes.FLOAT,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      games: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
      },
      state: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'Payed',
      },
    },
    {
      timestamps: false,
    }
  );
};
