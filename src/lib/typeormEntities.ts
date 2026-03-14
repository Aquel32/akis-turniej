import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Participant {
    @PrimaryGeneratedColumn() id!: number;
    @Column({ type: 'int' }) tournament_id!: number;
    @Column({ type: 'varchar' }) name!: string;
}

@Entity()
export class Stage {
    @PrimaryGeneratedColumn() id!: number;
    @Column({ type: 'int' }) tournament_id!: number;
    @Column({ type: 'varchar' }) name!: string;
    @Column({ type: 'varchar' }) type!: string;
    @Column({ type: 'simple-json' }) settings!: any;
    @Column({ type: 'int' }) number!: number;
}

@Entity()
export class Group {
    @PrimaryGeneratedColumn() id!: number;
    @Column({ type: 'int' }) stage_id!: number;
    @Column({ type: 'int' }) number!: number;
}

@Entity()
export class Round {
    @PrimaryGeneratedColumn() id!: number;
    @Column({ type: 'int' }) stage_id!: number;
    @Column({ type: 'int' }) group_id!: number;
    @Column({ type: 'int' }) number!: number;
}

@Entity()
export class Match {
    @PrimaryGeneratedColumn() id!: number;
    @Column({ type: 'int' }) stage_id!: number;
    @Column({ type: 'int' }) group_id!: number;
    @Column({ type: 'int' }) round_id!: number;
    @Column({ type: 'int' }) number!: number;
    @Column({ type: 'int', default: 0 }) child_count!: number;
    @Column({ type: 'int', default: 0 }) status!: number;
    @Column({ type: 'simple-json', nullable: true }) opponent1!: any;
    @Column({ type: 'simple-json', nullable: true }) opponent2!: any;
}

@Entity()
export class MatchGame {
    @PrimaryGeneratedColumn() id!: number;
    @Column({ type: 'int' }) stage_id!: number;
    @Column({ type: 'int' }) parent_id!: number;
    @Column({ type: 'int' }) number!: number;
    @Column({ type: 'int', default: 0 }) status!: number;
    @Column({ type: 'simple-json', nullable: true }) opponent1!: any;
    @Column({ type: 'simple-json', nullable: true }) opponent2!: any;
}

@Entity()
export class User {
    @PrimaryGeneratedColumn() id!: number;
    @Column({ type: 'varchar' }) name!: string;
    @Column({ type: 'int' }) age!: number;
    @Column({ type: 'varchar' }) country!: string;
    @Column({ type: 'varchar' }) registrationDate!: string;
    @Column({ type: 'int' }) rating!: number;
}

@Entity()
export class Tournament {
    @PrimaryGeneratedColumn() id!: number;
    @Column({ type: 'varchar' }) name!: string;
}