'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OTP extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Menetapkan bahwa OTP milik User
      OTP.belongsTo(models.Penggunas, { foreignKey: 'user_id' }); //menetapkan relasi 
      //belongsTo artinya 1 row OTP bisa dimiliki oleh 1 user, tetapi user bisa memiliki banyak row otp  
    }
  }
  OTP.init({
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Penggunas', // Pastikan nama tabel Users sudah sesuai
        key: 'id'
      },
      onDelete: 'CASCADE'
    },
    otp: {
      type: DataTypes.STRING,
      allowNull: false
    },
    otp_expiry: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'OTP',
    freezeTableName: true,  //  agar nama tabel tidak otomatis menjadi "OTPs"
    tableName: 'OTP'        //  tentukan nama tabel secara eksplisit
  });
  return OTP;
};
