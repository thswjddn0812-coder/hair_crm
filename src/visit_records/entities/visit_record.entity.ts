import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("fk_1", ["memberId"], {})
@Entity("visit_records", { schema: "rose_hair_db" })
export class VisitRecords {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "member_id", nullable: true })
  memberId: number | null;

  @Column("varchar", { name: "treatment", nullable: true, length: 100 })
  treatment: string | null;

  @Column("int", { name: "price", nullable: true })
  price: number | null;

  @Column("datetime", { name: "visited_at", nullable: true })
  visitedAt: Date | null;

  @Column("text", { name: "memo", nullable: true })
  memo: string | null;
}
