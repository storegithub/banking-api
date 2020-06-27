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
import { Account } from 'src/entities/account.entity';
import { AccountDto } from 'src/models/account.dto';
import { AccountType } from 'src/entities/accountType.entity';
import { AccountTypeDto } from 'src/models/accounttype.dto';
import { Address } from 'src/entities/address.entity';
import { AddressDto } from 'src/models/Address.dto';
import { BranchType } from 'src/entities/branchtype.entity';
import { BranchTypeDto } from 'src/models/branchtype.dto';
import { Dictionary } from 'src/entities/dictionary.entity';
import { DictionaryDto } from 'src/models/dictionary.dto';
import { DictionaryDetail } from 'src/entities/dictionaryDetail.entity';
import { DictionaryDetailDto } from 'src/models/dictionarydetail.dto';
import { TransactionType } from 'src/entities/transactionType.entity';
import { TransactionDto } from 'src/models/transaction.dto';
import { TransactionTypeDto } from 'src/models/transactiontype.dto';
import { Transaction } from 'src/entities/transaction.entity';
import { format } from 'path';

@Profile()
export class SourceProfile extends ProfileBase  {
  constructor(mapper: AutoMapper) {
    super();

    mapper.createMap(Account, AccountDto)
      .forMember(d => d.id, mapFrom(s => s.id))
      .forMember(d => d.customerId, mapFrom(s => s.customerId))
      .forMember(d => d.accountNumber, mapFrom(s=> s.accountNumber));

    mapper.createMap(AccountDto, Account)
      .forMember(d => d.id, mapFrom(s => s.id))
      .forMember(d => d.customerId, mapFrom(s => s.customerId))
      .forMember(d => d.accountNumber, mapFrom(s=> s.accountNumber));

    mapper.createMap(AccountType, AccountTypeDto)
      .forMember(d => d.id, mapFrom(s => s.id))
      .forMember(d => d.details, mapFrom(s => s.details));

    mapper.createMap(AccountTypeDto, AccountType)
      .forMember(d => d.id, mapFrom(s => s.id))
      .forMember(d => d.details, mapFrom(s => s.details));;

    mapper.createMap(Address, AddressDto)
      .forMember(d => d.id, mapFrom(s => s.id))
      .forMember(d => d.city, mapFrom(s => s.city))
      .forMember(d => d.zipCode, mapFrom(s => s.zipCode))
      .forMember(d => d.details, mapFrom(s => s.details));

    mapper.createMap(AddressDto, Address)
      .forMember(d => d.id, mapFrom(s => s.id))
      .forMember(d => d.city, mapFrom(s => s.city))
      .forMember(d => d.zipCode, mapFrom(s => s.zipCode))
      .forMember(d => d.details, mapFrom(s => s.details));

    mapper.createMap(Bank, BankDto)
      .forMember(d => d.id, mapFrom(s => s.id))
      .forMember(d => d.details, mapFrom(s => s.details));

    mapper.createMap(BankDto, Bank)
      .forMember(d => d.id, mapFrom(s => s.id))
      .forMember(d => d.details, mapFrom(s => s.details));

    mapper.createMap(Branch, BranchDto)
      .forMember(d => d.id, mapFrom(s => s.id))
      .forMember(d => d.bankId, mapFrom(s => s.bankId))
      .forMember(d => d.addressId, mapFrom(s => s.addressId))
      .forMember(d => d.code, mapFrom(s => s.code))
      .forMember(d => d.details, mapFrom(s => s.details));

    mapper.createMap(BranchDto, Branch)
      .forMember(d => d.id, mapFrom(s => s.id))
      .forMember(d => d.bankId, mapFrom(s => s.bankId))
      .forMember(d => d.addressId, mapFrom(s => s.addressId))
      .forMember(d => d.code, mapFrom(s => s.code))
      .forMember(d => d.details, mapFrom(s => s.details));

    mapper.createMap(BranchType, BranchTypeDto)
      .forMember(d => d.id, mapFrom(s => s.id))
      .forMember(d => d.details, mapFrom(s => s.details));

    mapper.createMap(BranchTypeDto, BranchType)
      .forMember(d => d.id, mapFrom(s => s.id))
      .forMember(d => d.details, mapFrom(s => s.details));

    mapper.createMap(Customer, CustomerDto)
      .forMember(d => d.id, mapFrom(s => s.id))
      .forMember(d => d.addressId, mapFrom(s => s.addressId))
      .forMember(d => d.branchId, mapFrom(s => s.branchId))
      .forMember(d => d.gender, mapFrom(s => s.gender))
      .forMember(d => d.name, mapFrom(s => s.name))
      .forMember(d => d.surname, mapFrom(s => s.surname))
      .forMember(d => d.createdOn, mapFrom(s => s.createdOn))
      .forMember(d => d.phoneNo, mapFrom(s => s.phoneNo))
      .forMember(d => d.email, mapFrom(s => s.email))
      .forMember(d => d.details, mapFrom(s => s.details))
      .forMember(d => d.userId, mapFrom(s => s.userId));

    mapper.createMap(CustomerDto, Customer)
      .forMember(d => d.id, mapFrom(s => s.id))
      .forMember(d => d.addressId, mapFrom(s => s.addressId))
      .forMember(d => d.branchId, mapFrom(s => s.branchId))
      .forMember(d => d.gender, mapFrom(s => s.gender))
      .forMember(d => d.name, mapFrom(s => s.name))
      .forMember(d => d.surname, mapFrom(s => s.surname))
      .forMember(d => d.createdOn, mapFrom(s => s.createdOn))
      .forMember(d => d.phoneNo, mapFrom(s => s.phoneNo))
      .forMember(d => d.email, mapFrom(s => s.email))
      .forMember(d => d.details, mapFrom(s => s.details))
      .forMember(d => d.userId, mapFrom(s => s.userId));

    mapper.createMap(Dictionary, DictionaryDto)
      .forMember(d => d.id, mapFrom(s => s.id))
      .forMember(d => d.name, mapFrom(s => s.name));

    mapper.createMap(DictionaryDto, Dictionary)
      .forMember(d => d.id, mapFrom(s => s.id))
      .forMember(d => d.name, mapFrom(s => s.name));

    mapper.createMap(DictionaryDetail, DictionaryDetailDto)
      .forMember(d => d.id, mapFrom(s => s.id))
      .forMember(d => d.dictionaryId, mapFrom(s => s.dictionaryId))
      .forMember(d => d.name, mapFrom(s => s.name))
      .forMember(d => d.value, mapFrom(s => s.value))
      .forMember(d => d.active, mapFrom(s => s.active));

    mapper.createMap(DictionaryDetailDto, DictionaryDetail)
      .forMember(d => d.id, mapFrom(s => s.id))
      .forMember(d => d.dictionaryId, mapFrom(s => s.dictionaryId))
      .forMember(d => d.name, mapFrom(s => s.name))
      .forMember(d => d.value, mapFrom(s => s.value))
      .forMember(d => d.active, mapFrom(s => s.active));

    mapper.createMap(Transaction, TransactionDto)
      .forMember(d => d.id, mapFrom(s => s.id))
      .forMember(d => d.mercantId, mapFrom(s => s.mercantId))
      .forMember(d => d.transactionTypeId, mapFrom(s => s.transactionTypeId))
      .forMember(d => d.accountNumber, mapFrom(s => s.accountNumber))
      .forMember(d => d.transactionDate, mapFrom(s => s.transactionDate))
      .forMember(d => d.Amount, mapFrom(s => s.Amount))
      .forMember(d => d.details, mapFrom(s => s.details));

    mapper.createMap(TransactionDto, Transaction)
      .forMember(d => d.id, mapFrom(s => s.id))
      .forMember(d => d.mercantId, mapFrom(s => s.mercantId))
      .forMember(d => d.transactionTypeId, mapFrom(s => s.transactionTypeId))
      .forMember(d => d.accountNumber, mapFrom(s => s.accountNumber))
      .forMember(d => d.transactionDate, mapFrom(s => s.transactionDate))
      .forMember(d => d.Amount, mapFrom(s => s.Amount))
      .forMember(d => d.details, mapFrom(s => s.details));

    mapper.createMap(TransactionType, TransactionTypeDto)
      .forMember(d => d.id, mapFrom(s => s.id))
      .forMember(d => d.details, mapFrom(s => s.details));

    mapper.createMap(TransactionTypeDto, TransactionType)
      .forMember(d => d.id, mapFrom(s => s.id))
      .forMember(d => d.details, mapFrom(s => s.details));

    mapper.createMap(UserDto, UserLiteDto)
      .forMember(d => d.id, mapFrom(s => s.id))
      .forMember(d => d.userName, mapFrom(s => s.userName))
      .forMember(d => d.email, mapFrom(s => s.email));

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
  }
}