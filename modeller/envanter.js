module.exports = (sequelize, DataTypes) => {
    return sequelize.define('envanter', {
        kullanıcı_id: DataTypes.STRING,
        item_id: DataTypes.STRING,
        miktar: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1
        },
        item_name: DataTypes.STRING,
        ürün_kategori: DataTypes.STRING,
        tüccar: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        }
    }, {
        timestamps: false,
    });
};