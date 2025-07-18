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
export class ProductEntity extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar" })
  name: string;

  @Column({ type: "varchar", array: true })
  images: string[];

  @Column({ type: "varchar" })
  description: string;

  @Column({
    type: "numeric",
    transformer: { to: String, from: Number },
  })
  price: number;

  @Column({
    type: "numeric",
    nullable: true,
    transformer: {
      to: (value: number | null) => (value === null ? null : String(value)),
      from: (value: string | null) => (value === null ? null : Number(value)),
    },
  })
  discountPrice: number | null;

  @CreateDateColumn({ type: "timestamptz" })
  createdAtUtc: Date;

  @UpdateDateColumn({ type: "timestamptz" })
  updatedAtUtc: Date;

  @DeleteDateColumn({ type: "timestamptz", nullable: true })
  deletedAtUtc: Date | null;
}
