/* eslint-disable class-methods-use-this */
import User from '../models/user';

class UserServices {
  formatUser(user, select) {
    switch(select){
      case 'password':
        return {...user, __v: undefined };
      default:
        return {...user, password: null, __v: undefined };
    }
  }

  async findAll() {
    const users = await User.find();
    return users.map(user => this.formatUser(user));
  }

  async findOne(params, select) {
    const { _doc: user } = await User.findOne(params);
    return this.formatUser(user, select);
  }

  async create(params) {
    const user = await User.create(params);
    return this.formatUser(user);
  }

  async update(where, params) {
    const { _doc: user } = await User.findOneAndUpdate(
      where, 
      params,
      {
        new: true,
        runValidators: true,
      });
    return this.formatUser(user);
  }

  async delete(params) {
    const user = await User.findOneAndDelete(params);
    return this.formatUser(user);
  }
}

const userServices = new UserServices;

export default userServices;
