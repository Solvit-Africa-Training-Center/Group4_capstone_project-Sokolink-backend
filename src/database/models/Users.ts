import { Sequelize, Model, DataTypes } from 'sequelize';
import { Role } from './Roles';
import { Profile } from './Profiles';
// // import { Rating } from './ratings';
// // import { Product } from './Products';



// /**
//  * @swagger
//  * components:
//  *   schemas:
//  *     User:
//  *       type: object
//  *       required:
//  *         - name
//  *         - email
//  *         - password
//  *         - roleId
//  *       properties:
//  *         id:
//  *           type: string
//  *           format: uuid
//  *           description: Auto-generated UUID
//  *         name:
//  *           type: string
//  *           description: User's full name
//  *         email:
//  *           type: string
//  *           format: email
//  *           description: User's email address
//  *         password:
//  *           type: string
//  *           format: password
//  *           description: Hashed password
//  *         roleId:
//  *           type: string
//  *           format: uuid
//  *           description: Reference to role ID
//  *         createdAt:
//  *           type: string
//  *           format: date-time
//  *         updatedAt:
//  *           type: string
//  *           format: date-time
//  * 
//  *     LoginRequest:
//  *       type: object
//  *       required:
//  *         - email
//  *         - password
//  *       properties:
//  *         email:
//  *           type: string
//  *           format: email
//  *         password:
//  *           type: string
//  *           format: password
//  * 
//  *     LoginResponse:
//  *       type: object
//  *       properties:
//  *         token:
//  *           type: string
//  *           description: JWT authentication token
//  * 
//  *     RegisterRequest:
//  *       type: object
//  *       required:
//  *         - name
//  *         - email
//  *         - password
//  *       properties:
//  *         name:
//  *           type: string
//  *         email:
//  *           type: string
//  *           format: email
//  *         password:
//  *           type: string
//  *           format: password
//  *           minLength: 8
//  * 
//  *     UserResponse:
//  *       type: object
//  *       properties:
//  *         id:
//  *           type: string
//  *           format: uuid
//  *         name:
//  *           type: string
//  *         email:
//  *           type: string
//  *           format: email
//  *         roleId:
//  *           type: string
//  *           format: uuid
//  *         createdAt:
//  *           type: string
//  *           format: date-time
//  *         updatedAt:
//  *           type: string
//  *           format: date-time
//  * 
//  *     UsersListResponse:
//  *       type: object
//  *       properties:
//  *         users:
//  *           type: array
//  *           items:
//  *             $ref: '#/components/schemas/UserResponse'
//  * 
//  *   securitySchemes:
//  *     bearerAuth:
//  *       type: http
//  *       scheme: bearer
//  *       bearerFormat: JWT
//  */

interface UserAttribute {
  id: string;
  name: string;
  email: string;
  password: string;
  roleId: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: null;
}

export interface UserCreationAttribute
  extends Omit<UserAttribute, 'id' | 'deletedAt' | 'createdAt' | 'updatedAt'> {
  id?: string;
  deletedAt?: null;
  createdAt?: Date;
  updatedAt?: Date;
}

export class User extends Model<UserAttribute, UserCreationAttribute> implements UserAttribute {
  public id!: string;
  public name!: string;
  public email!: string;
  public password!: string;
  public roleId!: string;
  public updatedAt!: Date;
  public deletedAt: null = null;
  public createdAt: Date = new Date();

  public toJSON(): object | UserAttribute {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      roleId: this.roleId,
      updatedAt: this.updatedAt,
      createdAt: this.createdAt,
    };
  }

  static associate(models: {
    Role: typeof Role;
    Profile: typeof Profile;
    // Rating: typeof Rating;
    // Product: typeof Product;
  }): void {
    User.belongsTo(models.Role, {
      foreignKey: 'roleId',
      as: 'role',
    });

    User.hasMany(models.Profile, {
      foreignKey: 'userId',
      as: 'user',
    });

    // User.hasMany(models.Product, {
    //   foreignKey: 'userId',
    //   as: 'products',
    // });

    // User.hasMany(Rating, {
    //   foreignKey: 'postedBy',
    //   as: 'ratings',
    // });
  }
}

export const UserModal = (sequelize: Sequelize) => {
  User.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      roleId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'roles',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
    },
    {
      sequelize,
      timestamps: true,
      modelName: 'Users',
      tableName: 'users',
    },
  );
  return User;
};