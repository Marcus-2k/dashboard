import { ApiProperty } from "@nestjs/swagger";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("product")
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  @ApiProperty({ type: String })
  id: string;

  @Column({ type: "varchar" })
  @ApiProperty({ type: String })
  name: string;

  @Column({ type: "varchar", array: true })
  @ApiProperty({ type: String, isArray: true })
  images: string[];

  @Column({ type: "varchar" })
  @ApiProperty({ type: String })
  description: string;

  @Column({
    type: "numeric",
    transformer: { to: String, from: Number },
  })
  @ApiProperty({ type: Number, nullable: true })
  price: number;

  @Column({
    type: "numeric",
    nullable: true,
    transformer: {
      to: (value: number | null) => (value === null ? null : String(value)),
      from: (value: string | null) => (value === null ? null : Number(value)),
    },
  })
  @ApiProperty({ type: Number, nullable: true })
  discountPrice: number;

  @CreateDateColumn({ type: "timestamptz" })
  @ApiProperty({ type: Date })
  createdAtUtc: Date;

  @UpdateDateColumn({ type: "timestamptz" })
  @ApiProperty({ type: Date })
  updatedAtUtc: Date;

  @DeleteDateColumn({ type: "timestamptz", nullable: true })
  @ApiProperty({ type: Date, nullable: true })
  deletedAtUtc: Date | null;
}
