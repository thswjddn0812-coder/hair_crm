import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("fk_1", ["userId"], {})
@Entity("refresh_tokens", { schema: "rose_hair_db" })
export class RefreshTokens {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "user_id", nullable: true })
  userId: number | null;

  @Column("varchar", { name: "token", length: 512 })
  token: string;

  @Column("timestamp", { name: "expires_at" })
  expiresAt: Date;
}
