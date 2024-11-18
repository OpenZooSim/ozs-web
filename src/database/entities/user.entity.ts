import { Entity, Column } from 'typeorm';
import { AppBaseEntity } from './base-entity';
import { UserType } from '../../models/enums/user-type.enum';

@Entity('users')
export class UserEntity extends AppBaseEntity {
    @Column({
        unique: true,
        length: 255,
    })
    email!: string;

    @Column({
        length: 512,
    })
    password_hash!: string;

    @Column({
        length: 50,
        default: UserType.USER,
    })
    user_type!: string;

    @Column({
        default: false,
    })
    verified!: boolean;

    @Column({
        nullable: true,
    })
    last_login!: Date;

    @Column({
        nullable: true,
    })
    api_key!: string;
}
