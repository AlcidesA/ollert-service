import { EntityRepository, Repository } from 'typeorm'
import { User } from '@models/User'

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  findByEmail (email: string) {
    return this.createQueryBuilder('user').addSelect('user.password').where('user.email = :email', { email }).getOne()
  }
}
