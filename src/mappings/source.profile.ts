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
import { Contact } from 'src/entities/contact.entity';
import { ContactDto } from 'src/models/contact.dto';

@Profile()
export class SourceProfile extends ProfileBase  {
  constructor(mapper: AutoMapper) {
    super();

    mapper.createMap(Account, AccountDto)
      .forMember(d => d.id, mapFrom(s => s.id))
      .forMember(d => d.customerId, mapFrom(s => s.customerId))
      .forMember(d => d.accountNumber, mapFrom(s=> s.accountNumber))
      .forMember(d => d.iban, mapFrom(s=> s.iban))
      .forMember(d => d.accountType, mapFrom(s=> s.accountType == null ? '' : s.accountType.code))
      .forMember(d => d.currency, mapFrom(s=> s.currency == null ? '' : s.currency.value))
      // .forMember(d => d.currencyValue, mapFrom(s=> s.currency.name))
      .forMember(d => d.amount, mapFrom(s=> s.amount))
      .forMember(d => d.displayName, mapFrom(s=> s.displayName)).reverseMap();


    mapper.createMap(AccountType, AccountTypeDto)
      .forMember(d => d.id, mapFrom(s => s.id))
      .forMember(d => d.details, mapFrom(s => s.details)).reverseMap(); 

    mapper.createMap(Address, AddressDto)
      .forMember(d => d.id, mapFrom(s => s.id))
      .forMember(d => d.city, mapFrom(s => s.city))
      .forMember(d => d.zipCode, mapFrom(s => s.zipCode))
      .forMember(d => d.details, mapFrom(s => s.details)).reverseMap(); 

    mapper.createMap(Bank, BankDto)
      .forMember(d => d.id, mapFrom(s => s.id))
      .forMember(d => d.details, mapFrom(s => s.details)).reverseMap(); 

    mapper.createMap(Branch, BranchDto)
      .forMember(d => d.id, mapFrom(s => s.id))
      .forMember(d => d.bankId, mapFrom(s => s.bank.id))
      .forMember(d => d.addressId, mapFrom(s => s.address.id))
      .forMember(d => d.code, mapFrom(s => s.code))
      .forMember(d => d.details, mapFrom(s => s.details)).reverseMap(); 

    mapper.createMap(BranchType, BranchTypeDto)
      .forMember(d => d.id, mapFrom(s => s.id))
      .forMember(d => d.details, mapFrom(s => s.details)).reverseMap(); 

    mapper.createMap(Contact, ContactDto)
      .forMember(d => d.id, mapFrom(s => s.id))
      .forMember(d => d.firstName, mapFrom(s => s.firstName))
      .forMember(d => d.lastName, mapFrom(s => s.lastName))
      .forMember(d => d.email, mapFrom(s => s.email))
      .forMember(d => d.phoneNumber, mapFrom(s => s.phoneNumber))
      .forMember(d => d.message, mapFrom(s => s.message)).reverseMap(); 

    mapper.createMap(Customer, CustomerDto)
      .forMember(d => d.id, mapFrom(s => s.id))
      .forMember(d => d.addressId, mapFrom(s => s.address.id))
      .forMember(d => d.branchId, mapFrom(s => s.branch.id))
      .forMember(d => d.gender, mapFrom(s => s.gender))
      .forMember(d => d.name, mapFrom(s => s.name))
      .forMember(d => d.surname, mapFrom(s => s.surname))
      .forMember(d => d.createdOn, mapFrom(s => s.createdOn))
      .forMember(d => d.phoneNo, mapFrom(s => s.phoneNo))
      .forMember(d => d.email, mapFrom(s => s.email))
      .forMember(d => d.details, mapFrom(s => s.details)).reverseMap(); 

    mapper.createMap(Dictionary, DictionaryDto)
      .forMember(d => d.id, mapFrom(s => s.id))
      .forMember(d => d.name, mapFrom(s => s.name)).reverseMap(); 

    mapper.createMap(DictionaryDetail, DictionaryDetailDto)
      .forMember(d => d.id, mapFrom(s => s.id))
      .forMember(d => d.dictionaryId, mapFrom(s => s.dictionaryId))
      .forMember(d => d.name, mapFrom(s => s.name))
      .forMember(d => d.value, mapFrom(s => s.value))
      .forMember(d => d.active, mapFrom(s => s.active)).reverseMap(); 

    mapper.createMap(Transaction, TransactionDto)
      .forMember(d => d.id, mapFrom(s => s.id))
      .forMember(d => d.partner, mapFrom(s => s.mercant))
      .forMember(d => d.fromAccount, mapFrom(s =>  s.fromAccount == null ? "" : s.fromAccount.displayName))
      .forMember(d => d.fromAccountNumber, mapFrom(s =>  s.fromAccount == null ? "" : s.fromAccount.accountNumber))
      .forMember(d => d.fromAccountId, mapFrom(s => s.fromAccount == null ? 0 : s.fromAccount.id))
      .forMember(d => d.transactionTypeId, mapFrom(s => s.transactionType == null ? 0 : s.transactionType.id))
      .forMember(d => d.transactionType, mapFrom(s => s.transactionType == null ? '' : s.transactionType.details))
      .forMember(d => d.accountNumber, mapFrom(s => s.accountNumber))
      .forMember(d => d.transactionDate, mapFrom(s => s.transactionDate))
      .forMember(d => d.amount, mapFrom(s => s.amount))
      .forMember(d => d.currency, mapFrom(s => s.currency == null ? '' : s.currency.value))
      .forMember(d => d.description, mapFrom(s => s.details)).reverseMap(); 

    mapper.createMap(TransactionType, TransactionTypeDto)
      .forMember(d => d.id, mapFrom(s => s.id))
      .forMember(d => d.details, mapFrom(s => s.details)).reverseMap(); 

    mapper.createMap(UserDto, UserLiteDto)
      .forMember(d => d.id, mapFrom(s => s.id))
      .forMember(d => d.userName, mapFrom(s => s.userName))
      .forMember(d => d.email, mapFrom(s => s.email));

    mapper.createMap(User, UserDto)
      .forMember(d => d.id, mapFrom(s => s.id))
      .forMember(d => d.password, mapFrom(s => s.password))
      .forMember(d => d.userName, mapFrom(s => s.userName))
      .forMember(d => d.active, mapFrom(s => s.active))
      .forMember(d => d.customerId, mapFrom(s => s.customerId))
      .forMember(d => d.email, mapFrom(s => s.email)).reverseMap(); 
  }
}