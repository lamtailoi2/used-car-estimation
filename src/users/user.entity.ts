import {
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  BeforeRemove,
  Entity,
  Column,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  email: string;
  @Column()
  password: string;

  @AfterInsert()
  logInsert() {
    console.log('Inserted User with id', this.id);
  }

  @AfterUpdate()
  logUpdate() {
    console.log('Updated User with id', this.id);
  }

  @BeforeRemove()
  logRemove() {
    console.log('Removed User with id', this.id);
  }
}
