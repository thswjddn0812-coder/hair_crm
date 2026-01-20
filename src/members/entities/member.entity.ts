import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("members", { schema: "rose_hair_db" })
export class Members {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "name", length: 50 })
  name: string;

  @Column("varchar", { name: "phone", nullable: true, length: 50 })
  phone: string | null;

  @Column("int", { name: "total_visits", nullable: true, default: () => "'0'" })
  totalVisits: number | null;

  @Column("timestamp", {
    name: "create_at",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  createAt: Date | null;
}
