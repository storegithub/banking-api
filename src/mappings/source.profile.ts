import { AutoMapper, ProfileBase, mapFrom } from '@nartc/automapper';
import { User } from '../entities/user.entity';
import { UserDto, UserLiteDto } from '../models/user.dto';
import { Profile } from 'nestjsx-automapper';
import { CustomerDto } from 'src/models/customer.dto';
import { Customer } from 'src/entities/customer.entity';
import { Branch } from 'src/entities/branch.entity';
import { BranchDto } from 'src/models/branch.dto';
import { Bank } from 'src/entities/bank.entity';
import { BankDto } from 'src/models/bank.dto';

@Profile()
export class SourceProfile extends ProfileBase  {
  constructor(mapper: AutoMapper) {
    super();

    mapper.createMap(User, UserDto)
      .forMember(d => d.id, mapFrom(s => s.id))
      .forMember(d => d.password, mapFrom(s => s.password))
      .forMember(d => d.userName, mapFrom(s => s.userName))
      .forMember(d => d.active, mapFrom(s => s.active))
      .forMember(d => d.email, mapFrom(s => s.email));
      // .reverseMap();
      // .forMember(d => d.toJson(), ignore());

    mapper.createMap(UserDto, User)
      .forMember(d => d.id, mapFrom(s => s.id))
      .forMember(d => d.password, mapFrom(s => s.password))
      .forMember(d => d.userName, mapFrom(s => s.userName))
      .forMember(d => d.active, mapFrom(s => s.active))
      .forMember(d => d.email, mapFrom(s => s.email));

    mapper.createMap(UserDto, UserLiteDto)
      .forMember(d => d.id, mapFrom(s => s.id))
      .forMember(d => d.userName, mapFrom(s => s.userName))
      .forMember(d => d.email, mapFrom(s => s.email));

      mapper.createMap(CustomerDto, Customer);
      mapper.createMap(Customer, CustomerDto);

      mapper.createMap(Branch, BranchDto);
      mapper.createMap(BranchDto, Branch);

      mapper.createMap(Bank, BankDto);
      mapper.createMap(BankDto, Bank);
    }
}